FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY server.js server.js
COPY dist dist/

CMD ["node", "./server.js"]