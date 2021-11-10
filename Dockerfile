FROM node:16-alpine

ENV NODE_ENV production

RUN addgroup -g 1069 user \
    && adduser -u 1069 -G user -s /bin/sh -D user 

WORKDIR /app
COPY package.json .
COPY .next/ .next/
COPY .env .
COPY .env.local .
COPY next.config.js .
COPY public/ public/
COPY node_modules/ node_modules/

RUN chown user:user -R .next
USER user

EXPOSE 3000
CMD npm run start