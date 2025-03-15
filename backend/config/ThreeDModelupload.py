import os
from flask import jsonify, send_file, request, Blueprint

three_d_model_bp = Blueprint('three_d_model', __name__)

# Path to the 3D models folder
MODELS_FOLDER = os.path.join(os.getcwd(), "ThreeDmodels")

@three_d_model_bp.route('/retrieve-models', methods=['GET'])
def retrieve_models():
    category = request.args.get("category")
    subcategory = request.args.get("subcategory")

    if not category or not subcategory:
        return jsonify({"error": "Missing category or subcategory"}), 400

    folder_name = f"{category}-{subcategory}"
    folder_path = os.path.join(MODELS_FOLDER, folder_name)

    if not os.path.exists(folder_path):
        return jsonify({"error": f"Folder {folder_name} not found"}), 404

    models = []
    for file in os.listdir(folder_path):
      if file.endswith((".glb", ".gltf")):
        thumbnail_file = file.replace(".glb", "-thumbnail.jpg").replace(".gltf", "-thumbnail.jpg")
        thumbnail_path = f"/3dmodel/download/{folder_name}/{thumbnail_file}"

        obj_file = {
            "filename": file,
            "path": f"/3dmodel/download/{folder_name}/{file}",
            "thumbnailPath": thumbnail_path if os.path.exists(os.path.join(folder_path, thumbnail_file)) else None,
        }
        models.append(obj_file)

    if not models:
        return jsonify({"error": "No models found in the folder"}), 404

    return jsonify(models), 200


@three_d_model_bp.route('/download/<folder>/<filename>', methods=['GET'])
def download_model(folder, filename):
    file_path = os.path.join(MODELS_FOLDER, folder, filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    return send_file(file_path, as_attachment=True)
