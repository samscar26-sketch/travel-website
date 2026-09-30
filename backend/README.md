# Tour and Travel Management System API

This backend is built with Node.js, Express.js, Sequelize, and MySQL.

## Features
- User authentication with JWT
- Role-based authorization
- Tour package management
- Destination management
- Booking workflow
- Payment recording
- Guide and vehicle management
- Reviews and notifications
- Dashboard reports

## Installation

```bash
cd backend
npm install
cp .env.example .env
```

Update your .env values for MySQL and JWT.

## Run

```bash
npm run dev
```

## API base URL

```text
http://localhost:5000/api
```

## Database setup

1. Create MySQL database
2. Update .env
3. Run Sequelize migrations

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

## Notes
This is a modular backend designed for future integration with frontend or mobile clients.

## Module coverage
- Authentication and authorization
- User management and role assignment
- Tour package and destination management
- Booking and payment workflows
- Guide and transportation support
- Customer profile management
- Review submission and moderation
- Notifications and dashboard reporting

## Typical endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PATCH /api/auth/reset-password
- GET /api/tours
- POST /api/tours
- GET /api/bookings
- POST /api/bookings
- GET /api/payments
- POST /api/payments
- GET /api/dashboard/stats

## Running the backend
1. Create MySQL database
2. Update .env file
3. Run migrations

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

## Database note
The app is structured to run with MySQL and Sequelize. A live MySQL instance must be available for full runtime verification.
