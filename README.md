# School Management API

A simple Node.js API to manage schools and find the ones closest to you. Built with Express and MySQL.

## Setup
1. `npm install`
2. Create a `.env` file (copy from `.env.example`) and add your database details.
3. Import the `src/config/schema.sql` into your MySQL database to create the table.
4. `npm run dev` to start the server.

## Endpoints
- **POST `/addSchool`**: Add a new school (requires `name`, `address`, `latitude`, `longitude`).
- **GET `/listSchools`**: Get schools sorted by distance. Pass `latitude` and `longitude` as query params.

## Testing
There is a Postman collection in the `postman/` folder with example requests ready to go.
