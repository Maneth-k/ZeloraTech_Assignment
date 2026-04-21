# Recruitment Pipeline App

## Overview

This is a full-stack recruitment pipeline interface that includes both a React frontend and an Express Node.js backend.

The frontend implements a Kanban-style board to view and move candidates through different stages (Applying Period, Screening, Interview, Test). The backend provides a RESTful API to manage candidate data, now empowered by **MongoDB** for robust and persistent data storage.

## Features

- **Frontend**: Built with React (Vite) and plain CSS (CSS Modules approach without Tailwind).
- **Backend**: Express.js server providing CRUD operations, integrated tightly with **MongoDB** (via Mongoose) to maintain a scalable data model.
- **Interactions**: Drag and drop capabilities to move candidates seamlessly across respective stages.
- **Responsive**: The UI adapts effectively to different screen sizes.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- **MongoDB** (A local instance or a cloud-based cluster like MongoDB Atlas)

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Establish Environment Variables:
   Create a `.env` file within the `backend` directory and add your MongoDB connection URI and desired Port:
   ```env
   MONGO_URI="mongodb://manethkaveen0_db_user:JKzvYAL1E0WlMInk@ac-fzxnruh-shard-00-00.lzwedug.mongodb.net:27017,ac-fzxnruh-shard-00-01.lzwedug.mongodb.net:27017,ac-fzxnruh-shard-00-02.lzwedug.mongodb.net:27017/?ssl=true&replicaSet=atlas-rq2nk0-shard-0&authSource=admin&appName=Cluster0"
   PORT=5000
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   > **Note**: We use `nodemon` for the backend. Executing the `npm run dev` script will automatically reload the API whenever backend files are modified. _The backend usually runs on `http://localhost:5000`._

### Running the Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   Create a `.env` file in the frontend directory to link to the backend:
   `VITE_API_BASE_URL=http://localhost:5000`
3. Start the development server:
   ```bash
   npm run dev
   ```
   _The frontend will run on the port provided by Vite `http://localhost:5173`._

## Architecture and Technical Decisions

- **Data Storage (MongoDB)**: We transitioned from a simplified in-memory architecture to **MongoDB** to assure scalable, reliable, and persistent storage of our candidate data pipeline. Data modeling is handled rigorously using Mongoose.
- **Development Workflow (Nodemon)**: The backend development environment is equipped with **nodemon**, enabling hot reloads which markedly accelerate the development and debugging lifecycle.
- **Drag and Drop**: Incorporates the highly supported `@hello-pangea/dnd` (or equivalent options like `react-beautiful-dnd`) to implement accessible and robust drag-and-drop interactions across the entire board.
- **Styling Mechanics**: Employs deeply scoped Vanilla CSS to deliver optimal modularity while driving a premium, modern dashboard aesthetic without relying on external CSS frameworks.
