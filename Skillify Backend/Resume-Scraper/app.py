import os, sys
from flask import Flask, request, render_template, jsonify
from pypdf import PdfReader
import json
from resumeparser import extract_career_paths
from job_scrapper import search_google_jobs
from flask_cors import CORS

sys.path.insert(0, os.path.abspath(os.getcwd()))

UPLOAD_PATH = r"__DATA__"
app = Flask(__name__, template_folder="templates")
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def parse_resume():
    """
    API endpoint that processes a CV, extracts career paths, finds available jobs, and returns the results.
    """
    if 'pdf_doc' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['pdf_doc']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.pdf'):
        # Save the file temporarily
        file_path = os.path.join(UPLOAD_PATH, file.filename)
        file.save(file_path)
        
        # Extract text from the PDF
        reader = PdfReader(file_path)
        resume_data = "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])

        # Step 1: Extract Career Paths
        career_paths = extract_career_paths(resume_data)
        print(career_paths)

        if "error" in career_paths:
            return jsonify(career_paths), 500

        # Step 2: Get Job Listings for Each Career Path
        job_results = {}
        for career in career_paths["career_paths"]:
            job_results[career["career_path"]] = search_google_jobs(career["search_query"])

        # Step 3: Return the Final Output
        return jsonify({
            "career_paths": career_paths["career_paths"],
            "job_results": job_results
        })
    
    return jsonify({"error": "Invalid file type. Please upload a PDF."}), 400

if __name__ == '__main__':
    app.run(debug=True)
