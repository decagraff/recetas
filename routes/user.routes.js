const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');
const { updateProfileValidation } = require('../middleware/validation');
const { avatarUpload, coverUpload } = require('../middleware/upload');

/* ===========================================
   RUTAS DE USUARIO
   =========================================== */

// Editar perfil (requiere autenticación)
router.get('/edit', isAuthenticated, userController.showEditProfile);
router.post('/edit', isAuthenticated, updateProfileValidation, userController.updateProfile);

// Upload de avatar y cover
router.post('/avatar', isAuthenticated, avatarUpload, userController.updateAvatar);
router.post('/cover', isAuthenticated, coverUpload, userController.updateCover);

// Ver perfil público (por username)
router.get('/:username', userController.showProfile);

// Seguidores y siguiendo
router.get('/:username/followers', userController.showFollowers);
router.get('/:username/following', userController.showFollowing);

module.exports = router;
