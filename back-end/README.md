# Career Connect Backend

This repository contains the backend server implementation for Career Connect, a platform designed to connect job seekers with employers.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Docker
- Socket.io (for real-time notifications)
- Twilio API (for two-factor authentication)

## Getting Started

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

## Features

- User authentication and authorization
- Job posting management
- Profile management
- Application tracking
- Search functionality
- Real-time notifications using Socket.io
- Two-factor authentication using Twilio API
- Containerized deployment
