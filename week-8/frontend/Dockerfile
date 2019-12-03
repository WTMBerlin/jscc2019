FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./ /app/

CMD [ "npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "$PORT" ]
