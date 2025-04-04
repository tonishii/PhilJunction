# **CCAPDEV Major Course Output**
#### Intro to Web Application Development

<div style="display: flex; justify-content: center; align-items: center;">
<img src="./frontend/src/public/logo.svg" alt="Logo" width="100" height="100" />
</div>

# Overview
Compilation of MCO submissions for **CCAPDEV AY 2024-2025, Term 2**. This forum web application caters specifically
to Filipino transportation enthusiasts to show their interests and experience with other enthusiasts.

- MCO Phase 1 (**Complete**): Front-end development
- MCO Phase 2 (**Complete**): Back-end development
- MCO Phase 3 (**Complete**): User authentication, Data hashing and Deployment

### Contributors
- **Libut, Simon Anthony**
- **Reyes, Jericho Migell**
- **Rojo, Von Matthew**
- **Tan, Ross David**

### Technologies Used
- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, TypeScript, Express, Mongoose
- **Database**: MongoDB
- **Icons**: **[Lucide Icons](https://lucide.dev/guide/)**

- **Deployed** using **[Render](https://render.com)**

# Getting started

### Prerequisites
Make sure you have this installed on your machine:
- Node.js
- npm

Use the ff. commands to verify if node.js and npm is installed:
```bash
node -v
npm -v
```

# Running the Application
Run the ff. commands before running the actual application:

For the frontend:
```bash
  cd frontend
  npm i
```

For the backend:
```bash
  cd backend
  npm i
```

To **run the website application**, use this command:

Start the frontend server using **Vite**:
```bash
  cd frontend
  npm run dev
```
Start the backend server using **Nodemon**:
```bash
  cd frontend
  npm run dev
```

The frontend should now be accessible at http://localhost:3000 (default Vite port).
The backend should be accessible at http://localhost:3001 (default Express port).

### Troubleshooting
Ensure that the environment is properly configured for both the frontend and backend.

If you encounter a *"Port already in use"* error,
make sure the ports used by your backend and frontend (default 3001 for backend, 3000 for frontend) are not in use by other applications.
