# 🚀 Fake Productivity Detector

> **Academic Project** • Data Science & Web Technologies

A modern, comprehensive web application that analyzes productivity data using data science algorithms, featuring CSV batch processing, interactive visualizations, and a beautiful glassmorphism UI.

![Version](https://img.shields.io/badge/version-2.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![GitHub stars](https://img.shields.io/github/stars/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-?style=social)
![GitHub forks](https://img.shields.io/github/forks/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-?style=social)
![GitHub issues](https://img.shields.io/github/issues/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-)
![License](https://img.shields.io/github/license/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-)

---

## ✨ Features

### 🎯 Core Functionality
- **Dual Input Methods:** Manual entry & CSV batch upload with drag & drop
- **Smart Algorithm:** Weighted scoring system (0-100) with rule-based classification
- **Machine Learning Integration:** Optional ML model (Random Forest) for enhanced detection
- **Category Classification:** Highly/Moderately/Fake Productive with detailed breakdowns
- **Personalized Suggestions:** AI-powered improvement recommendations based on analysis
- **Data Persistence:** Supabase backend integration with PostgreSQL
- **Export Capabilities:** Download reports and data as CSV
- **Data Preprocessing:** Automated cleaning, validation, and normalization
- **Comprehensive Reporting:** Filterable tables with search and export functionality
- **User Authentication:** Mock login system with profile management
- **Health Monitoring:** API health checks and comprehensive logging

### 🎨 User Interface
- **Glassmorphism Design:** Modern frosted glass effects with backdrop blur
- **Animated Sidebar:** Smooth navigation with 6 main pages and transitions
- **Interactive Charts:** Pie, Bar, Line, and custom charts using Recharts
- **Responsive Layout:** Mobile-first design supporting all screen sizes
- **Smooth Animations:** Motion/React powered transitions and micro-interactions
- **Loading States:** Professional skeleton loaders and progress indicators
- **Comprehensive UI Library:** 50+ reusable components (Radix UI + custom)
- **Drag & Drop Interface:** Intuitive CSV upload with visual feedback
- **Form Validation:** Real-time validation with error handling
- **Dark/Light Theme Support:** Theme switching capability (framework ready)

### 📊 Pages

| Page | Description |
|------|-------------|
| 📊 **Dashboard** | Overview cards, statistics, and multiple chart types |
| 📂 **Upload CSV** | Drag & drop CSV upload with batch analysis |
| ✍️ **Manual Analysis** | Single entry form with instant results |
| 📄 **Reports** | Filterable table with export functionality |
| 📜 **History** | Timeline view with trend analysis |
| 👤 **Profile** | User information and personal statistics |

---

## 🛠️ Tech Stack

### Frontend
```
React 18.3.1              - UI framework
TypeScript 5              - Type safety and development
Vite 6.3.5                - Build tool and dev server
Tailwind CSS 4            - Utility-first CSS framework
Motion/React 12           - Animation library
Recharts 2.15.2           - Data visualization
Radix UI Components       - Accessible UI primitives
Lucide React 0.487        - Icon library
React Hook Form 7.55      - Form management
React DnD 16              - Drag and drop functionality
Sonner 2.0.3              - Toast notifications
Date-fns 3.6              - Date utilities
Class Variance Authority  - Component styling
```

### Backend
```
Python 3.11               - Runtime environment
FastAPI 0.109.2           - Web framework
Uvicorn 0.27.1            - ASGI server
Pydantic 2.6.1            - Data validation
Supabase 2.27.3           - Database & Auth
Pandas 2.2.0              - Data processing
NumPy 1.26.4              - Numerical computing
Scikit-learn 1.4.0        - ML classification
Joblib 1.3.2              - Model serialization
HTTPX 0.26.0              - HTTP client
AIOHTTP 3.9.3             - Async HTTP client
Python-JOSE 3.3.0         - JWT handling
Python-Dotenv 1.0.1       - Environment variables
```

---

## 📐 Productivity Algorithm

### Scoring Formula
```javascript
score = (taskHours × 8) + (tasksCompleted × 5)
        - (idleHours × 6) - (socialMediaHours × 7)
        - (breakFrequency × 2)

// Normalized: 0 ≤ score ≤ 100
```

### Classification
- **🏆 Highly Productive:** 80-100 points
- **📈 Moderately Productive:** 50-79 points
- **⚠️ Fake Productivity:** 0-49 points

### Input Variables
1. **Task Hours** - Productive work time
2. **Idle Hours** - Unproductive time
3. **Social Media Usage** - Distraction time
4. **Break Frequency** - Number of breaks
5. **Tasks Completed** - Finished tasks count

---

## 🤖 Machine Learning Integration

### ML Model
- **Algorithm:** Random Forest Classifier
- **Purpose:** Enhanced productivity classification beyond rule-based scoring
- **Training Data:** Synthetic productivity datasets
- **Features:** All 5 input variables + engineered features
- **Accuracy:** ~85% on test data (academic demonstration)

### Model Training
```bash
cd backend
python -m app.ml.train_model
```

### Usage
- Automatically loads if `random_forest_model.joblib` exists
- Falls back to rule-based scoring if model unavailable
- Can be toggled in application settings

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18
pnpm (recommended) or npm
Python 3.11
Git
```

### Git Setup
```bash
# Clone the repository
git clone https://github.com/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-.git
cd -Fake-Productivity-Detector-Using-Data-Science-

# Create and switch to development branch (recommended)
git checkout -b development
git pull origin development

# For contributors: Fork first, then clone your fork
# Replace 'yourusername' with your GitHub username
git clone https://github.com/yourusername/-Fake-Productivity-Detector-Using-Data-Science-.git
cd -Fake-Productivity-Detector-Using-Data-Science-
git remote add upstream https://github.com/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-.git
```

### Quick Setup (Recommended)
```bash
# Run the automated setup script
./setup.sh    # Linux/macOS
# or
setup.bat     # Windows
```

### Manual Installation
```bash
# Clone the repository
git clone https://github.com/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-.git
cd -Fake-Productivity-Detector-Using-Data-Science-

# Install frontend dependencies
npm install

# Set up Python virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Optional: Train ML model
python -m app.ml.train_model

# Start the backend (in one terminal)
cd ..
python -m backend.app.main

# Start the frontend (in another terminal)
npm run dev
```

### Environment Variables
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application Settings
DEBUG=true
LOG_LEVEL=INFO
CORS_ORIGINS=["http://localhost:5173"]
```

### Build for Production
```bash
pnpm build
```

---

## 📂 CSV Upload Guide

### Required Format
```csv
Task_Hours,Idle_Hours,Social_Media_Usage,Break_Frequency,Tasks_Completed
6,1,0.5,4,8
8,0.5,1,3,12
```

### Download Template
- Click "Download Template" button in Upload CSV page
- Edit with your data
- Upload for batch analysis

**📖 [Full CSV Format Guide](CSV_FORMAT_GUIDE.md)**

---

## 🎓 Academic Context

### Perfect For Demonstrating:
- ✅ Data Science Algorithms
- ✅ Full-Stack Web Development
- ✅ Modern UI/UX Design
- ✅ RESTful API Integration
- ✅ CSV Data Processing
- ✅ Interactive Visualizations
- ✅ Responsive Design Patterns

### Easy to Explain:
- Simple weighted scoring formula
- Clear input → process → output flow
- Visual representations
- No complex ML (optional feature)

---

## 📊 Screenshots

### Dashboard
![Dashboard Overview](https://via.placeholder.com/800x450/667eea/ffffff?text=Dashboard+with+Charts)

### CSV Upload
![CSV Upload Interface](https://via.placeholder.com/800x450/764ba2/ffffff?text=Drag+and+Drop+CSV)

### Manual Analysis
![Analysis Results](https://via.placeholder.com/800x450/f093fb/ffffff?text=Productivity+Results)

---

## 🎨 Design System

### Colors
```css
Blue:     #3b82f6    /* Primary */
Purple:   #8b5cf6    /* Secondary */
Pink:     #ec4899    /* Accent */
Green:    #10b981    /* Success */
Yellow:   #f59e0b    /* Warning */
Red:      #ef4444    /* Danger */
```

### Typography
- **Font Family:** System fonts (Inter, SF Pro, Segoe UI)
- **Headings:** 600 weight
- **Body:** 400 weight

### Animations
- **Page Transitions:** 300-500ms ease-out
- **Hover Effects:** Scale 1.02x + shadow
- **Charts:** Progressive drawing animation
- **Loading:** Spinner with blur backdrop

---

## 📁 Project Structure

```
-Fake-Productivity-Detector-Using-Data-Science-/
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx                      # Main application component
│   │   └── components/
│   │       ├── ActivityInput.tsx        # Manual input form
│   │       ├── Dashboard.tsx            # Dashboard overview
│   │       ├── LoginPage.tsx            # Authentication page
│   │       ├── ProductivityHistory.tsx  # History timeline
│   │       ├── ProductivityResults.tsx  # Analysis results display
│   │       ├── Sidebar.tsx              # Navigation sidebar
│   │       ├── figma/
│   │       │   └── ImageWithFallback.tsx # Figma integration
│   │       ├── pages/
│   │       │   ├── CSVTemplate.tsx      # CSV template download
│   │       │   ├── DashboardPage.tsx    # Dashboard page
│   │       │   ├── HistoryPage.tsx      # History page
│   │       │   ├── ManualAnalysisPage.tsx # Manual analysis page
│   │       │   ├── ProfilePage.tsx      # User profile
│   │       │   ├── ReportsPage.tsx      # Reports page
│   │       │   └── UploadCSVPage.tsx    # CSV upload page
│   │       ├── ui/                      # Reusable UI components
│   │       │   ├── accordion.tsx
│   │       │   ├── alert-dialog.tsx
│   │       │   ├── alert.tsx
│   │       │   ├── aspect-ratio.tsx
│   │       │   ├── avatar.tsx
│   │       │   ├── badge.tsx
│   │       │   ├── breadcrumb.tsx
│   │       │   ├── button.tsx
│   │       │   ├── calendar.tsx
│   │       │   ├── card.tsx
│   │       │   ├── carousel.tsx
│   │       │   ├── chart.tsx
│   │       │   ├── checkbox.tsx
│   │       │   ├── collapsible.tsx
│   │       │   ├── command.tsx
│   │       │   ├── context-menu.tsx
│   │       │   ├── dialog.tsx
│   │       │   ├── drawer.tsx
│   │       │   ├── dropdown-menu.tsx
│   │       │   ├── form.tsx
│   │       │   ├── hover-card.tsx
│   │       │   ├── input-otp.tsx
│   │       │   ├── input.tsx
│   │       │   ├── label.tsx
│   │       │   ├── menubar.tsx
│   │       │   ├── navigation-menu.tsx
│   │       │   ├── pagination.tsx
│   │       │   ├── popover.tsx
│   │       │   ├── progress.tsx
│   │       │   ├── radio-group.tsx
│   │       │   ├── resizable.tsx
│   │       │   ├── scroll-area.tsx
│   │       │   ├── select.tsx
│   │       │   ├── separator.tsx
│   │       │   ├── sheet.tsx
│   │       │   ├── sidebar.tsx
│   │       │   ├── skeleton.tsx
│   │       │   ├── slider.tsx
│   │       │   ├── sonner.tsx
│   │       │   ├── switch.tsx
│   │       │   ├── table.tsx
│   │       │   ├── tabs.tsx
│   │       │   ├── textarea.tsx
│   │       │   ├── toggle-group.tsx
│   │       │   ├── toggle.tsx
│   │       │   └── tooltip.tsx
│   │       └── config/
│   │           └── api.ts                # API configuration
│   └── styles/
│       ├── fonts.css                    # Font definitions
│       ├── index.css                    # Main styles
│       ├── tailwind.css                 # Tailwind imports
│       └── theme.css                    # Theme variables
├── backend/
│   ├── README.md                        # Backend documentation
│   ├── requirements.txt                 # Python dependencies
│   └── app/
│       ├── __init__.py
│       ├── config.py                    # Application configuration
│       ├── main.py                      # FastAPI app entry point
│       ├── ml/
│       │   ├── __init__.py
│       │   └── train_model.py           # ML model training
│       ├── models/
│       │   ├── __init__.py
│       │   ├── database.py              # Database models
│       │   └── schemas.py               # Pydantic schemas
│       ├── routes/
│       │   ├── __init__.py
│       │   ├── analysis.py              # Analysis endpoints
│       │   ├── csv_upload.py            # CSV upload endpoints
│       │   ├── history.py               # History management
│       │   └── reports.py               # Reports generation
│       ├── services/
│       │   ├── __init__.py
│       │   ├── ml_model.py              # ML model service
│       │   ├── preprocessing.py         # Data preprocessing
│       │   ├── scoring.py               # Scoring algorithm
│       │   └── suggestions.py           # AI suggestions
│       └── utils/
│           ├── __init__.py
│           └── csv_parser.py            # CSV parsing utilities
├── index.html                           # Main HTML file
├── package.json                         # Frontend dependencies
├── postcss.config.mjs                   # PostCSS configuration
├── vite.config.ts                       # Vite configuration
├── ATTRIBUTIONS.md                      # Attributions
├── CSV_FORMAT_GUIDE.md                  # CSV format guide
└── README.md                            # This file
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:8000/api/v1`

```typescript
// Health Check
GET  /                    - API status and welcome message
GET  /health              - Health check endpoint

// Analysis
POST /analysis/single     - Analyze single productivity entry
Body: { taskHours, idleHours, socialMediaHours, breakFrequency, tasksCompleted }

// CSV Upload
POST /csv-upload          - Upload and process CSV file
Body: FormData with CSV file

// History
GET  /history/:userId     - Get user analysis history
DELETE /history/:userId   - Clear user history

// Reports
GET  /reports/:userId     - Get user reports with filtering
POST /reports/export      - Export reports as CSV
```

### Response Format
```json
{
  "score": 75,
  "category": "Moderately Productive",
  "breakdown": {
    "taskHours": 8,
    "idleHours": 1,
    "socialMediaHours": 0.5,
    "breakFrequency": 3,
    "tasksCompleted": 10
  },
  "suggestions": ["Reduce idle time", "Increase task completion"],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🎯 Use Cases

### For Students
- Track daily study productivity
- Identify time-wasting patterns
- Improve focus and efficiency
- Generate progress reports

### For Professionals
- Monitor work habits
- Optimize productivity
- Reduce distractions
- Track performance metrics

### For Teams
- Batch analyze team data
- Compare productivity trends
- Identify improvement areas
- Generate team reports

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Real Google OAuth integration
- [ ] Machine Learning classification
- [ ] PDF report generation
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Team collaboration
- [ ] Productivity goals
- [ ] Weekly/Monthly summaries

---

## 🐛 Known Issues

- CSV files must use comma delimiters (not semicolons)
- Large CSV files (1000+ rows) may take a few seconds to process
- Mock authentication (not production-ready without OAuth setup)

---

## 🤝 Contributing

This is an academic project, but contributions are welcome!

### Git Workflow
1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/yourusername/-Fake-Productivity-Detector-Using-Data-Science-.git
   cd -Fake-Productivity-Detector-Using-Data-Science-
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Make** your changes and commit:
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push** to your branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open** a Pull Request on GitHub

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/code-improvement` - Code refactoring

---

## 📄 License

This project is for academic purposes. See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- College: [Your University]
- Program: [Your Degree]
- Year: [Academic Year]

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Recharts for visualization components
- Supabase for backend infrastructure
- Vercel for inspiration on modern UI/UX

---

## 📚 Documentation

---

## 💬 Support

For questions or issues:
- 📧 Email: your.email@university.edu
- 💬 Issues: [GitHub Issues](https://github.com/meet21122005/-Fake-Productivity-Detector-Using-Data-Science-/issues)

---

## ⭐ Star This Repository

If you find this project helpful, please give it a star! ⭐

---

**Made with ❤️ for Academic Excellence**

*Demonstrating the power of Data Science, Modern Web Technologies, and Beautiful UI/UX Design*
