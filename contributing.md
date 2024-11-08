# Contributing to Dealers Management System

## Código de Conducta
Este proyecto y todos sus participantes están bajo el [Código de Conducta](CODE_OF_CONDUCT.md). 

## Proceso de Desarrollo

### 1. Branching Strategy
- `main`: Rama principal, solo para producción
- `develop`: Rama de desarrollo
- `feature/*`: Nuevas características
- `bugfix/*`: Corrección de bugs
- `hotfix/*`: Correcciones urgentes para producción

### 2. Commits
Usar commits semánticos:
```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: añadir o modificar tests
chore: cambios en build o herramientas
```

### 3. Pull Requests
- Crear desde feature branch a develop
- Incluir descripción detallada
- Referenciar issues relacionados
- Asegurar que pasan todos los tests
- Code review requerido

### 4. Testing
- Mantener cobertura >90%
- Incluir tests unitarios y e2e
- Tests deben pasar antes de PR

## Setup del Ambiente de Desarrollo

1. Herramientas Necesarias
- Node.js 18+
- Docker & Docker Compose
- VS Code (recomendado)
- Git

2. Extensiones VS Code Recomendadas
- ESLint
- Prettier
- Docker
- REST Client
- Jest Runner

3. Configuración Inicial
```bash
git clone [repo]
cd dealers-backend
npm install
cp .env.example .env
```

## Estándares de Código

### TypeScript
- Usar tipos estrictos
- No usar `any`
- Documentar interfaces y tipos

### NestJS
- Seguir arquitectura por módulos
- Usar DTO para validación
- Implementar interfaces

### Testing
- Tests unitarios para servicios
- Tests e2e para endpoints
- Usar factory patterns

## Documentación
- Documentar nuevos endpoints en Swagger
- Actualizar README.md
- Incluir cambios en CHANGELOG.md

## Reportar Issues
1. Usar template de issues
2. Incluir pasos para reproducir
3. Adjuntar logs relevantes
4. Especificar versiones

## Seguridad
- Reportar vulnerabilidades en privado
- No commitear secretos
- Seguir mejores prácticas OWASP

## Licencia
Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto.
