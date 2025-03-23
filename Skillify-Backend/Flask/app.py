import os
import sys
from flask import Flask, request, render_template, jsonify
from pypdf import PdfReader
import pickle
import numpy as np
from flask_cors import CORS
from resumeparser import extract_career_paths
from job_scrapper import search_google_jobs

sys.path.insert(0, os.path.abspath(os.getcwd()))

UPLOAD_PATH = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_PATH, exist_ok=True)  # Ensure the upload folder exists

app = Flask(__name__, template_folder="templates")
CORS(app)

# Load model and encoders
MODEL_PATH = os.path.join(os.getcwd(), 'saved_steps.pkl')
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Error: saved_steps.pkl not found. Ensure the file is present.")

with open(MODEL_PATH, 'rb') as file:
    data = pickle.load(file)

regressor = data["model"]
le_country = data["le_country"]
le_education = data["le_education"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        req = request.get_json()
        country = req['country']
        education = req['education']
        experience = float(req['experience'])

        # Transform inputs
        X = np.array([[country, education, experience]])
        X[:, 0] = le_country.transform(X[:, 0])
        X[:, 1] = le_education.transform(X[:, 1])
        X = X.astype(float)

        # Predict
        salary = regressor.predict(X)[0]

        return jsonify({'salary': round(salary, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/Resume', methods=['POST'])
def parse_resume():
    if 'pdf_doc' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['pdf_doc']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.pdf'):
        file_path = os.path.join(UPLOAD_PATH, file.filename)
        file.save(file_path)
        
        reader = PdfReader(file_path)
        resume_data = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])

        # Step 1: Extract Career Paths
        career_paths = extract_career_paths(resume_data)

        if "error" in career_paths:
            return jsonify(career_paths), 500

        # Step 2: Get Job Listings for Each Career Path
        job_results = {}
        for career in career_paths["career_paths"]:
            job_results[career["career_path"]] = search_google_jobs(career["search_query"])

        return jsonify({
            "career_paths": career_paths["career_paths"],
            "job_results": job_results
        })
    
    return jsonify({"error": "Invalid file type. Please upload a PDF."}), 400

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Railway's dynamic port
    app.run(host="0.0.0.0", port=port, debug=False)
