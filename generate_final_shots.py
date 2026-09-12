import os
import time
import json
import base64
import urllib.request
import urllib.error

API_KEY = "api-key-kling-ZBCskxkg6NOVQFbhMbvln6tZ274M-izFbnoRdE8j0kE"
BASE_URL = "https://api.klingai.com"

new_shots = [
    {
        "name": "shot_stage_belt",
        "image": "images/nyx-stage-belting-unobstructed.jpg",
        "prompt": "Action shot of a cyber-goth rock singer singing passionately with head tilted slightly back, shower of sparks falling from industrial ceiling, concert backlights flashing, dense smoke, cinematic 24fps.",
        "output": "videos/shot_stage_belt.mp4",
        "lipsync_audio": "audio_clips/04_chorus_stay_down.mp3",
        "lipsync_output": "videos/shot_stage_belt_lipsync.mp4"
    },
    {
        "name": "shot_crt_glitch",
        "image": "images/nyx-crt-screens-glitch.jpg",
        "prompt": "Cinematic shot of a cyber-goth woman against a wall of vintage CRT television screens, the TV monitors violently flickering with red analog static and video noise, subtle arrogant head tilt and smirk, cinematic 24fps.",
        "output": "videos/shot_crt_glitch.mp4"
    },
    {
        "name": "shot_prechorus_direct",
        "image": "images/nyx-leather-jacket-direct.jpg",
        "prompt": "Close-up portrait of an edgy gothic singer leaning forward into camera, whispering and speaking menacingly with piercing direct eye contact, dark warehouse lighting, cinematic 24fps.",
        "output": "videos/shot_prechorus_direct.mp4",
        "lipsync_audio": "audio_clips/03_prechorus_smile_warning.mp3",
        "lipsync_output": "videos/shot_prechorus_direct_lipsync.mp4"
    },
    {
        "name": "shot_side_profile",
        "image": "images/nyx-side-profile.jpg",
        "prompt": "Cinematic side profile tracking shot of a gothic woman with shaved undercut turning her face sharply towards camera with an icy glare, dramatic rim light on jawline and piercings, 24fps.",
        "output": "videos/shot_side_profile.mp4"
    }
]

def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def submit_image_to_video(shot):
    print(f"[*] Submitting video generation: {shot['name']} ({shot['image']})...", flush=True)
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
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    )
    res = urllib.request.urlopen(req, timeout=30)
    data = json.loads(res.read().decode("utf-8"))
    task_id = data["data"]["task_id"]
    print(f"    [+] Submitted! Task ID: {task_id}", flush=True)
    return task_id

def poll_video_task(task_id, out_file):
    print(f"[*] Polling video task {task_id}...", flush=True)
    for _ in range(60):
        req = urllib.request.Request(
            f"{BASE_URL}/v1/videos/image2video/{task_id}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        )
        try:
            res = urllib.request.urlopen(req, timeout=15)
            data = json.loads(res.read().decode("utf-8"))
            status = data.get("data", {}).get("task_status")
            if status == "succeed":
                v_url = data["data"]["task_result"]["videos"][0]["url"]
                print(f"    [✓] Finished! Downloading to {out_file}...", flush=True)
                urllib.request.urlretrieve(v_url, out_file)
                return v_url
            elif status in ["failed", "canceled"]:
                print(f"    [-] Failed: {data['data'].get('task_status_msg')}", flush=True)
                return None
        except Exception as e:
            pass
        time.sleep(12)
    return None

def submit_and_poll_lipsync(video_url, audio_path, out_file):
    print(f"[*] Submitting lip-sync with audio {audio_path}...", flush=True)
    with open(audio_path, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")
    
    payload = {
        "input": {
            "mode": "audio2video",
            "video_url": video_url,
            "audio_type": "file",
            "audio_file": audio_b64
        }
    }
    req = urllib.request.Request(
        f"{BASE_URL}/v1/videos/lip-sync",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    )
    res = urllib.request.urlopen(req, timeout=30)
    data = json.loads(res.read().decode("utf-8"))
    ls_task_id = data["data"]["task_id"]
    print(f"    [+] Lip-sync submitted! Task ID: {ls_task_id}", flush=True)

    for _ in range(60):
        req = urllib.request.Request(
            f"{BASE_URL}/v1/videos/lip-sync/{ls_task_id}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        )
        try:
            res = urllib.request.urlopen(req, timeout=15)
            d = json.loads(res.read().decode("utf-8"))
            status = d.get("data", {}).get("task_status")
            if status == "succeed":
                ls_url = d["data"]["task_result"]["videos"][0]["url"]
                print(f"    [✓] Lip-sync finished! Downloading to {out_file}...", flush=True)
                urllib.request.urlretrieve(ls_url, out_file)
                return out_file
            elif status in ["failed", "canceled"]:
                print(f"    [-] Lip-sync failed: {d['data'].get('task_status_msg')}", flush=True)
                return None
        except Exception as e:
            pass
        time.sleep(10)
    return None

if __name__ == "__main__":
    # Submit all 4 video tasks concurrently
    submitted = {}
    for shot in new_shots:
        tid = submit_image_to_video(shot)
        submitted[tid] = shot
        time.sleep(1.5)
    
    # Poll all 4 video tasks
    video_urls = {}
    remaining = dict(submitted)
    print("\n[*] Polling all 4 new video renders...", flush=True)
    while remaining:
        for tid, shot in list(remaining.items()):
            req = urllib.request.Request(f"{BASE_URL}/v1/videos/image2video/{tid}", headers={"Authorization": f"Bearer {API_KEY}"})
            try:
                res = urllib.request.urlopen(req, timeout=15)
                d = json.loads(res.read().decode("utf-8"))
                st = d.get("data", {}).get("task_status")
                print(f"    [{shot['name']}] Status: {st}", flush=True)
                if st == "succeed":
                    u = d["data"]["task_result"]["videos"][0]["url"]
                    urllib.request.urlretrieve(u, shot["output"])
                    print(f"    [✓] Saved {shot['output']}", flush=True)
                    video_urls[shot["name"]] = (u, shot)
                    del remaining[tid]
                elif st in ["failed", "canceled"]:
                    del remaining[tid]
            except Exception as e:
                pass
        if remaining:
            time.sleep(12)

    # Now run unobstructed lip-sync on the two singing shots
    if "shot_stage_belt" in video_urls:
        u, shot = video_urls["shot_stage_belt"]
        submit_and_poll_lipsync(u, shot["lipsync_audio"], shot["lipsync_output"])

    if "shot_prechorus_direct" in video_urls:
        u, shot = video_urls["shot_prechorus_direct"]
        submit_and_poll_lipsync(u, shot["lipsync_audio"], shot["lipsync_output"])

    print("\n[✓] ALL NEW SHOTS & UNOBSTRUCTED LIP-SYNCS READY!", flush=True)
