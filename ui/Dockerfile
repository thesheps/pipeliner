FROM node:13-alpine

WORKDIR /usr/app
COPY package*.json ./
COPY . .
RUN npm install ts-node -g
RUN npm install
EXPOSE $PIPELINER_UI_PORT
CMD [ "npm", "run", "start" ]