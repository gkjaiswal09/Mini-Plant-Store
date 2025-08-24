# Mini Plant Store

A full-stack web application for browsing, searching, and managing a collection of plants. Built with React (frontend) and Node.js/Express (backend).

## Features
- View all plants
- Search plants by name or category
- Add new plants
- RESTful API backend
- Modern React frontend (Vite)

## Project Structure
```
mini-plant-store/
├── backend/
│   ├── server.js
│   ├── plants.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```sh
   cd backend
   npm install
   npm start
   ```
2. The backend server will run at [http://localhost:5000](http://localhost:5000)

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
2. The frontend app will run at [http://localhost:3000](http://localhost:3000)

## API Endpoints
- `GET /` — Welcome message
- `GET /plants` — Get all plants
- `GET /plants/search?q=...` — Search plants
- `POST /plants` — Add a new plant

