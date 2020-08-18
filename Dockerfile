FROM node:alpine

WORKDIR /app
COPY node_modules/ node_modules/
COPY .next/ .next/
COPY .env.local .env.local
COPY package.json package.json

#COPY server.js ./
#EXPOSE 2022
EXPOSE 3000
CMD npm run start