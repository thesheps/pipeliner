#!/bin/bash
docker build . -t pipeliner-ui
docker run -d --env-file=.env -p 2222:2222 pipeliner-ui