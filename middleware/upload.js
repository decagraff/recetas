const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* ===========================================
   CONFIGURACIÓN DE MULTER - MODULAR POR USUARIO
   =========================================== */

// Función para crear directorio si no existe
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/* ===========================================
   UPLOAD DE AVATAR
   =========================================== */

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.session.user.username;
    const userDir = path.join(__dirname, '../public/uploads/users', username);
    
    // Crear directorio del usuario si no existe
    ensureDirectoryExists(userDir);
    
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    // Siempre se llamará avatar + extensión
    const ext = path.extname(file.originalname);
    cb(null, `avatar${ext}`);
  }
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif, webp)'));
    }
  }
});

/* ===========================================
   UPLOAD DE COVER/PORTADA
   =========================================== */

const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.session.user.username;
    const userDir = path.join(__dirname, '../public/uploads/users', username);
    
    ensureDirectoryExists(userDir);
    
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cover${ext}`);
  }
});

const coverUpload = multer({
  storage: coverStorage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, gif, webp)'));
    }
  }
});

/* ===========================================
   UPLOAD DE RECETAS (Para Fase 2)
   =========================================== */

const recipeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.session.user.username;
    const recipeId = req.params.recipeId || 'temp';
    const recipeDir = path.join(
      __dirname, 
      '../public/uploads/users', 
      username, 
      'recipes',
      recipeId
    );
    
    ensureDirectoryExists(recipeDir);
    
    cb(null, recipeDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  }
});

const recipeUpload = multer({
  storage: recipeStorage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});

/* ===========================================
   FUNCIÓN HELPER: Eliminar archivo anterior
   =========================================== */

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('🗑️  Archivo eliminado:', filePath);
    }
  } catch (error) {
    console.error('❌ Error al eliminar archivo:', error);
  }
};

/* ===========================================
   FUNCIÓN HELPER: Eliminar carpeta de usuario
   =========================================== */

const deleteUserFolder = (username) => {
  try {
    const userDir = path.join(__dirname, '../public/uploads/users', username);
    if (fs.existsSync(userDir)) {
      fs.rmSync(userDir, { recursive: true, force: true });
      console.log('🗑️  Carpeta eliminada:', userDir);
    }
  } catch (error) {
    console.error('❌ Error al eliminar carpeta:', error);
  }
};

/* ===========================================
   FUNCIÓN HELPER: Mover carpeta al cambiar username
   =========================================== */

const renameUserFolder = (oldUsername, newUsername) => {
  try {
    const oldDir = path.join(__dirname, '../public/uploads/users', oldUsername);
    const newDir = path.join(__dirname, '../public/uploads/users', newUsername);
    
    if (fs.existsSync(oldDir)) {
      fs.renameSync(oldDir, newDir);
      console.log('📁 Carpeta renombrada:', oldUsername, '->', newUsername);
    }
  } catch (error) {
    console.error('❌ Error al renombrar carpeta:', error);
  }
};

/* ===========================================
   EXPORTAR
   =========================================== */

module.exports = {
  avatarUpload: avatarUpload.single('avatar'),
  coverUpload: coverUpload.single('cover'),
  recipeUpload: recipeUpload.array('photos', 10), // Máximo 10 fotos
  deleteFile,
  deleteUserFolder,
  renameUserFolder,
  ensureDirectoryExists
};
