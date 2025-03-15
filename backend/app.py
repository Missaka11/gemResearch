import os
# import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify, render_template
from PIL import Image
# import io
from werkzeug.utils import secure_filename
from shapes import GemShapes
from flask_cors import CORS
from config.ThreeDModelupload import three_d_model_bp 


# Define base directory and create necessary folders
BASE_DIRECTRY = os.path.dirname(os.path.abspath(__file__))
MODEL_DIRECTRY = os.path.join(BASE_DIRECTRY, 'model')
UPLOAD_DIRECTRY = os.path.join(BASE_DIRECTRY, 'uploads')

# Create directories if they don't exist
for dir in [MODEL_DIRECTRY, UPLOAD_DIRECTRY]:
    os.makedirs(dir, exist_ok=True)

# Configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
IMG_HEIGHT = 256
IMG_WIDTH = 256

app = Flask(__name__)

# Register the blueprint
app.register_blueprint(three_d_model_bp, url_prefix='/3dmodel')

# Initialize CORS to allow all domains
CORS(app)

def load_model():
    # """Load the saved Keras model"""
    try:
        shapes_model_path = os.path.join(MODEL_DIRECTRY, 'inceptionV3_model.h5')
        # Custom objects can be passed here if your model uses custom layers
        custom_objects = None
        
        try:
            # First attempt: Try loading with new Keras format
            shape_model = tf.keras.models.load_model(
                shapes_model_path,
                custom_objects=custom_objects,
                compile=False
            )
        except Exception as keras_error:
            print(f"Error loading with new format: {str(keras_error)}")
            # Second attempt: Try loading with legacy format
            try:
                shape_model = tf.keras.models.load_model(
                    shapes_model_path.replace('.keras', '.h5'),
                    custom_objects=custom_objects,
                    compile=False
                )
            except Exception as h5_error:
                raise Exception(f"Failed to load model in both formats. Keras error: {str(keras_error)}, H5 error: {str(h5_error)}")
        
        print(f"Model successfully loaded from: {shapes_model_path}")
        return shape_model
    except Exception as e:
        print(f"Error in load_model(): {str(e)}")
        raise

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize((IMG_HEIGHT, IMG_WIDTH))
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = tf.expand_dims(img_array, 0)
    return img_array

# For get all shapes
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


# For predict the gems
@app.route('/predict-gem', methods=['POST'])
def predict():
    if 'imagefile' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['imagefile']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Save uploaded file
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_DIRECTRY, filename)
            file.save(file_path)
            print(f"Image saved to: {file_path}")
            
            # Process image and make prediction
            with Image.open(file_path) as image:
                processed_gemshape_image = preprocess_image(image)
            
            shape_prediction = shape_model.predict(processed_gemshape_image)
            shape_probabilities = tf.nn.softmax(shape_prediction[0])
            
            # Get predictions for each category
            shapes = GemShapes.get_all_shapes()
            prediction_dict = {
                shape: float(prob) 
                for shape, prob in zip(shapes, shape_probabilities)
            }
            
            # Get the highest probability prediction
            predicted_label = max(prediction_dict.items(), key=lambda x: x[1])[0]
            print(f"Predicted label: {predicted_label}")

            return predicted_label

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    # Load model when starting the server
    shape_model = load_model()
    print(f"Loaded {GemShapes.get_category_count()} gem shapes")
    app.run(debug=True, port=5000)