const { validationResult } = require('express-validator');
const User = require('../models/User');

/* ===========================================
   MOSTRAR FORMULARIO DE REGISTRO
   =========================================== */

exports.showRegister = (req, res) => {
  // Si ya está autenticado, redirigir al home
  if (req.session.user) {
    return res.redirect('/');
  }
  
  res.render('auth/register', {
    title: 'Registrarse',
    page: 'register',
    errors: [],
    formData: {}
  });
};

/* ===========================================
   PROCESAR REGISTRO
   =========================================== */

exports.register = async (req, res) => {
  try {
    // Validar datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/register', {
        title: 'Registrarse',
        page: 'register',
        errors: errors.array(),
        formData: req.body
      });
    }
    
    const { username, email, password, firstName, lastName } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });
    
    if (existingUser) {
      const error = existingUser.username === username 
        ? 'El nombre de usuario ya está en uso'
        : 'El email ya está registrado';
      
      return res.render('auth/register', {
        title: 'Registrarse',
        page: 'register',
        errors: [{ msg: error }],
        formData: req.body
      });
    }
    
    // Crear usuario
    const user = await User.create({
      username,
      email,
      password, // Se hasheará automáticamente por el hook
      firstName: firstName || null,
      lastName: lastName || null
    });
    
    // Crear sesión automáticamente
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };
    
    console.log('✅ Usuario registrado:', user.username);
    
    // Redirigir al home
    res.redirect('/');
    
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.render('auth/register', {
      title: 'Registrarse',
      page: 'register',
      errors: [{ msg: 'Error al registrar usuario. Intenta nuevamente.' }],
      formData: req.body
    });
  }
};

/* ===========================================
   MOSTRAR FORMULARIO DE LOGIN
   =========================================== */

exports.showLogin = (req, res) => {
  // Si ya está autenticado, redirigir al home
  if (req.session.user) {
    return res.redirect('/');
  }
  
  res.render('auth/login', {
    title: 'Iniciar Sesión',
    page: 'login',
    errors: [],
    formData: {}
  });
};

/* ===========================================
   PROCESAR LOGIN
   =========================================== */

exports.login = async (req, res) => {
  try {
    // Validar datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/login', {
        title: 'Iniciar Sesión',
        page: 'login',
        errors: errors.array(),
        formData: req.body
      });
    }
    
    const { emailOrUsername, password } = req.body;
    
    // Buscar usuario por email o username
    const user = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });
    
    if (!user) {
      return res.render('auth/login', {
        title: 'Iniciar Sesión',
        page: 'login',
        errors: [{ msg: 'Credenciales incorrectas' }],
        formData: req.body
      });
    }
    
    // Verificar si está activo
    if (!user.isActive) {
      return res.render('auth/login', {
        title: 'Iniciar Sesión',
        page: 'login',
        errors: [{ msg: 'Tu cuenta ha sido desactivada. Contacta al soporte.' }],
        formData: req.body
      });
    }
    
    // Verificar password
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      return res.render('auth/login', {
        title: 'Iniciar Sesión',
        page: 'login',
        errors: [{ msg: 'Credenciales incorrectas' }],
        formData: req.body
      });
    }
    
    // Actualizar última fecha de login
    await user.update({ lastLoginAt: new Date() });
    
    // Crear sesión
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    };
    
    console.log('✅ Usuario logueado:', user.username);
    
    // Redirigir
    const redirectTo = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
    
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.render('auth/login', {
      title: 'Iniciar Sesión',
      page: 'login',
      errors: [{ msg: 'Error al iniciar sesión. Intenta nuevamente.' }],
      formData: req.body
    });
  }
};

/* ===========================================
   LOGOUT
   =========================================== */

exports.logout = (req, res) => {
  const username = req.session.user?.username;
  
  req.session.destroy((err) => {
    if (err) {
      console.error('❌ Error al cerrar sesión:', err);
      return res.redirect('/');
    }
    
    console.log('✅ Usuario deslogueado:', username);
    res.redirect('/auth/login');
  });
};
