/**
 * Main JavaScript - Funcionalidad general
 */
document.documentElement.classList.add('wf-active');
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 App inicializada');
    
    // Inicializar componentes
    initUserMenu();
    initMobileMenu();
    initSearch();
});

/* ===========================================
   USER MENU DROPDOWN
   =========================================== */

function initUserMenu() {
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuToggle && userDropdown) {
        userMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', function() {
            userDropdown.classList.remove('active');
        });
        
        // Prevenir cierre al hacer click dentro del dropdown
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

/* ===========================================
   MOBILE MENU
   =========================================== */

function initMobileMenu() {
    const navbarToggle = document.getElementById('navbarToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (navbarToggle && mobileMenu) {
        navbarToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    if (mobileMenu) {
        // Cerrar al hacer click en el overlay
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    }
}

/* ===========================================
   SEARCH
   =========================================== */

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        // Atajo de teclado: "/" para focus en búsqueda
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                searchInput.focus();
            }
        });
        
        // TODO: Implementar autocompletado en fases futuras
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value;
            if (query.length >= 2) {
                console.log('Buscando:', query);
                // Aquí irá la lógica de búsqueda
            }
        }, 300));
    }
}

/* ===========================================
   UTILIDADES
   =========================================== */

// Debounce para limitar ejecución de funciones
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Toast notifications
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Mostrar
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Ocultar y remover
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Confirmar acción
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Formatear fecha
function formatDate(date) {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000); // segundos
    
    if (diff < 60) return 'Ahora';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
    if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;
    
    return d.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Copiar al portapapeles
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copiado al portapapeles', 'success');
        return true;
    } catch (err) {
        showToast('Error al copiar', 'error');
        return false;
    }
}

// Exportar funciones globales
window.AppUtils = {
    showToast,
    confirmAction,
    formatDate,
    copyToClipboard,
    debounce
};

console.log('✅ Main.js cargado');
