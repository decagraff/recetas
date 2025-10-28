# 🍳 RecetaBook - Red Social de Recetas

Plataforma web moderna para compartir y descubrir recetas de cocina con una comunidad apasionada por la gastronomía.

![Status](https://img.shields.io/badge/Status-En_Desarrollo-yellow)
![Fase](https://img.shields.io/badge/Fase-1_Completada-success)
![Node](https://img.shields.io/badge/Node.js-16+-green)
![MySQL](https://img.shields.io/badge/MySQL-8+-blue)

---

## 🚀 Estado del Proyecto

**✅ Fase 1 COMPLETADA** - Sistema de Usuarios (100%)  
**⏳ Próximo:** Fase 2 - Sistema de Recetas

### Progreso General

- ✅ **Fase 0:** Setup base y configuración
- ✅ **Fase 1A:** Registro de usuarios con validaciones
- ✅ **Fase 1B:** Login y sistema de sesiones
- ✅ **Fase 1C:** Perfil público con estadísticas
- ✅ **Fase 1D:** Editar perfil y uploads modulares
- ✅ **Fase 1E:** Configuración y seguridad de cuenta
- ⏳ **Fase 2:** CRUD de Recetas (Próximo)
- ⏳ **Fase 3:** Sistema Social (likes, comentarios, seguir)
- ⏳ **Fase 4:** Búsqueda y Descubrimiento
- ⏳ **Fase 5:** Notificaciones y Mensajes

---

## ✨ Características Implementadas

### 🔐 Sistema de Autenticación
- ✅ Registro con validaciones completas
- ✅ Login con email o username
- ✅ Hash de contraseñas con bcrypt
- ✅ Sesiones persistentes
- ✅ Middleware de autenticación
- ✅ Protección de rutas privadas

### 👤 Sistema de Usuarios
- ✅ Perfil público personalizable
- ✅ Avatar y portada con upload
- ✅ Biografía y ubicación
- ✅ Redes sociales (Instagram, Twitter, Facebook, YouTube)
- ✅ Sistema de badges (user, verified, admin)
- ✅ Estadísticas (recetas, seguidores, siguiendo)
- ✅ Tabs de contenido (Recetas, Guardadas)

### 📤 Sistema de Uploads
- ✅ Upload de avatar (optimizado a 400x400)
- ✅ Upload de portada/cover (optimizado a 1200x400)
- ✅ Optimización automática con Sharp
- ✅ Estructura modular por usuario: `/uploads/users/{username}/`
- ✅ Validación de tamaño (máx 5MB)
- ✅ Validación de tipos (imágenes)
- ✅ Preview en tiempo real

### ⚙️ Configuración de Cuenta
- ✅ Cambiar email con verificación de contraseña
- ✅ Cambiar contraseña con validaciones
- ✅ Ajustes de privacidad (preparados)
- ✅ Eliminar cuenta con confirmación
- ✅ Modal de confirmación de acciones críticas
- ✅ Eliminación automática de archivos de usuario

### 🎨 Interfaz y UX
- ✅ Sistema de temas (claro/oscuro)
- ✅ Diseño responsive mobile-first
- ✅ Toast notifications
- ✅ Animaciones y transiciones suaves
- ✅ Iconos Font Awesome
- ✅ Componentes reutilizables
- ✅ Páginas de error personalizadas (404, 500)

---

## 📋 Requisitos

- **Node.js** >= 16.0.0
- **MySQL** >= 8.0
- **npm** >= 8.0.0

---

## 🛠️ Instalación

### 1. Clonar repositorio

```bash
git clone <tu-repo>
cd recetabook
```

### 2. Instalar dependencias

```bash
npm install
```

Dependencias principales:
- `express` - Framework web
- `ejs` - Motor de templates
- `sequelize` - ORM para MySQL
- `mysql2` - Driver MySQL
- `bcryptjs` - Hash de contraseñas
- `express-session` - Manejo de sesiones
- `express-validator` - Validaciones
- `multer` - Upload de archivos
- `sharp` - Optimización de imágenes
- `dotenv` - Variables de entorno

### 3. Configurar variables de entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Aplicación
NODE_ENV=development
PORT=3000
APP_NAME=RecetaBook
APP_TITLE=RecetaBook - Comparte tus recetas
APP_DESCRIPTION=Red social de recetas

# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=recetas_db
DB_PORT=3306
DB_DIALECT=mysql

# Sesiones (genera uno aleatorio seguro)
SESSION_SECRET=genera_un_secret_muy_largo_y_aleatorio_aqui

# Uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp

# Colores (tema claro)
PRIMARY_COLOR=#3B82F6
SECONDARY_COLOR=#06B6D4
SUCCESS_COLOR=#10B981
ERROR_COLOR=#EF4444
WARNING_COLOR=#F59E0B

# Colores (tema oscuro)
DARK_PRIMARY_COLOR=#60A5FA
DARK_SECONDARY_COLOR=#22D3EE
DARK_BG_PRIMARY=#1a1a18
DARK_BG_SECONDARY=#262624
DARK_BG_TERTIARY=#3a3a38
```

### 4. Crear base de datos

```sql
CREATE DATABASE recetas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. Ejecutar migraciones

```bash
npm run migrate
```

Esto creará la tabla `users` con todos los campos necesarios.

### 6. Iniciar servidor

```bash
# Desarrollo (con nodemon - recarga automática)
npm run dev

# Producción
npm start
```

### 7. Acceder a la aplicación

Abre tu navegador en: **http://localhost:3000**

---

## 📁 Estructura del Proyecto

```
recetabook/
├── config/
│   ├── database.js          # Configuración Sequelize
│   └── session.js           # Configuración de sesiones
├── migrations/
│   └── YYYYMMDDHHMMSS-create-users.js
├── models/
│   ├── index.js             # Configuración de modelos
│   └── User.js              # Modelo de usuario
├── routes/
│   ├── auth.routes.js       # Rutas de autenticación
│   ├── user.routes.js       # Rutas de perfil
│   └── settings.routes.js   # Rutas de configuración
├── controllers/
│   ├── authController.js    # Lógica de auth
│   ├── userController.js    # Lógica de perfiles
│   └── settingsController.js # Lógica de configuración
├── middleware/
│   ├── auth.js              # Middleware de autenticación
│   ├── validation.js        # Validaciones con express-validator
│   └── upload.js            # Configuración de Multer
├── views/
│   ├── layout.ejs           # Layout principal
│   ├── home.ejs             # Página de inicio
│   ├── 404.ejs              # Página 404
│   ├── error.ejs            # Página de error
│   ├── partials/
│   │   ├── navbar.ejs       # Barra de navegación
│   │   └── footer.ejs       # Footer
│   ├── auth/
│   │   ├── register.ejs     # Formulario de registro
│   │   └── login.ejs        # Formulario de login
│   └── user/
│       ├── profile.ejs      # Perfil público
│       ├── edit-profile.ejs # Editar perfil
│       ├── settings.ejs     # Configuración
│       ├── followers.ejs    # Lista de seguidores
│       └── following.ejs    # Lista de siguiendo
├── public/
│   ├── css/
│   │   ├── main.css         # Estilos base
│   │   ├── theme.css        # Variables de tema
│   │   └── components.css   # Componentes
│   ├── js/
│   │   ├── main.js          # JavaScript principal
│   │   └── theme-toggle.js  # Toggle de tema
│   ├── images/
│   │   └── placeholders/    # Imágenes por defecto
│   └── uploads/
│       └── users/           # Archivos de usuarios
│           └── {username}/  # Carpeta por usuario
│               ├── avatar.jpg
│               ├── cover.jpg
│               └── recipes/ # Carpeta de recetas (Fase 2)
├── utils/
│   └── helpers.js           # Funciones auxiliares
├── .env.example             # Ejemplo de variables de entorno
├── .env                     # Variables de entorno (NO subir a git)
├── .gitignore
├── package.json
├── server.js                # Archivo principal
├── README.md                # Este archivo
├── FASE-1A-REGISTRO.md      # Documentación Fase 1A
├── FASE-1B-PERFIL.md        # Documentación Fase 1B
└── FASE-1E-CONFIGURACION.md # Documentación Fase 1E
```

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor con nodemon (recarga automática)

# Producción
npm start            # Inicia servidor en modo producción

# Base de datos
npm run migrate      # Ejecuta migraciones pendientes
npm run migrate:undo # Revierte última migración

# Utilidades
npm run clean        # Limpia archivos temporales
```

---

## 🎨 Personalización

### Cambiar colores del tema

Edita las variables en `.env`:

```env
# Tema Claro
PRIMARY_COLOR=#3B82F6      # Azul principal
SECONDARY_COLOR=#06B6D4    # Cyan secundario
SUCCESS_COLOR=#10B981      # Verde éxito
ERROR_COLOR=#EF4444        # Rojo error
WARNING_COLOR=#F59E0B      # Amarillo advertencia

# Tema Oscuro
DARK_PRIMARY_COLOR=#60A5FA
DARK_SECONDARY_COLOR=#22D3EE
DARK_BG_PRIMARY=#1a1a18
DARK_BG_SECONDARY=#262624
DARK_BG_TERTIARY=#3a3a38
```

### Cambiar nombre y branding

```env
APP_NAME=TuApp
APP_TITLE=TuApp - Tu Slogan
APP_DESCRIPTION=Descripción de tu aplicación
```

### Configurar límites de uploads

```env
MAX_FILE_SIZE=5242880                                    # 5MB en bytes
ALLOWED_IMAGE_TYPES=image/jpeg,image/jpg,image/png       # Tipos permitidos
```

---

## 🧪 Probar la Aplicación

### 1. Registro de Usuario

1. Ve a: `http://localhost:3000/auth/register`
2. Completa el formulario
3. Click en "Crear Cuenta"

### 2. Login

1. Ve a: `http://localhost:3000/auth/login`
2. Ingresa email/username y contraseña
3. Click en "Iniciar Sesión"

### 3. Ver Perfil

1. Desde navbar: Click en tu avatar → "Mi Perfil"
2. O directo: `http://localhost:3000/user/tuusername`

### 4. Editar Perfil

1. Desde navbar: Click en avatar → "Editar Perfil"
2. O directo: `http://localhost:3000/user/edit`
3. Sube avatar y cover
4. Completa información personal
5. Agrega redes sociales

### 5. Configuración

1. Desde navbar: Click en avatar → "Configuración"
2. O directo: `http://localhost:3000/settings`
3. Prueba cambiar email, contraseña
4. Explora ajustes de privacidad

---

## 🔐 Seguridad

### Implementaciones de Seguridad

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Sesiones con secret seguro
- ✅ Validaciones server-side con express-validator
- ✅ Protección CSRF (preparado)
- ✅ Sanitización de inputs
- ✅ Verificación de contraseña en acciones críticas
- ✅ Confirmación explícita para eliminar cuenta
- ✅ Límites de tamaño de archivos
- ✅ Validación de tipos de archivo

### Mejores Prácticas

- Variables sensibles en `.env` (no en código)
- `.env` en `.gitignore`
- Validación tanto cliente como servidor
- Mensajes de error genéricos (no revelan info)
- Logout destruye sesión completamente

---

## 🐛 Solución de Problemas

### Error: Cannot connect to MySQL

**Solución:**
1. Verifica que MySQL esté corriendo: `mysql --version`
2. Verifica credenciales en `.env`
3. Asegúrate de que la base de datos exista
4. Verifica el puerto (por defecto 3306)

### Error: Puerto ya en uso

**Solución:**
- Cambia el puerto en `.env`: `PORT=3001`
- O detén el proceso: `lsof -ti:3000 | xargs kill`

### Error: Module not found

**Solución:**
```bash
npm install
```

### Error: Session secret required

**Solución:**
- Genera un secret aleatorio en `.env`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- Copia el resultado a `SESSION_SECRET` en `.env`

### Las imágenes no se muestran

**Solución:**
1. Verifica que la carpeta `public/uploads` existe
2. Verifica permisos de escritura
3. En Windows, ejecuta como administrador si es necesario
4. Refresca el navegador (Ctrl + Shift + R)

### Error al subir archivos

**Solución:**
1. Verifica que `multer` y `sharp` estén instalados:
```bash
npm install multer sharp --save
```
2. Verifica permisos de la carpeta `public/uploads`
3. Verifica que el archivo sea < 5MB y tipo válido

### Base de datos no se crea

**Solución:**
1. Crea manualmente:
```sql
CREATE DATABASE recetas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2. Ejecuta migraciones:
```bash
npm run migrate
```

---

## 📚 Documentación Adicional

- `FASE-1A-REGISTRO.md` - Detalles del sistema de registro
- `FASE-1B-PERFIL.md` - Detalles del sistema de perfiles
- `FASE-1E-CONFIGURACION.md` - Detalles de configuración
- `PROYECTO-RECETAS-ROADMAP.md` - Roadmap completo del proyecto

---

## 🔄 Próximos Pasos (Fase 2)

### Sistema de Recetas

- [ ] Modelo Recipe con relaciones
- [ ] Crear receta (formulario multi-paso)
- [ ] Upload múltiple de fotos por receta
- [ ] Ingredientes estructurados
- [ ] Pasos con imágenes opcionales
- [ ] Categorías y etiquetas
- [ ] Dificultad y tiempo de preparación
- [ ] Vista detalle de receta
- [ ] Editar y eliminar recetas
- [ ] Listar recetas en perfil de usuario
- [ ] Carpetas por receta: `/uploads/users/{username}/recipes/{recipeId}/`

---

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

ISC

---

## 👤 Autor

Desarrollado con ❤️ para la comunidad gastronómica

---

## 🙏 Agradecimientos

- Font Awesome por los iconos
- Sequelize por el ORM
- Express.js por el framework
- Sharp por la optimización de imágenes
- La comunidad de Node.js

---

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:

1. Revisa la sección de **Solución de Problemas**
2. Consulta la documentación en la carpeta del proyecto
3. Abre un issue en GitHub

---

**¡Feliz desarrollo! 🚀🍳**
