# Career Connect

## Career connect Backend

This repository contains the backend server implementation for Career Connect, a platform designed to connect job seekers with employers.

[Career Connect Model](https://app.eraser.io/workspace/BUqz2f71NoNHACy1NSPs)

### Tech Stack

- Node.js
- Express.js
- MongoDB(Indexes, Aggregations, Transactions)
- JWT Authentication
- Docker
- Socket.io (for real-time notifications)
- Twilio API (for two-factor authentication)
- Redis (for caching)
- BullMQ (for job scheduling and background processing)

### Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (v14 or higher) - for local development
- MongoDB - for local development
- npm or yarn - for local development

### Installation

#### Using Docker

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd career-connect/back-end
   ```

2. Build and run with Docker Compose
   ```bash
   docker-compose up --build
   ```

#### Local Development

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd career-connect/back-end
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration

4. Start the server
   ```bash
   npm run dev
   ```

## API Documentation

The API endpoints are documented using Postman. You can access the API documentation at the following URL:

[API Documentation](https://documenter.getpostman.com/view/20010455/2sAYBSjtQr)

### Features

- User authentication and authorization
- Job posting management
- Profile management
- Application tracking
- Search functionality
- Real-time notifications using Socket.io
- Two-factor authentication using Twilio API
- Containerized deployment
- Background job processing using BullMQ
- logging with pino(registrations, logins, account deletions and all kinds of errors)

### Background Job Processing with BullMQ

BullMQ is used to handle background tasks efficiently. Some of the tasks handled include:

Scheduled Account Deletion: Soft-deleted accounts are permanently removed after one day.

## Career Connect Front-end

This repository contains the frontend code for the Career Connect application, a platform designed to connect job seekers with employers.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast and lightweight build tool for modern web development.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Zustand:** A small, fast and scalable bearbones state-management solution.
- **Axios:** A promise-based HTTP client for making API requests.
- **Motion:** A library for creating smooth and engaging animations.
- **React Toastify:** A library for displaying toast notifications.
- **react-hook-form:** A library for handling forms.
- **Zod:** A TypeScript-first schema declaration and validation library.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd front-end
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the root directory of the project.
    - Add the necessary environment variables (e.g., API base URL, authentication keys). See `.env.example` for a template.

4.  **Start the development server:**

    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```

    This will start the Vite development server, and you can access the application in your browser at `http://localhost:5173` (or the port specified in your `.env` file).

## Building for Production

1.  **Build the application:**

    ```bash
    npm run build  # or yarn build or pnpm build
    ```

    This will create a `dist` directory containing the production-ready build of your application.

2.  **Serve the production build:**

    You can use a static file server (e.g., `serve`, `nginx`) to serve the contents of the `dist` directory.

## Docker

This project includes a `Dockerfile` and `docker-compose.yml` for easy containerization.

1.  **Build the Docker image:**

    ```bash
    docker-compose build
    ```

2.  **Run the Docker container:**

    ```bash
    docker-compose up -d
    ```

    This will start the application in a Docker container. You can access the application in your browser at `http://localhost:5173` (or the port specified in your `docker-compose.yml` file).
