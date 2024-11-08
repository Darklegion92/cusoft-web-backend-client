# ---- Base Node ----
  FROM node:18-alpine AS base
  WORKDIR /app
  # Añadir Tini para manejar señales y procesos
  RUN apk add --no-cache tini
  # Añadir usuario no root por seguridad
  RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
  
  # ---- Dependencies ----
  FROM base AS dependencies
  # Instalar dependencias del sistema necesarias para compilación
  RUN apk add --no-cache python3 make g++
  # Copiar archivos de dependencias
  COPY package*.json ./
  # Instalar dependencias de producción y desarrollo
  RUN npm ci
  # Copiar el código fuente
  COPY . .
  # Ejecutar el build
  RUN npm run build
  
  # ---- Production Dependencies ----
  FROM base AS production-deps
  COPY package*.json ./
  # Instalar solo las dependencias de producción
  RUN npm ci --only=production
  
  # ---- Release ----
  FROM base AS release
  # Copiar Tini
  COPY --from=base /sbin/tini /sbin/tini
  # Copiar usuario no root
  COPY --from=base /etc/passwd /etc/passwd
  # Establecer directorio de trabajo
  WORKDIR /app
  # Copiar dependencias de producción
  COPY --from=production-deps /app/node_modules ./node_modules
  # Copiar archivos de build
  COPY --from=dependencies /app/dist ./dist
  # Copiar archivos necesarios para la ejecución
  COPY package.json ./
  COPY .env.production ./.env
  
  # Configurar variables de entorno para producción
  ENV NODE_ENV=production \
      PORT=3000 \
      # Otras variables de entorno pueden ser añadidas aquí o proporcionadas en tiempo de ejecución
  
  # Cambiar al usuario no root
  USER nestjs
  
  # Exponer el puerto
  EXPOSE 3000
  
  # Usar Tini como entry point
  ENTRYPOINT ["/sbin/tini", "--"]
  # Comando para ejecutar la aplicación
  CMD ["node", "dist/main"]
  
  # Healthcheck para verificar que la aplicación está funcionando
  HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
      CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1