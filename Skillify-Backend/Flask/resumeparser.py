import openai
import yaml
import json

# Load API Key from Config
CONFIG_PATH = r"config.yaml"

with open(CONFIG_PATH) as file:
    data = yaml.load(file, Loader=yaml.FullLoader)

OPENAI_API_KEY = data['OPENAI_API_KEY']

# Set OpenAI API key for authentication
openai.api_key = OPENAI_API_KEY

def extract_career_paths(resume_data):
    """
    Uses OpenAI to analyze a resume and extract suitable career paths.
    """

    prompt = '''
    You are an AI career advisor. Your task is to:

    1. Analyze the resume to extract:
       - Job experience (roles, companies, years)
       - Technical skills
       - Soft skills

    2. Based on the extracted details, suggest **career paths** that align with their skills and experience.

    3. Provide **at least 3 career paths** in **valid JSON format ONLY**. Do not include any extra text, explanations, or code blocks. The JSON format must be:

       {
           "career_paths": [
               {
                   "career_path": "Software Engineer",
                   "search_query": "Software Engineer jobs in Sri Lanka"
               },
               {
                   "career_path": "Data Scientist",
                   "search_query": "Data Scientist jobs in Sri Lanka"
               }
           ]
       }

    Output only valid JSON. No extra text.
    '''

    messages = [
        {"role": "system", "content": prompt},
        {"role": "user", "content": resume_data}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.0,
        max_tokens=1500
    )

    try:
        json_data = json.loads(response.choices[0].message['content'].strip())
        return json_data
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format received from OpenAI"}
