# Summer Camp Project

This repository contains both the client-side and server-side code for a Summer Camp web application. The project is designed to manage summer camp activities, classes, instructors, and user enrollments, providing a seamless experience for both administrators and participants.

# Live URL
[Live site](https://school-managements-server.vercel.app)
    
## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Client-Side Setup](#client-side-setup)
- [Server-Side Setup](#server-side-setup)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [License](#license)

## Features
- User authentication and registration
- Class management (add, update, delete, enroll)
- Instructor and admin dashboards
- Payment integration
- Reviews and ratings
- Error handling and 404 pages

## Project Structure
```
summer-camp-client-side/   # React frontend
summer-camp-server_side/   # Node.js/Express backend
```

## Technologies Used
- **Frontend:** React, Tailwind CSS, Firebase Auth
- **Backend:** Node.js, Express.js
- **Database:** (Add your DB, e.g., MongoDB, Firebase Firestore)
- **Other:** Vercel (for deployment), JWT, Stripe (for payments)

## Getting Started

### Prerequisites
- Node.js and npm installed
- (Optional) MongoDB or your chosen database

### Client-Side Setup
1. Navigate to the client folder:
   ```bash
   cd summer-camp-client-side
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Server-Side Setup
1. Navigate to the server folder:
   ```bash
   cd summer-camp-server_side
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## Folder Structure
- `src/Components/` - Reusable React components
- `src/Pages/` - Main pages (Home, Classes, Dashboard, etc.)
- `src/Firebase/` - Firebase configuration
- `src/Provider/` - Context providers (e.g., AuthProvider)
- `src/Route/` - Routing components
- `src/Shared/` - Shared UI elements (Navbar, Footer)
- `public/` - Static assets
- `build/` - Production build output
- `screenshots/` - Project screenshots
