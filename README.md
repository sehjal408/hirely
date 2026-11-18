# Hirely

A full-stack **MERN job portal**. Recruiters register companies, post jobs and review applicants. Students search for jobs, apply and track their applications.

Built as the final project for **CSIS 3380 – Full Stack Development with JavaScript** at Douglas College (Fall 2025).

## Features

**Students**
- Register and log in (JWT stored in an HTTP-only cookie, passwords hashed with bcrypt)
- Browse the latest jobs, search by keyword and filter by location, technology, experience and salary
- View job details and apply in one click
- Track applied jobs and their status (pending / accepted / rejected)
- Edit profile: bio, skills and resume link

**Recruiters**
- Register and manage companies, with logo uploads to Cloudinary
- Post, edit and delete job listings
- View applicants for each job and accept or reject them
- Protected admin routes, so only recruiters can reach the dashboard

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Tailwind CSS, shadcn/ui (Radix UI), Axios, React Context + custom hooks |
| Backend | Node.js, Express, JWT, bcryptjs, cookie-parser, CORS |
| Database | MongoDB with Mongoose |
| Media | Cloudinary |

## API overview

| Area | Endpoints |
|---|---|
| Users | `POST /api/user/register`, `/login`, `/logout`, `/profile/update` |
| Companies | `POST /api/company/register`, `GET /get`, `GET /get/:id`, `PUT /update/:id` |
| Jobs | `POST /api/job/post`, `GET /get`, `GET /get/:id`, `GET /getadminjobs`, `PUT /update/:id`, `DELETE /delete/:id` |
| Applications | `GET /api/application/apply/:id`, `GET /get`, `GET /:id/applicants`, `POST /status/:id/update` |

## Project structure

```
Hirely/
├── Backend/
│   ├── controllers/   # route handlers (user, company, job, application)
│   ├── middleware/    # JWT authentication
│   ├── models/        # Mongoose schemas
│   ├── routes/
│   └── utils/         # MongoDB + Cloudinary setup
└── Frontend/
    └── src/
        ├── components/  # student pages, recruiter (admin) pages, auth, UI kit
        ├── context/     # auth, jobs, companies, applications state
        ├── hooks/       # data-fetching hooks
        └── utils/       # API endpoint constants
```

## Running locally

**Prerequisites:** Node.js 18+, a MongoDB database (local or Atlas) and a Cloudinary account (for logo uploads).

```bash
# Backend (http://localhost:5011)
cd Backend
cp .env.example .env     # then fill in your own values
npm install
npm start

# Frontend (http://localhost:5173)
cd Frontend
npm install
npm run dev
```

## Team

Built by **Sehjalpreet Kaur**, Aditi and Jatin.
