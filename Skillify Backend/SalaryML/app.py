from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load model
with open('saved_steps.pkl', 'rb') as file:
    data = pickle.load(file)
regressor = data["model"]

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/test')
def test():
    return jsonify({'message': 'This is a test response'})

@app.route('/predict', methods=['POST'])
def predict():
    req = request.get_json()
    experience = float(req['experience'])
    salary = regressor.predict([[experience]])[0]
    return jsonify({'predicted_salary': round(salary, 2)})

if __name__ == '__main__':
    app.run(debug=True)