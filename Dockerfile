FROM node:22-alpine3.18 AS base
LABEL maintainer="buzz <buzz@users.noreply.github.com>"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --filter @newsdash/common --filter @newsdash/server --prod  --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/common/node_modules /app/packages/common/node_modules
COPY --from=prod-deps /app/packages/server/node_modules /app/packages/server/node_modules
COPY --from=build /app/packages/client/dist /app/packages/client/dist
COPY --from=build /app/packages/common/dist /app/packages/common/dist
COPY --from=build /app/packages/server/dist /app/packages/server/dist
RUN set -xe && \
  addgroup -S newsdash && \
  adduser -S -g newsdash newsdash
EXPOSE 3000
VOLUME /client

CMD ["/bin/sh", "-c", "cp -R packages/client/dist/* /client && exec su - newsdash -s /bin/sh -c \"cd /app && NODE_ENV=production NEWSDASH_HOST=0.0.0.0 NEWSDASH_PORT=3000 REDIS_URL=${REDIS_URL} VIPS_CONCURRENCY=$(nproc) node packages/server/dist/startServer.js\""]
