const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { isAuthenticated } = require('../middleware/auth');
const { changePasswordValidation } = require('../middleware/validation');

/* ===========================================
   RUTAS DE CONFIGURACIÓN
   =========================================== */

// Ver configuración
router.get('/', isAuthenticated, settingsController.showSettings);

// Cambiar contraseña
router.post('/password', isAuthenticated, changePasswordValidation, settingsController.changePassword);

// Cambiar email
router.post('/email', isAuthenticated, settingsController.changeEmail);

// Actualizar privacidad
router.post('/privacy', isAuthenticated, settingsController.updatePrivacy);

// Eliminar cuenta
router.post('/delete', isAuthenticated, settingsController.deleteAccount);

module.exports = router;
