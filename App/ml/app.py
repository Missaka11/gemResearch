import base64
import json
import os
import random
from io import BytesIO

import cv2
from PIL import Image
from flask_cors import CORS


from flask import Flask, request, session, send_from_directory


app = Flask(__name__)
cors = CORS(app)
app.secret_key = 'gemora_mndsm|sjkc+mscnx-xc_njm'

output_size = (224, 224)

from tensorflow.keras.models import load_model
model = load_model('rcnn_model.h5')

# Load the image
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np


def crop_image(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(gray, 50, 150)
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    xs = []
    ys = []

    for contour in contours:
        # Calculate the area of the contour
        area = cv2.contourArea(contour)

        # Ignore small contours (noise)
        if area > 0:
            # Calculate the x, y, w, h coordinates of the bounding rectangle
            x, y, w, h = cv2.boundingRect(contour)
            xs.append(x)
            xs.append(x + w)
            ys.append(y)
            ys.append(y + h)

    if len(xs) > 0 and len(ys) > 0:

        w = max(xs) - min(xs)
        h = max(ys) - min(ys)

        l = max(w, h)

        xm = int((max(xs) + min(xs)) / 2)
        ym = int((max(ys) + min(ys)) / 2)

        x1 = xm - int(l / 2)
        x2 = xm + int(l / 2)
        y1 = ym - int(l / 2)
        y2 = ym + int(l / 2)

        if x1 < 0:
            x1 += abs(x1)
            x2 += abs(x1)
        if y1 < 0:
            y1 += abs(y1)
            y2 += abs(y1)

        cropped_img = img[y1:y2, x1:x2]
    else:
        cropped_img = img

    resized_img = cv2.resize(cropped_img, output_size)

    return resized_img
# Load the image from a file path
def load_image(path):
    img = crop_image(path)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

# Make a prediction on the image
def make_prediction(path):
    img_array = load_image(path)
    prediction = model.predict(img_array)
    return prediction

def analyze(image):
    path = f'image/temp/{random.randint(100000, 999999)}.png'

    base64_url = image.split(",")[1]
    decoded_bytes = base64.b64decode(base64_url)
    image_bytes = BytesIO(decoded_bytes)
    image = Image.open(image_bytes)
    image.save(path, "PNG")


    prediction = list(make_prediction(path))
    score = float(prediction[0][0])
    is_gem = score > 0.5

    return {
        "type": "gem" if is_gem else "non_gem",
        "score": score
    }


@app.route('/api/identify', methods=['GET', 'POST'])
def identify():
    try:

        data = request.get_json(force=True)
        image = data['image']

        return json.dumps(analyze(image))

    except Exception as e:
        print(e)
        return "Unidentified"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)

