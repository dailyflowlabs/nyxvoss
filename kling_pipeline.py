import os
import time
import json
import base64
import urllib.request
import urllib.error

API_KEY = "api-key-kling-ZBCskxkg6NOVQFbhMbvln6tZ274M-izFbnoRdE8j0kE"
BASE_URL = "https://api.klingai.com"

def image_to_base64(image_path):
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def submit_image_to_video(image_path, prompt, negative_prompt="", duration="5", model_name="kling-v1"):
    img_b64 = image_to_base64(image_path)
    payload = {
        "model_name": model_name,
        "image": img_b64,
        "prompt": prompt,
        "duration": duration,
        "cfg_scale": 0.5
    }
    if negative_prompt:
        payload["negative_prompt"] = negative_prompt

    req = urllib.request.Request(
        f"{BASE_URL}/v1/videos/image2video",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    try:
        res = urllib.request.urlopen(req, timeout=30)
        data = json.loads(res.read().decode("utf-8"))
        if data.get("code") == 0:
            task_id = data["data"]["task_id"]
            print(f"[+] Task submitted successfully: {task_id}")
            return task_id
        else:
            print(f"[-] Submission failed: {data}")
            return None
    except urllib.error.HTTPError as e:
        print(f"[-] HTTP Error {e.code}: {e.read().decode('utf-8')}")
        return None

def poll_task(task_id, interval=10, max_attempts=60):
    print(f"[*] Polling task {task_id}...")
    req = urllib.request.Request(
        f"{BASE_URL}/v1/videos/image2video/{task_id}",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    for i in range(max_attempts):
        try:
            res = urllib.request.urlopen(req, timeout=15)
            data = json.loads(res.read().decode("utf-8"))
            status = data.get("data", {}).get("task_status")
            print(f"    Attempt {i+1}/{max_attempts} - Status: {status}")
            if status == "succeed":
                videos = data["data"]["task_result"]["videos"]
                if videos:
                    return videos[0]["url"]
            elif status in ["failed", "canceled"]:
                print(f"[-] Task ended with status: {status}")
                return None
        except Exception as e:
            print(f"    Warning: poll error: {e}")
        time.sleep(interval)
    print("[-] Polling timed out.")
    return None

def download_video(url, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    print(f"[*] Downloading video to {output_path}...")
    urllib.request.urlretrieve(url, output_path)
    print(f"[✓] Saved: {output_path} ({os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        task = sys.argv[1]
        url = poll_task(task)
        if url:
            out_file = sys.argv[2] if len(sys.argv) > 2 else f"videos/task_{task}.mp4"
            download_video(url, out_file)
