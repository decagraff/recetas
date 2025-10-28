const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isNotAuthenticated } = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../middleware/validation');

/* ===========================================
   RUTAS DE AUTENTICACIÓN
   =========================================== */

// Registro
router.get('/register', isNotAuthenticated, authController.showRegister);
router.post('/register', isNotAuthenticated, registerValidation, authController.register);

// Login
router.get('/login', isNotAuthenticated, authController.showLogin);
router.post('/login', isNotAuthenticated, loginValidation, authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
