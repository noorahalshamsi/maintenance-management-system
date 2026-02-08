// ===================================
// QR CODE HANDLER
// ===================================

let html5QrCode = null;

// ===================================
// QR SCANNER INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    setupQRScanner();
});

function setupQRScanner() {
    const floatingBtn = document.getElementById('floatingQrBtn');
    const closeBtn = document.getElementById('closeQrModal');
    const modal = document.getElementById('qrScannerModal');

    floatingBtn.addEventListener('click', openQRScanner);
    closeBtn.addEventListener('click', closeQRScanner);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeQRScanner();
        }
    });
}

// ===================================
// QR SCANNER FUNCTIONS
// ===================================

function openQRScanner() {
    const modal = document.getElementById('qrScannerModal');
    modal.classList.add('active');

    // Initialize scanner
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("qrReader");
    }

    // Start scanning
    startScanning();
}

function closeQRScanner() {
    const modal = document.getElementById('qrScannerModal');
    modal.classList.remove('active');

    // Stop scanning
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            console.log('QR Scanner stopped');
        }).catch(err => {
            console.error('Error stopping scanner:', err);
        });
    }
}

function startScanning() {
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };

    html5QrCode.start(
        { facingMode: "environment" }, // Use back camera
        config,
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error('Unable to start scanner:', err);

        // Fallback: try with front camera
        html5QrCode.start(
            { facingMode: "user" },
            config,
            onScanSuccess,
            onScanError
        ).catch(err2 => {
            console.error('Camera access denied:', err2);
            alert('Camera access is required to scan QR codes. Please grant camera permissions and try again.');
            closeQRScanner();
        });
    });
}

function onScanSuccess(decodedText, decodedResult) {
    console.log('QR Code scanned:', decodedText);

    // Close scanner
    closeQRScanner();

    // Parse the URL to get equipment ID
    try {
        const url = new URL(decodedText);
        const equipmentId = url.searchParams.get('equipment');

        if (equipmentId) {
            const equipment = findEquipmentById(equipmentId);
            if (equipment) {
                // Find which site this equipment belongs to
                for (const site in sitesData) {
                    if (sitesData[site].equipment.find(eq => eq.id === equipmentId)) {
                        currentSite = site;
                        switchSite(site);
                        setTimeout(() => showEquipmentDetail(equipmentId), 100);
                        break;
                    }
                }
            } else {
                alert('Equipment not found');
            }
        } else {
            alert('Invalid QR code');
        }
    } catch (error) {
        console.error('Error parsing QR code:', error);
        alert('Invalid QR code format');
    }
}

function onScanError(errorMessage) {
    // Ignore scan errors (they happen frequently while scanning)
    // Only log to console for debugging
    // console.warn('QR Scan error:', errorMessage);
}

// ===================================
// QR CODE GENERATION
// ===================================

// The generateQRCode function is in app.js
// This file only handles scanning

// ===================================
// UTILITY: Find Equipment (if not already defined)
// ===================================

// This function is defined in app.js, but we include a fallback
// in case this script loads before app.js
if (typeof findEquipmentById === 'undefined') {
    window.findEquipmentById = function (id) {
        if (typeof sitesData === 'undefined') return null;

        for (const site in sitesData) {
            const equipment = sitesData[site].equipment.find(eq => eq.id === id);
            if (equipment) return equipment;
        }
        return null;
    };
}
