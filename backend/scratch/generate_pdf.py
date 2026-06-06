import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to calculate total page count and draw clean, 
    professional running headers and footers on all pages except the title page.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_elements(num_pages)
            super().showPage()
        super().save()

    def draw_page_elements(self, page_count):
        if self._pageNumber == 1:
            # Draw decorative elements on Title Page
            self.saveState()
            self.setFillColor(colors.HexColor("#1A365D")) # Deep blue top bar Accent
            self.rect(0, 782, 612, 10, fill=True, stroke=False)
            self.restoreState()
            return

        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#718096"))
        
        # Header (Top Margin)
        self.drawString(54, 750, "FULL STACK DEPLOYMENT GUIDE: DJANGO + VITE REACT")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 742, letter[0]-54, 742)
        
        # Footer (Bottom Margin)
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 40, page_text)
        self.drawString(54, 40, "Confidential - Portfolio Project Deployment Documentation")
        self.line(54, 52, letter[0]-54, 52)
        
        self.restoreState()

def build_pdf(filename):
    # Setup document geometry with 0.75in (54pt) margins. Top/bottom margins extended slightly to accommodate running headers/footers.
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=72,
        bottomMargin=72
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Document Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#1A365D'),
        spaceAfter=12
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#4A5568'),
        spaceAfter=30
    )
    
    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.HexColor('#2B6CB0'),
        spaceBefore=18,
        spaceAfter=10,
        keepWithNext=True
    )
    
    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#2D3748'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#2D3748'),
        spaceAfter=8
    )
    
    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#2D3748'),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    code_style = ParagraphStyle(
        'DocCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1A202C'),
        spaceAfter=4
    )
    
    story = []
    
    # ------------------ TITLE PAGE ------------------
    story.append(Spacer(1, 40))
    story.append(Paragraph("DEPLOYMENT GUIDE & ARCHITECTURE", title_style))
    story.append(Paragraph("Complete steps, customizations, and configurations for deploying the Portfolio Project backend on PythonAnywhere and the Vite React frontend on Vercel.", subtitle_style))
    story.append(Spacer(1, 20))
    
    # Overview Callout
    intro_html = (
        "This document details the configuration and deployment procedures for your portfolio application. "
        "The project consists of a <b>Django REST API</b> backend (configured for PythonAnywhere) and a "
        "<b>React + Vite</b> SPA frontend (configured for static hosting on Vercel). Follow these steps "
        "to ensure secure cross-origin communication, static assets delivery, and error-free operation."
    )
    story.append(make_callout("System Architecture Overview", intro_html, "note"))
    story.append(Spacer(1, 40))
    
    # Table of Hosting Platforms
    story.append(Paragraph("Frontend Hosting Platforms Comparison", h2_style))
    host_data = [
        ["Platform", "Recommended For", "Bandwidth Limit", "Key Advantage"],
        ["Vercel", "Best DX & Setup", "100 GB / month", "Zero-config for Vite. Out-of-the-box CI/CD and deploy previews."],
        ["Cloudflare Pages", "High-traffic Portfolios", "Unlimited", "Extremely fast global edge CDN. Safe against DDoS/traffic spikes."],
        ["Netlify", "Alternative option", "100 GB / month", "Excellent git integrations and built-in form handlers."]
    ]
    t = Table(host_data, colWidths=[110, 130, 110, 154])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#2B6CB0')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 9),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F7FAFC')),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 8.5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,1), (-1,-1), 6),
    ]))
    story.append(t)
    
    story.append(PageBreak())
    
    # ------------------ SECTION 1: BACKEND DEPLOYMENT ------------------
    story.append(Paragraph("1. Backend Deployment (PythonAnywhere)", h1_style))
    story.append(Paragraph("The backend is built with Django and serves content over a REST API. PythonAnywhere serves it using a WSGI web server, with static/media files delivered directly via native web server mappings.", body_style))
    
    story.append(Paragraph("Step 1.1: Git Clone your Code", h2_style))
    story.append(Paragraph("Open a <b>Bash Console</b> on PythonAnywhere and clone your Git repository:", body_style))
    story.append(make_code_block("git clone https://github.com/Sjmwax/profile.git\ncd profile/backend"))
    
    story.append(Paragraph("Step 1.2: Set up Virtual Environment & Dependencies", h2_style))
    story.append(Paragraph("Create a Python 3.10 virtual environment and install dependencies:", body_style))
    story.append(make_code_block("mkvirtualenv --python=/usr/bin/python3.10 portfolio-venv\npip install -r requirements.txt"))
    
    story.append(Paragraph("Step 1.3: Configure Production Environment Variables (`.env`)", h2_style))
    story.append(Paragraph("Create a `.env` file inside `/home/simbajaymwax/profile/backend/` and configure production parameters:", body_style))
    
    env_code = (
        "DJANGO_SECRET_KEY=your-secure-production-secret-key\n"
        "DEBUG=False\n"
        "ALLOWED_HOSTS=localhost,127.0.0.1,simbajaymwax.pythonanywhere.com\n"
        "DATABASE_URL=sqlite:///db.sqlite3\n\n"
        "# Enable all origins for public portfolio API (solves Vercel preview domain CORS issues)\n"
        "CORS_ALLOW_ALL_ORIGINS=True\n"
        "CSRF_TRUSTED_ORIGINS=https://profile1-sjmwax-s-projects.vercel.app"
    )
    story.append(make_code_block(env_code))
    
    # Highlight Note on CORS
    cors_warning_html = (
        "<b>Important CORS configuration</b>: Using <code>CORS_ALLOW_ALL_ORIGINS=True</code> is "
        "highly recommended for public API deployment. Since Vercel creates new subdomains for "
        "each git commit (e.g. <code>profile1-riq6p9l9r-...</code>), hardcoding specific origins in settings.py "
        "will block API communication on preview links."
    )
    story.append(make_callout("CORS & Dynamic Subdomains Warning", cors_warning_html, "warning"))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("Step 1.4: Database Migrations & Django Admin Setup", h2_style))
    story.append(Paragraph("Run the database migrations and create a superuser for your management panel:", body_style))
    story.append(make_code_block("python manage.py migrate\npython manage.py createsuperuser"))
    
    story.append(Paragraph("Step 1.5: Collect Static Files", h2_style))
    story.append(Paragraph("Gather all static files (for Django admin layout) into the production folder:", body_style))
    story.append(make_code_block("python manage.py collectstatic --noinput"))
    
    story.append(PageBreak())
    
    # ------------------ BACKEND DEPLOYMENT CONT. & WSGI ------------------
    story.append(Paragraph("Step 1.6: Configure PythonAnywhere Web Dashboard", h2_style))
    story.append(Paragraph("In your PythonAnywhere Web tab, set up a <b>Manual Configuration</b> app (Python 3.10) and define the following paths:", body_style))
    
    story.append(Paragraph("&bull; <b>Source code</b>: <font face='Courier'>/home/simbajaymwax/profile/backend</font>", bullet_style))
    story.append(Paragraph("&bull; <b>Working directory</b>: <font face='Courier'>/home/simbajaymwax/profile/backend</font>", bullet_style))
    story.append(Paragraph("&bull; <b>Virtualenv</b>: <font face='Courier'>/home/simbajaymwax/.virtualenvs/portfolio-venv</font>", bullet_style))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("Step 1.7: Set up WSGI File", h2_style))
    story.append(Paragraph("Click your **WSGI configuration file** link on the Web page and replace its contents to load environment variables from your `.env` file properly:", body_style))
    
    wsgi_code = (
        "import os\n"
        "import sys\n"
        "from pathlib import Path\n\n"
        "path = '/home/simbajaymwax/profile/backend'\n"
        "if path not in sys.path:\n"
        "    sys.path.append(path)\n\n"
        "# Load environment variables from .env file\n"
        "from decouple import Config, RepositoryEnv\n"
        "env_path = os.path.join(path, '.env')\n"
        "if os.path.exists(env_path):\n"
        "    config = Config(RepositoryEnv(env_path))\n"
        "    for key in RepositoryEnv(env_path).data.keys():\n"
        "        os.environ[key] = config(key)\n\n"
        "os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio.settings'\n\n"
        "from django.core.wsgi import get_wsgi_application\n"
        "application = get_wsgi_application()"
    )
    story.append(make_code_block(wsgi_code))
    
    story.append(Spacer(1, 10))
    story.append(Paragraph("Step 1.8: Static and Media File Mappings", h2_style))
    story.append(Paragraph("In the **Static files** section of the PythonAnywhere Web tab, map the URL patterns to physical server folders. This enables PythonAnywhere to bypass Django and serve CSS/images directly for max performance:", body_style))
    
    # Table of Static mappings
    mapping_data = [
        ["URL Path", "Directory Path"],
        ["/static/", "/home/simbajaymwax/profile/backend/staticfiles"],
        ["/media/", "/home/simbajaymwax/profile/backend/media"]
    ]
    map_table = Table(mapping_data, colWidths=[150, 354])
    map_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#4A5568')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 4),
        ('TOPPADDING', (0,0), (-1,0), 4),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F7FAFC')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E0')),
        ('PADDING', (0,1), (-1,-1), 5),
        ('FONTSIZE', (0,0), (-1,-1), 8.5),
        ('FONTNAME', (0,1), (-1,-1), 'Courier'),
    ]))
    story.append(map_table)
    
    story.append(PageBreak())
    
    # ------------------ SECTION 2: FRONTEND DEPLOYMENT ------------------
    story.append(Paragraph("2. Frontend Deployment (Vercel)", h1_style))
    story.append(Paragraph("Since the React frontend is compiled to a static Single Page Application via Vite, we can deploy it directly onto Vercel.", body_style))
    
    story.append(Paragraph("Step 2.1: Import Project and Set Root Directory", h2_style))
    story.append(Paragraph("1. Log in to Vercel and import your GitHub repository.", bullet_style))
    story.append(Paragraph("2. In the configuration settings, locate **Root Directory** and change it from <code>./</code> to <b><code>frontend</code></b>. This tells Vercel where your Vite files are located.", bullet_style))
    story.append(Paragraph("3. Ensure build command is <code>npm run build</code> and output folder is <code>dist</code>.", bullet_style))
    
    story.append(Paragraph("Step 2.2: Add Environment Variables", h2_style))
    story.append(Paragraph("Before building, add the following environment variable to Vercel:", body_style))
    story.append(Paragraph("&bull; <b>Key</b>: <font face='Courier'>VITE_API_URL</font>", bullet_style))
    story.append(Paragraph("&bull; <b>Value</b>: <font face='Courier'>https://simbajaymwax.pythonanywhere.com/api</font>", bullet_style))
    
    story.append(Paragraph("Step 2.3: Build & Trigger Redeployment", h2_style))
    
    redeploy_note = (
        "<b>Why redeploy is crucial</b>: Because React runs entirely client-side in the browser, "
        "it cannot read environment variables at runtime. Instead, Vite injects <code>VITE_API_URL</code> "
        "into the Javascript files <b>during build time</b>. If you modify or add this variable in Vercel "
        "settings, you <i>must</i> click <b>Redeploy</b> in Vercel so the compilation is refreshed."
    )
    story.append(make_callout("Build-time vs Run-time Variables", redeploy_note, "note"))
    story.append(Spacer(1, 15))
    
    # ------------------ SECTION 3: KEY TROUBLESHOOTING & GOTCHAS ------------------
    story.append(Paragraph("3. Critical Troubleshooting & Gotchas", h1_style))
    
    story.append(Paragraph("1. Invalid Host Header (Bad Request 400)", h2_style))
    story.append(Paragraph("If you get a <b>400 Bad Request</b> or a <code>DisallowedHost</code> error on PythonAnywhere, you must make sure that <code>simbajaymwax.pythonanywhere.com</code> is added to <code>ALLOWED_HOSTS</code> in your <code>.env</code> file. Do not include <code>https://</code> in this variable, just the raw domain.", bullet_style))
    
    story.append(Paragraph("2. Trailing Slashes on CORS Origins", h2_style))
    story.append(Paragraph("When specifying <code>CORS_ALLOWED_ORIGINS</code>, <b>never</b> add a trailing slash (e.g. <code>https://my-site.vercel.app/</code>). It must be the clean origin: <code>https://my-site.vercel.app</code>. Adding a slash will cause the browser to block API requests.", bullet_style))
    
    story.append(Paragraph("3. Mixed Content Block", h2_style))
    story.append(Paragraph("Vercel sites run under secure HTTPS. Therefore, your <code>VITE_API_URL</code> in Vercel settings must also begin with <b><code>https://</code></b>. If you use <code>http://</code>, the browser will block the API requests as insecure mixed content.", bullet_style))
    
    story.append(Paragraph("4. Missing Data Placeholder Fallbacks", h2_style))
    story.append(Paragraph("If your frontend successfully connects to the backend but renders blank sections, it means your database on PythonAnywhere is empty. Log into your Django admin, navigate to <b>Portfolios</b>, and click <b>Add Portfolio</b>. Once a record exists, your frontend will populate automatically.", bullet_style))
    
    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)

def make_code_block(code_text):
    styles = getSampleStyleSheet()
    code_style = ParagraphStyle(
        'DocCodeInside',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#2D3748')
    )
    
    # Convert code spaces and linebreaks to HTML tags for ReportLab Paragraph
    formatted_code = code_text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    formatted_code = formatted_code.replace('\n', '<br/>').replace(' ', '&nbsp;')
    
    p = Paragraph(formatted_code, code_style)
    t = Table([[p]], colWidths=[504])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F7FAFC')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
    ]))
    return t

def make_callout(title, text, type="note"):
    styles = getSampleStyleSheet()
    body_style = styles['Normal']
    
    if type == "warning":
        bg = colors.HexColor('#FFF5F5')
        border = colors.HexColor('#FEB2B2')
        text_color = colors.HexColor('#9B2C2C')
    else:
        bg = colors.HexColor('#EBF8FF')
        border = colors.HexColor('#90CDF4')
        text_color = colors.HexColor('#2B6CB0')

    title_p = Paragraph(f"<b>{title}</b>", ParagraphStyle('CalloutTitle', parent=body_style, fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=text_color))
    text_p = Paragraph(text, ParagraphStyle('CalloutText', parent=body_style, fontSize=9, leading=12.5, textColor=colors.HexColor('#2D3748')))
    
    t = Table([[title_p], [text_p]], colWidths=[504])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('BOX', (0,0), (-1,-1), 1, border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (0,0), 2),
    ]))
    return t

if __name__ == '__main__':
    output_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'Deployment_Guide.pdf')
    if len(sys.argv) > 1:
        output_path = sys.argv[1]
    
    print(f"Generating PDF at: {output_path}")
    build_pdf(output_path)
    print("PDF successfully generated.")
