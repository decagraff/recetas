require('dotenv').config();

const themeConfig = {
  light: {
    primary: process.env.PRIMARY_COLOR || '#3B82F6',
    secondary: process.env.SECONDARY_COLOR || '#06B6D4',
  },
  dark: {
    primary: process.env.DARK_PRIMARY_COLOR || '#60A5FA',
    secondary: process.env.DARK_SECONDARY_COLOR || '#22D3EE',
    bgPrimary: process.env.DARK_BG_PRIMARY || '#262624',
    bgSecondary: process.env.DARK_BG_SECONDARY || '#1C1C1A',
  },
  appName: process.env.APP_NAME || 'RecetApp',
  appTitle: process.env.APP_TITLE || 'RecetApp - Comparte tus recetas',
  appDescription: process.env.APP_DESCRIPTION || 'Plataforma social para compartir recetas',
};

module.exports = themeConfig;
