FROM navikt/common:0.1 AS navikt-common
FROM node:14-alpine

COPY --from=navikt-common /init-scripts /init-scripts
COPY --from=navikt-common /entrypoint.sh /entrypoint.sh
COPY --from=navikt-common /dumb-init /dumb-init

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