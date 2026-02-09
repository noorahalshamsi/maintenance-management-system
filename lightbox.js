// ===================================
// LIGHTBOX VIEWER
// ===================================
function openLightbox(src) {
    const lightbox = document.getElementById('imageLightbox');
    const img = document.getElementById('lightboxImage');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('active');
    }
}
window.openLightbox = openLightbox;

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}
window.closeLightbox = closeLightbox;
