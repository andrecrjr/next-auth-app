FROM node:18.18-buster-slim

WORKDIR /app

COPY package*.json ./
RUN yarn install && apt-get update -y && apt-get install -y openssl

COPY . ./

EXPOSE 3000

CMD [ "yarn", "dev" ]