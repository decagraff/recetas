const { body } = require('express-validator');

/* ===========================================
   VALIDACIONES: REGISTRO
   =========================================== */

exports.registerValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('El nombre de usuario es requerido')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos')
    .toLowerCase(),
  
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Confirma tu contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),
  
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder 50 caracteres'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El apellido no puede exceder 50 caracteres')
];

/* ===========================================
   VALIDACIONES: LOGIN
   =========================================== */

exports.loginValidation = [
  body('emailOrUsername')
    .trim()
    .notEmpty().withMessage('El email o nombre de usuario es requerido'),
  
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
];

/* ===========================================
   VALIDACIONES: ACTUALIZAR PERFIL
   =========================================== */

exports.updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El nombre no puede exceder 50 caracteres'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El apellido no puede exceder 50 caracteres'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La biografía no puede exceder 500 caracteres'),
  
  body('country')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El país no puede exceder 50 caracteres'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('La ciudad no puede exceder 50 caracteres'),
  
  body('website')
    .optional()
    .trim()
    .isURL().withMessage('Debe ser una URL válida'),
  
  body('instagram')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El usuario de Instagram no puede exceder 50 caracteres'),
  
  body('twitter')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('El usuario de Twitter no puede exceder 50 caracteres'),
  
  body('facebook')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('La URL de Facebook no puede exceder 100 caracteres'),
  
  body('youtube')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('La URL de YouTube no puede exceder 100 caracteres')
];

/* ===========================================
   VALIDACIONES: CAMBIAR CONTRASEÑA
   =========================================== */

exports.changePasswordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('La contraseña actual es requerida'),
  
  body('newPassword')
    .notEmpty().withMessage('La nueva contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La nueva contraseña debe tener al menos 6 caracteres')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('La nueva contraseña debe ser diferente a la actual');
      }
      return true;
    }),
  
  body('confirmNewPassword')
    .notEmpty().withMessage('Confirma tu nueva contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    })
];
