#!/bin/bash
docker-compose up -d
lerna bootstrap
lerna run --scope @pipeliner/db migrate