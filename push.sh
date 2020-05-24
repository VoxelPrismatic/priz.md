#!/bin/bash
python3 min.py
git pull --ff
git add .
git commit --all
git push
