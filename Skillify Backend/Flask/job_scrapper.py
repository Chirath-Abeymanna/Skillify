import requests
import json
import yaml

# Load API Key from Config
CONFIG_PATH = r"config.yaml"
with open(CONFIG_PATH) as file:
    data = yaml.load(file, Loader=yaml.FullLoader)

SERPER_API_KEY = data['SERPER_API_KEY']

def search_google_jobs(search_query):
    """
    Uses Serper API to search for jobs based on a career path.
    """
    url = "https://google.serper.dev/search"

    payload = json.dumps({
        "q": search_query,
        "gl": "lk",  # Sri Lanka
        "hl": "en"   # English
    })

    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, data=payload)
    
    if response.status_code == 200:
        data = response.json()
        job_results = []

        if "organic" in data:
            for result in data["organic"][:5]:  # Limit to 5 job results
                job_results.append({
                    "title": result.get("title", "No Title"),
                    "link": result.get("link", "No Link"),
                    "description": result.get("snippet", "No Description")
                })
        
        return job_results
    else:
        return {"error": "Failed to fetch job listings"}
