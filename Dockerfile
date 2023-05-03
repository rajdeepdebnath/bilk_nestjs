FROM node:18-alpine

WORKDIR /_blik

COPY package*.json .

RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm ci

COPY . .

