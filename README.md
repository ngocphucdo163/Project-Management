# Project Management API

This project provides a backend API for a project collaboration tool with role-based access control. Users can manage teams, projects, and tasks, with permissions varying by role.

---

## Prerequisites

Ensure you have the following tools installed:

- **Docker**
- **Docker Compose**
- **Node.js** (optional, for local development)

---

## Getting Started

Follow these steps to set up and run the server:

### 1. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DB_DATABASE=p_collaboration
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600
```

### 2. Build and Run the Docker Containers

Use Docker Compose to build and run the application:

```
docker-compose up --build
```

This command will:

- Build the Docker images defined in the Dockerfile.
- Start the API and PostgreSQL services.

### 3. Run Migrations

To set up the database schema, run the migrations:

```
docker-compose exec api npm run typeorm migration:run
```

### 4. Seed the Database

To populate the database with initial data (roles and permissions), run the seeder:

```
docker-compose exec api npm run seed
```

## Additional Notes

- Ensure all services are running before executing migrations or seeding.
- For troubleshooting or development, you can check the container logs using:

```
docker-compose logs -f
```
