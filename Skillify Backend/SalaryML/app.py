from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load model and encoders
try:
    with open('saved_steps.pkl', 'rb') as file:
        data = pickle.load(file)

    regressor = data["model"]
    le_country = data.get("le_country")
    le_education = data.get("le_education")
except Exception as e:
    logger.error(f"Error loading model or encoders: {e}")
    raise RuntimeError("Model or encoders not loaded properly.")

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/test')
def test():
    return jsonify({'message': 'This is a test response'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get request data
        req = request.get_json()

        # Check for missing fields
        country = req.get('country')
        education = req.get('education')
        experience = req.get('experience')

        if not country or not education or not experience:
            return jsonify({'error': 'Missing required fields: country, education, and experience are required.'}), 400
        
        # Ensure experience is a valid number
        try:
            experience = float(experience)
        except ValueError:
            return jsonify({'error': 'Experience must be a valid number.'}), 400
        
        # Prepare data for prediction
        X = np.array([[country, education, experience]])

        # Transform categorical features
        if le_country and le_education:
            X[:, 0] = le_country.transform([country])[0]  # Safe transform for country
            X[:, 1] = le_education.transform([education])[0]  # Safe transform for education
        
        X = X.astype(float)

        # Make prediction
        salary = regressor.predict(X)[0]

        # Return the response
        return jsonify({'predicted_salary': round(salary, 2)})

    except Exception as e:
        logger.error(f"Error in prediction: {e}")
        return jsonify({'error': 'An error occurred during prediction. Please try again later.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
