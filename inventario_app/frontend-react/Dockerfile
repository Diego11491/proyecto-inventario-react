# Etapa 1: construir la app con Vite
FROM node:20 AS build

WORKDIR /app

# Copiar package files primero (mejor para cache de Docker)
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar archivos de configuración necesarios para Tailwind
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY vite.config.ts ./
COPY tsconfig.json ./

# Copiar el resto del código fuente
COPY . .

# Build (ahora Tailwind debería procesarse correctamente)
RUN npm run build

# Etapa 2: servir con NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]