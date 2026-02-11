import os
import subprocess

def get_video_duration(file_path):
    try:
        result = subprocess.run(
            [
                "ffprobe",
                "-v", "error",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                file_path
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        return float(result.stdout.strip())
    except Exception as e:
        print(f"Erreur avec {file_path} : {e}")
        return 0


def get_total_duration(folder_path):
    total_seconds = 0
    video_extensions = (".mp4", ".avi", ".mkv", ".mov", ".flv", ".wmv", ".webm")

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(video_extensions):
                file_path = os.path.join(root, file)
                duration = get_video_duration(file_path)
                total_seconds += duration
                print(f"{file} : {int(duration)} secondes")

    return int(total_seconds)


def format_duration(seconds):
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    return f"{hours}h {minutes}m {secs}s"


if __name__ == "__main__":
    folder = input("Chemin du dossier : ")
    total = get_total_duration(folder)

    print("\nDurée totale :")
    print(f"{total} secondes")
    print(f"Soit : {format_duration(total)}")