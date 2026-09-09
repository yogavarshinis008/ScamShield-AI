# ScamShield AI - Features & Architecture

## Core Features

### 1. Message Scanner
**Purpose:** Detect scam indicators in text messages

**Input:** Message text (SMS, WhatsApp, Email)

**Analysis Checks:**
- Urgency keywords ("urgent", "immediately", "limited time")
- Prize/reward claims ("won", "congratulations")
- Suspicious links ("click here", "verify")
- Personal info requests ("password", "account")
- Payment requests
- Threatening language
- Unusual sender info

**Output:**
- Classification: SAFE / SUSPICIOUS / HIGH_RISK
- Risk Score: 0-100
- Detected Indicators (boolean flags)
- Explanation text
- Recommendation

---

### 2. Website Scanner
**Purpose:** Analyze website safety and identify red flags

**Input:** Website URL

**Analysis Checks:**
- HTTPS/SSL encryption status
- Domain structure and patterns
- Domain age (simulated)
- Suspicious keywords in URL
- Business information availability
- Contact information
- Refund/return policy
- Privacy policy
- Suspicious IP addresses
- Domain similarity to known brands

**Output:**
- Risk Score: 0-100
- Risk Level: LOW / MEDIUM / HIGH
- Warning signs list
- HTTPS status
- Business info flags
- Contact info flags
- Recommendation

---

### 3. Shopping Protection (Unique)
**Purpose:** Protect users BEFORE making online purchases

**Input:**
- Website URL
- Product name
- Product price
- Seller information
- COD availability
- Refund policy clarity

**Analysis Combines:**
- Website reputation score (derived from URL analysis)
- Seller information quality
- Product pricing analysis (flags unrealistic prices)
- COD availability (as ONE signal, not definitive)
- Refund policy clarity
- Payment method diversity
- Contact information
- Return policy

**Key Design:** COD unavailability alone does NOT mark as scam
- Combines multiple signals
- Treats COD as one factor only
- Considers context (website reputation, seller info, etc.)

**Output:**
- Risk Score: 0-100
- Risk Level: LOW / MEDIUM / HIGH
- Warning signs list
- Payment safety analysis
- Visual warnings (HIGH RISK shows strong alert)
- Recommendation
- Action buttons (Go Back / Verify / Continue)

---

### 4. Scan History
**Purpose:** Track and manage all previous scans

**Features:**
- Store scans locally in localStorage
- Filter by type (Message / Website / Shopping)
- Sort by date (recent first) or risk score
- Search functionality
- View detailed results
- Delete individual scans
- Clear all history

**Data Stored:**
- Scan ID
- Type (message/website/shopping)
- Content (message text or URL)
- Risk score
- Risk level
- Indicators/warnings list
- Explanation
- Recommendation
- Timestamp

---

### 5. Scam Reporting
**Purpose:** Allow users to report suspicious content

**Supported Report Types:**
- Fraudulent Website
- Scam Message
- Fake Shopping Website
- Payment Fraud

**Information Collected:**
- Report type
- Website/identifier
- Description of incident
- Warning signs observed
- Date of incident

**Security:** Does NOT collect:
- Personal financial data
- Bank details
- Card numbers
- OTPs or PINs

---

### 6. Safety Center
**Purpose:** Educate users about cybersecurity

**Contains:**
- 10+ safety tips
- Common scam types explanation
- What to do if you're a victim
- Where to report scams
- Prevention strategies

**Topics Covered:**
- Never share OTPs
- Never share UPI PINs
- Verify sellers before payment
- Check refund policies
- Be careful with prizes
- Don't click suspicious links
- Verify website addresses
- Don't rush payments
- Use trusted payment platforms
- Report suspected fraud

---

### 7. Dashboard
**Purpose:** Provide overview and quick access

**Displays:**
- Total scans count
- Safe results count
- Suspicious results count
- High-risk results count
- Risk distribution pie chart
- Scan type bar chart
- Recent scans (last 5)
- Quick action buttons
- Security status indicator

---

### 8. Authentication
**Purpose:** User account management

**Features:**
- Login
- Register
- Logout
- Demo account option
- Session persistence (localStorage)
- User avatar generation

---

### 9. User Profile
**Purpose:** Account and preference management

**Features:**
- Profile information display
- Notification settings
- Theme settings (dark mode)
- Scan statistics
- Clear history option
- Logout button
- Privacy information

---

## Architecture Overview

### State Management (Zustand)

```typescript
// Auth Store
- user: Current logged-in user
- isAuthenticated: Auth status
- login(), register(), logout()
- loginAsDemo()

// Scan Store
- scans: Array of all scans
- addScan(): Add new scan
- getScanHistory(): Get all scans
- deleteScan(): Delete specific scan
- clearHistory(): Clear all scans
- getStats(): Get statistics
```

### AI Analysis Logic

```typescript
// Utils/aiAnalysis.ts
- analyzeMessage(): Message risk analysis
- analyzeWebsite(): Website risk analysis
- analyzeShoppingWebsite(): Shopping safety analysis
```

### Data Flow

```
User Input
    ↓
Validation
    ↓
AI Analysis (Rule-based)
    ↓
Risk Score Calculation
    ↓
Result Generation
    ↓
Store in History (localStorage)
    ↓
Display to User
```

---

## Risk Score Formula

### Message Analysis
```
Base Score = Indicator Count × 15
Max Score = 100

Indicators Weighted Equally:
- Urgency: 15 points
- Prize: 15 points
- Suspicious Links: 15 points
- Personal Info Request: 15 points
- Payment Request: 15 points
- Threats: 15 points
- Unusual Sender: 15 points
```

### Website Analysis
```
Base Score = Sum of Risk Factors:
- No HTTPS: +15
- Suspicious Domain: +20
- Missing Business Info: +15
- Missing Contact: +12
- Long Domain: +10
- Suspicious Keywords: +15

Max Score = 100
```

### Shopping Analysis
```
Website Risk: 30%
Seller Info: 20%
Refund Policy: 20%
COD Availability: 15% (one signal only)
Product Price: 15%

Total = Combined weighted score
Max Score = 100
```

---

## Component Hierarchy

```
App.tsx (Router)
├── Login.tsx
├── Register.tsx
└── Layout.tsx
    ├── Sidebar.tsx (Navigation)
    ├── Header.tsx (User menu)
    └── Outlet (Page content)
        ├── Dashboard.tsx
        ├── MessageScanner.tsx
        ├── WebsiteScanner.tsx
        ├── ShoppingProtection.tsx
        ├── ScanHistory.tsx
        ├── ScamReports.tsx
        ├── SafetyCenter.tsx
        └── Profile.tsx

Shared Components:
- RiskScoreIndicator
- StatCard
- WarningCard
- ScanCard
- SafetyTip
```

---

## Storage Strategy

### LocalStorage Keys
```
"user" - Current logged-in user
"scans" - Array of all scan results
```

### Data Persistence
- User session persists on page reload
- Scan history persists across sessions
- Data cleared only when user clicks "Clear History"
- All data stored on client-side (browser)

---

## Security Considerations

### What's Protected
✅ No real financial data handled
✅ No passwords stored
✅ No banking information
✅ No OTPs or PINs
✅ Client-side processing only
✅ No external API calls (demo)

### In Production
- Implement HTTPS
- Use OAuth 2.0 authentication
- Encrypt stored data
- Secure API endpoints
- Regular security audits
- GDPR compliance

---

## Performance Optimization

- Lazy loading of pages via React Router
- Memoization with useMemo hooks
- Component splitting for faster renders
- Tailwind CSS for minimal CSS output
- Vite for fast development and production builds

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## API Integration Points (Future)

```typescript
// These can be integrated in future phases:
- GET /api/website-reputation/{url}
- GET /api/url-safety/{url}
- POST /api/analyze/message
- POST /api/analyze/website
- POST /api/analyze/shopping
- POST /api/reports/submit
- GET /api/scan-history
- GET /api/threats/latest
```

---

## Testing Scenarios

### Message Scanner
- Test with legitimate message
- Test with obvious phishing
- Test with mixed indicators
- Test with empty input
- Test with special characters

### Website Scanner
- Test with HTTPS domain
- Test with HTTP domain
- Test with IP address
- Test with suspicious domain
- Test with invalid URL

### Shopping Protection
- Test with legitimate shop
- Test with missing COD (but good reputation)
- Test with missing refund policy
- Test with unrealistic pricing
- Test with missing seller info

---

For implementation details, see specific component files.
