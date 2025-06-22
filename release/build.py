#!/usr/bin/env python3
import os
import shutil
import json
import zipfile
from pathlib import Path

# Define paths
release_dir = Path(__file__).resolve().parent
project_root = release_dir.parent
frontend_dir = project_root / "frontend"
frontend_src = frontend_dir / "src"
backend_dir = project_root / "backend"
build_output = frontend_dir / "build"
release_out = release_dir / "ldapview"
env_file = release_dir / ".env"
start_script = release_dir / "start.sh"
config_src = release_dir / "config.ts"
config_backup = frontend_src / "config.ts.backup"
config_target = frontend_src / "config.ts"
release_config_path = release_dir / "release.json"

with open(release_config_path) as f:
    release_config = json.load(f)
version = release_config.get("version", "0.0.0")

release_zip_path = release_dir / f"ldapview-{version}.zip"

# Clean up previous release
if release_out.exists():
    shutil.rmtree(release_out)
if release_zip_path.exists():
    release_zip_path.unlink()

# Backup and replace config.ts
os.chdir(frontend_src)
if config_target.exists():
    shutil.move(config_target, config_backup)
shutil.copy(config_src, config_target)

# Run build
os.chdir(frontend_dir)
os.system("npm run build")

# Restore config.ts
os.remove(config_target)
shutil.move(config_backup, config_target)

# Create release folders
os.chdir(release_dir)
(release_out / "frontend").mkdir(parents=True, exist_ok=True)

# Copy build
shutil.copytree(build_output, release_out / "frontend" / "build", dirs_exist_ok=True)

# Copy backend (excluding .gitignore)
def read_gitignore(path):
    ignore_list = []
    if path.exists():
        with open(path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    ignore_list.append(line)
    return ignore_list

def ignore_patterns(path, names):
    ignore = read_gitignore(project_root / ".gitignore")
    return [n for n in names if any(Path(path, n).match(p) for p in ignore)]

shutil.copytree(backend_dir, release_out / "backend", ignore=ignore_patterns, dirs_exist_ok=True)

# Copy .env into backend
shutil.copy(env_file, release_out / "backend" / ".env")

# Copy start.sh
shutil.copy(start_script, release_out / "start.sh")

# Zip the whole release
with zipfile.ZipFile(release_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for foldername, subfolders, filenames in os.walk(release_out):
        for filename in filenames:
            filepath = Path(foldername) / filename
            arcname = filepath.relative_to(release_dir)
            zipf.write(filepath, arcname)

# Clean up release directory
shutil.rmtree(release_out)

print("Release package created:", release_zip_path)