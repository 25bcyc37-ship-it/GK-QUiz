# GK Insight — Yes/No Knowledge Analyzer

GK Insight is a modern, responsive web application for testing general knowledge through Yes/No questions. It features a sleek dark mode with glassmorphism aesthetics and real-time performance tracking.

## 🚀 Features

- **Personalized Experience**: Enter your name to start a custom quiz session.
- **10-Question Challenge**: Each session consists of exactly 10 unique, non-repeating questions.
- **Randomized Logic**: Questions are pre-filtered for uniqueness and shuffled using the Fisher-Yates algorithm.
- **Instant Feedback**: Real-time visual cues for answers with detailed explanations.
- **Dynamic Stats**: Tracks attempts, accuracy, and assigns a "Knowledge Level" (Beginner to Genius).
- **Professional PDF Export**: Download a formatted report of your results, including answers and explanations.
- **Modern UI**: Dark theme, glassmorphism cards, animated backgrounds, and smooth transitions.

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, ES6+ JavaScript.
- **Database**: Supabase (PostgreSQL + PostgREST).
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF).
- **Typography**: Inter (Google Fonts).

## 📂 Project Structure

```text
/
├── index.html   # Main application structure
├── style.css    # Modern glassmorphism design system
├── script.js    # Core game logic & Supabase integration
└── Supabase.txt # Connection credentials (URL & Key)
```

## ⚙️ Setup Instructions

### 1. Database Schema
Run the provided SQL script in your Supabase SQL Editor to create the necessary tables and RLS policies:
- `questions` table
- `user_answers` table

### 2. Configuration
The API keys are configured at the top of `script.js`. Ensure they match your Supabase project.

### 3. Local Development
You can run the app by simply opening `index.html` or using a local server:
```bash
python -m http.server 7676
```

## 🧪 Verification
The app has been verified for:
- [x] Responsive layout on mobile and desktop.
- [x] Correct handling of duplicate question text in CSV imports.
- [x] Accurate logic for skip buttons and countdown timers.
- [x] PDF generation with correct player name and stats.

---
Built with Antigravity 🧠
