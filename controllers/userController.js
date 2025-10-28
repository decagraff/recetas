const User = require('../models/User');
const { Op } = require('sequelize');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

/* ===========================================
   VER PERFIL PÚBLICO
   =========================================== */

exports.showProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    // Buscar usuario
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).render('404', {
        title: 'Usuario no encontrado',
        page: '404'
      });
    }
    
    // Verificar si es el propio perfil
    const isOwnProfile = req.session.user && req.session.user.id === user.id;
    
    // TODO: En fases futuras, cargar recetas, seguidores, etc.
    const recipes = [];
    const isFollowing = false;
    
    res.render('user/profile', {
      title: `@${user.username}`,
      page: 'profile',
      profileUser: user,
      isOwnProfile,
      isFollowing,
      recipes,
      activeTab: 'recipes'
    });
    
  } catch (error) {
    console.error('❌ Error al cargar perfil:', error);
    res.status(500).render('error', {
      title: 'Error',
      page: 'error',
      error: {
        status: 500,
        message: 'Error al cargar el perfil'
      }
    });
  }
};

/* ===========================================
   MOSTRAR FORMULARIO EDITAR PERFIL
   =========================================== */

exports.showEditProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.redirect('/auth/logout');
    }
    
    res.render('user/edit-profile', {
      title: 'Editar Perfil',
      page: 'edit-profile',
      profileUser: user,
      errors: [],
      success: false
    });
    
  } catch (error) {
    console.error('❌ Error al cargar edición de perfil:', error);
    res.status(500).render('error', {
      title: 'Error',
      page: 'error',
      error: {
        status: 500,
        message: 'Error al cargar la página'
      }
    });
  }
};

/* ===========================================
   ACTUALIZAR PERFIL
   =========================================== */

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.redirect('/auth/logout');
    }
    
    const {
      firstName,
      lastName,
      bio,
      country,
      city,
      website,
      instagram,
      twitter,
      facebook,
      youtube
    } = req.body;
    
    // Actualizar campos
    await user.update({
      firstName: firstName || null,
      lastName: lastName || null,
      bio: bio || null,
      country: country || null,
      city: city || null,
      website: website || null,
      instagram: instagram || null,
      twitter: twitter || null,
      facebook: facebook || null,
      youtube: youtube || null
    });
    
    // Actualizar sesión
    req.session.user.firstName = user.firstName;
    req.session.user.lastName = user.lastName;
    
    console.log('✅ Perfil actualizado:', user.username);
    
    res.render('user/edit-profile', {
      title: 'Editar Perfil',
      page: 'edit-profile',
      profileUser: user,
      errors: [],
      success: true
    });
    
  } catch (error) {
    console.error('❌ Error al actualizar perfil:', error);
    
    const user = await User.findByPk(req.session.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    res.render('user/edit-profile', {
      title: 'Editar Perfil',
      page: 'edit-profile',
      profileUser: user,
      errors: [{ msg: 'Error al actualizar el perfil' }],
      success: false
    });
  }
};

/* ===========================================
   MOSTRAR SEGUIDORES
   =========================================== */

exports.showFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).render('404', {
        title: 'Usuario no encontrado',
        page: '404'
      });
    }
    
    // TODO: Implementar en Fase 3 (relaciones)
    const followers = [];
    
    res.render('user/followers', {
      title: `Seguidores de @${user.username}`,
      page: 'followers',
      profileUser: user,
      followers
    });
    
  } catch (error) {
    console.error('❌ Error al cargar seguidores:', error);
    res.status(500).render('error', {
      title: 'Error',
      page: 'error',
      error: {
        status: 500,
        message: 'Error al cargar seguidores'
      }
    });
  }
};

/* ===========================================
   MOSTRAR SIGUIENDO
   =========================================== */

exports.showFollowing = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).render('404', {
        title: 'Usuario no encontrado',
        page: '404'
      });
    }
    
    // TODO: Implementar en Fase 3 (relaciones)
    const following = [];
    
    res.render('user/following', {
      title: `@${user.username} sigue a`,
      page: 'following',
      profileUser: user,
      following
    });
    
  } catch (error) {
    console.error('❌ Error al cargar siguiendo:', error);
    res.status(500).render('error', {
      title: 'Error',
      page: 'error',
      error: {
        status: 500,
        message: 'Error al cargar siguiendo'
      }
    });
  }
};

/* ===========================================
   ACTUALIZAR AVATAR
   =========================================== */

exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }
    
    // Procesar imagen con Sharp (optimizar y redimensionar)
    const username = req.session.user.username;
    const ext = path.extname(req.file.filename);
    const outputPath = path.join(
      __dirname,
      '../public/uploads/users',
      username,
      `avatar${ext}`
    );
    
    await sharp(req.file.path)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath + '.tmp');
    
    // Reemplazar archivo original
    fs.unlinkSync(req.file.path);
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    // Actualizar en base de datos
    const avatarUrl = `/uploads/users/${username}/avatar${ext}`;
    await user.update({ avatar: avatarUrl });
    
    // Actualizar sesión
    req.session.user.avatar = avatarUrl;
    
    console.log('✅ Avatar actualizado:', username);
    
    res.json({ 
      success: true, 
      avatarUrl: avatarUrl + '?t=' + Date.now() // Cache bust
    });
    
  } catch (error) {
    console.error('❌ Error al actualizar avatar:', error);
    res.status(500).json({ error: 'Error al actualizar avatar' });
  }
};

/* ===========================================
   ACTUALIZAR COVER
   =========================================== */

exports.updateCover = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }
    
    // Procesar imagen con Sharp
    const username = req.session.user.username;
    const ext = path.extname(req.file.filename);
    const outputPath = path.join(
      __dirname,
      '../public/uploads/users',
      username,
      `cover${ext}`
    );
    
    await sharp(req.file.path)
      .resize(1200, 400, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath + '.tmp');
    
    // Reemplazar archivo original
    fs.unlinkSync(req.file.path);
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    // Actualizar en base de datos
    const coverUrl = `/uploads/users/${username}/cover${ext}`;
    await user.update({ coverImage: coverUrl });
    
    console.log('✅ Cover actualizado:', username);
    
    res.json({ 
      success: true, 
      coverUrl: coverUrl + '?t=' + Date.now()
    });
    
  } catch (error) {
    console.error('❌ Error al actualizar cover:', error);
    res.status(500).json({ error: 'Error al actualizar portada' });
  }
};

