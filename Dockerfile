FROM node:20-alpine as base
FROM base as builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY tsconfig.json ./
RUN yarn
COPY . .
RUN yarn build

FROM base
WORKDIR /app
COPY package.json yarn.lock ./
COPY tsconfig.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["yarn", "start:prod"]