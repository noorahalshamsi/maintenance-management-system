// ===================================
// STATE MANAGEMENT
// ===================================

let currentSite = 'all';
let currentEquipment = null;
let isAdmin = false;
let editingEquipment = null;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    renderEquipmentList();
});

function initializeApp() {
    // Check if admin is logged in (from localStorage)
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
        isAdmin = true;
        updateAdminUI();
    }
}

function setupEventListeners() {
    // Site navigation
    document.querySelectorAll('.site-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const site = e.currentTarget.dataset.site;
            switchSite(site);
        });
    });

    // Admin button
    document.getElementById('adminBtn').addEventListener('click', toggleAdminModal);

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportToExcel);

    // Admin login form
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);

    // Modal close buttons
    document.getElementById('closeAdminModal').addEventListener('click', () => {
        document.getElementById('adminModal').classList.remove('active');
    });

    document.getElementById('closeEditModal').addEventListener('click', () => {
        document.getElementById('editModal').classList.remove('active');
    });

    // Edit form
    document.getElementById('editEquipmentForm').addEventListener('submit', handleEditSubmit);

    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
        showView('equipmentListView');
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// ===================================
// SITE MANAGEMENT
// ===================================

function switchSite(siteId) {
    currentSite = siteId;

    // Update active button
    document.querySelectorAll('.site-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-site="${siteId}"]`).classList.add('active');

    // Update title
    if (siteId === 'all') {
        document.getElementById('siteTitle').textContent = 'All Sites - Equipment';
    } else {
        document.getElementById('siteTitle').textContent = `${sitesData[siteId].name} Equipment`;
    }

    // Render equipment
    renderEquipmentList();

    // Show list view
    showView('equipmentListView');
}

// ===================================
// EQUIPMENT RENDERING
// ===================================

function renderEquipmentList(searchTerm = '') {
    const grid = document.getElementById('equipmentGrid');

    // Get equipment based on current site
    let equipment = [];
    if (currentSite === 'all') {
        // Combine all equipment from all sites
        for (const site in sitesData) {
            equipment = equipment.concat(sitesData[site].equipment.map(eq => ({
                ...eq,
                siteName: sitesData[site].name
            })));
        }
    } else {
        equipment = sitesData[currentSite].equipment;
    }

    // Filter equipment based on search
    const filtered = equipment.filter(eq => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return eq.name.toLowerCase().includes(search) ||
            eq.type.toLowerCase().includes(search) ||
            eq.driver.toLowerCase().includes(search) ||
            eq.status.toLowerCase().includes(search) ||
            (eq.siteName && eq.siteName.toLowerCase().includes(search));
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">No equipment found</p>';
        return;
    }

    grid.innerHTML = filtered.map(eq => `
        <div class="equipment-card" onclick="showEquipmentDetail('${eq.id}')">
            <div class="equipment-card-header">
                <div>
                    <div class="equipment-name">${eq.name}</div>
                    <div class="equipment-type">${eq.type}${eq.siteName ? ` • ${eq.siteName}` : ''}</div>
                </div>
                <div class="equipment-actions">
                    ${isAdmin ? `
                        <button class="btn-icon edit" onclick="event.stopPropagation(); openEditModal('${eq.id}')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="equipment-info">
                <div class="info-row">
                    <span class="info-label">Status</span>
                    <span class="status-badge ${eq.status.toLowerCase().replace(/\s+/g, '-')}">${eq.status}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Driver</span>
                    <span class="info-value">${eq.driver}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Last Maintenance</span>
                    <span class="info-value">${formatDate(eq.lastMaintenance)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Location</span>
                    <span class="info-value">${eq.location}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showEquipmentDetail(equipmentId) {
    const equipment = findEquipmentById(equipmentId);
    if (!equipment) return;

    currentEquipment = equipment;

    const detailContainer = document.getElementById('equipmentDetail');
    detailContainer.innerHTML = `
        <div class="detail-header">
            <div class="detail-title">
                <h2>${equipment.name}</h2>
                <p class="detail-subtitle">${equipment.type} • Serial: ${equipment.serialNumber}</p>
            </div>
            <div class="equipment-actions">
                ${isAdmin ? `
                    <button class="btn-icon edit" onclick="openEditModal('${equipment.id}')" style="width: 48px; height: 48px;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                ` : ''}
                <span class="status-badge ${equipment.status.toLowerCase().replace(/\s+/g, '-')}" style="padding: 12px 24px; font-size: 0.875rem;">
                    ${equipment.status}
                </span>
            </div>
        </div>
        
        <div class="detail-grid">
            <div class="detail-card">
                <h3>Driver Name</h3>
                <p>${equipment.driver}</p>
            </div>
            <div class="detail-card">
                <h3>Last Maintenance</h3>
                <p>${formatDate(equipment.lastMaintenance)}</p>
            </div>
            <div class="detail-card">
                <h3>Next Maintenance</h3>
                <p>${formatDate(equipment.nextMaintenance)}</p>
            </div>
            <div class="detail-card">
                <h3>Location</h3>
                <p>${equipment.location}</p>
            </div>
            <div class="detail-card">
                <h3>Working Hours</h3>
                <p>${equipment.workingHours}</p>
            </div>
            <div class="detail-card">
                <h3>Serial Number</h3>
                <p>${equipment.serialNumber}</p>
            </div>
        </div>
        
        <div class="detail-card" style="margin-top: var(--spacing-lg);">
            <h3>Maintenance Notes</h3>
            <p style="font-size: 1rem; font-weight: 400; line-height: 1.6; margin-top: var(--spacing-sm);">
                ${equipment.notes}
            </p>
        </div>
        
        <div class="qr-section">
            <h3>Equipment QR Code</h3>
            <div id="qrCodeContainer"></div>
            <p style="margin-top: var(--spacing-md); color: var(--text-muted);">
                Scan this code to quickly access equipment details
            </p>
        </div>
    `;

    showView('equipmentDetailView');

    // Generate QR code after view is shown
    setTimeout(() => generateQRCode(equipment.id), 100);
}

// ===================================
// ADMIN MANAGEMENT
// ===================================

function toggleAdminModal() {
    if (isAdmin) {
        // Logout
        isAdmin = false;
        localStorage.setItem('isAdmin', 'false');
        updateAdminUI();
        renderEquipmentList();
    } else {
        // Show login modal
        document.getElementById('adminModal').classList.add('active');
    }
}

function handleAdminLogin(e) {
    e.preventDefault();

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Simple demo authentication
    if (username === 'admin' && password === 'admin123') {
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        updateAdminUI();
        document.getElementById('adminModal').classList.remove('active');
        document.getElementById('adminLoginForm').reset();
        renderEquipmentList();

        // Show success message
        alert('Successfully logged in as Admin');
    } else {
        alert('Invalid credentials. Use: admin / admin123');
    }
}

function updateAdminUI() {
    const adminBtn = document.getElementById('adminBtn');
    const adminBtnText = document.getElementById('adminBtnText');
    const exportBtn = document.getElementById('exportBtn');

    if (isAdmin) {
        adminBtn.classList.add('logged-in');
        adminBtnText.textContent = 'Logout';
        exportBtn.style.display = 'flex';
    } else {
        adminBtn.classList.remove('logged-in');
        adminBtnText.textContent = 'Admin Login';
        exportBtn.style.display = 'none';
    }
}

// ===================================
// EXCEL EXPORT FUNCTIONALITY
// ===================================

function exportToExcel() {
    if (!isAdmin) {
        alert('Admin access required');
        return;
    }

    // Collect all equipment data
    const allEquipment = [];
    for (const siteKey in sitesData) {
        const site = sitesData[siteKey];
        site.equipment.forEach(eq => {
            allEquipment.push({
                'Site': site.name,
                'Equipment ID': eq.id,
                'Equipment Name': eq.name,
                'Type': eq.type,
                'Status': eq.status,
                'Driver': eq.driver,
                'Last Maintenance': eq.lastMaintenance,
                'Next Maintenance': eq.nextMaintenance,
                'Location': eq.location,
                'Serial Number': eq.serialNumber,
                'Working Hours': eq.workingHours,
                'Notes': eq.notes
            });
        });
    }

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(allEquipment);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Equipment Report');

    // Generate filename with current date
    const date = new Date();
    const filename = `Equipment_Report_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    alert(`Report exported successfully! Total equipment: ${allEquipment.length}`);
}

// ===================================
// EDIT FUNCTIONALITY
// ===================================

function openEditModal(equipmentId) {
    if (!isAdmin) {
        alert('Admin access required');
        return;
    }

    const equipment = findEquipmentById(equipmentId);
    if (!equipment) return;

    editingEquipment = equipment;

    // Populate form
    document.getElementById('editName').value = equipment.name;
    document.getElementById('editType').value = equipment.type;
    document.getElementById('editStatus').value = equipment.status;
    document.getElementById('editDriver').value = equipment.driver;
    document.getElementById('editLastMaintenance').value = equipment.lastMaintenance;
    document.getElementById('editNextMaintenance').value = equipment.nextMaintenance;
    document.getElementById('editLocation').value = equipment.location;
    document.getElementById('editNotes').value = equipment.notes;

    document.getElementById('editModal').classList.add('active');
}

function handleEditSubmit(e) {
    e.preventDefault();

    if (!editingEquipment) return;

    // Update equipment data
    editingEquipment.name = document.getElementById('editName').value;
    editingEquipment.type = document.getElementById('editType').value;
    editingEquipment.status = document.getElementById('editStatus').value;
    editingEquipment.driver = document.getElementById('editDriver').value;
    editingEquipment.lastMaintenance = document.getElementById('editLastMaintenance').value;
    editingEquipment.nextMaintenance = document.getElementById('editNextMaintenance').value;
    editingEquipment.location = document.getElementById('editLocation').value;
    editingEquipment.notes = document.getElementById('editNotes').value;

    // Close modal
    document.getElementById('editModal').classList.remove('active');

    // Refresh views
    renderEquipmentList();
    if (currentEquipment && currentEquipment.id === editingEquipment.id) {
        showEquipmentDetail(editingEquipment.id);
    }

    editingEquipment = null;

    alert('Equipment updated successfully');
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function handleSearch(e) {
    const searchTerm = e.target.value;
    renderEquipmentList(searchTerm);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}

function findEquipmentById(id) {
    for (const site in sitesData) {
        const equipment = sitesData[site].equipment.find(eq => eq.id === id);
        if (equipment) return equipment;
    }
    return null;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function generateQRCode(equipmentId) {
    const container = document.getElementById('qrCodeContainer');
    if (!container) return;

    container.innerHTML = '';

    // Create QR code with equipment URL
    const qrData = `${window.location.origin}${window.location.pathname}?equipment=${equipmentId}`;

    new QRCode(container, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Check URL for equipment parameter on load
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const equipmentId = urlParams.get('equipment');
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
        }
    }
});
