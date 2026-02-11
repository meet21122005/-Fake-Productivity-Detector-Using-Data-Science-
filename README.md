# 🚀 Fake Productivity Detector

> **Academic Project** • Data Science & Web Technologies

A modern, comprehensive web application that analyzes productivity data using data science algorithms, featuring CSV batch processing, interactive visualizations, and a beautiful glassmorphism UI.

![Version](https://img.shields.io/badge/version-2.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

---

## ✨ Features

### 🎯 Core Functionality
- **Dual Input Methods:** Manual entry & CSV batch upload
- **Smart Algorithm:** Weighted scoring system (0-100)
- **Category Classification:** Highly/Moderately/Fake Productive
- **Personalized Suggestions:** AI-powered improvement recommendations
- **Data Persistence:** Supabase backend integration
- **Export Capabilities:** Download reports as CSV

### 🎨 User Interface
- **Glassmorphism Design:** Modern frosted glass effects
- **Animated Sidebar:** Smooth navigation with 6 pages
- **Interactive Charts:** Pie, Bar, and Line graphs
- **Responsive Layout:** Mobile, tablet, and desktop support
- **Smooth Animations:** Motion/Framer powered transitions
- **Loading States:** Professional user feedback

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
React 18.3.1          - UI framework
TypeScript 5          - Type safety
Tailwind CSS 4        - Styling system
Motion/React 12       - Animations (Framer Motion)
Recharts 2.15         - Data visualization
Lucide React 0.487    - Icon library
```

### Backend
```
Python FastAPI        - Web framework
Supabase              - Database & Auth
Pandas & NumPy        - Data processing
Scikit-learn          - ML classification
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

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18
pnpm (recommended) or npm
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
git clone https://github.com/yourusername/fake-productivity-detector.git
cd fake-productivity-detector

# Install frontend dependencies
npm install

# Set up Python virtual environment
python -m venv .venv
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On macOS/Linux

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Set up environment variables
copy .env.example .env
# Edit .env with your Supabase credentials

# Start the backend (in one terminal)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Start the frontend (in another terminal)
cd ..
npm run dev
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
fake-productivity-detector/
├── src/
│   ├── app/
│   │   ├── App.tsx                      # Main application
│   │   └── components/
│   │       ├── LoginPage.tsx            # Authentication
│   │       ├── Sidebar.tsx              # Navigation
│   │       ├── ActivityInput.tsx        # Input form
│   │       ├── ProductivityResults.tsx  # Results display
│   │       ├── ProductivityHistory.tsx  # History component
│   │       └── pages/
│   │           ├── DashboardPage.tsx
│   │           ├── UploadCSVPage.tsx
│   │           ├── ManualAnalysisPage.tsx
│   │           ├── ReportsPage.tsx
│   │           ├── HistoryPage.tsx
│   │           ├── ProfilePage.tsx
│   │           └── CSVTemplate.tsx
│   └── styles/
│       ├── index.css
│       ├── theme.css
│       └── fonts.css
├── README.md
├── CSV_FORMAT_GUIDE.md
└── package.json
```

---

## 🔌 API Endpoints

```typescript
// Save analysis
POST /make-server-a0c5b0f2/save-analysis
Body: { userId, userName, score, category, breakdown, timestamp }

// Get history
GET /make-server-a0c5b0f2/history/:userId
Returns: { history: AnalysisEntry[] }

// Delete history
DELETE /make-server-a0c5b0f2/history/:userId
Returns: { success: boolean, message: string }
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

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
- 💬 Issues: [GitHub Issues](https://github.com/yourusername/fake-productivity-detector/issues)

---

## ⭐ Star This Repository

If you find this project helpful, please give it a star! ⭐

---

**Made with ❤️ for Academic Excellence**

*Demonstrating the power of Data Science, Modern Web Technologies, and Beautiful UI/UX Design*
