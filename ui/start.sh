#!/bin/bash
docker build . -t pipeliner-ui
docker run -d -e PIPELINER_UI_PORT=2222 -p 2222:2222 pipeliner-ui