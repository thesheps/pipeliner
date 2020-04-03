#!/bin/bash
docker build . -t pipeliner-api
docker run -d -e PIPELINER_API_PORT=3333 -p 3333:3333 pipeliner-api