# 📋 GUÍA COMPLETA - JERSEYCLUBCR.COM

## 🎯 Proyecto Creado Exitosamente

¡Tu tienda online profesional está lista para empezar! Aquí te presento la estructura completa:

---

## 📁 ESTRUCTURA DEL PROYECTO

```
jerseyclubcr.com/
├── apps/
│   ├── frontend/          # React/Next.js - Cliente web
│   └── backend/           # Node.js/Express - API REST
├── package.json           # Workspace principal
└── .gitignore
```

---

## 🚀 INICIO RÁPIDO

### 1️⃣ Backend (API)

```bash
cd apps/backend
cp .env.example .env
npm install
npm run dev
```

**URL:** `http://localhost:5000`

### 2️⃣ Frontend (Tienda Web)

```bash
cd apps/frontend
npm install
npm run dev
```

**URL:** `http://localhost:3000`

### 3️⃣ Panel Administrativo

**URL:** `http://localhost:3000/admin`

---

## 🗄️ BASE DE DATOS - PostgreSQL

### Instalación Rápida (Recomendado: DigitalOcean)

#### Opción 1: PostgreSQL Local

```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Linux (Ubuntu)
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Descargar desde https://www.postgresql.org/download/windows/
```

#### Opción 2: Docker (Más fácil)

```bash
docker run --name jerseyclubcr-db \
  -e POSTGRES_DB=jerseyclubcr \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15
```

#### Crear usuario y base de datos

```sql
CREATE DATABASE jerseyclubcr;
CREATE USER postgres WITH PASSWORD 'postgres';
ALTER ROLE postgres WITH SUPERUSER;
```

---

## 🔑 AUTENTICACIÓN ADMIN

### Login Inicial

**Email:** `admin@jerseyclubcr.com`
**Password:** `admin123456`

**⚠️ IMPORTANTE:** Cambia estas credenciales en producción.

---

## 📱 FUNCIONALIDADES IMPLEMENTADAS

### ✅ Frontend (Next.js)

- [x] **Página Principal (Hero)**
  - Animaciones profesionales
  - Botones CTA (Ver Catálogo, WhatsApp)
  - Fondo con video/imagen

- [x] **Categorías Interactivas**
  - Nacional
  - Mundial 2026
  - Player/Fan/Retro
  - Mujer/Niño
  - Abrigos
  - Animaciones al pasar el mouse

- [x] **Gestión del Carrito**
  - Estado global con Zustand
  - Persistencia en localStorage
  - Actualización de cantidad

- [x] **Header & Footer**
  - Menú responsivo
  - Búsqueda
  - Carrito con contador
  - Links a redes sociales

### ✅ Backend (Express)

- [x] **APIs REST Completas**
  ```
  GET    /api/products           # Todos los productos
  GET    /api/products/:id       # Producto específico
  GET    /api/products/search?q  # Búsqueda inteligente
  POST   /api/products           # Crear (Admin)
  PUT    /api/products/:id       # Actualizar (Admin)
  DELETE /api/products/:id       # Eliminar (Admin)
  
  POST   /api/auth/register      # Registro
  POST   /api/auth/login         # Login
  
  POST   /api/orders             # Crear orden
  GET    /api/orders/:id         # Ver orden
  ```

- [x] **Autenticación JWT**
  - Tokens seguros
  - Middleware de verificación
  - Permisos por rol (admin/user)

- [x] **Base de Datos PostgreSQL**
  - Tablas: users, products, orders, cart_items
  - Relaciones normalizadas
  - Índices para búsquedas rápidas

### ✅ Panel Administrativo

- [x] **Dashboard**
  - Estadísticas (productos, órdenes, ingresos)
  - Órdenes pendientes
  - Quick actions

- [x] **Gestión de Productos**
  - Tabla con búsqueda
  - Modal para agregar producto
  - Editar/Eliminar
  - Campos: nombre, precio, equipo, liga, país, jugador, imágenes, tallas, stock

- [x] **Gestión de Órdenes**
  - Tabla de órdenes
  - Estados (pending, completed, cancelled)
  - Información del cliente
  - Total y método de pago

---

## 🔄 PRÓXIMOS PASOS (FASE 2)

### 🌟 Características por Implementar

1. **Página de Productos Completa**
   - [ ] Galería de imágenes
   - [ ] Selector de talla
   - [ ] Cantidad
   - [ ] Agregar al carrito
   - [ ] Comprar por WhatsApp

2. **Buscador Inteligente**
   - [ ] Búsqueda por equipo
   - [ ] Búsqueda por liga
   - [ ] Búsqueda por país
   - [ ] Búsqueda por jugador
   - [ ] Filtros dinámicos

3. **Visualizador de Escudos** 🌍
   - [ ] LaLiga (España)
   - [ ] Premier (Inglaterra)
   - [ ] Serie A (Italia)
   - [ ] Bundesliga (Alemania)
   - [ ] Selecciones nacionales
   - [ ] Costa Rica (local)
   - [ ] Click en escudo → muestra productos

4. **Integración WhatsApp**
   - [ ] API WhatsApp Business
   - [ ] Mensaje automático del carrito
   - [ ] Formato elegante

5. **Guía de Tallas**
   - [ ] Pestañas Fan/Player
   - [ ] Tablas bonitas
   - [ ] Conversión de medidas

6. **Checkout**
   - [ ] Carrito visual
   - [ ] Métodos de pago (SINPE, Transferencia, Efectivo)
   - [ ] Información del cliente
   - [ ] Resumen del pedido

7. **Más Funcionalidades Admin**
   - [ ] 2FA (autenticación doble factor)
   - [ ] Editar productos
   - [ ] Subir imágenes a Cloudinary
   - [ ] Cambiar precio en bulk
   - [ ] Reportes y análisis

---

## 💳 MÉTODOS DE PAGO

```javascript
// Opciones configuradas
const paymentMethods = [
  { id: 'efectivo', icon: '💵', name: 'Efectivo' },
  { id: 'sinpe', icon: '📱', name: 'SINPE' },
  { id: 'transferencia', icon: '🏦', name: 'Transferencia' },
];
```

---

## 🎨 COLORES Y DISEÑO

```javascript
// Paleta de colores (Tailwind)
colors: {
  dark: '#0F172A',      // Negro elegante
  light: '#FFFFFF',     // Blanco
  gray: '#F5F5F5',      // Gris suave
  gold: '#FBBF24',      // Dorado (promociones)
  red: '#EF4444',       // Rojo (urgencia)
  whatsapp: '#22C55E',  // Verde WhatsApp
}

// Fuentes
fontFamily: {
  heading: 'Poppins',   // Títulos
  body: 'Inter',        // Texto
}
```

---

## 📞 CONFIGURACIÓN WHATSAPP

En `.env` del backend:

```
WHATSAPP_NUMBER=50687654321
```

Mensaje automático (formato):
```
Hola JerseyClubCR 👋
Quiero realizar este pedido:

• Barcelona 25/26 Player
  Talla M | Cantidad 1 | ₡25000

• Costa Rica Nacional
  Talla L | Cantidad 2 | ₡48000

Total: ₡73000

Método de pago: SINPE
```

---

## 🚢 DEPLOYMENT (Producción)

### Opción 1: DigitalOcean (Recomendado)

1. Crear App en DigitalOcean
2. Conectar repositorio GitHub
3. Deploy automático en `develop` o `main`

### Opción 2: AWS

1. Frontend: CloudFront + S3
2. Backend: EC2 o Elastic Beanstalk
3. DB: RDS PostgreSQL

### Variables de Producción

```bash
# Frontend
NEXT_PUBLIC_API_URL=https://api.jerseyclubcr.com
NEXT_PUBLIC_WHATSAPP_NUMBER=50687654321

# Backend
NODE_ENV=production
JWT_SECRET=your_very_secure_secret_key_here
DB_HOST=your-db-host.com
DB_NAME=jerseyclubcr_prod
FRONTEND_URL=https://jerseyclubcr.com
```

---

## 🔐 SEGURIDAD

✅ Implementado:
- JWT Authentication
- Password Hashing (bcryptjs)
- CORS Configuration
- Request Validation
- SQL Injection Prevention (Prepared Statements)

⏳ Por Implementar:
- 2FA (Autenticación Doble Factor)
- Rate Limiting
- HTTPS/SSL
- Helmet.js
- Environment Variable Validation

---

## 📊 ESTADÍSTICAS Y ANÁLISIS

Endpoint disponible:

```
GET /api/admin/stats

Respuesta:
{
  "totalProducts": 150,
  "totalOrders": 1250,
  "totalRevenue": 15000000,
  "pendingOrders": 12,
  "monthlyRevenue": [...]
}
```

---

## 🐛 TROUBLESHOOTING

### Error: "Cannot connect to database"

```bash
# Verificar PostgreSQL
sudo systemctl status postgresql

# O con Docker
docker ps | grep jerseyclubcr-db
```

### Error: "Port 3000/5000 already in use"

```bash
# Cambiar puerto en .env
PORT=3001  # Frontend
PORT=5001  # Backend
```

### Error: "CORS error"

Verifica que `FRONTEND_URL` en backend `.env` sea correcto:

```
FRONTEND_URL=http://localhost:3000
```

---

## 📞 SOPORTE

Este proyecto está completamente documentado. Para questions:

1. Revisa los README.md en cada carpeta
2. Consulta las rutas en `apps/backend/src/routes/`
3. Examina los componentes en `apps/frontend/src/components/`

---

## ✨ ¡LISTO PARA COMENZAR!

Tu tienda profesional está configurada y lista. El siguiente paso es:

1. Instalar dependencias
2. Iniciar la base de datos
3. Ejecutar backend y frontend
4. Acceder a `/admin` para agregar productos
5. Comenzar a vender 🎉

**¡Éxito con tu tienda! 🚀**
