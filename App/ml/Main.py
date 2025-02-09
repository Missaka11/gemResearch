from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tensorflow as tf
import numpy as np
from ultralytics import YOLO
import supervision as sv
import cv2

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing if React and Flask are on different origins

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def prediction_probability_label(model, img_path, class_labels, is_rgb=True)->tuple:
  if is_rgb:
    img = tf.keras.utils.load_img(
                img_path, color_mode='rgb', target_size=[255, 255],
                interpolation='nearest'
            )
  else:
            img = tf.keras.utils.load_img(
                img_path, color_mode='grayscale', target_size=[255, 255],
                interpolation='nearest'
            )
  input_arr = tf.keras.preprocessing.image.img_to_array(img)
  input_arr = np.array([input_arr])  # Convert single image to a batch.
  input_arr = input_arr / 255
  pred_probs = model.predict(input_arr)[0]
  pred_class = np.argmax(pred_probs)
  pred_label = class_labels[pred_class]
  pred_prob = round(pred_probs[pred_class]*100, 2)
  # img = cv2.imread(img_path)
  print(pred_label,pred_prob)
  return pred_label,pred_prob



@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    
    # Load a model
    model = YOLO("best.pt")  # pretrained YOLO11n model

    # Run batched inference on a list of images
    results = model(file_path)  # return a list of Results objects

    pred_label,pred_prob = None, None

    print(f"Detected {len(results)} images")

    # Assuming `results[0]` comes from an Ultralytics YOLO detection result
    detections = sv.Detections.from_ultralytics(results[0])

    # Class labels as defined by your model (replace with the actual labels used in your model)
    class_labels = ['Blue Sapphires', 'CatsEye', 'Pink Sapphires' ,'Topaz', 'Yellow Sapphires']

    # Get class IDs from detections
    class_ids = detections.class_id  # This contains the detected class IDs

    # Map class IDs to class names
    class_names = [class_labels[class_id] for class_id in class_ids]

    print("Detected class names:", class_names)

    # The rest of the annotation code
    oriented_box_annotator = sv.OrientedBoxAnnotator()
    annotated_frame = oriented_box_annotator.annotate(
        scene=cv2.imread(file_path),
        detections=detections
    )

    annotated_frame = sv.resize_image(
        annotated_frame,
        resolution_wh=(900, 900),
        keep_aspect_ratio=True
    )
    sv.cv2_to_pillow(annotated_frame)


    newmodel = tf.keras.models.load_model("/Users/gevindu/SLIIT/Research /gemResearch/gems (1).h5")
    img_path = file_path
    class_labels = ['Blue Sapphires', 'CatsEye', 'Pink Sapphires' ,'Topaz', 'Yellow Sapphires']

    red_label,pred_prob = prediction_probability_label(newmodel, img_path, class_labels)
        

    # Process results list
    for result in results:
        boxes = result.boxes  # Boxes object for bounding box outputs
        if boxes is not None:
            class_indices = boxes.cls  # Class indices
            for class_idx in class_indices:
                class_name = model.names[int(class_idx)]  # Map index to class name
                print(f"Detected class: {class_name}")
                newmodel = tf.keras.models.load_model("/Users/gevindu/SLIIT/Research /gemResearch/gems (1).h5")
                img_path = file_path
                class_labels = ['Blue Sapphires', 'CatsEye', 'Pink Sapphires' ,'Topaz', 'Yellow Sapphires']

                pred_label,pred_prob = prediction_probability_label(newmodel, img_path, class_labels)
        
        #result.show()  # Display the result on the screen
        # result.save(save_dir="results/")  # Save the results to disk'''

    return jsonify({'message': f'pred_label: {pred_label} pred_prob: {pred_prob}'})

if __name__ == '__main__':
    app.run(debug=True)

# newmodel = tf.keras.models.load_model("/Users/gevindu/SLIIT/Research /gemResearch/gems (1).h5")
# img_path = f"/Users/gevindu/SLIIT/Research /gemResearch/Real Images/Blue Sapphires/IMG_8415.JPG"
# class_labels = ['Blue Sapphires', 'CatsEye', 'Pink Sapphires' ,'Topaz', 'Yellow Sapphires']

# pred_label,pred_prob = prediction_probability_label(newmodel, img_path, class_labels)