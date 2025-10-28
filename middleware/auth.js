/* ===========================================
   MIDDLEWARE: Verificar si está autenticado
   =========================================== */

exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  
  // Guardar la URL a la que intentó acceder
  req.session.returnTo = req.originalUrl;
  
  res.redirect('/auth/login');
};

/* ===========================================
   MIDDLEWARE: Verificar si NO está autenticado
   =========================================== */

exports.isNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return next();
  }
  
  res.redirect('/');
};

/* ===========================================
   MIDDLEWARE: Verificar rol
   =========================================== */

exports.hasRole = (roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/auth/login');
    }
    
    // roles puede ser un string o array
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (allowedRoles.includes(req.session.user.role)) {
      return next();
    }
    
    res.status(403).render('error', {
      title: 'Acceso Denegado',
      page: 'error',
      error: {
        status: 403,
        message: 'No tienes permisos para acceder a esta página'
      }
    });
  };
};

/* ===========================================
   MIDDLEWARE: Verificar si es admin
   =========================================== */

exports.isAdmin = exports.hasRole('admin');

/* ===========================================
   MIDDLEWARE: Verificar si es verificado
   =========================================== */

exports.isVerified = exports.hasRole(['verified', 'admin']);
