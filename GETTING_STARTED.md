# Getting Started - Portfolio Website

## Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

## Backend Setup (Django)

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Create .env file
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
# On Windows: copy .env.example .env
```

### 5. Run migrations
```bash
python manage.py migrate
```

### 6. Create superuser (admin account)
```bash
python manage.py createsuperuser
# Follow prompts to set username, email, and password
```

### 7. Run development server
```bash
python manage.py runserver
```

Backend will run at: **http://localhost:8000**

**Admin panel:** http://localhost:8000/admin (use superuser credentials)

## Frontend Setup (React)

### 1. Open new terminal and navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env.local file
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
# On Windows: copy .env.example .env.local
```

### 4. Run development server
```bash
npm run dev
```

Frontend will run at: **http://localhost:3000**

## First Steps

### 1. Add Portfolio Information
1. Go to http://localhost:8000/admin
2. Login with your superuser credentials
3. Click "Portfolio" and add your information:
   - Name
   - Title (e.g., "Software Engineer & Designer")
   - Bio
   - Email, phone, location
   - Profile image (optional)
   - Social links (GitHub, LinkedIn, etc.)

### 2. Add Skills
1. Click "Skills" in admin panel
2. Add your technical skills with:
   - Name
   - Category (Frontend, Backend, Design, etc.)
   - Proficiency level (0-100%)
   - Font Awesome icon (optional)

### 3. Add Projects
1. Click "Projects" in admin panel
2. Add your portfolio projects:
   - Title
   - Description
   - Image
   - Category
   - Technologies used (comma-separated)
   - GitHub link (optional)
   - Live link (optional)
   - Mark as "Featured" to show on home page

### 4. Add Experience
1. Click "Experience" in admin panel
2. Add your work history:
   - Company name
   - Position
   - Description
   - Start and end dates

### 5. Add Education
1. Click "Education" in admin panel
2. Add your educational background:
   - Institution
   - Degree
   - Field
   - Dates

## View Your Portfolio

Visit **http://localhost:3000** to see your portfolio website!

## Available Pages

- **Home** - Hero section, featured projects, call-to-action
- **About** - Skills, experience, education
- **Projects** - All projects with category filtering
- **Contact** - Contact form that saves messages to database

## Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color-here',
    600: '#darker-shade',
  }
}
```

### Add More Sections
Edit `frontend/src/App.jsx` and create new page components in `frontend/src/pages/`

### Modify Styling
- Global styles: `frontend/src/styles/globals.css`
- Tailwind config: `frontend/tailwind.config.js`
- Component styles: Tailwind classes in JSX files

## Building for Production

### Backend
```bash
cd backend
# Set DEBUG=False and update ALLOWED_HOSTS in settings.py
# Use Gunicorn: gunicorn portfolio.wsgi
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to any static hosting
```

## Troubleshooting

### Port already in use
- Backend: `python manage.py runserver 8001`
- Frontend: `npm run dev -- --port 3001`

### CORS errors
- Make sure both servers are running
- Check ALLOWED_HOSTS in `backend/portfolio/settings.py`
- Update CORS_ALLOWED_ORIGINS if needed

### Migrations not working
```bash
python manage.py makemigrations
python manage.py migrate
```

## API Documentation

All endpoints are at `http://localhost:8000/api/`

- `GET /api/portfolio/` - Portfolio info
- `GET /api/skills/` - All skills
- `GET /api/projects/` - All projects
- `GET /api/projects/featured/` - Featured projects only
- `GET /api/experience/` - Work experience
- `GET /api/education/` - Education
- `POST /api/messages/` - Submit contact form

## Need Help?

Check the README.md files in:
- `backend/README.md` - Backend documentation
- `frontend/README.md` - Frontend documentation
- `README.md` - Full project documentation
