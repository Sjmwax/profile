# Portfolio Website - Full Stack

A modern, full-stack portfolio website for software engineers, web designers, and web application designers.

## Tech Stack

**Backend:**
- Django 4.2
- Django REST Framework
- SQLite (development) / PostgreSQL (production)
- CORS enabled

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## Project Structure

```
portfolio/
├── backend/
│   ├── portfolio/          # Django project settings
│   ├── api/                # API app with models and views
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── styles/         # CSS and Tailwind config
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
├── .github/
│   └── copilot-instructions.md
└── .gitignore
```

## Features

### Portfolio Management
- Multiple role profiles (Engineer, Designer, Web Designer)
- Project showcase with categories
- Skills with proficiency levels
- Work experience timeline
- Education background
- Contact form

### Modern UI
- Dark theme with cyan accents
- Glass morphism effects
- Smooth animations and transitions
- Responsive design
- Fluid interactive controls
- Hero section with social links

### Admin Interface
- Full admin panel for content management
- Portfolio information editor
- Project CRUD operations
- Skills management
- Experience and education tracking
- Message inbox

## Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

All API endpoints are prefixed with `/api/`

- **Portfolio:** `GET /portfolio/`
- **Skills:** `GET /skills/`, `GET /skills/?category=frontend`
- **Projects:** `GET /projects/`, `GET /projects/{slug}/`, `GET /projects/featured/`
- **Experience:** `GET /experience/`
- **Education:** `GET /education/`
- **Messages:** `POST /messages/`

## Configuration

### Backend (.env)
```
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Customization

1. **Portfolio Data** - Update through Django admin at `/admin`
2. **Styling** - Modify `tailwind.config.js` in frontend
3. **Components** - Edit React components in `frontend/src/components`
4. **Colors** - Change primary color in Tailwind config

## Production Deployment

### Backend
- Change `DEBUG=False`
- Set proper `SECRET_KEY`
- Configure `ALLOWED_HOSTS`
- Use PostgreSQL database
- Set up static/media file serving
- Use Gunicorn for serving

### Frontend
- Run `npm run build`
- Deploy to static hosting (Vercel, Netlify, etc.)
- Update API URL in environment

## License

MIT License - feel free to use for your portfolio!

## Support

For issues or questions, check the individual README files in backend/ and frontend/ directories.
