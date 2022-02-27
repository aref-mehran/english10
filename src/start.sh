#!/bin/bash
cd /home
mkdir ./projects
cd projects
git clone --depth=1  https://github.com/aref-mehran/english10.git
serve -p 3000 .
