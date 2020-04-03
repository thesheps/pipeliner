FROM node:13-alpine

WORKDIR /usr/pipeliner-ui
COPY package*.json ./
COPY . .
RUN npm install ts-node -g
RUN npm install
EXPOSE $PIPELINER_UI_PORT
CMD [ "ts-node", "./src/server.ts" ]