# Maintenance Management System

A premium web-based platform for managing equipment maintenance across 4 sites with QR code functionality and glassy white design.

## 🚀 Quick Start

1. **Open the application:**
   - Double-click `index.html` to open in your browser
   - Or use a local server for best experience

2. **Browse equipment:**
   - Select a site from the navigation
   - Click on any equipment card to view details
   - Use the search bar to find specific equipment

3. **Admin access:**
   - Username: `admin`
   - Password: `admin123`
   - Edit equipment details when logged in

## 📱 Features

- ✨ **Premium Glassy White Design** with glassmorphism effects
- 🏢 **4 Sites:** MGS (Riyadh), Jafurah, Ras Tanura, Dhahran
- 📋 **15 Equipment Items** with full maintenance details
- 🔍 **Search & Filter** functionality
- 🔐 **Admin Authentication** for editing
- 📷 **QR Code Generation** for each equipment
- 📱 **QR Scanner** using device camera
- 📱 **Fully Responsive** design

## 🎨 Design Highlights

- Glassmorphism effects with backdrop-filter blur
- Smooth animations and micro-interactions
- Premium typography (Google Fonts - Inter)
- Color-coded status badges
- Responsive grid layouts
- Vibrant gradient background

## 🏗️ Project Structure

```
maintenance-management-system/
├── index.html          # Main HTML structure
├── styles.css          # Glassy white design system (820 lines)
├── app.js              # Core application logic (656 lines)
├── qr-handler.js       # QR code functionality (156 lines)
├── README.md           # This file
└── assets/
    ├── rd-logo.png     # R&D Research & Development logo
    └── binquraya-logo.png  # Bin Quraya Construction logo
```

## 📊 Equipment Data

### MGS (Riyadh) - 4 items
- Excavator CAT 320
- Bulldozer Caterpillar D8T
- Crane Liebherr LTM 1200
- Articulated Dump Truck Volvo A40G

### Jafurah - 3 items
- Drilling Rig Atlas Copco
- Air Compressor Ingersoll Rand
- Generator Caterpillar 500kW

### Ras Tanura - 4 items
- Forklift Toyota 8FD25
- Centrifugal Pump Sulzer
- Tank Cleaning Robot
- Fire Truck Rosenbauer

### Dhahran - 5 items
- Welding Machine Miller
- Air Compressor Atlas Copco
- CNC Machine Haas VF-4
- Overhead Crane 20T
- Pressure Washer Karcher

## 🔧 Technical Stack

- **HTML5** - Semantic structure with SEO optimization
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** - ES6+ features
- **QRCode.js** - QR code generation
- **html5-qrcode** - Camera-based QR scanning
- **Google Fonts** - Inter font family

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Older browsers may not support backdrop-filter

## 📝 Usage

### For Regular Users

1. **View Equipment:**
   - Select a site from the top navigation
   - Browse equipment cards
   - Click any card to see full details

2. **Search Equipment:**
   - Type in the search bar
   - Results filter in real-time

3. **Scan QR Codes:**
   - Click the floating QR button (bottom-right)
   - Grant camera permissions
   - Point at equipment QR code

### For Administrators

1. **Login:**
   - Click "Admin Login" in header
   - Enter: admin / admin123

2. **Edit Equipment:**
   - Click the edit icon (✏️) on any card
   - Modify details in the modal
   - Click "Save Changes"

3. **Logout:**
   - Click "Logout" button when finished

## ⚠️ Important Notes

> **Authentication:** Current implementation uses client-side authentication for demo purposes. For production, implement proper backend authentication.

> **Data Storage:** Equipment data is stored in JavaScript objects. For production, integrate with a backend database.

> **Camera Permissions:** QR scanner requires camera access. Users will be prompted to grant permissions.

## 🚀 Deployment

For production deployment:

1. **Backend Integration:**
   - Add REST API for data management
   - Implement secure authentication (JWT)
   - Use database (MongoDB, PostgreSQL)

2. **Hosting:**
   - Deploy to web server (Nginx, Apache)
   - Use HTTPS for security
   - Configure CORS if needed

3. **Enhancements:**
   - Add maintenance history logs
   - Implement notifications
   - Add file attachments
   - Create analytics dashboard

## 📄 License

This project was created for equipment maintenance management.

## 👥 Credits

- **Design:** Premium glassy white aesthetic with glassmorphism
- **Logos:** R&D Research & Development, Bin Quraya Construction
- **Built with:** HTML, CSS, JavaScript

---

**Ready to use!** Open `index.html` in your browser to get started. 🎉
