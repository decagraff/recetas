const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: 'Este nombre de usuario ya está en uso'
    },
    validate: {
      len: {
        args: [3, 50],
        msg: 'El nombre de usuario debe tener entre 3 y 50 caracteres'
      },
      isAlphanumeric: {
        msg: 'El nombre de usuario solo puede contener letras y números'
      }
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: 'Este email ya está registrado'
    },
    validate: {
      isEmail: {
        msg: 'Debe ser un email válido'
      }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: 'La contraseña debe tener al menos 6 caracteres'
      }
    }
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 500],
        msg: 'La biografía no puede exceder 500 caracteres'
      }
    }
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: '/images/placeholders/avatar.png'
  },
  coverImage: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'Debe ser una URL válida'
      }
    }
  },
  instagram: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  facebook: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  youtube: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  socialLinks: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  role: {
    type: DataTypes.ENUM('user', 'verified', 'admin'),
    defaultValue: 'user'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  followerCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  recipeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    // Hash password antes de crear usuario
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    // Hash password antes de actualizar si cambió
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Método de instancia para verificar password
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener nombre completo
User.prototype.getFullName = function() {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  if (this.firstName) return this.firstName;
  if (this.lastName) return this.lastName;
  return this.username;
};

// Método para obtener datos públicos (sin password)
User.prototype.toPublicJSON = function() {
  const { password, ...publicData } = this.get({ plain: true });
  return publicData;
};

module.exports = User;