import os
import subprocess

cuts = [
    # 0:00 - 0:04.5 [Intro Whisper: "Don't look soft"]
    {"file": "videos/lipsync_intro.mp4", "start": 0.0, "duration": 4.5},
    
    # 0:04.5 - 0:08.5 [Verse 1: Beat drop / Catwalk strut]
    {"file": "videos/shot_strut.mp4", "start": 0.0, "duration": 4.0},
    
    # 0:08.5 - 0:12.0 [Verse 1: "Pretty face, bad intent"]
    {"file": "videos/shot_rain.mp4", "start": 0.0, "duration": 3.5},
    
    # 0:12.0 - 0:16.0 [Verse 1: "Room goes quiet"]
    {"file": "videos/clip2_jacket_verse.mp4", "start": 0.0, "duration": 4.0},
    
    # 0:16.0 - 0:22.0 [Pre-Chorus Lip-Sync: "Smile like a warning / Come closer / Then don't"]
    {"file": "videos/lipsync_prechorus.mp4", "start": 0.0, "duration": 6.0},
    
    # 0:22.0 - 0:26.5 [Chorus 1 Belted Lip-Sync: "Stay down / I don't do gentle"]
    {"file": "videos/lipsync_chorus.mp4", "start": 0.0, "duration": 4.5},
    
    # 0:26.5 - 0:30.0 [Chorus 1: "Stay down / I don't do friends"]
    {"file": "videos/shot_strut.mp4", "start": 1.0, "duration": 3.5},
    
    # 0:30.0 - 0:33.5 [Chorus 1 Lip-Sync: "If you came here looking for soft"]
    {"file": "videos/lipsync_chorus.mp4", "start": 1.0, "duration": 3.5},
    
    # 0:33.5 - 0:37.0 [Chorus 1: "Wrong girl again" - Seated Bunker Attitude]
    {"file": "videos/shot_bunker.mp4", "start": 0.0, "duration": 3.5},
    
    # 0:37.0 - 0:40.5 [Verse 2: "Black mouth, sharp teeth, camera flash"]
    {"file": "videos/clip2_jacket_verse.mp4", "start": 1.5, "duration": 3.5},
    
    # 0:40.5 - 0:44.0 [Verse 2: "You can take a picture / You can't take me home"]
    {"file": "videos/shot_rain.mp4", "start": 1.5, "duration": 3.5},
    
    # 0:44.0 - 0:49.5 [Pre-Chorus 2 Lip-Sync: "Smile like a warning... Then don't"]
    {"file": "videos/lipsync_prechorus.mp4", "start": 0.5, "duration": 5.5},
    
    # 0:49.5 - 0:54.5 [Chorus 2 Belted Lip-Sync: Full Stage Climax]
    {"file": "videos/lipsync_chorus.mp4", "start": 0.0, "duration": 5.0},
    
    # 0:54.5 - 0:58.5 [Chorus 2: Power Walk through Warehouse Smoke]
    {"file": "videos/shot_strut.mp4", "start": 0.5, "duration": 4.0},
    
    # 0:58.5 - 1:02.0 [Chorus 2: Sensual Rain Climax]
    {"file": "videos/shot_rain.mp4", "start": 0.5, "duration": 3.5},
    
    # 1:02.0 - 1:05.0 [Outro: Final Lip-Sync Glare & Smirk to Black]
    {"file": "videos/lipsync_intro.mp4", "start": 1.5, "duration": 3.0}
]

def build_music_video(output_path="videos/nyx_voss_dont_look_soft_65s.mp4"):
    for c in cuts:
        if not os.path.exists(c["file"]):
            print(f"[-] Missing input file: {c['file']}")
            return False

    temp_cuts = []
    print("[*] Slicing and scaling cuts to 1080x1920 30fps...", flush=True)
    for i, c in enumerate(cuts):
        temp_cut = f"videos/temp_cut_{i:02d}.mp4"
        cmd = [
            "ffmpeg", "-y",
            "-ss", str(c["start"]),
            "-i", c["file"],
            "-t", str(c["duration"]),
            "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1",
            "-c:v", "libx264", "-crf", "18", "-preset", "veryfast",
            "-an",
            temp_cut
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        temp_cuts.append(temp_cut)

    concat_list_file = "videos/concat_list.txt"
    with open(concat_list_file, "w") as f:
        for tc in temp_cuts:
            f.write(f"file '{os.path.abspath(tc)}'\n")

    audio_track = "music/Don't Look Soft.mp3"
    print("[*] Assembling final 65s master video with audio track...", flush=True)
    cmd_merge = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", concat_list_file,
        "-ss", "0", "-i", audio_track,
        "-t", "65.0",
        "-c:v", "libx264", "-crf", "17", "-preset", "fast", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "320k",
        "-af", "afade=t=out:st=63.5:d=1.5",
        output_path
    ]
    subprocess.run(cmd_merge, check=True)
    print(f"[✓] Final Master Video generated: {output_path} ({os.path.getsize(output_path)} bytes)", flush=True)

    for tc in temp_cuts:
        if os.path.exists(tc):
            os.remove(tc)
    if os.path.exists(concat_list_file):
        os.remove(concat_list_file)
    return True

if __name__ == "__main__":
    build_music_video()
