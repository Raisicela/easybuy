# EasyBuy

EasyBuy is a full-stack application with a React frontend and a NestJS backend. This guide will help you set up and run the project locally.

## Prerequisites

- Node.js (v14.x or higher)
- npm

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Raisicela/easybuy.git
cd easybuy
```

# Backend Setup (NestJS)

## Install Dependencies

Navigate to the backend directory and install the dependencies:

```bash
cd Backend/easybuy-store
npm install
```

## Configure Environment Variables

Create a .env file in the backend directory and add the following environment variables:

```bash
# .env
PORT=3000
BASE_URL=https://api.escuelajs.co/api/v1
NAME = YourName
AVATAR = https://picsum.photos/800
EMAIL= you@email.com
PASSWORD= YourPassword
API_KEY = YourApiKey
```

# Run the Backend

## Start the NestJS server:

```bash
npm run start:dev
```

The backend server will be running at http://localhost:3000

# Frontend Setup (React)

## Install Dependencies

Navigate to the frontend directory and install the dependencies:

```bash
cd Frontend/easy-buy-store
npm install
```

# Configure Environment Variables

Create a .env file in the frontend directory and add the following environment variables:

```bash
# .env
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_API_KEY = YourApiKey
```

# Run the Frontend

## Start the React project:

```bash
npm run start
```

The frontend will be running at http://localhost:3001
