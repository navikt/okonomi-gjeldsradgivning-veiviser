FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /app
COPY package.json .
COPY .next/ .next/
COPY .env .
COPY .env.local .
COPY next.config.js .
COPY public/ public/
COPY node_modules/ node_modules/

EXPOSE 3000
CMD npm run start