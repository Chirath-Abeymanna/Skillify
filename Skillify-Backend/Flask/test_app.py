import os
import pytest
from app import app
import numpy as np
from unittest.mock import patch, MagicMock

@pytest.fixture(scope="module")
def mock_openai():
    """Mock OpenAI client"""
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(
            message=MagicMock(
                content='{"career_paths": [{"career_path": "Software Engineer", "search_query": "Software Engineer jobs in Sri Lanka"}]}'
            )
        )
    ]
    
    mock_client = MagicMock()
    mock_client.chat.completions.create.return_value = mock_response
    
    with patch('openai.OpenAI', return_value=mock_client):
        yield

@pytest.fixture(autouse=True)
def setup_env(mock_openai):
    """Setup environment for all tests"""
    pass

@pytest.fixture(scope="module")
def test_client():
    """Create a test client."""
    app.config['TESTING'] = True
    app.config['UPLOAD_PATH'] = os.path.join(os.getcwd(), "uploads")
    os.makedirs(app.config['UPLOAD_PATH'], exist_ok=True)

    # Mock data with correct structure and behavior
    class MockLabelEncoder:
        def transform(self, x):
            return np.array([0])

    class MockModel:
        def predict(self, X):
            return np.array([50000])

    mock_data = {
        "model": MockModel(),
        "le_country": MockLabelEncoder(),
        "le_education": MockLabelEncoder()
    }
    
    with patch('pickle.load', return_value=mock_data), \
         patch('httpx.Client', return_value=MagicMock()):
        with app.test_client() as client:
            yield client

    # Clean up
    for f in os.listdir(app.config['UPLOAD_PATH']):
        os.remove(os.path.join(app.config['UPLOAD_PATH'], f))
    os.rmdir(app.config['UPLOAD_PATH'])

def test_index(test_client):
    """Test the index route."""
    response = test_client.get('/')
    assert response.status_code == 200

def test_health(test_client):
    """Test the health check route."""
    response = test_client.get('/health')
    assert response.status_code == 200
    assert response.json == {'status': 'healthy'}

def test_predict_invalid(test_client):
    """Test the predict route with invalid input."""
    payload = {
        'country': 'USA',
        'education': 'Bachelor',
        'experience': 'five'  # Invalid experience
    }
    response = test_client.post('/predict', json=payload)
    assert response.status_code == 400
    assert 'error' in response.json

def test_parse_resume_no_file(test_client):
    """Test the resume parsing route without a file."""
    response = test_client.post('/Resume')
    assert response.status_code == 400
    assert 'error' in response.json

def test_parse_resume_invalid_file(test_client):
    """Test the resume parsing route with an invalid file."""
    data = {'pdf_doc': 'invalid_text'}
    response = test_client.post('/Resume', data=data)
    assert response.status_code == 400
    assert 'error' in response.json
