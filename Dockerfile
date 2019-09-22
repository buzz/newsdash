FROM node:alpine as build
LABEL maintainer="buzz <buzz@users.noreply.github.com>"

WORKDIR /newsdash
COPY . .
RUN set -xe && \
  yarn install \
    --non-interactive \
    --pure-lockfile && \
  yarn build

FROM node:alpine
WORKDIR /newsdash
COPY --from=build /newsdash/package.json .
COPY --from=build /newsdash/packages/client/dist ./packages/client/dist
COPY --from=build /newsdash/packages/server/package.json ./packages/server/
COPY --from=build /newsdash/packages/server/dist ./packages/server/dist
RUN set -xe && \
  addgroup -S newsdash && \
  adduser -S -g newsdash newsdash && \
  mkdir client && \
  yarn add \
    --cwd packages/server \
    --no-lockfile \
    pm2 && \
  yarn install \
    --cwd packages/server \
    --no-lockfile \
    --non-interactive \
    --production=true && \
  rm -r $(yarn cache dir)

ENV REDIS_URL redis://redis:6379
EXPOSE 3001
VOLUME /newsdash/client

CMD ["/bin/sh", "-c", "cp -R packages/client/dist/* client/ && su - newsdash -s /bin/sh -c \"NODE_ENV=production REDIS_URL=${REDIS_URL} /newsdash/packages/server/node_modules/.bin/pm2-runtime start --name newsdash -- /newsdash/packages/server/dist/server.js\""]
