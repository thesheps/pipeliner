#!/bin/bash
docker build . -t pipeliner-ui
docker run -d -e PIPELINER_UI_PORT=2222 PIPELINER_API_URL=http://localhost:3333 -p 2222:2222 pipeliner-ui