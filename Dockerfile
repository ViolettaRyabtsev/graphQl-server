FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 3060

COPY . .

CMD [ "node", "server.js" ]

