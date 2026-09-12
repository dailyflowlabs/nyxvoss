import os
import time
import json
import base64
import urllib.request
import urllib.error

API_KEY = "api-key-kling-ZBCskxkg6NOVQFbhMbvln6tZ274M-izFbnoRdE8j0kE"
BASE_URL = "https://api.klingai.com"

shots = [
    {
        "name": "shot_strut",
        "image": "images/nyx-fullbody-strut.jpg",
        "prompt": "Full-length body shot of a cyber-goth industrial woman in leather jacket and harness strutting confidently forward through wet Berlin warehouse, camera smoothly tracking backwards, steam rising from grates, cinematic 24fps.",
        "output": "videos/shot_strut.mp4"
    },
    {
        "name": "shot_mic",
        "image": "images/nyx-performance-mic.jpg",
        "prompt": "Alluring cyber-goth singer passionately belting into vintage chrome microphone, shower of sparks and heavy concert strobe lights flashing behind her, dense smoke, dark dramatic lighting, cinematic 24fps.",
        "output": "videos/shot_mic.mp4"
    },
    {
        "name": "shot_rain",
        "image": "images/nyx-wet-rain-seductive.jpg",
        "prompt": "Medium portrait of an edgy gothic woman leaning against graffiti metal door in heavy rain, water dripping down neck tattoos and clavicle, red lantern glow, slow sensual head turn and cold smirk into camera, cinematic 24fps.",
        "output": "videos/shot_rain.mp4"
    },
    {
        "name": "shot_bunker",
        "image": "images/nyx-bunker-crate-seated.jpg",
        "prompt": "Dominant cyber-goth woman sitting on industrial metal crate between glowing amber and red neon light pillars, one combat boot propped up, chin resting on hand, slow arrogant smirk and subtle nod, cinematic 24fps.",
        "output": "videos/shot_bunker.mp4"
    }
]

def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def submit_task(shot):
    print(f"[*] Submitting {shot['name']} ({shot['image']})...", flush=True)
    img_b64 = image_to_base64(shot["image"])
    payload = {
        "model_name": "kling-v1",
        "mode": "std",
        "image": img_b64,
        "prompt": shot["prompt"],
        "duration": "5",
        "cfg_scale": 0.5
    }
    req = urllib.request.Request(
        f"{BASE_URL}/v1/videos/image2video",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
    )
    res = urllib.request.urlopen(req, timeout=30)
    data = json.loads(res.read().decode("utf-8"))
    task_id = data["data"]["task_id"]
    print(f"    [+] Submitted! Task ID: {task_id}", flush=True)
    return task_id

def poll_and_download(tasks):
    remaining = dict(tasks) # task_id -> shot
    completed = {}
    print(f"\n[*] Polling {len(remaining)} tasks until complete...", flush=True)
    
    while remaining:
        for task_id, shot in list(remaining.items()):
            req = urllib.request.Request(
                f"{BASE_URL}/v1/videos/image2video/{task_id}",
                headers={"Authorization": f"Bearer {API_KEY}"}
            )
            try:
                res = urllib.request.urlopen(req, timeout=15)
                data = json.loads(res.read().decode("utf-8"))
                status = data.get("data", {}).get("task_status")
                print(f"    [{shot['name']}] Status: {status}", flush=True)
                if status == "succeed":
                    video_url = data["data"]["task_result"]["videos"][0]["url"]
                    print(f"    [✓] {shot['name']} finished! Downloading...", flush=True)
                    urllib.request.urlretrieve(video_url, shot["output"])
                    print(f"    [✓] Saved to {shot['output']}", flush=True)
                    completed[shot["name"]] = shot["output"]
                    del remaining[task_id]
                elif status in ["failed", "canceled"]:
                    print(f"    [-] {shot['name']} failed: {data['data'].get('task_status_msg')}", flush=True)
                    del remaining[task_id]
            except Exception as e:
                print(f"    [!] Error polling {shot['name']}: {e}", flush=True)
        if remaining:
            time.sleep(15)
    return completed

if __name__ == "__main__":
    submitted = {}
    for shot in shots:
        task_id = submit_task(shot)
        submitted[task_id] = shot
        time.sleep(2) # brief pause between submissions
    
    results = poll_and_download(submitted)
    print("\n[✓] ALL SHOTS PROCESSED:", results, flush=True)
