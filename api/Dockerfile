FROM node:12.14.1-slim
RUN apt-get -qy update && apt-get -qy install openssl

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN yarn install

CMD [ "yarn", "dev" ]