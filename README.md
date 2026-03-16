# Nectar 🌿

Nectar is a comprehensive web application designed to help users explore plants and their health benefits. It features a modern React frontend and a robust Django backend, providing a seamless experience for plant enthusiasts and health-conscious individuals.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS (Custom designed)

### Backend
- **Framework**: Django 5.x
- **API**: Django REST Framework (DRF)
- **Database**: SQLite (Default)
- **Authentication**: JWT (SimpleJWT)

---

## 📁 Project Structure

```text
Nectar/
├── nectar-frontend/     # React frontend application
├── nectar-backend/      # Django backend application
├── run.bat              # Combined startup script for Windows
└── README.md            # This file
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### Setup Instructions

#### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd nectar-backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```

#### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd nectar-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

For Windows users, you can run both the frontend and backend simultaneously using the provided batch file in the root directory:

```bash
run.bat
```

Alternatively, run them separately:
- **Backend**: `python manage.py runserver` (inside `nectar-backend` with venv active)
- **Frontend**: `npm run dev` (inside `nectar-frontend`)

---

## ✨ Features

- **Plant Search**: Efficiently search through a library of plants.
- **Health Benefits**: Detailed information on the medicinal and health properties of plants.
- **Admin Dashboard**: Management interface for plant data.
- **Bookmarks**: Save your favorite plants for quick access.
- **Responsive Design**: Optimized for both desktop and mobile viewing.
