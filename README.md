# EPAM Estates - Real Estate Platform

## Description

EPAM Estates is a modern real estate platform showcasing properties across Romania. Built with pure JavaScript and SCSS, this project demonstrates responsive design, interactive features, and modern web development practices.

### Key Features

- **Interactive Property Gallery**
  - Filterable property listings
  - Search functionality
  - Dynamic loading with "Show More" button
  - Property type categorization (Houses, Apartments, Cabins)
  - Price and size sorting options

- **Dynamic Home Page**
  - Responsive image slider
  - Modern navigation with dropdown menus on mobile
  - Mobile-friendly design

- **Interactive Map Integration**
  - OpenStreetMap integration
  - Property location markers using latitude and longitute values
  - Interactive location viewing

### Technical Details

- **Frontend Technologies**
  - HTML5
  - CSS3/SCSS
  - Vanilla JavaScript (ES6+)
  - OpenStreetMap API using leaflet.js package ( official Google Maps API required paid subsciption)
  - Responsive Images

- **Development Tools**
  - SASS compiler
  - Live Server
  - Node.js package management
  - VS Code development environment

- **Project Structure**
  - Modular SCSS architecture
  - Component-based organization
  - JSON data management

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Features
- Lazy loading images
- Optimized asset delivery
- Responsive image sizing
- Modular JavaScript architecture

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) 

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <project_folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Compile Sass to CSS
To manually compile Sass files:
```bash
npm run compile
```

### 4. Start the Project - Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
   - Click the Extensions icon in the sidebar or press `Ctrl+Shift+X`
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

2. Start Live Server
   - Right-click on `src/index.html`
   - Select "Open with Live Server"
   - Your default browser will open automatically at `http://127.0.0.1:5500/src/`



## Folder Structure
```
/capstone-project-template
  ├── styles/
  │   ├── main.scss
  │   ├── nav.scss
  │   ├── gallery.scss
  │   ├── contact.scss
  │   ├── variables.scss
  ├── src/
  │   ├── index.html
  │   ├── gallery.html
  │   ├── contact.html
  │   ├── properties.json
  │   ├── utils/
  │   │   └── images/
  │   │       ├── gallery/
  │   │       ├── icons/
  │   └── scripts/
  │       ├── slider.js
  │       ├── mobileNav.js
  │       ├── gallery.js
  │       ├── galleryRenderer.js
  │       ├── filters.js
  │       └── contact.js
  ├── package.json
  └── README.md
```
