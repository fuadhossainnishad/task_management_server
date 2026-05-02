# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: production
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

CMD ["node","dist/main"]