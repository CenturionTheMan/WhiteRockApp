# ── base: shared node deps ────────────────────────────────────────────────────
FROM node:22-alpine AS base
WORKDIR /src/app
COPY package*.json ./
RUN npm ci

# ── dev: Vite dev server with HMR ────────────────────────────────────────────
FROM base AS dev
EXPOSE 5713
CMD ["npm", "run", "dev", "--", "--port=5713", "--host=0.0.0.0"]

# ── build: compile static assets ─────────────────────────────────────────────
FROM base AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY . .
RUN npm run build

# ── prod: serve with nginx, no Node at runtime ────────────────────────────────
FROM nginx:1.27-alpine AS prod
COPY --from=build /src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]