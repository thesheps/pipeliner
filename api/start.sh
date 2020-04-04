#!/bin/bash
docker build . -t pipeliner-api
docker run -d --env-file=.env -p 3333:3333 pipeliner-api