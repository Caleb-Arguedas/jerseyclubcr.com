# Jersey Club CR - Backend

API REST profesional para tienda online de camisetas de fútbol.

## Tecnologías
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT Authentication
- bcryptjs

## Setup

### 1. Crear archivo .env

```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jerseyclubcr
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### 2. Instalar dependencias

```bash
cd apps/backend
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## APIs

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `GET /api/products/search/query?q=term` - Buscar productos
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login

### Órdenes
- `POST /api/orders` - Crear orden
- `GET /api/orders/:id` - Obtener orden
