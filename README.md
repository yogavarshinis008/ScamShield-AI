# ScamShield AI

🛡️ **AI-Powered Scam Message, Website & Online Shopping Fraud Detection System**

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Features in Detail](#features-in-detail)
- [AI Risk Assessment Logic](#ai-risk-assessment-logic)
- [Future Enhancements](#future-enhancements)
- [Security & Privacy](#security--privacy)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## 🎯 Project Overview

**ScamShield AI** is a comprehensive cybersecurity and fraud detection web application built with modern web technologies. It helps users identify potentially fraudulent messages, suspicious websites, and risky online shopping environments **before** they provide personal information or make payments.

The application provides an easy-to-understand **explainable AI risk assessment** with risk scores (0-100), detected warning signs, explanations, and recommendations instead of simply saying "scam" or "safe".

### Project Type
- AI-powered Cybersecurity Application
- Fraud Detection & Prevention System
- Educational Cybersecurity Tool
- Demo Application for Security Awareness

---

## 🔍 Problem Statement

Users increasingly encounter:
- 📧 **Scam Messages** - SMS, WhatsApp, Email phishing
- 🌐 **Fraudulent Websites** - Fake banking, e-commerce sites
- 🛒 **Fake Shopping Websites** - Unrealistic prices, no delivery
- 💳 **Suspicious Payment Requests** - Payment fraud, money transfer scams

**Most users cannot recognize warning signs before providing personal information or making payments.**

---

## ✨ Solution

**ScamShield AI** analyzes suspicious content and provides:
- ⚠️ **Risk Score** (0-100) with clear risk levels (Low/Medium/High)
- 🔍 **Detected Indicators** - Specific warning signs found
- 💡 **Explainable AI** - Why was this flagged?
- 📋 **Recommendations** - What you should do
- 📊 **Scan History** - Track all your scans
- 🎓 **Safety Center** - Cybersecurity education

---

## 🎁 Key Features

### 1. **Message Scanner** 📧
- Analyze SMS, WhatsApp, Email, Social Media messages
- Detect: Urgency, Prize claims, Suspicious links, Personal info requests, Payment requests, Threats
- Get risk score and recommendations
- Example: `"Congratulations! You won a prize. Click here: [link]"`

### 2. **Website Scanner** 🌐
- Enter any URL to analyze safety
- Check: HTTPS, Domain characteristics, Suspicious keywords, Business info, Contact info
- Identify warning signs
- Get detailed risk assessment

### 3. **Shopping Protection** 🛒 (Unique Feature)
- **Pre-payment safety check** before you buy
- Analyze: Website reputation, Seller info, Product pricing, COD availability, Refund policy
- **Important:** COD unavailability is NOT treated as definitive scam indicator
- Multi-factor risk analysis combining all signals
- Strong visual warnings for high-risk shops

### 4. **Payment Safety Check** 💳
- Simulated checkout protection
- Verify: Website, Seller, Product, Payment method, Policies
- Risk assessment before payment
- **Does NOT collect real card data, CVV, UPI PIN, OTP, or passwords**

### 5. **Scan History** 📊
- View all previous scans
- Filter by type (Message/Website/Shopping)
- Sort by date or risk score
- Search scans
- Delete individual scans or clear all history
- Local storage (browser-based)

### 6. **Scam Reporting** 🚨
- Report suspicious websites, messages, fake shops
- Describe what happened
- Document warning signs
- Help protect other users
- **No personal financial data required**

### 7. **Safety Center** 🎓
- 10+ cybersecurity safety tips
- Common scam types explanation
- What to do if you're a victim
- Where to report scams
- Beginner-friendly guidance

### 8. **Dashboard** 📈
- Statistics: Total scans, Safe/Suspicious/High-risk results
- Risk distribution charts
- Recent scans overview
- Quick action buttons

### 9. **User Profile & Settings** ⚙️
- User dashboard
- Notification settings
- Theme preferences
- Clear scan history
- Account management

### 10. **Authentication System** 🔐
- Login & Register
- Demo account option
- Session management
- Logout functionality
- **Note:** Demo app - no real authentication

---

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2** - UI library
- **TypeScript 5.0** - Type safety
- **Vite 4.4** - Build tool & dev server
- **React Router DOM 6.15** - Navigation

### Styling & UI
- **Tailwind CSS 3.3** - Utility-first CSS
- **Glassmorphism Design** - Modern aesthetic
- **Responsive Design** - Desktop, Tablet, Mobile

### Components & Libraries
- **Lucide React** - Modern icons (Shield, Alert, Globe, etc.)
- **Recharts** - Charts & analytics
- **Zustand 4.4** - State management (Auth, Scans)

### Data & Storage
- **localStorage** - Client-side scan history
- **Zustand Stores** - User & scan state
- **Demo AI Logic** - Rule-based analysis

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

---

## 📁 Project Structure

```
ScamShield-AI/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Header.tsx       # Top header
│   │   ├── RiskScoreIndicator.tsx
│   │   ├── StatCard.tsx
│   │   ├── WarningCard.tsx
│   │   ├── ScanCard.tsx
│   │   └── SafetyTip.tsx
│   │
│   ├── pages/               # Page components
│   │   ├── Login.tsx        # Authentication
│   │   ├── Register.tsx     # Registration
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── MessageScanner.tsx
│   │   ├── WebsiteScanner.tsx
│   │   ├── ShoppingProtection.tsx
│   │   ├── ScanHistory.tsx
│   │   ├── ScamReports.tsx
│   │   ├── SafetyCenter.tsx
│   │   └── Profile.tsx
│   │
│   ├── store/               # State management
│   │   ├── authStore.ts     # Auth state (Zustand)
│   │   └── scanStore.ts     # Scan history state
│   │
│   ├── utils/               # Utility functions
│   │   └── aiAnalysis.ts    # AI/ML analysis logic
│   │
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   │
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 14+ 
- npm 6+ or yarn
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/yogavarshinis008/ScamShield-AI.git
cd ScamShield-AI
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Start Development Server
```bash
npm run dev
# or
yarn dev
```

The app will open at `http://localhost:3000`

### Step 4: Build for Production
```bash
npm run build
# or
yarn build
```

### Step 5: Preview Production Build
```bash
npm run preview
# or
yarn preview
```

---

## 📖 Usage Guide

### 1. **Getting Started**
```
1. Visit http://localhost:3000
2. Click "Try Demo Account" for instant access
3. Or create an account with any email/password
```

### 2. **Scan a Message**
```
1. Go to "Message Scanner"
2. Paste a suspicious message
3. Click "Analyze Message"
4. View risk score, indicators, and recommendations
```

### 3. **Scan a Website**
```
1. Go to "Website Scanner"
2. Enter a URL
3. Click "Scan Website"
4. Review warning signs and recommendations
```

### 4. **Check Shopping Safety**
```
1. Go to "Shopping Protection"
2. Enter website URL, product name, price, seller info
3. Check COD and refund policy status
4. Click "Check Before Payment"
5. Review risk assessment and warnings
```

### 5. **View Scan History**
```
1. Go to "Scan History"
2. Filter by type (Message/Website/Shopping)
3. Sort by date or risk score
4. Search specific scans
5. View details or delete individual scans
```

### 6. **Report a Scam**
```
1. Go to "Scam Reports"
2. Select scam type
3. Enter identifier (URL or sender)
4. Describe the incident
5. List warning signs
6. Submit report
```

### 7. **Learn Safety Tips**
```
1. Go to "Safety Center"
2. Read 10+ cybersecurity tips
3. Learn about common scams
4. Find resources if you're a victim
```

---

## 🧠 Features in Detail

### Message Analysis
**Detects:**
- ⏰ Urgency-based language ("urgent", "immediately", "limited time")
- 🎁 Unexpected prizes ("won", "congratulations", "claim")
- 🔗 Suspicious links ("click here", "verify here")
- 📋 Personal info requests ("password", "account", "pin")
- 💸 Payment requests
- ⚠️ Threatening language ("locked", "suspended", "unauthorized")
- 🤔 Unusual sender information

### Website Analysis
**Checks:**
- 🔒 HTTPS encryption status
- 🌐 Domain structure and age
- 🚩 Suspicious domain patterns
- 📝 Business information availability
- 📞 Contact information presence
- 🔄 Refund/Return policy
- 📋 Privacy policy
- 🔑 Keyword reputation

### Shopping Analysis
**Evaluates:**
- 🏪 Website reputation
- 👤 Seller information quality
- 💰 Product pricing (unrealistic prices flagged)
- 💳 Payment methods available
- 🚚 COD availability (as one signal, not definitive)
- 🔄 Return/Refund policy clarity
- 📧 Contact information
- ⚠️ Multiple risk signals combined

---

## 🤖 AI Risk Assessment Logic

### Risk Score Calculation
```
0-30:   LOW RISK      ✅ Green  - Generally safe
31-70:  MEDIUM RISK   ⚠️  Yellow - Be cautious
71-100: HIGH RISK     🚨 Red   - Do not proceed
```

### Decision Process
1. **Analyze content** for known scam patterns
2. **Detect indicators** (urgency, prizes, links, requests)
3. **Calculate risk score** based on indicator count and type
4. **Generate explanation** - Why was this flagged?
5. **Provide recommendation** - What to do next
6. **Store in history** - Track all scans

### Important Notes
✅ **Results are for awareness and educational purposes**
✅ **AI assessment - verify independently before taking action**
✅ **Does NOT guarantee accuracy**
✅ **Not a replacement for professional security services**

---

## 🚀 Future Enhancements

### Phase 2 - Backend Integration
- [ ] Real API backend (Node.js/Python)
- [ ] Database storage (MongoDB/PostgreSQL)
- [ ] User accounts with cloud sync
- [ ] Real authentication system

### Phase 3 - Advanced AI
- [ ] Machine Learning models (TensorFlow.js)
- [ ] Real-time threat database integration
- [ ] URL reputation APIs (VirusTotal, URLhaus)
- [ ] Email security integration
- [ ] Screenshot-based scam detection

### Phase 4 - Extensions
- [ ] Browser extension (Chrome, Firefox)
- [ ] Real-time webpage monitoring
- [ ] Inline warnings while browsing
- [ ] Mobile application (React Native)
- [ ] Multilingual support

### Phase 5 - Community & Intelligence
- [ ] Community reporting system
- [ ] Real-time fraud alerts
- [ ] Threat intelligence dashboard
- [ ] Integration with cybercrime authorities
- [ ] Educational certificates

---

## 🔐 Security & Privacy

### What We DON'T Collect
❌ Banking credentials
❌ Card numbers or CVV
❌ UPI PINs or OTPs
❌ Passwords
❌ Personal identification numbers
❌ Financial information

### Data Storage
✅ All scan data stored locally in browser
✅ No data sent to external servers
✅ localStorage cleared when you clear history
✅ User session stored locally
✅ No cookies tracking

### Privacy Notice
This is a demo application for educational purposes. In production:
- Implement end-to-end encryption
- Use secure authentication (OAuth 2.0)
- Comply with GDPR/privacy laws
- Regular security audits
- Secure API communication

---

## 📄 License

MIT License - See LICENSE file for details

Copyright (c) 2024 ScamShield AI

---

## ⚠️ Disclaimer

**IMPORTANT:** ScamShield AI provides automated risk assessments for awareness and educational purposes only.

- Results are **NOT guaranteed** to be 100% accurate
- Should **NOT** be treated as definitive proof of fraud
- Always **independently verify** websites, sellers, and payment requests
- Use in combination with official security resources
- Not a substitute for professional cybersecurity services
- For real threats, contact your bank or local authorities

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Contact

- 📧 Email: support@scamshield.ai
- 🐛 Report Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions
- 🌐 Website: Coming soon

---

## 🎓 Educational Use

This project is ideal for:
- ✅ Cybersecurity education
- ✅ College projects and assignments
- ✅ Portfolio demonstration
- ✅ Security awareness training
- ✅ React/TypeScript learning
- ✅ Full-stack development practice

---

## 📊 Project Stats

- **Lines of Code:** 2000+
- **Components:** 8+
- **Pages:** 8
- **Features:** 10+
- **Time to Build:** Project Review Ready
- **Responsive:** Yes (Mobile, Tablet, Desktop)
- **Type:** Full-stack React Application

---

## 🙏 Acknowledgments

- React community
- Tailwind CSS
- Lucide React icons
- Recharts
- All cybersecurity resources and guidance

---

## 📝 Project Roadmap

```
2024
├── ✅ Q1: Core features (Message, Website, Shopping scanners)
├── ✅ Q2: Dashboard and History
├── ✅ Q3: Safety Center and Reporting
├── ⏳ Q4: Backend API and Database
│
2025
├── ML Integration
├── Browser Extension
├── Mobile App
└── Community Features
```

---

**Built with ❤️ for cybersecurity awareness**

🛡️ **ScamShield AI** - Protect yourself online

---

*Last Updated: September 2024*
*Version: 1.0.0*
