FROM node:lts

WORKDIR /app
COPY ./src ./src
COPY ./pm2.yaml ./pm2.yaml
COPY ./tsconfig.json ./tsconfig.json
COPY ./package*.json ./
RUN npm i
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD npm start
