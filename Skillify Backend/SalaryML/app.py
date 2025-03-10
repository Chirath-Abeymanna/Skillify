from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load model and encoders
with open('saved_steps.pkl', 'rb') as file:
    data = pickle.load(file)

regressor = data["model"]
le_country = data.get("le_country")
le_education = data.get("le_education")

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/test')
def test():
    return jsonify({'message': 'This is a test response'})

@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json()
    country = req.get('country', '')
    education = req.get('education', '')
    experience = float(req['experience'])
    
    X = np.array([[country, education, experience]])
    if le_country and le_education:
        X[:, 0] = le_country.transform(X[:, 0])
        X[:, 1] = le_education.transform(X[:, 1])
    X = X.astype(float)
    
    salary = regressor.predict(X)[0]
    return jsonify({'predicted_salary': round(salary, 2)})

if __name__ == '__main__':
    app.run(debug=True)