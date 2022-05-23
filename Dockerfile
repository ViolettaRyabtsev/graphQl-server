FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

RUN apk update && apk add bash

COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 3060

VOLUME ["./node_modules" ]

COPY . .

CMD [ "node", "server.js" ]

