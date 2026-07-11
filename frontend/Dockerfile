# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig*.json vite.config.ts ./
COPY src ./src
COPY public ./public
RUN npm ci
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
# Optional: add nginx config for SPA routing if you need it
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]