#!/bin/bash
docker build . -t pipeliner-db
docker run -d -e POSTGRES_USER=pipeliner -e POSTGRES_PASSWORD=pipeliner -p 5432:5432 pipeliner-db
npm run migrate