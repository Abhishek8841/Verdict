# Verdict

An online judge and code execution engine built for competitive programming. Verdict accepts user-submitted C++ solutions, compiles and runs them inside isolated Docker containers, evaluates them against predefined test cases, and returns real-time results over WebSockets.

---

## Overview

Verdict is a self-hosted competitive programming judge. The goal is to provide a fast, secure, and reliable system for compiling user code, running it against test cases, and delivering verdicts such as Accepted, Wrong Answer, Time Limit Exceeded, and Runtime Error.

Every submission runs inside a short-lived Docker container, ensuring complete isolation between user programs and the host system. A background worker, powered by BullMQ and Redis, processes submissions asynchronously so the API server stays responsive under load.

---

## Architecture

```
Client (React)
   |
   v
Express API Server
   |
   |-- REST endpoints (auth, problems, submissions)
   |-- WebSocket server (real-time verdict delivery)
   |
   v
Redis + BullMQ
   |
   v
Worker Process
   |-- Pulls jobs from the queue
   |-- Spins up Docker containers
   |-- Compiles and executes C++ code
   |-- Compares output against expected results
   |-- Pushes verdict back via WebSocket
```

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Language    | TypeScript (Node.js)                |
| Framework   | Express 5                           |
| Database    | PostgreSQL (via Prisma ORM)         |
| Queue       | BullMQ + Redis (ioredis)            |
| Realtime    | WebSockets (ws)                     |
| Sandboxing  | Docker                              |
| Auth        | JWT + bcrypt                        |
| Validation  | Zod                                 |
| Frontend    | React (in progress)                 |

---

## Project Structure

```
verdict/
  client/             -- React frontend (work in progress)
  server/
    src/
      api/            -- REST route handlers and controllers
      config/         -- Environment and service configuration
      queue/          -- BullMQ queue setup and job dispatching
      types/          -- Shared TypeScript type definitions
      ws/             -- WebSocket server for live verdict updates
      index.ts        -- Application entry point
    worker/
      compare/        -- Output comparison logic
      docker/         -- Docker container management
      executor/       -- Compilation and execution pipeline
      processors/     -- BullMQ job processors
      types/          -- Worker-specific type definitions
      index.ts        -- Worker entry point
    prisma/           -- Database schema and migrations
    shared/           -- Code shared between server and worker
```

---

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- Docker (running and accessible)
- Redis
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhishek8841/Verdict.git
cd verdict

# Install server dependencies
cd server
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL, Redis URL, JWT secret, etc.

# Run database migrations
npx prisma migrate dev

# Start the API server
npm run dev

# In a separate terminal, start the worker
npm run worker
```

---

## How It Works

1. A user submits their C++ solution through the API along with the problem ID.

2. The server validates the request, stores the submission in PostgreSQL, and pushes a job onto the BullMQ queue.

3. The worker picks up the job, creates a temporary directory with the source file and test case inputs, and launches an isolated Docker container.

4. Inside the container, the code is compiled with `g++`. If compilation fails, a Compilation Error verdict is returned immediately.

5. The compiled binary is executed against each test case with enforced time limits. The worker handles three outcomes per test case:
   - **Accepted** -- output matches expected output.
   - **Wrong Answer** -- output does not match.
   - **Time Limit Exceeded** -- execution exceeds the allowed duration.
   - **Runtime Error** -- the process crashes or returns a non-zero exit code.

6. Results are sent back to the client in real time over a WebSocket connection.

---

## Current Status

**V1 backend is complete.** The core submission pipeline -- from receiving code to delivering verdicts -- is fully functional.

What is working:
- C++ code execution inside sandboxed Docker containers
- Automated compilation, execution, and test case evaluation
- Proper handling of runtime errors, time limit violations, and successful runs
- Asynchronous job processing with BullMQ and Redis
- Real-time verdict delivery via WebSockets
- User authentication with JWT

What is not yet implemented:
- Rate limiting on API endpoints
- Response caching
- Frontend (actively being built)

---

## Roadmap

- Rate limiting and request throttling
- Redis-based caching for repeated submissions and problem data
- Complete the React frontend
- Support for additional languages (Python, Java)
- Problem management dashboard
- Leaderboards and contest mode

---