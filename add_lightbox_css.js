const fs = require('fs');

const lightboxCSS = `

/* ===================================
   LIGHTBOX MODAL
   =================================== */
.lightbox {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    align-items: center;
    justify-content: center;
}

.lightbox.active {
    display: flex;
}

.lightbox-content {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    animation: zoomIn 0.3s ease;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 40px;
    color: white;
    font-size: 40px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10000;
    transition: color 0.3s ease;
}

.lightbox-close:hover {
    color: #ccc;
}

@keyframes zoomIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
`;

// Read current CSS
let css = fs.readFileSync('styles.css', 'utf8');

// Check if lightbox CSS already exists
if (!css.includes('.lightbox {')) {
    // Append lightbox CSS
    css += lightboxCSS;
    fs.writeFileSync('styles.css', css);
    console.log('✓ Lightbox CSS added successfully');
} else {
    console.log('✓ Lightbox CSS already exists');
}

// Update index.html version
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/Ver [\d.]+[^<]*/, 'Ver 10.3 - Complete');
fs.writeFileSync('index.html', html);
console.log('✓ Updated version to 10.3');
