# Database Design / ERD

## Entity Overview
The system uses a normalized relational model to support users, destinations, packages, bookings, payments, guides, vehicles, reviews, notifications, and reports.

## Core Relationships
- users -> roles: many users belong to one role
- users -> customers: one-to-one for customer profile details
- destinations -> tour_packages: one-to-many
- tour_packages -> activities: one-to-many
- tour_packages -> bookings: one-to-many
- bookings -> booking_details: one-to-many
- bookings -> payments: one-to-many
- users -> tour_guides: one-to-one or one-to-many depending on staffing model
- tour_packages -> tour_guides: many-to-many via assignment table
- tour_packages -> vehicles: many-to-many via assignment table
- bookings -> reviews: one-to-many
- users -> notifications: one-to-many
- users -> audit_logs: one-to-many

## Recommended Tables
- roles
- users
- customers
- destinations
- activities
- tour_packages
- tour_package_destinations
- tour_package_dates
- bookings
- booking_details
- payments
- tour_guides
- guide_assignments
- vehicles
- drivers
- vehicle_assignments
- reviews
- notifications
- reports
- audit_logs

## Key Fields
- users: id, first_name, last_name, email, password_hash, phone, role_id, status
- customers: id, user_id, address, nationality, passport_number, emergency_contact
- tour_packages: id, title, slug, description, price, duration_days, max_travelers, start_date, end_date, status
- destinations: id, name, country, city, description, latitude, longitude, image_url
- reviews: id, booking_id, customer_id, rating, comment, status
- payments: id, booking_id, amount, payment_method, status, transaction_reference

## ERD Notes
The schema should enforce foreign keys, unique emails, status constraints, and indexes on frequently queried fields like email, package title, booking status, and destination name.

## Suggested Diagram (textual)

users ---< roles
users ||--o| customers
customers ||--o{ bookings
bookings ||--o{ booking_details
bookings ||--o{ payments
destinations ||--o{ tour_packages
tour_packages ||--o{ activities
tour_packages ||--o{ tour_package_dates
users ||--o{ notifications
users ||--o{ audit_logs
bookings ||--o{ reviews
users ||--o{ tour_guides
