/**
 * Theme Toggle - Cambiar entre modo claro y oscuro
 */

(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Detectar tema guardado o preferencia del sistema
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            return savedTheme;
        }
        
        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return 'light';
    }
    
    // Aplicar tema
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        console.log(`🎨 Tema aplicado: ${theme}`);
    }
    
    // Cambiar tema
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    // Inicializar
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // Event listener para el botón
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Detectar cambios en preferencia del sistema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    console.log('✅ Theme toggle inicializado');
})();
