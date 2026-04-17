# Recruitment Pipeline App

## Overview

This is a full-stack recruitment pipeline interface that includes both a React frontend and an Express Node.js backend.

The frontend implements a Kanban-style board to view and move candidates through different stages (Applying Period, Screening, Interview, Test). The backend provides a RESTful API to manage the candidates data.

## Features

- **Frontend**: Built with React (Vite) and plain CSS (CSS Modules approach without Tailwind).
- **Backend**: Express.js server providing CRUD operations. In-memory data store for simplicity and ease of testing.
- **Interactions**: Drag and drop capabilities to move candidates across stages.
- **Responsive**: The UI adapts to different screen sizes.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   _The backend will run on `http://localhost:5000`_

### Running the Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   _The frontend will run on the port provided by Vite, usually `http://localhost:5173`._

## Assumptions and Decisions

- **Data storage**: The backend uses an in-memory array to store candidate data. This is to avoid requiring complex database setups (e.g., MongoDB, PostgreSQL) for whoever reviews the code, making it instantly runnable.
- **Drag and Drop**: Reused the well-supported `@hello-pangea/dnd` (or `react-beautiful-dnd`) library to provide clean, accessible drag-and-drop interactions across the Kanban columns.
- **Styling**: All generic CSS is scoped logically to standard files. Vanilla CSS is used, showcasing a premium, modern design matching standard dashboard aesthetics.
