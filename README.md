# CostCatcher

**CostCatcher** is a web application that helps users track product prices, receive smart notifications, and save money by finding the best deals across multiple online shopping platforms.


---

## Table of Contents

- [CostCatcher](#costcatcher)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Directory Structure](#directory-structure)
  - [Technology Stack](#technology-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Implementation Details](#implementation-details)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
    - [Deployment](#deployment)
  - [Acknowledgements](#acknowledgements)

---

## Project Overview

**CostCatcher** is built to help users manage, categorize, and visualize their expenses through a seamless web interface. The project follows a clear separation of concerns with a dedicated backend for data and API processing, and a modern frontend for user interaction.

---

## Directory Structure

```plaintext
CostCatcher/
├── backend/
│   ├── python/
│   │   ├── Email/
│   │   └── Telegram/
│   └── server/
│       ├── Models/
│       ├── middleware/
│       ├── routes/
│       ├── app.js
│       └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── rupee-logo.svg
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── middleware/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── tailwind.config.js
└── ...
```

---

## Technology Stack

### Backend

- **Node.js** with **Express** for RESTful APIs
- **MongoDB** as the database for user management and persisting tracked product information
- **Python** for integrations, e.g., Email and Telegram chatbot automation
- **JWT** for robust user authentication
- **Custom middleware** for API request/response handling

### Frontend

- **React** for building UI ([App.js](https://github.com/omshukla12/CostCatcher/blob/main/frontend/src/App.js))
- **TailwindCSS** for utility-first styling ([tailwind.config.js](https://github.com/omshukla12/CostCatcher/blob/main/frontend/tailwind.config.js))
- **React Context API** for global context management
- **Custom Middleware, API, and Service layers** for modular frontend logic

---

## Implementation Details

### Backend

- **Express Server:** Entry point at `backend/server/app.js`. This sets up API routes and middleware.
- **Models:** Defined in `backend/server/Models/`, likely using Mongoose (if MongoDB).
- **API Routing:** Organized under `backend/server/routes/` for clean separation.
- **Middleware:** For user authentication, validation, error handling, etc. inside `backend/server/middleware/`.
- **Python Integrations:**
    - `backend/python/Email/` - Handles automated email notifications.
    - `backend/python/Telegram/` - Manages Telegram bot or notification integrations.
- **Configuration:** Managed with environment variables and/or configuration files.

### Frontend

- **Entry Point:** `frontend/src/index.js` bootstraps the React app.
- **UI Components:** Modularized inside `frontend/src/components/`.
- **Pages:** Individual screens in `frontend/src/pages/`.
- **API Layer:** All API calls abstracted in `frontend/src/api/`.
- **Global State:** Managed via Context API in `frontend/src/context/`.
- **Styling:** TailwindCSS classes used throughout, configured in `tailwind.config.js`.
- **Static Assets:** Placed in `frontend/public/` (e.g., logos and favicons).

### Deployment

- **Frontend Deployment:** The React frontend is deployed on [Vercel](https://vercel.com/), enabling fast, serverless hosting with automatic CI/CD from the GitHub repository.
- **Backend Deployment:** The Node.js/Express backend is also deployed using [Vercel](https://vercel.com/).
- **Environment Variables:** Both frontend and backend use environment variables for configuration (API endpoints, secrets, etc.), managed via `.env` files and Vercel/hosting dashboard settings.
- **Production Branch:** The `main` branch is used for production deployments. Feature development and testing are done on separate branches before merging to `main`.


---

## Acknowledgements


[![Node.js](https://img.shields.io/badge/Nodejs-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)&nbsp;
[![React](https://img.shields.io/badge/Reactjs-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)&nbsp;
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)&nbsp;
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)&nbsp;
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)&nbsp;
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)&nbsp;

---
