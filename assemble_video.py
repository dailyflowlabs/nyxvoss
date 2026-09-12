import os
import subprocess

cuts = [
    {"file": "videos/clip1_closeup_intro.mp4", "start": 0.0, "duration": 4.5},
    {"file": "videos/shot_strut.mp4", "start": 0.0, "duration": 4.0},
    {"file": "videos/shot_rain.mp4", "start": 0.0, "duration": 3.5},
    {"file": "videos/clip2_jacket_verse.mp4", "start": 0.0, "duration": 4.0},
    {"file": "videos/test_api_clip.mp4", "start": 0.0, "duration": 3.0},
    {"file": "videos/clip3_intense_prechorus.mp4", "start": 1.0, "duration": 3.5},
    {"file": "videos/shot_mic.mp4", "start": 0.0, "duration": 4.0},
    {"file": "videos/shot_strut.mp4", "start": 1.0, "duration": 3.5},
    {"file": "videos/shot_mic.mp4", "start": 1.5, "duration": 3.5},
    {"file": "videos/shot_bunker.mp4", "start": 0.0, "duration": 3.5},
    {"file": "videos/clip2_jacket_verse.mp4", "start": 1.5, "duration": 3.5},
    {"file": "videos/shot_rain.mp4", "start": 1.5, "duration": 3.5},
    {"file": "videos/shot_bunker.mp4", "start": 1.5, "duration": 3.0},
    {"file": "videos/clip3_intense_prechorus.mp4", "start": 2.0, "duration": 3.0},
    {"file": "videos/shot_mic.mp4", "start": 0.5, "duration": 4.5},
    {"file": "videos/shot_strut.mp4", "start": 0.5, "duration": 4.0},
    {"file": "videos/shot_rain.mp4", "start": 1.0, "duration": 3.5},
    {"file": "videos/clip1_closeup_intro.mp4", "start": 1.0, "duration": 3.0}
]

def build_music_video(output_path="videos/nyx_voss_dont_look_soft_65s.mp4"):
    # Check all files exist
    for c in cuts:
        if not os.path.exists(c["file"]):
            print(f"[-] Missing input file: {c['file']}")
            return False

    # Extract & normalize each cut to 1080x1920 30fps
    temp_cuts = []
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

    # Write concat list
    concat_list_file = "videos/concat_list.txt"
    with open(concat_list_file, "w") as f:
        for tc in temp_cuts:
            f.write(f"file '{os.path.abspath(tc)}'\n")

    # Merge video and attach master audio (trimmed to 65s)
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

    # Cleanup temp cuts
    for tc in temp_cuts:
        if os.path.exists(tc):
            os.remove(tc)
    if os.path.exists(concat_list_file):
        os.remove(concat_list_file)
    return True

if __name__ == "__main__":
    build_music_video()
