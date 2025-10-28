require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const { sequelize, testConnection } = require('./config/database');
const themeConfig = require('./config/theme');

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================================
// MIDDLEWARES
// ===========================================

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessions
const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // Cada 15 minutos
  expiration: parseInt(process.env.SESSION_MAX_AGE) || 2592000000 // 30 días
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 2592000000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && process.env.FORCE_HTTPS === 'true'
  }
}));

// Sincronizar tabla de sesiones
sessionStore.sync();

// Variables globales para vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAuthenticated = !!req.session.user;
  res.locals.theme = themeConfig;
  res.locals.appConfig = {
    name: process.env.APP_NAME,
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,
    baseUrl: process.env.BASE_URL,
    messagesEnabled: process.env.MESSAGES_ENABLED === 'true',
    commentsEnabled: process.env.COMMENTS_ENABLED === 'true',
  };
  next();
});

// ===========================================
// RUTAS
// ===========================================

// Ruta temporal de prueba
app.get('/', (req, res) => {
  res.render('home', { 
    title: 'Inicio',
    page: 'home'
  });
});

// ===========================================
// RUTAS DE LA APLICACIÓN
// ===========================================

// Autenticación
app.use('/auth', require('./routes/auth.routes'));

// Usuario
app.use('/user', require('./routes/user.routes'));

// Configuración
app.use('/settings', require('./routes/settings.routes'));

// Aquí irán más rutas
// app.use('/recipe', require('./routes/recipe.routes'));
// etc...

// ===========================================
// ERROR HANDLERS
// ===========================================

// 404
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Página no encontrada',
    page: '404'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  const status = err.status || 500;
  const message = process.env.SHOW_ERRORS === 'true' 
    ? err.message 
    : 'Algo salió mal';
  
  res.status(status).render('error', {
    title: 'Error',
    page: 'error',
    error: {
      status,
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
    }
  });
});

// ===========================================
// INICIAR SERVIDOR
// ===========================================

const startServer = async () => {
  try {
    // Probar conexión a DB
    await testConnection();
    
    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('✅ Modelos sincronizados');
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('');
      console.log('╔════════════════════════════════════════╗');
      console.log(`║  🍳 ${process.env.APP_NAME} - Servidor iniciado`);
      console.log('╠════════════════════════════════════════╣');
      console.log(`║  🌐 URL: ${process.env.BASE_URL}`);
      console.log(`║  📦 Puerto: ${PORT}`);
      console.log(`║  🔧 Entorno: ${process.env.NODE_ENV}`);
      console.log(`║  🎨 Tema: ${themeConfig.appName}`);
      console.log('╚════════════════════════════════════════╝');
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
