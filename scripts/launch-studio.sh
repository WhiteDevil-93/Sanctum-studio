#!/usr/bin/env bash
# =====================================================================
# Sanctum Studio - Linux / WSL Desktop Launcher
# Launches the background studio server and opens the browser/desktop window
# =====================================================================

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "Launching Sanctum Studio from $DIR..."

# Check if port 4180 is already active
if lsof -Pi :4180 -sTCP:LISTEN -t >/dev/null ; then
  echo "Sanctum Studio server is already running on port 4180."
else
  node bin/sanctum-studio.js &
  sleep 1
fi

URL="http://127.0.0.1:4180"

# Open in browser / desktop
if which xdg-open > /dev/null; then
  xdg-open "$URL" 2>/dev/null &
elif which wslview > /dev/null; then
  wslview "$URL" 2>/dev/null &
elif which cmd.exe > /dev/null; then
  cmd.exe /c start "$URL" 2>/dev/null &
fi

echo "Sanctum Studio ready at $URL"
