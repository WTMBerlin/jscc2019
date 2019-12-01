FROM node:12

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY models/ ./models/
COPY routes/ ./routes/
COPY services/ ./services/
COPY views/ ./views/
COPY app.js index.js mongo-connection.js ./

EXPOSE 3000

CMD [ "node", "/app/index.js" ]
