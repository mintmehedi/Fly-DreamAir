#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -d .venv ]]; then
  uv venv .venv
fi

uv sync --extra dev
.venv/bin/livereload -p 8000 -w 1 .
