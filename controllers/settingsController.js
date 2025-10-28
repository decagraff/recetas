const User = require('../models/User');
const { validationResult } = require('express-validator');
const { deleteUserFolder } = require('../middleware/upload');

/* ===========================================
   MOSTRAR CONFIGURACIÓN
   =========================================== */

exports.showSettings = async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.redirect('/auth/logout');
    }
    
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [],
      success: false,
      activeTab: 'account'
    });
    
  } catch (error) {
    console.error('❌ Error al cargar configuración:', error);
    res.status(500).render('error', {
      title: 'Error',
      page: 'error',
      error: {
        status: 500,
        message: 'Error al cargar la configuración'
      }
    });
  }
};

/* ===========================================
   CAMBIAR CONTRASEÑA
   =========================================== */

exports.changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    const userId = req.session.user.id;
    
    const user = await User.findByPk(userId);
    
    if (!errors.isEmpty()) {
      return res.render('user/settings', {
        title: 'Configuración',
        page: 'settings',
        user: user,
        errors: errors.array(),
        success: false,
        activeTab: 'security'
      });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    // Verificar contraseña actual
    const isValidPassword = await user.comparePassword(currentPassword);
    
    if (!isValidPassword) {
      return res.render('user/settings', {
        title: 'Configuración',
        page: 'settings',
        user: user,
        errors: [{ msg: 'La contraseña actual es incorrecta' }],
        success: false,
        activeTab: 'security'
      });
    }
    
    // Actualizar contraseña (se hasheará automáticamente)
    await user.update({ password: newPassword });
    
    console.log('✅ Contraseña actualizada:', user.username);
    
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [],
      success: 'Contraseña actualizada exitosamente',
      activeTab: 'security'
    });
    
  } catch (error) {
    console.error('❌ Error al cambiar contraseña:', error);
    
    const user = await User.findByPk(req.session.user.id);
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [{ msg: 'Error al cambiar contraseña' }],
      success: false,
      activeTab: 'security'
    });
  }
};

/* ===========================================
   CAMBIAR EMAIL
   =========================================== */

exports.changeEmail = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { newEmail, password } = req.body;
    
    const user = await User.findByPk(userId);
    
    // Verificar contraseña
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      return res.render('user/settings', {
        title: 'Configuración',
        page: 'settings',
        user: user,
        errors: [{ msg: 'Contraseña incorrecta' }],
        success: false,
        activeTab: 'account'
      });
    }
    
    // Verificar si el email ya existe
    const existingUser = await User.findOne({
      where: { email: newEmail }
    });
    
    if (existingUser && existingUser.id !== userId) {
      return res.render('user/settings', {
        title: 'Configuración',
        page: 'settings',
        user: user,
        errors: [{ msg: 'Este email ya está en uso' }],
        success: false,
        activeTab: 'account'
      });
    }
    
    // Actualizar email
    await user.update({ 
      email: newEmail,
      isEmailVerified: false // Requerir verificación nuevamente
    });
    
    // Actualizar sesión
    req.session.user.email = newEmail;
    
    console.log('✅ Email actualizado:', user.username);
    
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [],
      success: 'Email actualizado exitosamente',
      activeTab: 'account'
    });
    
  } catch (error) {
    console.error('❌ Error al cambiar email:', error);
    
    const user = await User.findByPk(req.session.user.id);
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [{ msg: 'Error al cambiar email' }],
      success: false,
      activeTab: 'account'
    });
  }
};

/* ===========================================
   ELIMINAR CUENTA
   =========================================== */

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { password, confirmDelete } = req.body;
    
    const user = await User.findByPk(userId);
    
    // Verificar contraseña
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      return res.render('user/settings', {
        title: 'Configuración',
        page: 'settings',
        user: user,
        errors: [{ msg: 'Contraseña incorrecta' }],
        success: false,
        activeTab: 'danger'
      });
    }
    
    // Verificar confirmación
    if (confirmDelete !== 'ELIMINAR') {
      return res.render('user/settings', {
        title: 'Configuración',
        page: 'settings',
        user: user,
        errors: [{ msg: 'Debes escribir "ELIMINAR" para confirmar' }],
        success: false,
        activeTab: 'danger'
      });
    }
    
    const username = user.username;
    
    // Eliminar archivos del usuario
    deleteUserFolder(username);
    
    // TODO: En fases futuras, eliminar también:
    // - Recetas del usuario
    // - Comentarios
    // - Likes
    // - Seguidores/Siguiendo
    
    // Eliminar usuario
    await user.destroy();
    
    console.log('🗑️  Cuenta eliminada:', username);
    
    // Destruir sesión
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir sesión:', err);
      }
      res.redirect('/auth/register?deleted=true');
    });
    
  } catch (error) {
    console.error('❌ Error al eliminar cuenta:', error);
    
    const user = await User.findByPk(req.session.user.id);
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [{ msg: 'Error al eliminar cuenta' }],
      success: false,
      activeTab: 'danger'
    });
  }
};

/* ===========================================
   ACTUALIZAR PRIVACIDAD
   =========================================== */

exports.updatePrivacy = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findByPk(userId);
    
    // TODO: Agregar campos de privacidad en migración futura
    // Por ahora solo guardamos isActive
    
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [],
      success: 'Configuración de privacidad actualizada',
      activeTab: 'privacy'
    });
    
  } catch (error) {
    console.error('❌ Error al actualizar privacidad:', error);
    
    const user = await User.findByPk(req.session.user.id);
    res.render('user/settings', {
      title: 'Configuración',
      page: 'settings',
      user: user,
      errors: [{ msg: 'Error al actualizar privacidad' }],
      success: false,
      activeTab: 'privacy'
    });
  }
};
