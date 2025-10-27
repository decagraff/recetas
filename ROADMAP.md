# 🍳 Proyecto: Plataforma de Recetas Colaborativa

## 📋 Descripción General

Plataforma web tipo red social donde usuarios pueden compartir, descubrir y guardar recetas de cocina. Sistema de interacción social con perfiles, seguidores, likes, comentarios y colecciones personalizadas.

---

## 🛠️ Stack Tecnológico

- **Backend:** Node.js + Express.js
- **Base de datos:** MySQL
- **ORM:** Sequelize (con migraciones)
- **Template Engine:** EJS
- **Frontend:** CSS + JavaScript puro
- **Autenticación:** Express-session + Bcrypt
- **Upload de archivos:** Multer
- **Variables de entorno:** dotenv
- **Dev tool:** Nodemon

---

## 📁 Estructura de Carpetas

```
/recetas-app
├── .env
├── .gitignore
├── package.json
├── server.js
│
├── /config
│   ├── database.js          # Conexión Sequelize
│   └── theme.js             # Colores del tema
│
├── /migrations              # Migraciones Sequelize
│   ├── 001-create-users.js
│   ├── 002-create-recipes.js
│   ├── 003-create-comments.js
│   ├── 004-create-likes.js
│   ├── 005-create-follows.js
│   ├── 006-create-collections.js
│   └── ...
│
├── /models                  # Modelos Sequelize
│   ├── User.js
│   ├── Recipe.js
│   ├── Comment.js
│   ├── Like.js
│   ├── Follow.js
│   ├── Collection.js
│   ├── RecipeCollection.js
│   ├── Notification.js
│   ├── Message.js
│   └── Badge.js
│
├── /routes                  # Rutas modulares
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── recipe.routes.js
│   ├── comment.routes.js
│   ├── like.routes.js
│   ├── follow.routes.js
│   ├── collection.routes.js
│   ├── search.routes.js
│   ├── notification.routes.js
│   ├── message.routes.js
│   └── api.routes.js        # APIs REST
│
├── /controllers             # Lógica de negocio
│   ├── authController.js
│   ├── userController.js
│   ├── recipeController.js
│   ├── commentController.js
│   ├── likeController.js
│   ├── followController.js
│   ├── collectionController.js
│   ├── searchController.js
│   ├── notificationController.js
│   └── messageController.js
│
├── /middleware              # Middlewares
│   ├── auth.js              # Verificar sesión
│   ├── upload.js            # Multer (fotos/videos)
│   ├── validation.js        # Validaciones
│   ├── roleCheck.js         # Verificar roles
│   └── errorHandler.js
│
├── /views                   # EJS Templates
│   ├── layout.ejs           # Layout principal
│   │
│   ├── /partials            # Componentes reutilizables
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── navbar.ejs
│   │   ├── sidebar.ejs
│   │   ├── recipe-card.ejs
│   │   ├── user-card.ejs
│   │   ├── comment.ejs
│   │   ├── notification-item.ejs
│   │   ├── badge.ejs
│   │   └── theme-toggle.ejs
│   │
│   ├── /auth
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   └── forgot-password.ejs
│   │
│   ├── /user
│   │   ├── profile.ejs
│   │   ├── edit-profile.ejs
│   │   ├── settings.ejs
│   │   ├── followers.ejs
│   │   ├── following.ejs
│   │   └── dashboard.ejs
│   │
│   ├── /recipe
│   │   ├── index.ejs        # Lista
│   │   ├── detail.ejs       # Detalle
│   │   ├── create.ejs       # Crear
│   │   └── edit.ejs         # Editar
│   │
│   ├── /collection
│   │   ├── index.ejs
│   │   ├── detail.ejs
│   │   └── create.ejs
│   │
│   ├── /search
│   │   ├── results.ejs
│   │   └── advanced.ejs
│   │
│   ├── /notification
│   │   └── index.ejs
│   │
│   ├── /message
│   │   ├── inbox.ejs
│   │   └── conversation.ejs
│   │
│   ├── /admin
│   │   ├── dashboard.ejs
│   │   ├── users.ejs
│   │   └── reports.ejs
│   │
│   ├── home.ejs             # Feed principal
│   ├── explore.ejs          # Explorar
│   ├── trending.ejs         # Trending
│   ├── onboarding.ejs       # Tutorial
│   └── 404.ejs
│
├── /public
│   ├── /css
│   │   ├── main.css         # Estilos base
│   │   ├── theme.css        # Modo claro/oscuro
│   │   ├── components.css   # Componentes reutilizables
│   │   ├── auth.css
│   │   ├── recipe.css
│   │   ├── profile.css
│   │   ├── search.css
│   │   └── responsive.css
│   │
│   ├── /js
│   │   ├── main.js          # JS principal
│   │   ├── theme-toggle.js  # Cambiar tema
│   │   ├── recipe.js        # Funcionalidad recetas
│   │   ├── search.js        # Búsqueda avanzada
│   │   ├── ingredients.js   # Búsqueda por ingredientes
│   │   ├── collection.js    # Gestión colecciones
│   │   ├── notifications.js # Notificaciones
│   │   ├── messages.js      # Chat
│   │   └── utils.js         # Funciones auxiliares
│   │
│   ├── /images
│   │   ├── /icons
│   │   ├── /badges
│   │   └── /placeholders
│   │
│   └── /uploads             # Archivos usuarios
│       ├── /avatars
│       ├── /recipes
│       ├── /user-photos     # "Hice esta receta"
│       └── /temp
│
└── /utils                   # Utilidades
    ├── emailService.js      # Envío de emails
    ├── imageProcessor.js    # Optimizar imágenes
    ├── validators.js        # Validaciones custom
    ├── notificationHelper.js
    └── searchHelper.js
```

---

## 🎨 Sistema de Colores

### Variables CSS - Modo Claro

```css
:root {
  /* Principales */
  --primary: #3B82F6;        /* Azul */
  --primary-light: #60A5FA;  /* Azul claro */
  --primary-dark: #1E40AF;   /* Azul oscuro */
  
  --secondary: #06B6D4;      /* Celeste */
  --secondary-light: #22D3EE;
  --secondary-dark: #0891B2;
  
  /* Backgrounds */
  --bg-primary: #FFFFFF;     /* Blanco */
  --bg-secondary: #F9FAFB;   /* Gris muy claro */
  --bg-tertiary: #F3F4F6;
  
  /* Textos */
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  
  /* Borders */
  --border-color: #E5E7EB;
  
  /* Estados */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

### Variables CSS - Modo Oscuro

```css
[data-theme="dark"] {
  /* Principales */
  --primary: #60A5FA;        /* Azul más claro */
  --primary-light: #93C5FD;
  --primary-dark: #3B82F6;
  
  --secondary: #22D3EE;      /* Celeste brillante */
  --secondary-light: #67E8F9;
  --secondary-dark: #06B6D4;
  
  /* Backgrounds */
  --bg-primary: #262624;     /* Gris oscuro principal */
  --bg-secondary: #1C1C1A;   /* Más oscuro */
  --bg-tertiary: #323230;    /* Más claro */
  
  /* Textos */
  --text-primary: #F9FAFB;
  --text-secondary: #D1D5DB;
  --text-muted: #9CA3AF;
  
  /* Borders */
  --border-color: #404040;
  
  /* Estados */
  --success: #34D399;
  --warning: #FBBF24;
  --error: #F87171;
  --info: #60A5FA;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
}
```

---

## 🗄️ Configuración .env

```env
# Puerto del servidor
PORT=3000

# Base de datos MySQL
DB_HOST=localhost
DB_USER=recetas_user
DB_PASSWORD=tu_password_seguro
DB_NAME=recetas_db
DB_PORT=3306

# Session secret
SESSION_SECRET=tu_session_secret_muy_seguro_aqui

# Entorno
NODE_ENV=development

# Upload configs
MAX_FILE_SIZE=5242880  # 5MB en bytes
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif,mp4,webm

# Email (opcional - para notificaciones)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_app

# URLs
BASE_URL=http://localhost:3000
```

---

## 📦 Dependencies (package.json)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "ejs": "^3.1.9",
    "mysql2": "^3.6.0",
    "sequelize": "^6.32.1",
    "dotenv": "^16.3.1",
    "express-session": "^1.17.3",
    "bcrypt": "^5.1.1",
    "multer": "^1.4.5-lts.1",
    "express-validator": "^7.0.1",
    "connect-session-sequelize": "^7.1.7",
    "nodemailer": "^6.9.4",
    "sharp": "^0.32.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "sequelize-cli": "^6.6.1"
  }
}
```

---

## 🎯 FASES DEL PROYECTO

---

## **FASE 0: Setup y Fundamentos** ⚙️

### Objetivos:
- Configurar entorno de desarrollo
- Estructura base del proyecto
- Conexión a base de datos
- Sistema de temas (claro/oscuro) desde el inicio

### Tareas:

#### 1. Inicialización del Proyecto
```bash
mkdir recetas-app && cd recetas-app
npm init -y
npm install express ejs mysql2 sequelize dotenv express-session bcrypt multer express-validator nodemon sequelize-cli
```

#### 2. Crear estructura de carpetas
- Crear todas las carpetas según estructura definida
- Configurar `.gitignore`:
```
node_modules/
.env
/public/uploads/*
*.log
```

#### 3. Configurar `.env`
- Copiar template de arriba
- Ajustar credenciales de MySQL

#### 4. Configurar Sequelize
```bash
npx sequelize-cli init
```
- Ajustar `config/database.js` para usar `.env`

#### 5. Crear archivo `server.js` básico
- Express server
- EJS como template engine
- Express-session
- Static files
- Error handling básico

#### 6. Crear layout base con sistema de temas
- `views/layout.ejs` con meta tags
- `views/partials/navbar.ejs` con toggle de tema
- `public/css/main.css` con variables CSS
- `public/css/theme.css` para modo claro/oscuro
- `public/js/theme-toggle.js` con localStorage

#### 7. Primera migración: Tabla Users
```javascript
// migrations/001-create-users.js
{
  id: UUID,
  username: STRING(50),
  email: STRING(100),
  password: STRING(255),
  fullName: STRING(100),
  bio: TEXT,
  avatar: STRING,
  role: ENUM('user', 'verified', 'admin'),
  isActive: BOOLEAN,
  createdAt: DATE,
  updatedAt: DATE
}
```

#### 8. Crear modelo User
- `models/User.js` con Sequelize
- Validaciones básicas
- Hooks para hashear password

#### 9. Vista de prueba
- `views/home.ejs` simple para verificar que funciona
- Route `/` en server.js

#### 10. Script en package.json
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "migrate": "sequelize-cli db:migrate",
  "migrate:undo": "sequelize-cli db:migrate:undo"
}
```

### Resultado esperado:
✅ Servidor corriendo en `localhost:3000`  
✅ Base de datos conectada  
✅ Tabla users creada  
✅ Toggle de tema funcionando  
✅ Layout base responsive

---

## **FASE 1: Autenticación y Perfiles** 🔐

### Objetivos:
- Sistema completo de registro/login
- Gestión de sesiones
- Perfiles de usuario públicos y privados
- Upload de foto de perfil

### Tareas:

#### 1. Crear migraciones adicionales
- Agregar campos a Users: `location`, `website`, `socialLinks`

#### 2. Sistema de autenticación
- **Registro:**
  - `views/auth/register.ejs` con form
  - `controllers/authController.js` → register()
  - Validaciones con express-validator
  - Hash password con bcrypt
  - Crear sesión automáticamente
  
- **Login:**
  - `views/auth/login.ejs` con form
  - `controllers/authController.js` → login()
  - Verificar credenciales
  - Crear sesión
  
- **Logout:**
  - Destruir sesión
  - Redirect a home

#### 3. Middleware de autenticación
- `middleware/auth.js` → isAuthenticated
- Proteger rutas que requieren login
- Redirect a login si no autenticado

#### 4. Perfil de usuario
- **Ver perfil público:**
  - `views/user/profile.ejs`
  - Mostrar: avatar, bio, stats (recetas, seguidores)
  - Tabs: Recetas | Guardadas | Seguidores | Siguiendo
  - Si es tu perfil: botón "Editar"
  - Si es otro: botón "Seguir" + "Mensaje"
  
- **Editar perfil:**
  - `views/user/edit-profile.ejs`
  - Form con todos los campos
  - Upload de avatar con Multer
  - Crop/resize imagen con Sharp
  - `controllers/userController.js` → updateProfile()

#### 5. Sistema de roles
- Middleware `middleware/roleCheck.js`
- Badges visuales según rol:
  - 🔵 Usuario normal
  - ✅ Usuario verificado (chef, influencer)
  - 👑 Admin

#### 6. Configuración de usuario
- `views/user/settings.ejs`
- Cambiar password
- Email
- Privacidad (perfil público/privado)
- Eliminar cuenta

### Resultado esperado:
✅ Usuarios pueden registrarse y loguearse  
✅ Sesiones persistentes  
✅ Perfiles públicos con información  
✅ Upload de avatar funcionando  
✅ Sistema de roles implementado

---

## **FASE 2: Core - CRUD Recetas** 📖

### Objetivos:
- Crear, leer, actualizar y eliminar recetas
- Upload de múltiples fotos/videos
- Categorización y metadata
- Formato libre + estructurado

### Tareas:

#### 1. Crear migración de Recetas
```javascript
// migrations/002-create-recipes.js
{
  id: UUID,
  userId: UUID (FK),
  title: STRING(200),
  description: TEXT,
  ingredients: JSON,  // Array de objetos
  steps: JSON,        // Array de objetos
  category: ENUM('postres', 'platos', 'bebidas', 'entradas', 'otros'),
  difficulty: ENUM('facil', 'medio', 'dificil'),
  prepTime: INTEGER,  // minutos
  cookTime: INTEGER,  // minutos
  servings: INTEGER,
  isPublished: BOOLEAN,
  viewCount: INTEGER,
  likeCount: INTEGER,
  commentCount: INTEGER,
  saveCount: INTEGER,
  createdAt: DATE,
  updatedAt: DATE
}
```

#### 2. Crear migración de RecipeMedia
```javascript
// migrations/003-create-recipe-media.js
{
  id: UUID,
  recipeId: UUID (FK),
  type: ENUM('photo', 'video'),
  url: STRING,
  order: INTEGER,
  createdAt: DATE
}
```

#### 3. Crear modelos
- `models/Recipe.js` con relaciones
- `models/RecipeMedia.js`
- Relación: Recipe hasMany RecipeMedia

#### 4. Vista: Crear receta
- `views/recipe/create.ejs`
- Form con:
  - Título
  - Descripción
  - Upload múltiples fotos/videos (drag & drop)
  - Toggle: Formato libre vs estructurado
  - **Formato libre:** Textarea grande
  - **Formato estructurado:**
    - Ingredientes (agregar/quitar filas)
    - Pasos (agregar/quitar, reordenar)
  - Categoría (dropdown)
  - Dificultad (botones)
  - Tiempos (inputs numéricos)
  - Porciones
  - Preview en vivo
  - Guardar como borrador / Publicar

#### 5. Controlador: Crear receta
- `controllers/recipeController.js` → create()
- Validaciones
- Upload de archivos con Multer
- Optimizar imágenes con Sharp
- Guardar JSON de ingredientes/pasos
- Notificar a seguidores (opcional)

#### 6. Vista: Lista de recetas
- `views/recipe/index.ejs`
- Grid de recipe-cards
- Filtros laterales: categoría, dificultad, tiempo
- Ordenar por: más recientes, populares, mejor valoradas
- Paginación

#### 7. Vista: Detalle de receta
- `views/recipe/detail.ejs`
- Hero image (carrusel si múltiples)
- Información del autor (mini card)
- Título, descripción
- Stats: vistas, likes, guardados
- Ingredientes con checkboxes
- Pasos con fotos opcionales
- Botones de acción:
  - Like
  - Guardar
  - Compartir
  - Editar (si es tuyo)
  - Reportar
- Sección "Hice esta receta" (fotos usuarios)
- Comentarios
- Sidebar: Recetas similares, del mismo autor

#### 8. Editar receta
- `views/recipe/edit.ejs` (mismo form que crear)
- Solo si eres el autor o admin
- Pre-llenar datos

#### 9. Eliminar receta
- Modal de confirmación
- Solo si eres el autor o admin
- Eliminar archivos asociados

#### 10. Incrementar vistas
- Middleware para contar views únicos por sesión

### Resultado esperado:
✅ CRUD completo de recetas  
✅ Upload múltiple funcionando  
✅ Dos formatos (libre/estructurado)  
✅ Vista detalle completa  
✅ Permisos correctos (solo autor puede editar)

---

## **FASE 3: Interacción Social Básica** ❤️

### Objetivos:
- Sistema de likes
- Comentarios
- Seguidores/siguiendo
- Notificaciones básicas
- Feed personalizado

### Tareas:

#### 1. Crear migraciones
```javascript
// migrations/004-create-likes.js
{
  id: UUID,
  userId: UUID (FK),
  recipeId: UUID (FK),
  createdAt: DATE
}

// migrations/005-create-comments.js
{
  id: UUID,
  userId: UUID (FK),
  recipeId: UUID (FK),
  content: TEXT,
  createdAt: DATE,
  updatedAt: DATE
}

// migrations/006-create-follows.js
{
  id: UUID,
  followerId: UUID (FK),  // Quien sigue
  followingId: UUID (FK), // A quien sigue
  createdAt: DATE
}

// migrations/007-create-notifications.js
{
  id: UUID,
  userId: UUID (FK),       // Receptor
  actorId: UUID (FK),      // Quien generó la notificación
  type: ENUM('like', 'comment', 'follow', 'mention'),
  recipeId: UUID (FK, nullable),
  commentId: UUID (FK, nullable),
  message: STRING,
  isRead: BOOLEAN,
  createdAt: DATE
}
```

#### 2. Crear modelos
- `models/Like.js`
- `models/Comment.js`
- `models/Follow.js`
- `models/Notification.js`
- Configurar todas las relaciones

#### 3. Sistema de Likes
- Botón like en recipe-card y recipe-detail
- Ajax para like/unlike sin recargar
- `controllers/likeController.js` → toggle()
- Actualizar contador en tiempo real
- Crear notificación al autor

#### 4. Sistema de Comentarios
- Formulario en detalle de receta
- Mostrar lista de comentarios
- Editar propio comentario
- Eliminar propio comentario (o admin)
- `controllers/commentController.js`
- Notificar al autor de la receta
- Menciones @username (opcional)

#### 5. Sistema de Seguidores
- Botón "Seguir/Dejar de seguir" en perfil
- Modal con lista de seguidores/siguiendo
- `controllers/followController.js`
- Notificar al seguido
- Stats en perfil (X seguidores, Y siguiendo)

#### 6. Feed Personalizado
- Home muestra recetas de quien sigues + trending
- Algoritmo simple:
  - 70% recetas de seguidos (orden cronológico)
  - 30% recetas populares (no seguidos)
- Infinite scroll o paginación

#### 7. Notificaciones
- Icono en navbar con contador
- Dropdown con últimas notificaciones
- `views/notification/index.ejs` para ver todas
- Marcar como leído
- `controllers/notificationController.js`

#### 8. Actualizar vistas de perfil
- En perfil mostrar tabs:
  - Recetas (X)
  - Guardadas (X)
  - Seguidores (X)
  - Siguiendo (X)

### Resultado esperado:
✅ Usuarios pueden dar like a recetas  
✅ Sistema de comentarios funcional  
✅ Seguir/dejar de seguir usuarios  
✅ Notificaciones básicas en DB  
✅ Feed personalizado en home

---

## **FASE 4: Búsqueda y Descubrimiento** 🔍

### Objetivos:
- Búsqueda por texto
- Filtros avanzados
- **Búsqueda por ingredientes disponibles** (diferenciador)
- Vista Explorar
- Recetas relacionadas

### Tareas:

#### 1. Búsqueda básica por texto
- Barra de búsqueda en navbar
- Buscar en: título, descripción, ingredientes
- `controllers/searchController.js` → search()
- Resaltar palabras encontradas
- `views/search/results.ejs`

#### 2. Filtros avanzados
- Sidebar con filtros:
  - Categoría (checkbox múltiple)
  - Dificultad (checkbox)
  - Tiempo máximo (slider)
  - Porciones
- Aplicar filtros sin recargar (Ajax)
- Query builder en backend

#### 3. Búsqueda por ingredientes (DIFERENCIADOR)
- Vista especial: `views/search/by-ingredients.ejs`
- Input para agregar ingredientes disponibles
- Tags de ingredientes agregados
- Botón "Buscar recetas"
- Algoritmo:
  - Buscar recetas que usen esos ingredientes
  - Ordenar por % de match
  - Mostrar ingredientes faltantes
- Ejemplo: "Tienes 5/7 ingredientes"

#### 4. Vista Explorar
- `views/explore.ejs`
- Grid por categorías (cards grandes con imagen)
- Secciones:
  - Trending esta semana
  - Top usuarios
  - Categorías
  - Recetas rápidas (<30min)
  - Postres populares
  - etc.

#### 5. Recetas relacionadas
- En detalle de receta, sidebar con relacionadas
- Algoritmo simple:
  - Misma categoría
  - Ingredientes similares
  - Del mismo autor
- Limitar a 5-6

#### 6. Ordenamiento de resultados
- Dropdown en resultados:
  - Más relevante
  - Más reciente
  - Más popular (likes)
  - Mejor valoradas (si hay ratings)
  - Más rápidas

#### 7. Autocompletado
- Sugerencias en barra de búsqueda
- Ajax mientras tipea
- Mostrar: recetas, usuarios, ingredientes

#### 8. Historial de búsqueda
- Guardar en sesión o DB
- Mostrar en dropdown al hacer clic

### Resultado esperado:
✅ Búsqueda funcional y rápida  
✅ Filtros múltiples aplicables  
✅ Búsqueda por ingredientes FUNCIONANDO  
✅ Vista explorar atractiva  
✅ Recetas relacionadas relevantes

---

## **FASE 5: Guardados y Colecciones** 📚

### Objetivos:
- Guardar recetas favoritas
- Crear colecciones personalizadas
- Organizar recetas en carpetas
- Compartir colecciones

### Tareas:

#### 1. Crear migraciones
```javascript
// migrations/008-create-collections.js
{
  id: UUID,
  userId: UUID (FK),
  name: STRING(100),
  description: TEXT,
  isPublic: BOOLEAN,
  coverImage: STRING,
  recipeCount: INTEGER,
  createdAt: DATE,
  updatedAt: DATE
}

// migrations/009-create-recipe-collections.js
{
  id: UUID,
  recipeId: UUID (FK),
  collectionId: UUID (FK),
  addedAt: DATE
}
```

#### 2. Crear modelos
- `models/Collection.js`
- `models/RecipeCollection.js`
- Relaciones many-to-many

#### 3. Guardar recetas
- Botón "Guardar" en recipe-card y recipe-detail
- Al hacer clic:
  - Si no tiene colecciones: crear "Favoritos" automáticamente
  - Si tiene colecciones: modal para elegir dónde guardar
  - Opción: crear nueva colección rápida
- Toast de confirmación

#### 4. Vista: Mis colecciones
- `views/collection/index.ejs`
- Grid de colecciones con:
  - Cover (primera receta o custom)
  - Nombre
  - Descripción
  - Cantidad de recetas
  - Badge público/privado
- Botón "Crear colección"

#### 5. Vista: Crear/Editar colección
- `views/collection/create.ejs`
- Form:
  - Nombre
  - Descripción
  - Upload cover image (opcional)
  - Toggle público/privado
- `controllers/collectionController.js`

#### 6. Vista: Detalle de colección
- `views/collection/detail.ejs`
- Header con info
- Grid de recetas en la colección
- Si es tu colección:
  - Editar
  - Eliminar
  - Agregar más recetas (botón)
  - Quitar recetas (X en cada card)
- Si es colección pública de otro:
  - Botón "Duplicar esta colección"

#### 7. Agregar a colección desde detalle
- En recipe-detail, botón "Agregar a colección"
- Modal con lista de tus colecciones
- Checkboxes para agregar/quitar
- Crear nueva colección rápida

#### 8. Compartir colecciones
- URL pública si collection.isPublic = true
- Botón "Copiar enlace"
- Compartir en redes sociales

#### 9. Tab "Guardadas" en perfil
- Mostrar colecciones públicas del usuario
- Si es tu perfil: ver también privadas

### Resultado esperado:
✅ Sistema de guardados funcional  
✅ Colecciones públicas y privadas  
✅ Gestión completa de colecciones  
✅ Agregar/quitar recetas fácilmente  
✅ Compartir colecciones

---

## **FASE 6: Engagement Avanzado** 🌟

### Objetivos:
- "Hice esta receta" con fotos
- Sistema de valoraciones
- Badges e insignias
- Rankings y leaderboards

### Tareas:

#### 1. Crear migraciones
```javascript
// migrations/010-create-user-recipe-photos.js
{
  id: UUID,
  userId: UUID (FK),
  recipeId: UUID (FK),
  photoUrl: STRING,
  caption: TEXT,
  createdAt: DATE
}

// migrations/011-create-ratings.js
{
  id: UUID,
  userId: UUID (FK),
  recipeId: UUID (FK),
  rating: INTEGER (1-5),
  createdAt: DATE,
  updatedAt: DATE
}

// migrations/012-create-user-badges.js
{
  id: UUID,
  userId: UUID (FK),
  badgeType: ENUM('first_recipe', '10_recipes', '100_likes', 'top_chef', 'verified'),
  earnedAt: DATE
}
```

#### 2. Crear modelos
- `models/UserRecipePhoto.js`
- `models/Rating.js`
- `models/UserBadge.js`

#### 3. "Hice esta receta"
- En recipe-detail, botón "Subí tu versión"
- Modal para upload foto + caption
- Galería de fotos de usuarios
- `controllers/recipeController.js` → uploadUserPhoto()
- Notificar al autor original

#### 4. Sistema de valoraciones
- Estrellas (1-5) en recipe-detail
- Solo si hiciste login
- No puedes valorar tu propia receta
- Mostrar promedio de rating
- Actualizar en tiempo real

#### 5. Sistema de Badges
- Badges automáticos:
  - 🥇 Primera receta publicada
  - 📖 10 recetas publicadas
  - ❤️ 100 likes recibidos
  - 💬 100 comentarios
  - 👥 100 seguidores
  - 🏆 Receta del mes
  - ✅ Usuario verificado (manual/admin)
- Mostrar badges en perfil
- Animación al desbloquear badge
- `utils/badgeHelper.js` con lógica

#### 6. Rankings
- `views/rankings.ejs`
- Tabs:
  - Top Usuarios (por seguidores)
  - Top Recetas (por likes)
  - Trending (último mes)
  - Por categoría
- Filtrar por periodo: Hoy, Semana, Mes, Todo

#### 7. Receta destacada / del mes
- Admin puede marcar receta destacada
- Aparece en home con banner especial
- Autor recibe badge especial

#### 8. Galería de "usuarios que hicieron"
- En recipe-detail
- Carrusel de fotos
- Click para ver foto grande + caption
- Link a perfil del usuario

### Resultado esperado:
✅ Usuarios suben fotos de sus versiones  
✅ Sistema de ratings con estrellas  
✅ Badges desbloqueables automáticos  
✅ Rankings dinámicos  
✅ Engagement aumentado

---

## **FASE 7: Dashboard y Estadísticas** 📊

### Objetivos:
- Panel de creador con estadísticas
- Gráficas de engagement
- Analytics de recetas
- Exportar datos

### Tareas:

#### 1. Crear vista Dashboard
- `views/user/dashboard.ejs`
- Acceso desde navbar (solo si tienes recetas)
- Layout tipo admin panel

#### 2. Stats generales
- Cards con números grandes:
  - Total recetas publicadas
  - Total vistas
  - Total likes
  - Total comentarios
  - Total guardados
  - Seguidores ganados este mes

#### 3. Gráficas con Chart.js
- Instalar Chart.js
- Gráfica de vistas en el tiempo (últimos 30 días)
- Gráfica de engagement (likes, comments, saves)
- Top 5 recetas más populares (bar chart)

#### 4. Tabla de recetas
- Lista todas tus recetas con:
  - Thumbnail
  - Título
  - Fecha
  - Vistas
  - Likes
  - Comentarios
  - Guardados
  - Estado (publicada/borrador)
- Ordenar por columna
- Acciones rápidas: editar, ver stats, eliminar

#### 5. Stats detalladas por receta
- Click en receta → modal con stats
- Vistas por día
- De dónde vienen (home, búsqueda, perfil)
- Usuarios que guardaron
- Comentarios recientes

#### 6. Exportar datos
- Botón "Exportar a CSV"
- Generar CSV con stats de todas tus recetas
- Download automático

#### 7. Notificaciones especiales
- "Tu receta alcanzó 100 likes!"
- "Tu receta está trending!"
- "Ganaste un nuevo badge!"

### Resultado esperado:
✅ Dashboard completo para creadores  
✅ Gráficas visuales de engagement  
✅ Stats detalladas por receta  
✅ Exportar datos en CSV

---

## **FASE 8: Features Sociales Avanzadas** 💬

### Objetivos:
- Mensajería privada entre usuarios
- Notificaciones en tiempo real
- Menciones @usuario
- Compartir en redes sociales
- Embed de recetas

### Tareas:

#### 1. Crear migraciones de mensajes
```javascript
// migrations/013-create-conversations.js
{
  id: UUID,
  user1Id: UUID (FK),
  user2Id: UUID (FK),
  lastMessageAt: DATE,
  createdAt: DATE
}

// migrations/014-create-messages.js
{
  id: UUID,
  conversationId: UUID (FK),
  senderId: UUID (FK),
  content: TEXT,
  isRead: BOOLEAN,
  createdAt: DATE
}
```

#### 2. Crear modelos
- `models/Conversation.js`
- `models/Message.js`

#### 3. Vista: Inbox
- `views/message/inbox.ejs`
- Lista de conversaciones (sidebar)
- Cada conversación muestra:
  - Avatar del otro usuario
  - Nombre
  - Último mensaje
  - Timestamp
  - Badge si no leído
- Panel principal: selecciona conversación para ver

#### 4. Vista: Conversación
- `views/message/conversation.ejs`
- Header con info del otro usuario
- Chat messages (scroll infinito hacia arriba)
- Input para escribir mensaje
- Auto-scroll al nuevo mensaje
- `controllers/messageController.js`

#### 5. Enviar mensaje desde perfil
- Botón "Enviar mensaje" en perfil
- Crea conversación si no existe
- Redirect a la conversación

#### 6. Notificaciones en tiempo real
- **Opción 1:** Polling cada X segundos (simple)
- **Opción 2:** WebSockets con Socket.io (avanzado)
- Actualizar contador de notificaciones sin recargar
- Toast cuando llega nuevo mensaje

#### 7. Sistema de menciones
- En comentarios, detectar @username
- Autocompletado al escribir @
- Crear notificación al usuario mencionado
- Link al perfil en la mención

#### 8. Compartir en redes sociales
- Botones en recipe-detail:
  - Facebook
  - Twitter/X
  - WhatsApp
  - Copiar enlace
- Open Graph meta tags para preview bonito

#### 9. Embed de recetas
- Botón "Embed" en recipe-detail
- Modal con código HTML para copiar
- Vista especial `/recipe/:id/embed` (minimalista)
- Solo lectura, link "Ver receta completa"

#### 10. Reportar contenido
- Botón "Reportar" en recetas y comentarios
- Modal con razones (spam, contenido inapropiado, etc.)
- Guardar en tabla reports
- Admin puede revisar reportes

### Resultado esperado:
✅ Mensajería privada funcional  
✅ Notificaciones actualizadas sin recargar  
✅ Menciones @usuario funcionando  
✅ Compartir en redes sociales  
✅ Embeds de recetas

---

## **FASE 9: Utilidades Prácticas** 🛠️

### Objetivos:
- Lista de compras auto-generada
- Conversión de unidades
- Ajustar porciones
- Imprimir/PDF de receta
- Modo cocina

### Tareas:

#### 1. Lista de compras
- `views/shopping-list.ejs`
- Botón "Agregar a lista" en recipe-detail
- Extrae ingredientes automáticamente
- Vista de lista:
  - Checkboxes para marcar comprados
  - Editar cantidad
  - Eliminar item
  - Agregar items custom
  - Agrupar por categoría (frutas, carnes, lácteos)
- Guardar en localStorage o DB
- Compartir lista (link o WhatsApp)

#### 2. Conversión de unidades
- En recipe-detail, dropdown "Unidades"
- Opciones: Métricas / Imperiales
- Convertir automáticamente:
  - Tazas ↔ ml/gramos
  - Cucharadas ↔ ml
  - oz ↔ gramos
  - etc.
- `utils/unitConverter.js`

#### 3. Ajustar porciones
- En recipe-detail, input de porciones
- Al cambiar, recalcular todas las cantidades
- Ejemplo: Receta para 4 → ajustar a 8
- Matemática simple: `nuevaCantidad = original * (nuevasPorciones / porcionesOriginales)`

#### 4. Imprimir / Exportar PDF
- Botón "Imprimir" en recipe-detail
- CSS específico para print:
  - Sin navbar/footer
  - Solo contenido esencial
  - Optimizado para A4
- Opción para generar PDF (librería `puppeteer` o `html-pdf`)

#### 5. Modo cocina
- Botón "Modo cocina" en recipe-detail
- Vista fullscreen
- Pasos MUY grandes (legibles a distancia)
- Botones grandes: Anterior / Siguiente
- Timer integrado (opcional)
- Click en cualquier lado para avanzar
- ESC para salir

#### 6. Timer de cocina
- En pasos que mencionen tiempo
- Detectar "hornear 30 minutos"
- Botón "Iniciar timer"
- Cuenta regresiva
- Notificación/alarma al terminar

#### 7. Notas personales en recetas
- Guardas una receta → puedes agregar notas
- "Usé menos azúcar", "Funcionó perfecto", etc.
- Solo tú las ves
- Se guardan en RecipeCollection con campo `notes`

### Resultado esperado:
✅ Lista de compras funcional  
✅ Conversión de unidades automática  
✅ Ajuste de porciones recalcula ingredientes  
✅ Imprimir receta optimizado  
✅ Modo cocina fullscreen

---

## **FASE 10: Configuración y Preferencias** ⚙️

### Objetivos:
- Ajustes completos de perfil
- Gestión de privacidad
- Preferencias dietéticas
- Notificaciones personalizadas
- Moderación y reportes

### Tareas:

#### 1. Crear migración de preferencias
```javascript
// migrations/015-add-user-preferences.js
{
  // Agregar a tabla Users:
  dietaryPreferences: JSON,  // ['vegetarian', 'gluten-free', etc]
  notificationSettings: JSON,
  language: STRING(5),
  timezone: STRING(50)
}
```

#### 2. Vista: Configuración general
- `views/user/settings.ejs` con tabs:
  - Perfil
  - Cuenta
  - Privacidad
  - Notificaciones
  - Preferencias
  - Seguridad

#### 3. Tab: Perfil
- Editar toda la info pública
- Avatar, cover, bio, links
- (Ya hecho en Fase 1, mejorar aquí)

#### 4. Tab: Cuenta
- Cambiar email
- Cambiar password (con confirmación)
- Vincular redes sociales (opcional)
- Descargar mis datos
- Eliminar cuenta (confirmación doble)

#### 5. Tab: Privacidad
- Toggle: Perfil público/privado
- Si privado:
  - Solo seguidores ven recetas
  - Solicitudes de seguimiento (aprobar/rechazar)
- Mostrar email en perfil (sí/no)
- Permitir mensajes de (todos / solo seguidos / nadie)
- Aparecer en rankings (sí/no)

#### 6. Tab: Notificaciones
- Checkboxes para cada tipo:
  - Nuevo seguidor
  - Like en mi receta
  - Comentario en mi receta
  - Mención
  - Nuevo mensaje
  - Alguien guardó mi receta
- Método: Web / Email (si configurado)
- Frecuencia de emails: Inmediato / Resumen diario

#### 7. Tab: Preferencias dietéticas
- Checkboxes:
  - Vegetariano
  - Vegano
  - Sin gluten
  - Sin lactosa
  - Keto
  - Bajo en carbohidratos
  - Etc.
- Usar para:
  - Filtrar búsquedas automáticamente
  - Sugerencias personalizadas
  - Alertar si receta no cumple

#### 8. Tab: Seguridad
- Autenticación de dos factores (opcional - avanzado)
- Sesiones activas (listar dispositivos, cerrar remotamente)
- Historial de actividad reciente

#### 9. Bloquear usuarios
- En perfil de otro usuario, opción "Bloquear"
- Usuario bloqueado:
  - No ve tu perfil
  - No puede comentar tus recetas
  - No puede enviarte mensajes
- Lista de bloqueados en settings

#### 10. Sistema de reportes (Admin)
- `views/admin/reports.ejs`
- Lista de reportes pendientes
- Tipos: Receta, Comentario, Usuario
- Acciones:
  - Ver contenido reportado
  - Eliminar contenido
  - Advertir usuario
  - Banear usuario
  - Descartar reporte
- Middleware `roleCheck('admin')`

#### 11. Panel de admin
- `views/admin/dashboard.ejs`
- Stats generales:
  - Usuarios registrados
  - Recetas publicadas
  - Actividad reciente
- Gráficas de crecimiento
- Acceso a:
  - Usuarios (buscar, editar, banear)
  - Recetas (buscar, eliminar, destacar)
  - Reportes
  - Badges (asignar manual)

### Resultado esperado:
✅ Configuración completa de usuario  
✅ Privacidad granular  
✅ Notificaciones personalizables  
✅ Sistema de bloqueos  
✅ Panel de admin funcional

---

## **FASE 11: Onboarding y UX** 🎓

### Objetivos:
- Tutorial de primera vez
- Wizard de preferencias
- Tooltips contextuales
- Sugerencias personalizadas
- Mejorar UX general

### Tareas:

#### 1. Onboarding al registrarse
- Después de register exitoso
- `views/onboarding.ejs`
- Wizard de 4 pasos:
  1. Bienvenida + explicación de la plataforma
  2. Configurar perfil (avatar, bio)
  3. Preferencias dietéticas
  4. Seguir usuarios sugeridos (chefs populares)
- Progress bar
- Poder saltar

#### 2. Tour guiado (primera visita)
- Usar librería como `Shepherd.js` o `Intro.js`
- Highlight de elementos clave:
  - Navbar (búsqueda, notificaciones)
  - Botón "Crear receta"
  - Feed
  - Perfil
- Mensajes breves y amigables
- Poder cerrar en cualquier momento
- Botón "Volver a ver tutorial" en settings

#### 3. Tooltips contextuales
- Al hacer hover en iconos:
  - Like: "Me gusta"
  - Save: "Guardar en colección"
  - Share: "Compartir receta"
- Usar atributo `title` o librería tooltip

#### 4. Sugerencias personalizadas
- En home, sección "Recetas para ti"
- Basado en:
  - Recetas que likeaste
  - Recetas que guardaste
  - Preferencias dietéticas
- Algoritmo simple de recomendación

#### 5. Placeholders útiles
- Feed vacío: "Sigue usuarios para ver sus recetas"
- Sin recetas guardadas: "Guarda tus recetas favoritas"
- Sin colecciones: "Crea tu primera colección"
- Sin seguidores: "Comparte tu perfil para ganar seguidores"

#### 6. Estado de carga
- Skeletons en lugar de spinners
- Feedback visual inmediato
- Progress bar al subir imágenes
- Toast de confirmación en acciones

#### 7. Errores amigables
- Página 404 custom
- Mensaje útil: "¿Buscabas esto?"
- Sugerencias de recetas populares
- Botón volver al inicio

#### 8. Atajos de teclado
- `/` → Focus en búsqueda
- `N` → Nueva receta
- `ESC` → Cerrar modals
- Mostrar atajos en un modal (botón `?`)

#### 9. Modo offline (PWA básico)
- Service worker para cache básico
- Mensaje "Sin conexión" cuando aplique
- Recetas visitadas disponibles offline

### Resultado esperado:
✅ Onboarding completo para nuevos usuarios  
✅ Tour guiado de la plataforma  
✅ Tooltips y ayuda contextual  
✅ Sugerencias personalizadas  
✅ UX pulida y profesional

---

## **FASE 12: Optimización y Extras** 🚀

### Objetivos:
- SEO optimizado
- Performance mejorado
- PWA installable
- Multi-idioma
- Modo oscuro perfeccionado
- Monetización (opcional)

### Tareas:

#### 1. SEO
- Meta tags dinámicos por página
- Open Graph para redes sociales
- Twitter Cards
- Schema.org markup (Recipe schema)
- Sitemap.xml generado automáticamente
- robots.txt
- URLs amigables (slugs)
- Alt text en todas las imágenes

#### 2. Performance
- Lazy loading de imágenes
- Infinite scroll en lugar de paginación
- Minificar CSS/JS (webpack o similar)
- Comprimir imágenes al subir (Sharp)
- CDN para assets estáticos (opcional)
- Redis para cache de queries comunes (opcional)
- Índices en DB para queries frecuentes

#### 3. PWA (Progressive Web App)
- Manifest.json
- Service worker para offline
- Installable desde navegador
- Splash screen
- Iconos para diferentes tamaños
- Push notifications (opcional - avanzado)

#### 4. Multi-idioma
- i18n con librería como `i18next`
- Idiomas: Español (default) + Inglés
- Selector de idioma en footer
- Traducir todas las interfaces
- Recetas mantienen idioma original

#### 5. Modo oscuro perfeccionado
- Revisar contraste de colores (WCAG AA)
- Smooth transition al cambiar
- Recordar preferencia
- Auto-detectar preferencia del sistema
- Imágenes optimizadas para cada modo

#### 6. Accesibilidad (a11y)
- Navegación por teclado completa
- Screen reader friendly
- Aria labels correctos
- Contraste de colores adecuado
- Focus states visibles

#### 7. Analytics
- Integrar Google Analytics o similar
- Eventos custom:
  - Receta creada
  - Búsqueda realizada
  - Like dado
  - Receta guardada
- Dashboards con insights

#### 8. Email marketing (opcional)
- Newsletter semanal
- Recetas trending de la semana
- Nuevos seguidores
- Integrar con Mailchimp o similar

#### 9. Monetización (opcional)
- Google AdSense en sidebar
- Recetas patrocinadas (marcadas claramente)
- Plan premium:
  - Sin ads
  - Colecciones ilimitadas
  - Badge especial
  - Estadísticas avanzadas
- Pasarela de pago con Stripe

#### 10. Tests
- Tests unitarios (Jest)
- Tests de integración
- Tests E2E con Cypress
- Coverage mínimo 70%

#### 11. Documentación
- README completo
- Guía de instalación
- Guía de contribución
- API documentation (si aplicable)
- Changelog

#### 12. Deploy y CI/CD
- Configurar VPS
- Nginx como reverse proxy
- PM2 para process management
- SSL con Let's Encrypt
- Backups automáticos de DB
- GitHub Actions para CI/CD (opcional)

### Resultado esperado:
✅ SEO optimizado para búsquedas  
✅ Carga rápida y eficiente  
✅ Installable como app  
✅ Multi-idioma funcional  
✅ Accesible para todos  
✅ Listo para producción

---

## 📝 Notas Finales

### Tecnologías Adicionales Sugeridas:
- **Socket.io** - Para notificaciones en tiempo real
- **Sharp** - Procesamiento de imágenes
- **Chart.js** - Gráficas en dashboard
- **Axios** - Requests Ajax más limpios
- **Joi** - Validación de schemas
- **Moment.js** - Manejo de fechas
- **Shepherd.js** - Tours guiados

### Estimación de Tiempo (solo desarrollo):
- **Fase 0:** 2-3 días
- **Fase 1:** 5-7 días
- **Fase 2:** 7-10 días
- **Fase 3:** 5-7 días
- **Fase 4:** 7-10 días
- **Fase 5:** 4-5 días
- **Fase 6:** 5-7 días
- **Fase 7:** 4-5 días
- **Fase 8:** 7-10 días
- **Fase 9:** 5-6 días
- **Fase 10:** 6-8 días
- **Fase 11:** 4-5 días
- **Fase 12:** 7-10 días

**TOTAL: ~70-90 días de desarrollo** (trabajando full-time)

### MVP Recomendado (versión mínima viable):
- Fases 0-4 = **Sistema funcional básico**
- Agregar Fase 5 = **MVP robusto**
- Fases 6-9 = **Producto completo**
- Fases 10-12 = **Producto profesional**

---

## 🎯 Próximos Pasos

1. ✅ Revisar este documento completo
2. ✅ Ajustar fases si es necesario
3. ⏳ Crear repositorio en GitHub
4. ⏳ Iniciar Fase 0
5. ⏳ Desarrollar fase por fase
6. ⏳ Testing continuo
7. ⏳ Deploy final

---

**Documento creado:** 2025
**Última actualización:** Fase 0 - Setup inicial
**Estado:** 📋 Planificación completa

---

## 📞 Contacto del Proyecto

- **Nombre del proyecto:** [A definir]
- **Repositorio:** [A crear]
- **Demo:** [A deployar]

---

*Este documento es una guía viva. Se actualizará conforme avance el proyecto.*
