# Dynamic Portfolio (Production-Ready Starter)

This portfolio is now fully dynamic:
- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- API-driven content + contact form persistence

## Setup

1. Install dependencies
```sh
npm install
```

2. Configure environment variables
```sh
cp .env.example .env
```
Then update values in `.env` (especially `MONGODB_URI`).

3. Run frontend and backend together
```sh
npm run dev:full
```

- Frontend: `http://localhost:8080`
- API: `http://localhost:5000`

## API Endpoints

- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/messages`

## Data Seeding

On first backend start, portfolio content is seeded automatically into MongoDB if the collection is empty.

## Production Notes

- Set secure production values for `MONGODB_URI`, `CLIENT_URL`, and `PORT`.
- Use a managed MongoDB instance (Atlas or self-hosted production cluster).
- Serve frontend static build via CDN or reverse proxy.
- Put API behind HTTPS and configure CORS to your production domain only.

## Docker (Production-style setup)

This repo includes:
- **MongoDB** container for persistence
- **API** container (Node/Express)
- **Web** container (Nginx serving Vite build + proxying `/api` to the API)

### Step 1: Install / start Docker

- Install Docker Desktop for Windows.
- Open Docker Desktop and wait until it shows **Engine running**.

### Step 2: Run the stack

From the project root:

```sh
docker compose up -d --build
```

### Step 3: Open the app

- Frontend: `http://localhost:8080`
- API health (through Nginx): `http://localhost:8080/api/health`
- API direct: `http://localhost:5000/api/health`

### Step 4: Stop / clean up

Stop containers:

```sh
docker compose down
```

Stop + delete DB volume (deletes Mongo data):

```sh
docker compose down -v
```
