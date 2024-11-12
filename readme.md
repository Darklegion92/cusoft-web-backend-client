# Dealers Management System Client

## Descripción

Sistema backend para la gestión de dealers y compañías, desarrollado con NestJS, MySQL, y Docker. El sistema proporciona una API RESTful con autenticación JWT, manejo de roles, y documentación Swagger.

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Desarrollo](#desarrollo)
- [Producción](#producción)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Seguridad](#seguridad)
- [Docker](#docker)

## Tecnologías

- Node.js 18+
- NestJS 10
- MySQL 8.0.30
- TypeORM
- JWT para autenticación
- Docker & Docker Compose
- Nginx
- Jest para testing

## Arquitectura

### Capas de la Aplicación

1. **Controllers**: Manejo de requests HTTP
2. **Services**: Lógica de negocio
3. **Repositories**: Interacción con la base de datos
4. **Entities**: Modelos de datos
5. **DTOs**: Objetos de transferencia de datos
6. **Guards**: Protección de rutas y autorización
7. **Decorators**: Metadatos y utilidades
8. **Pipes**: Validación y transformación de datos

### Módulos Principales

1. **Auth**: Gestión de compañías

## Estructura del Proyecto

src/
├── config/
│ ├── configuration.ts
│ ├── database.config.ts
│ └── swagger.config.ts
├── core/
│ ├── decorators/
│ ├── guards/
│ ├── interfaces/
│ └── constants/
├── modules/
│ ├── dealers/
│ ├── companies/
│ └── catalog/
├── shared/
│ ├── middlewares/
│ └── pipes/
├── app.module.ts
└── main.ts

docker/
├── development/
│ ├── Dockerfile
│ ├── docker-compose.yml
│ └── .env.development
└── production/
├── Dockerfile
├── docker-compose.yml
├── nginx/
└── .env.production

## Requisitos

- Node.js 18 o superior
- Docker y Docker Compose
- Git

## Instalación

1. Clonar el repositorio:

```bash
git clone [url-repositorio]
cd dealers-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

## Configuración

### Variables de Entorno

El proyecto utiliza diferentes archivos .env para desarrollo y producción:

#### Desarrollo (.env.development)

```env
NODE_ENV=development
PORT=3000
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USERNAME=dealer_user
DATABASE_PASSWORD=root
DATABASE_NAME=dealers_db
JWT_SECRET=dev_secret_key
JWT_EXPIRES_IN=15m
```

#### Producción (.env.production)

```env
NODE_ENV=production
PORT=3000
DATABASE_HOST=db
DATABASE_PORT=3306
DATABASE_USERNAME=dealer_user
DATABASE_PASSWORD=secure_password
DATABASE_NAME=dealers_db
JWT_SECRET=secure_secret_key
JWT_EXPIRES_IN=15m
```

## Desarrollo

### Iniciar en Modo Desarrollo

1. Levantar contenedores de desarrollo:

```bash
cd docker/development
docker-compose up -d
```

2. Ver logs:

```bash
docker-compose logs -f app
```

### Debugging

El proyecto está configurado para debugging con VS Code. Configuración del launch.json:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug NestJS",
      "port": 9229,
      "restart": true,
      "sourceMaps": true,
      "remoteRoot": "/usr/src/app"
    }
  ]
}
```

## Producción

### Despliegue en Producción

1. Configurar variables de entorno:

```bash
cd docker/production
cp .env.production.example .env.production
```

2. Generar certificados SSL:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/server.key \
  -out nginx/ssl/server.crt
```

3. Levantar servicios:

```bash
docker-compose up -d
```

### Estructura de Producción

```
docker/production/
├── docker-compose.yml
├── Dockerfile
├── .env.production
├── nginx/
│   ├── conf.d/
│   ├── ssl/
│   └── logs/
└── mysql/
    ├── init/
    └── conf/
```

## Testing

### Ejecutar Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Cobertura de Código

El proyecto requiere una cobertura mínima del 90% en:

- Branches
- Functions
- Lines
- Statements

## API Documentation

### Swagger

La documentación de la API está disponible en:

- Desarrollo: http://localhost:3000/api/docs
- Producción: https://[your-domain]/api/docs

### Endpoints Principales

#### Auth

- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/auth/profile

#### Dealers

- POST /api/dealers
- GET /api/dealers
- GET /api/dealers/:id
- PATCH /api/dealers/:id

#### Companies

- POST /api/companies
- GET /api/companies
- GET /api/companies/:id
- PATCH /api/companies/:id

#### Catalog

- GET /api/catalog/type-document-identifications
- GET /api/catalog/type-organizations
- GET /api/catalog/type-regimes
- GET /api/catalog/type-liabilities
- GET /api/catalog/municipalities

## Seguridad

### Características de Seguridad

1. Autenticación JWT con refresh tokens
2. Roles y permisos (ADMIN, DEALER)
3. Rate limiting
4. Encriptación de contraseñas con bcrypt
5. Headers de seguridad con Helmet
6. CORS configurado
7. Protección contra ataques comunes

### Mejores Prácticas

- Variables de entorno seguras
- Usuarios no root en Docker
- Certificados SSL/TLS
- Validación de datos con class-validator
- Sanitización de entradas

## Docker

### Desarrollo

```bash
cd docker/development
docker-compose up -d
```

### Producción

```bash
cd docker/production
docker-compose up -d
```

### Servicios Disponibles

#### Desarrollo

- API: http://localhost:3000
- Adminer: http://localhost:8080
- MySQL: localhost:3306
- Redis: localhost:6379
- MailHog: http://localhost:8025

#### Producción

- API: https://[your-domain]
- MySQL: No expuesto externamente
- Nginx: Puertos 80/443

### Comandos Útiles

```bash
# Ver logs
docker-compose logs -f [service]

# Reiniciar servicio
docker-compose restart [service]

# Ver estado de servicios
docker-compose ps

# Ejecutar comandos en contenedor
docker-compose exec [service] [command]
```

## Mantenimiento

### Backups

Los backups de la base de datos se pueden realizar con:

```bash
docker-compose exec db mysqldump -u root -p dealers_db > backup.sql
```

### Logs

Los logs se encuentran en:

- Nginx: /var/log/nginx/
- API: Docker logs
- MySQL: /var/log/mysql/

### Monitoreo

Se recomienda implementar:

- Prometheus para métricas
- Grafana para visualización
- Alertmanager para alertas

## Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## License

[MIT License](LICENSE)
