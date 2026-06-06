# Deployment Guide: PythonAnywhere & Frontend Hosting

This guide provides step-by-step instructions for deploying the Django backend to **PythonAnywhere** and hosting the React + Vite frontend on a modern static hosting platform (**Vercel** or **Cloudflare Pages**).

---

## 1. Frontend Hosting Options & Recommendation

Because the frontend is a React + Vite Single Page Application (SPA), it compiles down to static HTML, CSS, and JavaScript. It does not need a running Python/Node.js server. The best platforms for hosting static sites are:

| Platform | Recommended For | Free Tier Limitations | Why Choose It? |
| :--- | :--- | :--- | :--- |
| **Vercel** *(Recommended)* | **Best overall experience (DX)** | 100 GB Bandwidth/mo | Zero-configuration for Vite. Automatic branch preview deployments, incredibly fast global CDN, and seamless Git integration. |
| **Cloudflare Pages** | **High traffic portfolios** | **Unlimited bandwidth** | Extremely fast global edge network. Best if you expect huge visitor spikes because bandwidth is unlimited. |
| **Netlify** | **Alternative option** | 100 GB Bandwidth/mo | Easy git integration and custom domains. Similar to Vercel but with slightly fewer build minutes. |

---

## 2. Step 1: Deploy Django Backend to PythonAnywhere

### 2.1 Git Clone your Repository
1. Log in to your PythonAnywhere account.
2. Open a **Bash Console** from your PythonAnywhere Dashboard.
3. Clone your Git repository (replace with your repo URL):
   ```bash
   git clone https://github.com/yourusername/portfolio-profile.git
   cd portfolio-profile/backend
   ```

### 2.2 Create a Virtual Environment & Install Dependencies
1. Create a Python 3.10 virtual environment:
   ```bash
   mkvirtualenv --python=/usr/bin/python3.10 portfolio-venv
   ```
   *Note: This automatically activates the virtual environment. In the future, you can activate it using `workon portfolio-venv`.*
2. Install the Django dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### 2.3 Setup the Production Environment File (`.env`)
1. Create a `.env` file in your PythonAnywhere project folder:
   ```bash
   nano .env
   ```
2. Copy and paste the following configuration, adjusting the values for production:
   ```ini
   DJANGO_SECRET_KEY=your-random-secure-secret-key-goes-here
   DEBUG=False
   ALLOWED_HOSTS=yourusername.pythonanywhere.com
   
   # Database: SQLite is default and works out-of-the-box
   DATABASE_URL=sqlite:///db.sqlite3
   
   # CORS and CSRF configurations
   # Replace with your frontend domain once it is deployed (e.g. Vercel or Netlify URL)
   CORS_ALLOWED_ORIGINS=https://your-portfolio.vercel.app
   CSRF_TRUSTED_ORIGINS=https://your-portfolio.vercel.app
   ```
3. Save and close nano (`Ctrl + O`, then `Enter`, then `Ctrl + X`).

### 2.4 Setup Database and Superuser
1. Run migrations to initialize the database:
   ```bash
   python manage.py migrate
   ```
2. Create an admin superuser to manage portfolio data via the Django Jazzmin admin panel:
   ```bash
   python manage.py createsuperuser
   ```
   *Follow the prompts to enter a username, email, and password.*

### 2.5 Collect Static Files
Generate the static assets so PythonAnywhere can serve them efficiently:
```bash
python manage.py collectstatic --noinput
```

### 2.6 Configure PythonAnywhere Web Application
1. Go to the **Web** tab on the PythonAnywhere dashboard.
2. Click **Add a new web app**.
3. Choose **Manual configuration** (do NOT choose Django, as manual configuration gives us control over virtualenv and repository folders).
4. Select **Python 3.10**.
5. Once created, update the following paths in your Web Tab settings:
   - **Source code**: `/home/yourusername/portfolio-profile/backend`
   - **Working directory**: `/home/yourusername/portfolio-profile/backend`
   - **Virtualenv**: `/home/yourusername/.virtualenvs/portfolio-venv`

### 2.7 Configure WSGI File
1. Under the **Web** tab, locate and click the **WSGI configuration file** link (usually `/var/www/yourusername_pythonanywhere_com_wsgi.py`).
2. Replace its contents entirely with the following code (which reads environment variables from `.env` and boots Django):
   ```python
   import os
   import sys
   from pathlib import Path
   
   # Add project path to sys.path
   path = '/home/yourusername/portfolio-profile/backend'
   if path not in sys.path:
       sys.path.append(path)
   
   # Load environment variables from .env file
   from decouple import Config, RepositoryEnv
   env_path = os.path.join(path, '.env')
   if os.path.exists(env_path):
       config = Config(RepositoryEnv(env_path))
       # Make variables available to os.environ
       for key in RepositoryEnv(env_path).data.keys():
           os.environ[key] = config(key)
   
   os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio.settings'
   
   from django.core.wsgi import get_wsgi_application
   application = get_wsgi_application()
   ```
3. Click **Save**.

### 2.8 Configure Static & Media Files (Crucial for Django Admin Styles & Portfolio Images)
To ensure PythonAnywhere serves CSS/JS and media uploads directly (instead of Django doing it, which is slow and disabled in production):
1. In the **Web** tab, scroll down to the **Static files** section.
2. Add the following mapping entries:
   
   | URL | Directory Path |
   | :--- | :--- |
   | `/static/` | `/home/yourusername/portfolio-profile/backend/staticfiles` |
   | `/media/` | `/home/yourusername/portfolio-profile/backend/media` |

3. Scroll up to the top of the Web page and click **Reload yourusername.pythonanywhere.com**.
4. Test by opening `https://yourusername.pythonanywhere.com/admin` in your browser. The Jazzmin admin login page should render with styling intact.

---

## 3. Step 2: Host Frontend on Vercel (Recommended)

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your Git repository.
4. Configure the Project Settings:
   - **Framework Preset**: Choose **Vite** or **Other** (Vercel automatically detects Vite).
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://yourusername.pythonanywhere.com/api` (Replace with your actual PythonAnywhere domain)
6. Click **Deploy**.
7. Once deployed, note down the frontend URL provided by Vercel (e.g., `https://your-portfolio.vercel.app`).

---

## 4. Step 3: Link Backend and Frontend Together

1. Go back to your PythonAnywhere Bash Console.
2. Edit your `.env` file:
   ```bash
   nano /home/yourusername/portfolio-profile/backend/.env
   ```
3. Update `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to point to your new frontend production URL:
   ```ini
   CORS_ALLOWED_ORIGINS=https://your-portfolio.vercel.app
   CSRF_TRUSTED_ORIGINS=https://your-portfolio.vercel.app
   ```
4. Save and exit nano.
5. In the PythonAnywhere Web Dashboard, click **Reload** to apply the new CORS and CSRF configurations.
6. Open your Vercel frontend website. You should see your portfolio loading details from the backend and be able to successfully send messages through the contact form!
