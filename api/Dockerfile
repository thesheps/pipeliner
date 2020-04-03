FROM node:13-alpine

WORKDIR /usr/pipeliner-api
COPY package*.json ./
COPY . .
RUN npm install ts-node -g
RUN npm install
EXPOSE $PIPELINER_API_PORT
CMD [ "ts-node", "./src/server.ts" ]