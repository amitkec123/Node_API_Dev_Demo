FROM node:10

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
