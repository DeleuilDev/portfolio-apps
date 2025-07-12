# Portfolio Apps

A modern, minimalist portfolio built with Next.js and Docker. This monorepo contains different complementary applications that showcase professional experience and personal projects.

## 🚀 Applications

### 🏠 Home App (Port 3000)
- **Purpose**: Main portfolio landing page
- **Features**: Personal introduction, experience timeline, social links
- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Lucide React
- **Design**: Clean, minimalist interface with animated sections

### 📄 CV App (Port 3001)
- **Purpose**: Professional resume with PDF generation
- **Features**: Detailed CV, project showcase, PDF download
- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, React-PDF
- **Design**: Professional layout optimized for both web and print

## 🐳 Docker Deployment

### Prerequisites
- Docker
- Docker Compose

### Quick Start

```bash
# Build and start all applications
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop all services
docker-compose down
```

### Access Applications

Once containers are running:

- **Home App**: http://localhost:3000
- **CV App**: http://localhost:3001

## 🛠️ Local Development

For local development without Docker:

```bash
cd accueil && npm install && npm run dev
cd cv && npm install && npm run dev
```

## 🔧 Technical Details

### Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React, React Icons
- **PDF**: React-PDF
- **Containerization**: Docker with multi-stage builds

### Data Management
- **Shared data source**: JSON files in `/data`
- **Symlink approach**: Apps reference shared data via symlinks
- **Type safety**: TypeScript interfaces for all data structures

## 📝 License

This project is open source and available under the MIT License.

---

**Portfolio Apps** - Modern, minimalist, and professional portfolio solution built with Next.js and Docker. 