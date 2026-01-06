# Professional Portfolio Website - Seyi Kuforiji

A modern, responsive portfolio website showcasing open-source contributions, software engineering projects, and data engineering expertise. Built with React, TypeScript, TailwindCSS, Framer Motion, and FastAPI.

## 👨‍💻 About

Portfolio website for **Seyi Kuforiji**, an internationally recognized open-source contributor to Git and experienced software/data engineer specializing in:

- **Open Source Contributions**: Core contributor to Git with thousands of lines of C code
- **Data Engineering**: ETL pipeline automation with Python, Spark, SQL Server, and HBase
- **Software Engineering**: Full-stack development with Python, Django, Flask, and modern frameworks
- **Certifications**: Stanford University - Data Science & AI for Precision Medicine and Cloud Computing

- **Modern Tech Stack**: React + Vite + TypeScript for the frontend, FastAPI for the backend
- **Beautiful UI**: TailwindCSS with custom gradient effects and glassmorphism
- **Smooth Animations**: Framer Motion for engaging user experience
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Components**: 
  - Hero section with animated background
  - Dynamic project showcase
  - Skills with progress bars
  - Timeline-based experience section
  - Contact form with validation
- **API Integration**: RESTful API with FastAPI for dynamic content

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://www.python.org/)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio-project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

## 🚀 Running the Application

### Start the Backend

```bash
# From the backend directory
cd backend

# Activate virtual environment if not already active
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Run the FastAPI server
python main.py

# Or use uvicorn directly:
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

### Start the Frontend

```bash
# From the frontend directory (in a new terminal)
cd frontend

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
portfolio-project/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .gitignore
└── README.md
```

## 🎨 Customization

### Adding Your Resume and Profile Image

1. **Resume**: Place your PDF resume in `frontend/public/resume/` with the filename `Seyi_Kuforiji_Resume.pdf`
2. **Profile Image**: Add your profile photo to `frontend/public/images/` (recommended: square format, min 500x500px)

### Update Personal Information

1. **Hero Section** (`frontend/src/components/Hero.tsx`):
   - Change your name, title, and bio
   - Update social media links

2. **Backend Data** (`backend/main.py`):
   - Modify `PROJECTS` array with your projects
   - Update `SKILLS` array with your skills
   - Change `EXPERIENCES` array with your work history

3. **Contact Form**:
   - Update email configuration in `backend/.env`

### Change Color Scheme

Edit `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Customize these color values
    500: '#your-color',
    600: '#your-color',
    // ...
  }
}
```

## 📦 Building for Production

### Frontend

```bash
cd frontend
npm run build
```

The production-ready files will be in `frontend/dist/`

### Backend

For production, use a WSGI server like gunicorn:

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🚀 Deployment

### Frontend Deployment Options:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package

### Backend Deployment Options:
- **Railway**: Connect your GitHub repo
- **Heroku**: `git push heroku main`
- **DigitalOcean**: Deploy on App Platform
- **AWS**: Use Elastic Beanstalk or EC2

## 🔧 API Endpoints

- `GET /` - API information
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get specific project
- `GET /api/skills` - Get all skills
- `GET /api/skills/{category}` - Get skills by category
- `GET /api/experience` - Get work experience
- `POST /api/contact` - Submit contact form

## 🧪 Testing the API

You can test the API using the automatic documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 💡 Features to Add

- [ ] Blog section
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Admin dashboard
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email notifications for contact form
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Progressive Web App (PWA)

## 🐛 Troubleshooting

### Port already in use

If you get an error that the port is already in use:

**Backend:**
```bash
# Change port in backend/main.py or use:
uvicorn main:app --reload --port 8001
```

**Frontend:**
```bash
# Update vite.config.ts server.port to a different port
```

### Module not found errors

Make sure all dependencies are installed:

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### CORS errors

The backend is configured to allow requests from `localhost:5173` and `localhost:3000`. If you're using a different port, update the `CORS_ORIGINS` in `backend/main.py`.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 👨‍💻 Author

**Seyi Kuforiji**
- Open Source Contributor to Git
- Software Engineer & Data Engineer
- GitHub: [@seyikuforiji](https://github.com/seyikuforiji)
- LinkedIn: [@seyi-kuforiji](https://linkedin.com/in/seyi-kuforiji)

### Featured Work
- Git 2.49 - Modernized internal unit testing framework
- MolEvolvR - Bioinformatics testing framework
- Experience at ALX Africa and Stackwisr

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

Made with ❤️ and lots of ☕
