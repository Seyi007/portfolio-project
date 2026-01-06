from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import uvicorn
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str
    subject: Optional[str] = None


class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None


class Skill(BaseModel):
    name: str
    category: str
    level: int  # 1-100


class Experience(BaseModel):
    id: int
    company: str
    position: str
    description: str
    start_date: str
    end_date: Optional[str] = None
    technologies: List[str]


class OpenSourceContribution(BaseModel):
    id: int
    type: str  # 'speaking', 'volunteering', 'contribution'
    title: str
    organization: str
    description: str
    date: str
    location: Optional[str] = None
    url: Optional[str] = None
    image_url: Optional[str] = None
    images: Optional[List[str]] = None
    technologies: Optional[List[str]] = None


# Mock data (replace with database in production)
PROJECTS = [
    {
        "id": 1,
        "title": "Linux GPU Programming",
        "description": "Advanced graphics programming with custom vertex and fragment shaders for per-vertex colors, textures, and real-time animations. Implemented texture blending with multiple texture units and designed VAOs, VBOs, and EBOs efficiently.",
        "technologies": ["C++", "OpenGL", "GLSL", "GLM", "GPU Programming", "Shaders"],
        "image_url": "/projects/gpu-programming.jpg"
    },
    {
        "id": 2,
        "title": "Git Project - Test Infrastructure Modernization",
        "description": "Modernizing Git's test infrastructure by migrating all legacy unit tests, cutting execution time by 30%. Established test reliability through structured assertions and error handling, reducing false positives by 25% and increasing confidence in test results.",
        "technologies": ["C", "Git", "Unit Testing", "Clar Framework"],
        "github_url": "https://github.com/git/git/pull/1935",
        "image_url": "/projects/git-testing.png"
    },
    {
        "id": 3,
        "title": "MolEvolvR - Protein Evolution Analysis",
        "description": "Standardized code reliability and maintainability by adding structured error handling to meet modern R practices. Collaborated with researchers to develop relevant test cases and assertions, improving trust in the platform by 30%.",
        "technologies": ["R", "Bioinformatics", "Unit Testing", "Genomics"],
        "github_url": "https://github.com/JRaviLab/MolEvolvR/commit/48b7fd697b6c6cac7826ae3f09d315025db1a438",
        "image_url": "/projects/molevolve.png"
    },
    {
        "id": 4,
        "title": "ETL Pipeline Automation",
        "description": "Developed scalable ETL pipelines at Stackwisr optimizing data transformation for over 1 million records. Designed data warehousing solutions improving query performance by 60% with Python, Spark, and SQL Server.",
        "technologies": ["Python", "Apache Spark", "SQL Server", "ETL", "Data Warehousing"],
        "image_url": "/projects/etl-pipeline.png"
    },
    {
        "id": 5,
        "title": "AI-Driven Marketing Optimization",
        "description": "Designed and implemented AI-driven features for digital marketing campaigns at Koloxo Home, including audience segmentation, content recommendations, and performance forecasting. Developed data validation schemas cutting costs by 100%.",
        "technologies": ["Python", "Machine Learning", "AI", "Data Validation", "Marketing Analytics"],
        "image_url": "/projects/ai-marketing.jpg"
    },
    {
        "id": 6,
        "title": "Git Reference Table Test Functionalities",
        "description": "Series of commits modernizing various components of Git's reference table test functionalities with improved testing patterns.",
        "technologies": ["C", "Git", "Testing Framework"],
        "github_url": "https://github.com/git/git/pull/1935/commits",
        "image_url": "/projects/git-reftable.png"
    }
]

SKILLS = [
    # Programming & Scripting
    {"name": "C/C++", "category": "Programming & Scripting", "level": 95},
    {"name": "Python", "category": "Programming & Scripting", "level": 95},
    {"name": "R Programming", "category": "Programming & Scripting", "level": 85},
    {"name": "Bash", "category": "Programming & Scripting", "level": 90},
    {"name": "SQL", "category": "Programming & Scripting", "level": 90},
    {"name": "YAML", "category": "Programming & Scripting", "level": 85},
    {"name": "Shell Scripting", "category": "Programming & Scripting", "level": 90},
    
    # Version Control & DevOps
    {"name": "Git/GitHub", "category": "Version Control & DevOps", "level": 100},
    {"name": "Jenkins", "category": "Version Control & DevOps", "level": 85},
    {"name": "Docker", "category": "Version Control & DevOps", "level": 90},
    {"name": "Kubernetes", "category": "Version Control & DevOps", "level": 85},
    {"name": "GitLab CI", "category": "Version Control & DevOps", "level": 85},
    {"name": "GitHub Actions", "category": "Version Control & DevOps", "level": 90},
    {"name": "Agile Methodologies", "category": "Version Control & DevOps", "level": 90},
    {"name": "Jira", "category": "Version Control & DevOps", "level": 85},
    
    # Systems & Infrastructure
    {"name": "Linux", "category": "Systems & Infrastructure", "level": 95},
    {"name": "Linux GPU Stack", "category": "Systems & Infrastructure", "level": 80},
    {"name": "Terraform", "category": "Systems & Infrastructure", "level": 85},
    {"name": "Ansible", "category": "Systems & Infrastructure", "level": 85},
    {"name": "AWS", "category": "Systems & Infrastructure", "level": 85},
    {"name": "Azure Data Factory", "category": "Systems & Infrastructure", "level": 80},
    
    # Monitoring and Logging
    {"name": "Prometheus", "category": "Monitoring & Logging", "level": 85},
    {"name": "Grafana", "category": "Monitoring & Logging", "level": 85},
    {"name": "Datadog", "category": "Monitoring & Logging", "level": 80},
    
    # Big Data & Analytics
    {"name": "Apache Spark", "category": "Big Data & Analytics", "level": 90},
    {"name": "Kafka", "category": "Big Data & Analytics", "level": 85},
    {"name": "Power BI", "category": "Big Data & Analytics", "level": 85},
    {"name": "PySpark", "category": "Big Data & Analytics", "level": 90},
    {"name": "Pandas", "category": "Big Data & Analytics", "level": 95},
    {"name": "NumPy", "category": "Big Data & Analytics", "level": 90},
    {"name": "Scikit-learn", "category": "Big Data & Analytics", "level": 85},
    {"name": "Jupyter Notebook", "category": "Big Data & Analytics", "level": 90},
    {"name": "Matplotlib", "category": "Big Data & Analytics", "level": 85},
    {"name": "Machine Learning", "category": "Big Data & Analytics", "level": 85},
    
    # Web & API Development
    {"name": "Django", "category": "Web & API Development", "level": 90},
    {"name": "Flask", "category": "Web & API Development", "level": 90},
    {"name": "FastAPI", "category": "Web & API Development", "level": 90},
    {"name": "RESTful APIs", "category": "Web & API Development", "level": 90},
    {"name": "Microservices", "category": "Web & API Development", "level": 85},
    
    # Testing Technologies
    {"name": "System Testing", "category": "Testing Technologies", "level": 95},
    {"name": "Unit Testing", "category": "Testing Technologies", "level": 95},
    {"name": "Postman", "category": "Testing Technologies", "level": 90},
    {"name": "Pytest", "category": "Testing Technologies", "level": 90}
]

EXPERIENCES = [
    {
        "id": 1,
        "company": "Koloxo Home",
        "position": "AI Developer",
        "description": "Developed data validation schemas for AI input data to cut unwarranted costs by 100%. Designed and implemented AI-driven features to optimize digital marketing campaigns, including audience segmentation, content recommendations, and performance forecasting. Automated reporting and insights generation for data-driven marketing decisions.",
        "start_date": "2025-12",
        "end_date": None,
        "technologies": ["AI", "Machine Learning", "Data Validation", "Digital Marketing", "Python"]
    },
    {
        "id": 2,
        "company": "Xenara Inc",
        "position": "DevOps Engineer",
        "description": "Performed cost optimization to cut AWS compute power cost by 30%. Set up monitoring using Prometheus to maintain site operationality and reliability by 20%.",
        "start_date": "2025-08",
        "end_date": "2025-12",
        "technologies": ["AWS", "Prometheus", "DevOps", "Cost Optimization", "Monitoring"]
    },
    {
        "id": 3,
        "company": "Software Freedom Conservancy",
        "position": "Software Engineer",
        "description": "Revamped Git's testing framework by implementing Clar, reducing manual debugging time by 40%. Developed C-based test cases that cut execution time by 30%. Established test reliability through structured assertions and error handling, reducing false positives by 25%. Authored technical articles guiding 200+ contributors.",
        "start_date": "2024-12",
        "end_date": "2025-03",
        "technologies": ["C", "Git", "Clar", "Unit Testing", "Technical Writing"]
    },
    {
        "id": 4,
        "company": "Stackwisr Limited",
        "position": "Full Stack Data Engineer",
        "description": "Developed scalable ETL pipelines optimizing data transformation for over 1 million records. Automated report generation using SQL and Power BI. Designed data warehousing solutions improving query performance by 60% and reducing downtime by 30%. Applied ML and AI for fraud detection and credit risk assessment.",
        "start_date": "2023-10",
        "end_date": "2025-01",
        "technologies": ["Python", "SQL", "Power BI", "ETL", "Data Warehousing", "Machine Learning"]
    },
    {
        "id": 5,
        "company": "ALX Africa",
        "position": "Software Engineer Intern",
        "description": "Configured and refined web servers, reducing application load times by 35%. Automated key procedures using Bash, C, and Python, reducing manual intervention by 50%. Boosted database performance by 40% through schema design, index management, and query optimization.",
        "start_date": "2022-02",
        "end_date": "2023-07",
        "technologies": ["Bash", "C", "Python", "Web Servers", "Database Optimization"]
    }
]

OPENSOURCE_CONTRIBUTIONS = [
    {
        "id": 1,
        "type": "speaking",
        "title": "Bridging the Gap: Encouraging African Talent to Open Source",
        "organization": "FOSS Backstage 2026",
        "description": "Africa is rich in tech talent, many of whom are eager to contribute to open-source projects. However, due to the technical requirements needed to get started with open source and a lack of proper mentoring and guidance from these communities, many talents are discouraged. This talk explores my journey into open source as an Outreachy intern working on the Git project and highlights practical ways to bridge these gaps through mentorship, outreach, and inclusive programs.",
        "date": "2026-03",
        "location": "Berlin, Germany - Wintergarten Room",
        "url": "https://fossbackstage.org",
        "images": ["/opensource/fossbackstage.png", "/opensource/seyi-conference.png"],
        "technologies": ["Open Source", "Community", "Mentorship", "Diversity & Inclusion"]
    },
    {
        "id": 2,
        "type": "volunteering",
        "title": "FOSDEM 2026 - Infodesk Online Volunteer",
        "organization": "FOSDEM",
        "description": "Volunteering at FOSDEM 2026, one of Europe's largest open source conferences. Serving as an Infodesk Online volunteer, providing information and support to attendees, helping them navigate the conference, and assisting with online queries.",
        "date": "2026-02",
        "location": "Brussels, Belgium (Online Support)",
        "url": "https://fosdem.org/2026/",
        "images": ["/opensource/fosdem26.png", "/opensource/seyi-fosdem.jpg"],
        "technologies": ["Open Source", "Community Support", "Volunteering"]
    },
    {
        "id": 3,
        "type": "contribution",
        "title": "Git Core Contributor",
        "organization": "Git Project",
        "description": "Modernized Git's internal unit testing framework by migrating legacy tests to Clar framework. Reduced test execution time by 30% and improved test reliability by 25% through structured assertions and error handling.",
        "date": "2024-12",
        "url": "https://github.com/git/git/pull/1935",
        "image_url": "/opensource/git-contribution.png",
        "technologies": ["C", "Git", "Unit Testing", "Open Source"]
    },
    {
        "id": 4,
        "type": "contribution",
        "title": "MolEvolvR Testing Enhancement",
        "organization": "JRaviLab",
        "description": "Improved code reliability and maintainability by implementing structured error handling and comprehensive test cases for protein evolution analysis platform.",
        "date": "2024-06",
        "url": "https://github.com/JRaviLab/MolEvolvR",
        "technologies": ["R", "Bioinformatics", "Unit Testing"]
    },
    {
        "id": 5,
        "type": "volunteering",
        "title": "Open Source Mentorship",
        "organization": "Software Freedom Conservancy",
        "description": "Mentored new contributors to the Git project, authored technical documentation, and guided over 200 contributors through best practices in C programming and testing.",
        "date": "2024-12",
        "technologies": ["Mentorship", "Technical Writing", "Open Source"]
    }
]


# Routes
@app.get("/")
async def root():
    return {
        "message": "Portfolio API",
        "version": "1.0.0",
        "endpoints": {
            "projects": "/api/projects",
            "skills": "/api/skills",
            "experience": "/api/experience",
            "opensource": "/api/opensource",
            "contact": "/api/contact"
        }
    }


@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    """Get all projects"""
    return PROJECTS


@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """Get a specific project by ID"""
    project = next((p for p in PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.get("/api/skills", response_model=List[Skill])
async def get_skills():
    """Get all skills"""
    return SKILLS


@app.get("/api/skills/{category}")
async def get_skills_by_category(category: str):
    """Get skills by category"""
    skills = [s for s in SKILLS if s["category"].lower() == category.lower()]
    return skills


@app.get("/api/experience", response_model=List[Experience])
async def get_experience():
    """Get all work experience"""
    return EXPERIENCES


@app.get("/api/opensource", response_model=List[OpenSourceContribution])
async def get_opensource():
    """Get all open source contributions"""
    return OPENSOURCE_CONTRIBUTIONS


@app.get("/api/opensource/{type}")
async def get_opensource_by_type(type: str):
    """Get open source contributions by type (speaking, volunteering, contribution)"""
    contributions = [c for c in OPENSOURCE_CONTRIBUTIONS if c["type"].lower() == type.lower()]
    return contributions


@app.post("/api/contact")
async def send_contact_message(message: ContactMessage):
    """Handle contact form submission and send email notification"""
    
    # Email configuration
    YOUR_EMAIL = "kuforiji98@gmail.com"
    
    try:
        # Create email message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Portfolio Contact: {message.subject or 'New Message'}"
        msg['From'] = YOUR_EMAIL
        msg['To'] = YOUR_EMAIL
        msg['Reply-To'] = message.email
        
        # Create HTML email body
        html_body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong style="color: #6366f1;">From:</strong> {message.name}</p>
                        <p><strong style="color: #6366f1;">Email:</strong> <a href="mailto:{message.email}">{message.email}</a></p>
                        <p><strong style="color: #6366f1;">Subject:</strong> {message.subject or 'No subject'}</p>
                    </div>
                    
                    <div style="background-color: #fff; padding: 20px; border-left: 4px solid #6366f1; margin: 20px 0;">
                        <h3 style="color: #6366f1; margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap;">{message.message}</p>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
                        This email was sent from your portfolio contact form.
                    </p>
                </div>
            </body>
        </html>
        """
        
        # Create plain text version
        text_body = f"""
New Contact Form Submission
{'='*50}

From: {message.name}
Email: {message.email}
Subject: {message.subject or 'No subject'}

Message:
{message.message}

{'='*50}
This email was sent from your portfolio contact form.
        """
        
        # Attach both versions
        part1 = MIMEText(text_body, 'plain')
        part2 = MIMEText(html_body, 'html')
        msg.attach(part1)
        msg.attach(part2)
        
        # Try to send email via Gmail SMTP
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('SMTP_PORT', '587'))
        smtp_username = os.getenv('SMTP_USERNAME', YOUR_EMAIL)
        smtp_password = os.getenv('SMTP_PASSWORD', '')
        
        print(f"🔍 SMTP Configuration:")
        print(f"   Server: {smtp_server}:{smtp_port}")
        print(f"   Username: {smtp_username}")
        print(f"   Password configured: {'Yes' if smtp_password else 'No'}")
        
        if smtp_password:
            print(f"📧 Attempting to send email...")
            with smtplib.SMTP(smtp_server, smtp_port, timeout=10) as server:
                server.set_debuglevel(0)  # Set to 1 for verbose SMTP debugging
                server.starttls()
                server.login(smtp_username, smtp_password)
                server.send_message(msg)
            
            print(f"✅ Email successfully sent to {YOUR_EMAIL}")
        else:
            print(f"⚠️  SMTP password not configured. Email preview:")
            print(f"   From: {message.name} ({message.email})")
            print(f"   Subject: {message.subject}")
            print(f"   Message: {message.message}")
    
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ SMTP Authentication Error: {str(e)}")
        print(f"   Check your Gmail app password is correct")
        print(f"   Make sure 2-Step Verification is enabled")
    except smtplib.SMTPException as e:
        print(f"❌ SMTP Error: {str(e)}")
    except Exception as e:
        print(f"❌ Unexpected error sending email: {type(e).__name__}: {str(e)}")
    finally:
        # Always log the message
        print(f"\n📨 Contact form submission:")
        print(f"   Name: {message.name}")
        print(f"   Email: {message.email}")
        print(f"   Subject: {message.subject}")
        print(f"   Message: {message.message}\n")
    
    return {
        "status": "success",
        "message": "Thank you for your message! I'll get back to you soon."
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
