# Career Connect - Frontend

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
