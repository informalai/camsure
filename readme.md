# 🧭 Compass - Environmental Compliance Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Compass** is an AI-powered environmental compliance intelligence platform designed for mining and PSU companies. It transforms complex regulatory requirements into an intuitive, actionable dashboard with three core views: a workflow-driven Kanban board, an AI-powered image analysis gallery, and a high-level taskboard.

## ✨ Key Features

- **Multi-View Interface:** Seamlessly switch between three distinct modules for comprehensive compliance management.
- **Collapsible Navigation:** A sleek, hover-based sidebar for efficient use of screen real estate.
- **Interactive Filtering:** A powerful, reusable filter panel to drill down into specific data points in the Kanban view.
- **Modular Component Architecture:** Built with reusable React components for maintainability and scalability.
- **Modern Tech Stack:** Utilizes React, Vite, and Tailwind CSS for a fast and responsive user experience.

## 🚀 Core Modules

### 1. WFM Kanban Board
A workflow management tool to track compliance tasks from assignment to completion.
- **Visual Columns:** `Assigned`, `In Progress`, `Evidence Submitted`, `Completed`, and `Rejected/Reopened`.
- **Dynamic Task Creation:** An intuitive form to create new tasks with cascading dropdowns for leases, areas, and conditions.
- **Smart Filters:** A slide-out panel to filter tasks by `Status`, `Assignee`, and `Priority`, with a built-in search.
- **Detailed Task Modals:** Click on any task to view a detailed modal with progress timelines, evidence management, and commenting.

### 2. AI Gallery (Eco-Compliance Inspector)
An image analysis platform to visually inspect and verify environmental compliance.
- **Image Grid View:** Displays a gallery of site images for inspection.
- **Detection Overlay:** AI-powered object detection highlights areas of interest.
- **Metadata Panel:** Shows detailed information and compliance status for each image.

### 3. Taskboard
A high-level dashboard providing an overview of key compliance metrics and analytics. (Further development planned).

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd camsure

# Install dependencies
npm install

# Start the development server
npm run dev
# The application will be available at http://localhost:5173
```

### Build for Production
```bash
# Create an optimized build in the `dist/` directory
npm run build

# Preview the production build locally
npm run preview
```

## 📂 Project Architecture

The project follows a component-based structure, organizing UI elements by feature.

```
camsure/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── kanban/          # Kanban-specific components (TaskCard, etc.)
│   │   ├── image-viewer/    # AI Gallery components (ImageCard, etc.)
│   │   ├── FilterPanel.jsx  # Reusable filter component
│   │   ├── SettingsModal.jsx
│   │   └── ...              # Other shared components
│   │
│   ├── assets/              # Images, fonts, etc.
│   ├── App.jsx              # Main application layout and routing
│   ├── main.jsx             # React application entry point
│   ├── ComplianceKanban.jsx # WFM Kanban board main component
│   └── EcoComplianceInspector.jsx # AI Gallery main component
│
├── .gitignore
├── eslint.config.js
├── index.html               # HTML entry point
├── package.json
└── vite.config.js
```
