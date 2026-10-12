# React + Django JWT Authentication App

This project is a full-stack authentication starter built with:

- React for the frontend
- Vite as the frontend build tool
- Django and Django REST Framework for the backend
- JWT (JSON Web Token) authentication via `djangorestframework-simplejwt`
- SQLite for local development

The app demonstrates a basic authentication flow with user registration, login, protected routes, and token refresh handling.

---

## Project purpose

This project is a full-stack authentication starter designed to demonstrate how a modern web application can securely manage user access using React on the frontend and Django REST API on the backend. It provides a practical example of a JWT-based authentication workflow, including user registration, login, protected access, and token renewal.

The app is intended as both a learning project and a reusable foundation for building larger applications that require authentication, protected routes, and access control. It shows how a frontend can authenticate users, store session tokens safely on the client, and call protected endpoints while enforcing a clear separation between public and restricted app views.

---

## Architecture overview

### Frontend

The frontend is a React app that handles the user interface and routes between pages like:

- home
- login
- register
- dashboard

It uses React Router for navigation and an `AuthContext` provider to manage user state and token storage.

### Backend

The backend is a Django project with one app, `app`, that exposes authentication endpoints for:

- user registration
- login
- protected user data access
- token refresh

The backend uses Django’s built-in `User` model and DRF API views.

---

## Tech stack

### Frontend dependencies

- React
- React Router DOM
- Axios
- JWT decoder (`jwt-decode`)
- Vite
- Tailwind CSS

### Backend dependencies

- Django
- Django REST Framework
- djangorestframework-simplejwt
- django-cors-headers

---

## Repository structure

```text
.
├── backend/
│   ├── app/
│   ├── auth/
│   ├── manage.py
│   └── .venv/
├── src/
│   ├── components/
│   ├── context/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── ...
├── index.html
├── package.json
├── vite.config.js
├── yarn.lock
├── README.md
└── ...
```

---

## Prerequisites

You need:

- Node.js and Yarn
- Python 3.x
- A virtual environment tool such as `venv`

Verify installation:

```bash
node -v
yarn -v
python --version
```

---

## Initial setup

### 1) Install frontend dependencies

From the project root:

```bash
yarn install
```

### 2) Create and activate a Python virtual environment for the backend

From the project root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3) Install backend dependencies

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

### 4) Apply migrations

```bash
python manage.py migrate
```

This creates the database and initializes Django’s default auth tables.

---

## Running the project

You need to run both the backend and frontend in separate terminals.

### Start the backend

```bash
cd backend
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

The Django API will be available at:

- <http://localhost:8000/auth/register/>
- <http://localhost:8000/auth/login/>
- <http://localhost:8000/auth/protected/>
- <http://localhost:8000/auth/refresh/>

### Start the frontend

In another terminal:

```bash
cd /home/tumelo/Work/workspaces/react-django-auth
yarn dev --host 0.0.0.0
```

The frontend typically runs at:

- <http://localhost:5173/>

---

## Build for production

To create a production build of the frontend:

```bash
yarn build
```

This generates a `dist/` folder containing the optimized production files.

To preview the production build locally:

```bash
yarn preview
```

---

## Authentication flow

The app uses JWT authentication.

### Registration

The frontend sends a POST request to the backend registration endpoint with:

- username
- email
- password

The backend creates a new Django user with `create_user()` and returns a success message if the user was created successfully.

### Login

The frontend posts credentials to `/auth/login/`.

If valid, the backend returns:

- `access` token
- `refresh` token

The frontend stores these tokens in local storage and uses the access token to call protected endpoints.

### Protected routes

The dashboard and other authenticated pages are protected through frontend route logic.

The app checks whether the user is present before allowing access to protected pages.

### Token refresh

When the access token is near expiry, the frontend requests a new one using the refresh token via `/auth/refresh/`.

---

## Main app behavior

### Home page

The home page introduces the app and shows whether the current user is logged in or not.

### Login page

Users can sign in with their username and password.

### Register page

Users can create a new account with a username, email, and password.

### Dashboard page

Once logged in, users land on a dashboard page that displays their authenticated user details.

---

## Notes and considerations

This project is a development starter and is not production-hardened by default. Some items to review before production use include:

- setting `DEBUG = False`
- securing the `SECRET_KEY`
- using environment variables for secrets and config
- adding stronger password validation policies where needed
- deploying with a production database instead of SQLite
- adding proper API validation and error handling
- securing JWT configuration for production use

---

## Useful commands

### Starting the Frontend

```bash
yarn install
yarn dev --host 0.0.0.0
yarn build
yarn preview
```

### Starting the Backend

```bash
cd backend
source .venv/bin/activate
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

---

## Summary

This project is a practical starter for building a React frontend with a Django REST API using JWT authentication. It shows the full flow from registration to login to protected access and provides a strong base for expanding into a real-world application.
