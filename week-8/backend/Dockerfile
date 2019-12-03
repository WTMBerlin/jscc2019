FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY ./ /app/

EXPOSE 3000

CMD [ "node", "/app/index.js" ]
