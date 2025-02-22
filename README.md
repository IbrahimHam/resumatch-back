# RESUMATCH-BACK

ResuMatch is a platform designed to modernize resumes and streamline the job application process. The ResuMatch Backend is a Node.js/Express API that powers the entire platform by managing users, recruiters, companies, jobs, resumes, and templates. It integrates external services for AI-powered cover letter generation and PDF creation, enabling job seekers to either build new resumes from modern templates or update existing ones through intelligent data extraction. This project demonstrates best practices in REST API design, secure JWT authentication, robust error handling, and seamless integration with third-party services—all crafted with a developer-first mindset.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Endpoints Overview](#endpoints-overview)
- [Authentication & Authorization](#authentication--authorization)
- [Middleware](#middleware)
- [Models](#models)
- [Utilities](#utilities)
- [Contributing](#contributing)

---

## Features

- **User & Recruiter Management:**  
  - Registration and login endpoints with input validation.
  - JWT-based authentication for secure access.

- **Company & Job Management:**  
  - Create, retrieve, update, and delete companies and job postings.
  - Recruiters can join an existing company or create a new one.
  - Search functionality for companies.

- **Resume & Template Handling:**  
  - Endpoints to create, update, and retrieve resume data.
  - Manage resume templates and generate PDFs from HTML templates via Puppeteer.

- **AI Integration:**  
  - Generate custom cover letters by integrating with an external OpenAI API.
  - Process raw resume text (via PDF uploads) into structured JSON using AI.

- **File Uploads & Processing:**  
  - Image upload middleware for company images.
  - PDF processing middleware to extract text from resumes.

- **API Documentation:**  
  - Auto-generated Swagger UI documentation available for interactive API exploration.

- **Robust Error Handling & Logging:**  
  - Custom error classes for validation, database, authorization, and not-found errors.
  - Centralized error handling middleware with Winston-based logging.

---

## Tech Stack

- **Server:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **Validation:** express-validator
- **File Handling:** Multer, pdf-parse, Puppeteer
- **External APIs:** OpenAI integration via Axios
- **Documentation:** Swagger (swagger-ui-express, swagger-jsdoc)
- **Logging:** Winston with Daily Rotate File

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (or yarn)
- Access to a **MongoDB** instance (local or cloud)
- A Gmail account (for email notifications via Nodemailer)

### Installation

1. **Clone the repository:**
    ```bash
   git clone git@github.com:IbrahimHam/resumatch-back.git
   cd resumatch-back
2. **Install dependencies:**
    ```bash
    npm install
3. **Environment Variables:**
Create a .env file in the root directory with the following content (update values as needed):
    ```bash
    PORT=3000
    MONGO_URI=mongodb+srv://
    retryWrites=
    SECRET_KEY=
    NODE_ENV=
    OPENAI_API_KEY=
    EMAIL_USER=
    EMAIL_APP_PASSWORD=
3. **Start the Server:**
    ```bash
    npm start
The server should run on the port specified (default is 3000). Visit http://localhost:3000 to confirm it's running.

---

## Project Structure

    resumatch-back/
    ├── src/
    │   ├── config/
    │   │   └── database.js             # MongoDB connection setup
    │   ├── controllers/                # Business logic for Company, Job, Recruiter, User
    │   ├── errors/                     # Custom error classes (ValidationError, DatabaseError, etc.)
    │   ├── middlewares/                # Authentication, validation, file upload, PDF processing, and error handling middleware
    │   ├── models/                     # Mongoose models (Company, Job, Recruiter, Resume, Template, User)
    │   ├── routes/                     # API route definitions
    │   ├── seeds/                      # Database seed scripts
    │   ├── uploads/                    # Directory for uploaded files (images, PDFs)
    │   ├── utils/                      # Utility functions (auth, file upload, logging, password handling, Swagger docs)
    │   └── index.js                    # Main entry point for the server
    ├── .env                          # Environment variables
    ├── package.json                  # Project metadata and dependencies
    └── vercel.json                   # Deployment configuration for Vercel

---

## API Documentation
Interactive API documentation is provided via Swagger UI. After starting the server, access it at:

    http://localhost:3000/api-docs
    
The documentation is auto-generated from the Swagger definitions located in the src/utils/swagger/ directory.

---

## Endpoints Overview
### User Endpoints
- POST /api/user/register – Register a new user.

- POST /api/user/login – Login for users.

- GET /api/user/me – Retrieve authenticated user details.

- POST /api/user/upload-resume – Upload a resume PDF and process its text.

- POST /api/user/create-resume-data – Create or update resume data.

- GET /api/user/resume-data – Retrieve resume data.

- PUT /api/user/update-resume-data – Update resume data.

- POST /api/user/create-template – Create a new resume template.

- GET /api/user/templates – Retrieve user templates.

- GET /api/user/latest-resume-pdf-path – Get the latest resume PDF path.

- POST /api/user/save-template – Save HTML template and generate PDF.

- POST /api/user/send-application/:id – Send a job application email with a cover letter and 
attached resume.

- GET /api/user/template/:id – Retrieve a specific template.

- PUT /api/user/update-template/:id – Update a specific template.

- DELETE /api/user/delete-template/:id – Delete a specific template.

### Recruiter Endpoints
- POST /api/recruiter/register – Register a new recruiter.

- POST /api/recruiter/login – Login for recruiters.

- GET /api/recruiter/:id – Retrieve recruiter details (requires authentication).

### Company Endpoints
- POST /api/company – Create a new company (requires authentication and image upload).

- GET /api/company – Get all companies.

- GET /api/company/search – Search companies by name (requires authentication).

- PATCH /api/company/join-company – Recruiter joins an existing company.

- GET /api/company/:id – Get company details by ID.

- GET /api/company/:id/jobs – Retrieve all jobs posted by a company.

### Job Endpoints
- POST /api/job – Create a new job posting (requires authentication).

- PUT /api/job/:id – Update a job (requires authentication).

- DELETE /api/job/:id – Delete a job (requires authentication).

- GET /api/job – Get all jobs.

- GET /api/job/posted-jobs – Get jobs posted by the authenticated recruiter.

- GET /api/job/applied – Get jobs the authenticated user has applied to.

- GET /api/job/matched-jobs – Get jobs matching a user’s resume.

- POST /api/job/:id/create-cover-letter – Generate a cover letter for a job.

- GET /api/job/:id – Get a job by its ID.

- POST /api/job/:id/apply – Apply to a job (requires authentication).

---

## Authentication & Authorization

- **JWT Authentication**:
Every protected endpoint requires a valid JWT token provided in the Authorization header (Bearer <token>).

The authMiddleware verifies the token and attaches the corresponding user (from either the User or Recruiter model) to the request.

- **Role-based Access**:
Certain endpoints (e.g., job creation, company joining) are accessible only to recruiters.

---

## Middleware

- **authValidator.js:** Validates registration and login inputs using express-validator.

- **authMiddleware.js:** Verifies JWT tokens and attaches the user to the request.

- **errorHandler.js:** Centralized error handler that logs errors and sends appropriate responses.

- **imageUpload.js:** Handles image uploads for company logos using Multer.

- **notFound.js:** Returns a NotFoundError for unrecognized routes.

- **pdfProcessor.js:** Processes uploaded PDF files to extract text (for resume processing) using pdf-parse.

- **validationErrorHandler.js:** Catches validation errors from express-validator and returns a consolidated error message.

--- 

## Models

- **Company:**
Stores company details (name, description, image, location, website, employees number, company email).

- **Job:**
Represents job postings including title, description, requirements, detailed requirements, company reference, job type, location, posting date, and tags.

- **Recruiter:**
Manages recruiter data such as email, full name, password hash, posted jobs, and associated company.

- **Resume:**
Contains structured resume data including personal information, skills, experience, education, languages, references, and certificates.

- **Template:**
Links a user to a specific resume template (with a reference to the resume data and a template link).

- **User:**
Holds user account information, preferences, resume reference, templates, and applied job IDs.

---

## Utilities

- **Auth Utils** (utils/auth.js):
Functions for generating and verifying JWT tokens.

- **File Upload** (utils/fileupload.js):
Configures Multer for handling PDF uploads with file type filtering.

- **Logger** (utils/logger.js):
Winston-based logging with daily rotation for error and info logs.

- **Password Handling** (utils/password.js):
Utility functions for hashing and comparing passwords using bcrypt.

- **Swagger Docs**:
Located in utils/swagger/, these files generate the API documentation for Swagger UI.

---


## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/YourFeature).
3. Commit your changes with descriptive messages.
4. Push to your branch and open a pull request.
