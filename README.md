Booklt: Experiences & Slots

This is a fullstack web application for booking travel experiences, built as a fullstack intern assignment. The app allows users to browse experiences, view real-time slot availability, and complete a full booking flow.

Live Project Links

Live Frontend (Render): https://booklt-frontend.onrender.com/

Live Backend (Render): https://booklt-server.onrender.com/

Figma Design: View Figma File

Features

Browse & Search: Dynamically fetch and display all experiences from the backend. Users can search by title, description, or city.

Real-time Availability: View experience details with dynamic date and time slots. Slots show real-time availability (e.g., "Sold out", "2 left").

Atomic Bookings: The backend uses database transactions to prevent double-booking and ensure slot capacity is never exceeded.

Promo Code Validation: A functional checkout page that can validate promo codes (e.g., SAVE10) against the backend.

Full Booking Flow: Complete end-to-end user flow from Home -> Details -> Checkout -> Confirmation/Failure.

Theme-Aware UI: The entire frontend is built with TailwindCSS and a central tailwind.config.js for 100% design consistency.

Tech Stack

Frontend: React, TypeScript, Vite, TailwindCSS, axios

Backend: Node.js, Express, TypeScript, CORS

Database: PostgreSQL (hosted on Render)

ORM: Prisma

How to Run Locally

You will need to run both the backend and frontend in separate terminals.

1. Backend (booklt-server)

Clone the repo:

git clone [https://github.com/Kislay20/booklt-server.git](https://github.com/Kislay20/booklt-server.git)
cd booklt-server


Install dependencies:

npm install


Set up your database:

Create a free PostgreSQL database (e.g., on Render or Railway).

Create a .env file in the root of the booklt-server folder.

Add your database connection string to it:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"


Run database migrations:

npx prisma migrate dev


Seed the database with sample data:

npm run seed


Run the server:

npm run dev
# Server will be running on http://localhost:3001


2. Frontend (booklt-frontend)

Clone the repo:

git clone [https://github.com/Kislay20/booklt-frontend.git](https://github.com/Kislay20/booklt-frontend.git)
cd booklt-frontend


Install dependencies:

npm install


Set up your environment:

Create a .env file in the root of the booklt-frontend folder.

Add the local backend URL to it:

VITE_API_BASE_URL="http://localhost:3001"


Run the app:

npm run dev
# App will be running on http://localhost:5173 (or similar)
