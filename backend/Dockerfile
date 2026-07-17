FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY server.ts ./
COPY src ./src

RUN npm ci
RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]