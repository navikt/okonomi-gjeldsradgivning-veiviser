FROM node:14-alpine

COPY --from=redboxoss/scuttle:latest /scuttle /bin/scuttle
ENV ENVOY_ADMIN_API=http://127.0.0.1:15000
ENV ISTIO_QUIT_API=http://127.0.0.1:15020

ENV NODE_ENV production

WORKDIR /app
COPY package.json .
COPY .next/ .next/
COPY .env .
COPY .env.local .
COPY next.config.js .
COPY node_modules/ node_modules/

EXPOSE 3000
ENTRYPOINT ["scuttle", "npm", "start"]