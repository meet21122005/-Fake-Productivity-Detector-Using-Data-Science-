import requests

BASE_URL = "http://localhost:8001/api/v1"

# Test endpoints
endpoints = {
    "analyze": f"{BASE_URL}/analyze",
    "history": f"{BASE_URL}/history/test",
    "reports": f"{BASE_URL}/reports/test",
    "upload_csv": f"{BASE_URL}/upload-csv"
}

def test_get(endpoint):
    try:
        response = requests.get(endpoint)
        print(f"GET {endpoint} -> Status: {response.status_code}")
        print(response.json())
    except Exception as e:
        print(f"Error testing {endpoint}: {e}")

def main():
    print("Testing GET endpoints:")
    for name, url in endpoints.items():
        if name != "analyze" and name != "upload_csv":
            test_get(url)

if __name__ == "__main__":
    main()
