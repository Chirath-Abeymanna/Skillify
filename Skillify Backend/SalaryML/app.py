from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and encoders
with open('saved_steps.pkl', 'rb') as file:
    data = pickle.load(file)

regressor = data["model"]
le_country = data["le_country"]
le_education = data["le_education"]

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

if __name__ == '__main__':
    app.run(debug=True)