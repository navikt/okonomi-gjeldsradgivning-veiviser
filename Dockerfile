FROM navikt/node-express:12.2.0-alpine

WORKDIR /app
COPY out/ out/
COPY server.js ./
EXPOSE 2022