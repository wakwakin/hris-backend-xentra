# HRIS Backend (Xentra)

This is the backend API for the Human Resource Information System (HRIS) project using **Hono**, **TypeScript**, and **MongoDB**.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Development Scripts](#development-scripts)

## Tech Stack

- **Framework:** Hono (TypeScript)
- **Database:** MongoDB with Mongoose ODM
- **Testing/Seeding:** Faker.js
- **Environment Management:** dotenv

## Project Structure

```
src/
  controllers/    # API controllers (HTTP handlers)
  services/       # Business logic and reusable services
  models/         # Mongoose schemas and models
  middleware/     # Custom middleware
  routes/         # Hono route definitions
  utils/          # Helper functions (e.g., pagination)
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/wakwakin/hris-backend-xentra.git
cd hris-backend-xentra
```

2. Install dependencies:

```bash
yarn install
```

3. Configure environment variables:

- Create a `.env` file based on `.env.example`
- Set `PORT`, `HOST`, and MongoDB connection string (`MONGO_URI`)

## Running the Project

### Development Mode

```bash
yarn dev
```

### Production Mode

```bash
yarn build
yarn start
```

### Seeding/Test Data (optional)

```bash
yarn sim users POST   # Using Faker-generated example data
```

## Development Scripts

- List available APIs:

```bash
yarn sim --list
```

- Test an endpoint with Faker-generated body:

```bash
yarn sim <api> <method>
# Example: yarn sim user POST
```
