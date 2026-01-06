# Portfolio Application - Docker Setup

## Quick Start

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Running the Application

1. **Set up environment variables** (create `.env` in project root):
```bash
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

2. **Build and run with Docker Compose**:
```bash
# Build and start all services
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

3. **Access the application**:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Development Mode

For development with hot-reload:

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose stop

# Remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# View logs
docker-compose logs backend
docker-compose logs frontend

# Execute commands in running container
docker-compose exec backend bash
docker-compose exec frontend sh

# Rebuild specific service
docker-compose up --build backend
```

### Production Deployment

For production, use:
```bash
# Build optimized images
docker-compose build --no-cache

# Run in production mode
docker-compose up -d

# Check health status
docker-compose ps
```

### Troubleshooting

**Backend not responding:**
```bash
docker-compose logs backend
docker-compose restart backend
```

**Frontend build fails:**
```bash
docker-compose build --no-cache frontend
```

**Port conflicts:**
- Change ports in `docker-compose.yml`:
  - Frontend: `"3000:80"`
  - Backend: `"8001:8000"`

**Reset everything:**
```bash
docker-compose down -v
docker-compose up --build
```

## Architecture

```
┌─────────────────┐
│   Nginx (80)    │  ← Frontend (React + Vite)
│   /api → proxy  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ FastAPI (8000)  │  ← Backend API
│   + Python      │
└─────────────────┘
```

## Features

✅ **Multi-stage builds** for optimized images  
✅ **Nginx** for production frontend serving  
✅ **Health checks** for both services  
✅ **Hot reload** in development mode  
✅ **Environment variables** for configuration  
✅ **Docker networking** for service communication  
✅ **Security headers** and gzip compression
