# Magrelo Tattoo Website

## Overview

The Magrelo Tattoo Website is a static frontend application built for a Brazilian tattoo studio. It's designed as a modern, dark-themed website showcasing the studio's work, services, and contact information. The application uses vanilla HTML, CSS, and JavaScript with a focus on visual appeal and user experience.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML/CSS/JavaScript implementation without backend dependencies
- **Single Page Application (SPA)**: All content loads on a single page with smooth scrolling navigation
- **Responsive Design**: Mobile-first approach with responsive layouts for all devices
- **Dark Theme**: Consistent dark color scheme with gold and red accents reflecting tattoo studio aesthetics

### Technology Stack
- **HTML5**: Semantic markup with proper meta tags and accessibility features
- **CSS3**: Modern CSS with custom properties, flexbox, grid, and animations
- **Vanilla JavaScript**: No frameworks - pure JavaScript for interactivity
- **Google Fonts**: Typography using Orbitron, Rajdhani, Metal Mania, and Butcherman fonts
- **Font Awesome**: Icon library for UI elements

## Key Components

### 1. Loading Screen
- Animated loading experience with tattoo needle animation
- Progress bar and branded loading text
- Smooth transition to main content after 3 seconds

### 2. Navigation System
- Fixed navigation bar with logo and menu items
- Mobile-responsive hamburger menu
- Smooth scroll navigation between sections
- Active section highlighting

### 3. Portfolio Gallery
- Image gallery with category filtering
- Lightbox functionality for image viewing
- Navigation between images with prev/next controls
- Responsive grid layout

### 4. Contact System
- Contact form with validation
- Form submission handling (client-side)
- Contact information display

### 5. Interactive Elements
- Scroll-triggered animations
- Back-to-top button
- Hover effects and transitions
- Mobile touch interactions

## Data Flow

### Static Content Flow
1. **Initial Load**: Loading screen displays while assets load
2. **Content Rendering**: HTML structure renders with CSS styling
3. **JavaScript Initialization**: Event listeners and interactive features activate
4. **User Interactions**: Navigation, portfolio filtering, and form interactions

### Portfolio Management
- Images are statically defined in HTML
- JavaScript handles filtering and lightbox functionality
- No dynamic content loading or external API calls

## External Dependencies

### CDN Resources
- **Google Fonts**: Typography resources loaded from Google Fonts CDN
- **Font Awesome**: Icon library loaded from CloudFlare CDN

### Development Environment
- **Python HTTP Server**: Simple local development server on port 5000
- **Node.js 20**: Available for potential build tools or future enhancements
- **Python 3.11**: Used for local development server

## Deployment Strategy

### Current Setup
- **Static Hosting**: Designed for deployment to any static hosting service
- **Local Development**: Python HTTP server for local testing and development
- **No Build Process**: Direct deployment of source files

### Hosting Options
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting
- CDN-based hosting

### Performance Considerations
- Optimized images needed for production
- CSS and JavaScript minification recommended
- CDN integration for faster loading
- Lazy loading for portfolio images

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 27, 2025. Initial setup
- June 27, 2025. Added budget calculator, personal work gallery, and studio photos sections