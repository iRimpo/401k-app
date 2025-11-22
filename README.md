# 401(k) Contribution Settings Dashboard

## Overview

This project is a full-stack demo for configuring 401(k) retirement contributions, viewing year-to-date summaries, and projecting future balance. It is built with React (frontend), Express (backend), and PostgreSQL (local database). **No third-party cloud services are required.**

---

## Features

- Set 401(k) contribution rate (percentage or dollar)
- Save settings to local PostgreSQL database
- Show YTD contribution summary and projected balance
- Responsive dashboard UI and toast notifications

---

## Tech Stack

- **Frontend:** React, Vite, shadcn/ui, TypeScript
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (runs locally)
- **Other:** Sonner (toast), Lucide icons

---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/YOUR_GITHUB/my-401k-app.git
cd my-401k-app


---

### 2. Install PostgreSQL Locally

- **Mac:** `brew install postgresql`
- **Windows:** [Download installer](https://www.postgresql.org/download/windows/)
- **Linux:** Use package manager

Start PostgreSQL:

brew services start postgresql

Create the database:

createdb retirementsim


Create the table:

psql retirementsim

CREATE TABLE contribution_rates (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(32) UNIQUE NOT NULL,
    type VARCHAR(16) NOT NULL,
    amount NUMERIC NOT NULL
);
\q


---

### 3. Setup the Backend

cd server
npm install


Create `.env` in `server` folder:
DATABASE_URL=postgresql://YOUR_DB_USER:YOUR_PASSWORD@localhost:5432/retirementsim
PORT=3001

Replace `YOUR_DB_USER` and `YOUR_PASSWORD` with your local PostgreSQL user credentials.

Start backend:

---

### 4. Setup the Frontend

cd ../client
npm install

Start frontend:
npm run dev


- Frontend at [http://localhost:5173](http://localhost:5173)
- Backend at [http://localhost:3001](http://localhost:3001)

---

## Usage

1. Enter your 401(k) contribution settings and click **Save Changes**.
2. Data is stored and retrieved from the local Express/Postgres backend.
3. The dashboard updates to reflect saved values and shows live projections.

---

## Troubleshooting

- **Backend errors:** Check your terminal for error logs after starting server.
- **Database errors:** Ensure PostgreSQL is running and `.env` credentials match.
- **CORS errors:** The backend uses CORS; verify requests originate from `localhost`.
- **Frontend/Backend connection:** Use browser Dev Tools → Network tab to inspect API calls.

---

