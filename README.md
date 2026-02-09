# Maintenance Management System

A comprehensive web-based maintenance management system for tracking equipment across multiple sites.

## Features

- **Multi-Site Management**: Track equipment across 5 sites (MGS Riyadh, Jafurah, Ras Tanura, Zuluf, Yanbu)
- **Equipment Tracking**: Monitor 2000+ pieces of equipment with detailed maintenance records
- **Admin Dashboard**: Secure admin login for editing equipment data
- **Evidence Upload**: Support for multiple image uploads (up to 10 per equipment)
- **Image Gallery**: Uniform thumbnail display with lightbox viewer for full-size images
- **QR Code Integration**: Generate and scan QR codes for quick equipment access
- **Excel Export**: Export equipment data to Excel with site filtering
- **Data Persistence**: LocalStorage-based data persistence
- **Responsive Design**: Glassy white design theme with modern UI

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Libraries**:
  - QRCode.js - QR code generation
  - html5-qrcode - QR code scanning
  - SheetJS (XLSX) - Excel export functionality
- **Storage**: Browser LocalStorage
- **Server**: Static file server (http-server)

## Setup

1. Clone the repository
2. Navigate to the project directory
3. Start a local server:
   ```bash
   npx http-server -p 8080
   ```
4. Open browser to `http://localhost:8080`

## Admin Access

- Username: `admin`
- Password: `admin123`

## Project Structure

```
maintenance-management-system/
├── assets/           # Logo and image assets
├── index.html        # Main application page
├── app.js            # Core application logic
├── styles.css        # Application styles
├── lightbox.js       # Image lightbox functionality
├── qr-handler.js     # QR code handling
└── README.md         # This file
```

## Features in Detail

### Equipment Management
- View all equipment or filter by site
- Search functionality across equipment name, type, driver, and status
- Detailed equipment view with maintenance history
- Admin-only editing capabilities

### Image Gallery
- Upload multiple evidence images per equipment
- Uniform 120x120px square thumbnails
- Click-to-enlarge lightbox viewer
- Delete individual images during editing

### Data Export
- Export all sites or specific site data
- Excel format with comprehensive equipment details
- Includes evidence attachment status

## Version History

- **v10.0** - Production release with project cleanup
- **v9.x** - Cache busting and gallery fixes
- **v8.x** - Lightbox implementation
- **v7.x** - Multi-image support
- **v6.x** - Export functionality
- **v5.x** - UI polish and version control

## License

© 2026 Maintenance Management System. All rights reserved.
