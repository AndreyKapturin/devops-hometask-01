# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm,sharing=locked npm ci
COPY ./ ./
RUN npm run build

FROM nginxinc/nginx-unprivileged AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
USER nginx
CMD ["nginx", "-g", "daemon off;"]
