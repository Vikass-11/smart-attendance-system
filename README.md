# Smart Attendance System

A modern, full-stack web application designed to streamline attendance tracking and management for educational institutions and organizations. The system features a robust backend API, a responsive frontend dashboard, and an integrated AI-powered attendance assistant.

## ✨ Features

- **Role-Based Access Control**: Distinct portals and permissions for Students, Faculty, and Administrators.
- **Department & User Management**: Admins can seamlessly manage institutional departments and user accounts.
- **AI Attendance Assistant**: Integrated conversational agent (powered by OpenAI) to help users quickly check attendance stats or perform updates.
- **Interactive Dashboards**: Data visualization and easy-to-use interfaces for tracking attendance metrics.
- **Secure Authentication**: JWT-based authentication and encrypted passwords.
- **Comprehensive API Documentation**: Built-in Swagger UI for exploring backend endpoints.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS (v4)
- **State Management**: Zustand & React Query
- **Routing**: React Router v7
- **Forms & Validation**: React Hook Form with Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MySQL 
- **ORM**: Drizzle ORM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **AI Integration**: OpenAI API
- **Documentation**: Swagger UI & swagger-jsdoc

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MySQL Server

### 1. Clone the repository
```bash
git clone https://github.com/Vikass-11/smart-attendance-system.git
cd smart-attendance-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory with the required environment variables (e.g., `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `OPENAI_API_KEY`).
- Run database migrations:
  ```bash
  npm run db:push
  ```
- Start the backend development server:
  ```bash
  npm run dev
  ```
The API will run on `http://localhost:3000` (or your configured port). Swagger docs are available at `/api-docs`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
- Start the frontend development server:
  ```bash
  npm run dev
  ```
The application will run on `http://localhost:5173`.

## 🧪 Testing

Both frontend and backend include testing setups.
- **Frontend**: `npm test` (Vitest & React Testing Library)
- **Backend**: `npm test` (Jest & Supertest)

## 📄 License

This project is licensed under the ISC License.
