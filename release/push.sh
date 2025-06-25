#!/bin/bash

# Move to root of repo from release/
cd ..

# Extract commit message from release.json
COMMIT_MSG=$(jq -r '.commit_msg' release/release.json)

# Exit if no commit message provided
if [ -z "$COMMIT_MSG" ] || [ "$COMMIT_MSG" == "null" ]; then
  echo "No commit message found in release.json"
  exit 1
fi

# Add all changes, commit, and push
git add .
git commit -m "$COMMIT_MSG"
git push