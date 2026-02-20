# PharmaTwin - AI-Powered Pharmacogenomic Prescription Safety

![PharmaTwin Logo](./FrontEnd/src/assets/logo.png)

## 🧬 Overview

PharmaTwin is an AI-powered clinical decision support system that analyzes patient pharmacogenomic variants to predict medication response before therapy begins. The system translates raw sequencing data (VCF files) into actionable prescribing guidance aligned with established clinical guidelines from CPIC, FDA, and PharmGKB.

### Key Features

- **Precision Medicine**: Genetic-guided prescribing based on patient pharmacogenomic profiles
- **Instant Analysis**: Real-time risk assessment for drug-gene interactions
- **Clinical Guidelines**: Evidence-based recommendations aligned with CPIC & FDA standards
- **Interactive Drug Database**: Detailed information on 6+ high-risk medications
- **Data Privacy**: Temporary processing with no permanent patient data storage
- **Multi-language Support**: English, Hindi, and Marathi

## 🎯 Problem Statement

Traditional prescribing ignores genetic factors that determine drug response, leading to:
- **Drug Response Variability**: Same drug ≠ same response due to genetic differences
- **Hidden Genetic Risks**: Clinicians cannot manually interpret genome data
- **Preventable Adverse Events**: Incorrect prescriptions cause toxicity or treatment failure

## 🏥 Supported Medications

PharmaTwin provides pharmacogenomic guidance for high-risk drugs including:

| Drug | Gene | Category | Risk |
|------|------|----------|------|
| Codeine | CYP2D6 | Analgesic | Toxicity in ultra-rapid metabolizers |
| Warfarin | CYP2C9, VKORC1 | Anticoagulant | Bleeding risk |
| Clopidogrel | CYP2C19 | Antiplatelet | Ineffective therapy |
| Simvastatin | SLCO1B1 | Statin | Myopathy |
| Azathioprine | TPMT, NUDT15 | Immunosuppressant | Severe myelosuppression |
| Fluorouracil | DPYD | Chemotherapy | Life-threatening toxicity |

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion, Lottie
- **State Management**: Redux Toolkit + Redux Persist
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form
- **Internationalization**: i18next

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + express-jwt
- **Password Hashing**: Argon2
- **AI Integration**: Google Gemini AI
- **File Upload**: Multer
- **Validation**: Zod

## 📁 Project Structure

```
PharmaTwin/
├── Backend/
│   ├── controllers/       # Request handlers
│   ├── routes/           # API routes
│   ├── middlewares/      # Express middlewares
│   ├── utils/            # Helper functions
│   ├── validation/       # Zod schemas
│   ├── prisma/          # Database schema
│   ├── types/           # TypeScript types
│   └── app.ts           # Express app configuration
├── FrontEnd/
│   ├── src/
│   │   ├── api/         # API client functions
│   │   ├── app/         # Redux store
│   │   ├── assets/      # Images, logos, animations
│   │   ├── components/  # Reusable components
│   │   ├── features/    # Feature modules
│   │   ├── layout/      # Layout components
│   │   ├── routes/      # Route configuration
│   │   └── lib/         # Utility functions
│   └── public/
│       └── locales/     # Translation files
├── Data/                # CSV files, test cases
└── Docs/               # Documentation

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn
- Git

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `Backend/` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/pharmatwin"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this"

# API Version
VERSION="/api/v1"

# Client URL
CLIENT_URI="http://localhost:5173"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# Server
PORT=3000
```

#### Frontend (.env)
Create a `.env` file in the `FrontEnd/` directory:

```env
VITE_API_URL="http://localhost:3000/api/v1"
```

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pharmatwin.git
cd pharmatwin
```

#### 2. Backend Setup
```bash
cd Backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Build TypeScript
npm run build

# Start development server
npm run dev
```

#### 3. Frontend Setup
```bash
cd FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📦 Production Deployment

### Backend Deployment with PM2 and Nginx

#### 1. Install PM2 Globally
```bash
npm install -g pm2
```

#### 2. Build Backend
```bash
cd Backend
npm install --production
npm run build
```

#### 3. Start Backend with PM2
```bash
# Start the application
pm2 start dist/index.js --name pharmatwin-backend

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### 4. PM2 Management Commands
```bash
# View logs
pm2 logs pharmatwin-backend

# Monitor processes
pm2 monit

# Restart application
pm2 restart pharmatwin-backend

# Stop application
pm2 stop pharmatwin-backend

# Delete application from PM2
pm2 delete pharmatwin-backend

# List all processes
pm2 list
```

### Frontend Deployment

#### 1. Build Frontend
```bash
cd FrontEnd
npm install
npm run build
```

This creates a `dist/` folder with optimized production files.

#### 2. Nginx Configuration

Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/pharmatwin
```

Add the following configuration:

```nginx
# Frontend Server
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/pharmatwin/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Frontend routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}

# Backend API Proxy
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 3. Enable Nginx Configuration
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/pharmatwin /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 4. SSL Certificate with Let's Encrypt (Optional but Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

### Complete Deployment Steps

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# 4. Install Nginx
sudo apt install nginx

# 5. Install PM2
sudo npm install -g pm2

# 6. Clone repository
git clone https://github.com/yourusername/pharmatwin.git
cd pharmatwin

# 7. Setup Backend
cd Backend
npm install --production
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 start dist/index.js --name pharmatwin-backend
pm2 save
pm2 startup

# 8. Setup Frontend
cd ../FrontEnd
npm install
npm run build
sudo mkdir -p /var/www/pharmatwin/frontend
sudo cp -r dist/* /var/www/pharmatwin/frontend/

# 9. Configure Nginx (follow steps above)

# 10. Start services
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 🔒 Security Considerations

- **No Patient Storage**: Genomic data is never permanently stored
- **Temporary Processing**: Files are processed in memory and deleted after analysis
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Argon2 for secure password storage
- **CORS Protection**: Configured for specific client origins
- **HTTPS**: SSL/TLS encryption in production
- **Research Prototype**: Not for actual clinical decisions without validation

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/status` - Check authentication status
- `POST /api/v1/auth/logout` - User logout

### User
- `GET /api/v1/user/profile` - Get user profile

### Analysis
- `POST /api/v1/anyalsis/analyze` - Analyze VCF file for pharmacogenomic variants

## 🧪 Testing

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd FrontEnd
npm test
```

## 📝 Clinical Workflow

1. **Doctor Orders Test**: Clinician identifies patient requiring pharmacogenomic guidance
2. **Upload Genome**: VCF file from sequencing lab uploaded to PharmaTwin
3. **Evaluate Therapy**: AI analyzes variants and generates risk predictions
4. **Safer Prescription**: Evidence-based recommendations guide medication selection

## 🌍 Who Can Use PharmaTwin

- **Clinicians**: Physicians and pharmacists seeking pharmacogenomic decision support
- **Researchers**: Scientists studying drug-gene interactions and precision medicine
- **Hospitals**: Healthcare institutions implementing pharmacogenomic programs
- **Students**: Medical and pharmacy students learning pharmacogenomics principles

## ⚠️ Disclaimer

**Important**: This is a research prototype. Do not use for actual clinical decisions without validation by qualified healthcare professionals. This system provides decision support and does not replace clinical judgment.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- CPIC (Clinical Pharmacogenetics Implementation Consortium)
- PharmGKB (Pharmacogenomics Knowledge Base)
- FDA Table of Pharmacogenomic Biomarkers
- Google Gemini AI for analysis capabilities

## 📞 Support

For support, email support@pharmatwin.com or open an issue in the GitHub repository.

## 🔄 Version History

- **v1.0.0** (2024) - Initial release
  - VCF file analysis
  - 6 supported medications
  - Multi-language support
  - Interactive UI with animations

---

**Built with ❤️ for safer prescribing through precision medicine**
