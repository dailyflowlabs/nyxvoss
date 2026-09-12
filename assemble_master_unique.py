import os
import subprocess

# 100% Unique, Non-Repeating Timeline (65 Seconds Total)
cuts = [
    # 0:00 - 0:05.0 [Intro Whisper: "Don't look soft"]
    # Unobstructed macro closeup with perfect whisper lip-sync
    {"file": "videos/lipsync_intro.mp4", "start": 0.0, "duration": 5.0, "desc": "Macro Whisper Intro"},
    
    # 0:05.0 - 0:11.0 [Verse 1a: Bass Kick - "Night like it owes me rent"]
    # Full-body Berlin runway catwalk strut with platform boots & harness
    {"file": "videos/shot_strut.mp4", "start": 0.0, "duration": 6.0, "desc": "Catwalk Runway Walk"},
    
    # 0:11.0 - 0:16.0 [Verse 1b: "Pretty face, bad intent... Room goes quiet"]
    # Seductive wet rain against corrugated door with red lantern glow
    {"file": "videos/shot_rain.mp4", "start": 0.0, "duration": 5.0, "desc": "Wet Rain Seductive"},
    
    # 0:16.0 - 0:22.0 [Pre-Chorus 1: "Smile like a warning / Come closer / Then don't"]
    # Unobstructed direct closeup with menacing pre-chorus lip-sync
    {"file": "videos/shot_prechorus_direct_lipsync.mp4", "start": 0.0, "duration": 6.0, "desc": "Pre-Chorus Direct Lip-Sync"},
    
    # 0:22.0 - 0:28.5 [Chorus 1 Drop: "Stay down / I don't do gentle"]
    # Stage belting with head back, sparks showering, mouth wide open singing
    {"file": "videos/shot_stage_belt_lipsync.mp4", "start": 0.0, "duration": 6.5, "desc": "Stage Belting Sparks Lip-Sync"},
    
    # 0:28.5 - 0:34.5 [Chorus 1 continuation: "Stay down / I don't do friends... Wrong girl again"]
    # Seated queen attitude on iron bunker crate between amber/red hazard lights
    {"file": "videos/shot_bunker.mp4", "start": 0.0, "duration": 6.0, "desc": "Seated Iron Bunker Queen"},
    
    # 0:34.5 - 0:41.5 [Verse 2: "Black mouth, sharp teeth, camera flash / I look expensive"]
    # Wall of flickering red CRT television screens with glitch scanlines
    {"file": "videos/shot_crt_glitch.mp4", "start": 0.0, "duration": 7.0, "desc": "CRT TV Glitch Screens"},
    
    # 0:41.5 - 0:47.0 [Verse 2 continuation: "You can take a picture / You can't take me home"]
    # Sharp undercut jawline side-profile tracking shot
    {"file": "videos/shot_side_profile.mp4", "start": 0.0, "duration": 5.5, "desc": "Side Profile Undercut Turn"},
    
    # 0:47.0 - 0:52.5 [Pre-Chorus 2: "Smile like a warning... Then don't"]
    # Alley warehouse head turn in oversized leather biker jacket
    {"file": "videos/clip2_jacket_verse.mp4", "start": 0.0, "duration": 5.5, "desc": "Warehouse Alley Turn"},
    
    # 0:52.5 - 0:59.0 [Chorus 2 Peak Climax: "Stay down / I don't do gentle / Wrong girl again"]
    # Full stage climax performance, sparks and strobe backlights
    {"file": "videos/shot_stage_belt_lipsync.mp4", "start": 0.5, "duration": 6.5, "desc": "Grand Stage Climax"},
    
    # 0:59.0 - 1:05.0 [Outro: Whispered "Don't look soft" & Slow Smirk into Black]
    # Macro strobe eye contact & slow confident smirk to fade out
    {"file": "videos/lipsync_intro.mp4", "start": 1.0, "duration": 6.0, "desc": "Final Outro Smirk"}
]

def build_unique_master(output_path="videos/nyx_voss_dont_look_soft_65s_master.mp4"):
    for c in cuts:
        if not os.path.exists(c["file"]):
            print(f"[-] Waiting for: {c['file']}")
            return False

    temp_cuts = []
    print("[*] Slicing and conforming cuts to 1080x1920 30fps...", flush=True)
    for i, c in enumerate(cuts):
        temp_cut = f"videos/unique_cut_{i:02d}.mp4"
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

    concat_list = "videos/unique_concat_list.txt"
    with open(concat_list, "w") as f:
        for tc in temp_cuts:
            f.write(f"file '{os.path.abspath(tc)}'\n")

    audio_track = "music/Don't Look Soft.mp3"
    print("[*] Assembling 100% unique 65s master video with master audio...", flush=True)
    cmd_merge = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", concat_list,
        "-ss", "0", "-i", audio_track,
        "-t", "65.0",
        "-c:v", "libx264", "-crf", "17", "-preset", "fast", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "320k",
        "-af", "afade=t=out:st=63.5:d=1.5",
        output_path
    ]
    subprocess.run(cmd_merge, check=True)
    print(f"[✓] Final 100% Unique Master Video: {output_path} ({os.path.getsize(output_path)} bytes)", flush=True)

    for tc in temp_cuts:
        if os.path.exists(tc):
            os.remove(tc)
    if os.path.exists(concat_list):
        os.remove(concat_list)
    return True

if __name__ == "__main__":
    build_unique_master()
