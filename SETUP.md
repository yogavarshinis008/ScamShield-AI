# Setup Instructions

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

### 4. Try Demo Account
- Click "Try Demo Account" button on login page
- Or use any email/password to create account

---

## Available Scripts

### Development
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── store/         # Zustand state management
├── utils/         # Helper functions & AI analysis
├── types/         # TypeScript type definitions
├── App.tsx        # Main app component
└── index.css      # Global styles
```

---

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Lucide React** - Icons
- **Recharts** - Charts

---

## Key Features

✅ Message Scanner - Analyze SMS, WhatsApp, Email
✅ Website Scanner - Check URL safety
✅ Shopping Protection - Pre-payment safety check
✅ Scan History - Track all scans
✅ Scam Reporting - Report suspicious content
✅ Safety Center - Cybersecurity education
✅ User Profile - Account management
✅ Dashboard - Analytics & overview

---

## Demo Account

**Email:** demo@scamshield.ai
**Password:** Any password

---

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Change port
PORT=3001 npm run dev
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run lint      # Check for errors
npm run build     # Rebuild
```

---

## Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Push and create PR

---

## Support

For issues and questions, open a GitHub issue.
