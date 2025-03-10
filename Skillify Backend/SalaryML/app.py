from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/test')
def test():
    return jsonify({'message': 'This is a test response'})

if __name__ == '__main__':
    app.run(debug=True)