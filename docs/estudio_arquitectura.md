# Contenido de Estudio: Arquitectura de Software, TypeScript y Microservicios

## 1. Patrón Hexagonal (Ports and Adapters)
Este patrón aísla la lógica de negocio pura (el Núcleo) del mundo exterior (tecnologías como Express, Kafka o Bases de Datos).

### Estructura de Carpetas Propuesta:
```text
src/
├── domain/                      # Modelos y reglas de negocio puras (TypeScript puro)
│   └── usuario.model.ts
├── ports/                       # Interfaces de TypeScript (Contratos)
│   ├── in/                      # Puertos de Entrada (Qué se puede solicitar)
│   └── out/                     # Puertos de Salida (Qué necesita el negocio del exterior)
│       └── token-repository.port.ts
├── adapters/                    # Código tecnológico e infraestructura real
│   ├── in/                      # Adaptadores de entrada (Express, Consumidores Kafka)
│   │   └── web/
│   │       └── token.controller.ts
│   └── out/                     # Adaptadores de salida (Tu librería JSON, Clientes SQL)
│       └── json-db.adapter.ts
```

---

## 2. Configuración Profesional de la Librería Corporativa

### package.json (Librería)
```json
{
  "name": "@balda/json-db-service",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### tsconfig.json (Librería)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

---

## 3. Integración en el Proyecto Consumidor (Microservicio de Tokens)

### Instalación vía Git (package.json del Consumidor):
```json
"dependencies": {
  "@balda/json-db-service": "git+https://github.com",
  "express": "^4.19.2"
}
```

### El Flujo de Datos en Capas Avanzado:
1. **Router:** Define estrictamente los endpoints e interactúa únicamente con URLs y verbos HTTP (`GET`, `POST`).
2. **Controller:** Gestiona el protocolo HTTP. Recibe `req`, valida la estructura inicial de los parámetros y despacha el `res`. No calcula lógica.
3. **Service:** Es el cerebro del módulo. Ejecuta las reglas de negocio de la empresa sobre datos limpios. Consume la capa de datos/librería para persistir.