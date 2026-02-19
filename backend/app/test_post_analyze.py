import requests

url = "http://localhost:8001/api/v1/analyze"

payload = {
    "activity_data": {
        "task_hours": 5.0,
        "idle_hours": 2.0,
        "social_media_usage": 1.5,
        "break_frequency": 3,
        "tasks_completed": 7
    },
    "user_id": "test_user",
    "user_name": "Test User"
}

response = requests.post(url, json=payload)
print(f"Status: {response.status_code}")
print(response.json())
