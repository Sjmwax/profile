# Portfolio Backend API

Django REST Framework backend for the portfolio website.

## Features
- RESTful API with Django REST Framework
- Portfolio, Projects, Skills, Experience, and Education management
- Contact form messages
- Admin interface for content management
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Run Migrations
```bash
python manage.py migrate
```

### 4. Create Superuser
```bash
python manage.py createsuperuser
```

### 5. Run Server
```bash
python manage.py runserver
```

Access the admin panel at `http://localhost:8000/admin`

## API Endpoints

- `GET /api/portfolio/` - Get portfolio information
- `GET /api/skills/` - List all skills
- `GET /api/projects/` - List all projects
- `GET /api/projects/{slug}/` - Get project details
- `GET /api/projects/featured/` - Get featured projects
- `GET /api/experience/` - List work experience
- `GET /api/education/` - List education
- `POST /api/messages/` - Submit contact form

## Database Models

- **Portfolio** - Main portfolio information
- **Skill** - Skills and proficiencies
- **Project** - Portfolio projects
- **Experience** - Work experience
- **Education** - Educational background
- **Message** - Contact form submissions
