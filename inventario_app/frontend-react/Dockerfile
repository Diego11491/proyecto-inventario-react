# Etapa 1: construir la app con Vite
FROM node:20 AS build

WORKDIR /app

# Copiar .env PRIMERO para que Vite lo vea al instalar y compilar
COPY .env .env

# Copiar package files primero
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar archivos de configuración
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY vite.config.ts ./
COPY tsconfig.json ./

# Copiar el resto del código fuente
COPY . .

# Build (Vite usará variables .env)
RUN npm run build

# Etapa 2: servir con NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
