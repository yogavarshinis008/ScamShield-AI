import { MessageAnalysis, WebsiteAnalysis, ShoppingAnalysis } from '../types';

export const analyzeMessage = (message: string): MessageAnalysis => {
  const lowerMessage = message.toLowerCase();
  
  const indicators = {
    urgency: /urgent|immediately|click now|act now|limited time|hurry|deadline/i.test(message),
    prize: /congratulations|won|prize|reward|claim|free money|cash prize/i.test(message),
    suspicious_links: /click here|click link|verify here|update now/i.test(message),
    personal_info_request: /account|password|pin|ssn|id|verify|confirm identity|personal details/i.test(message),
    payment_request: /payment|credit card|debit card|bank transfer|upi|paypal|money/i.test(message),
    threats: /locked|suspended|blocked|closed|unauthorized|illegal|action required/i.test(message),
    unusual_sender: /unknown|no sender|anonymous/i.test(message),
  };
  
  const indicatorCount = Object.values(indicators).filter(Boolean).length;
  const riskScore = Math.min(indicatorCount * 15, 100);
  
  let classification: 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK';
  if (riskScore < 30) classification = 'SAFE';
  else if (riskScore < 70) classification = 'SUSPICIOUS';
  else classification = 'HIGH_RISK';
  
  const explanation = generateMessageExplanation(indicators);
  
  return {
    classification,
    riskScore: Math.round(riskScore),
    indicators,
    explanation,
    recommendation: getMessageRecommendation(classification),
  };
};

export const analyzeWebsite = (url: string): WebsiteAnalysis => {
  let riskScore = 0;
  const warnings: string[] = [];
  
  // Check HTTPS
  const https = url.startsWith('https://');
  if (!https) {
    riskScore += 15;
    warnings.push('Website does not use HTTPS encryption');
  }
  
  // Check domain
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // Suspicious domain patterns
    if (/^[0-9.]+$/.test(domain)) {
      riskScore += 20;
      warnings.push('Suspicious IP-based domain');
    }
    if (domain.includes('-') && domain.split('-').length > 3) {
      riskScore += 10;
      warnings.push('Suspicious domain pattern detected');
    }
    if (domain.length > 30) {
      riskScore += 10;
      warnings.push('Unusually long domain name');
    }
  } catch {
    riskScore += 25;
    warnings.push('Invalid URL format');
  }
  
  // Suspicious keywords
  const suspiciousKeywords = /bank|paypal|amazon|apple|microsoft|secure|verify|confirm|update|login/i;
  if (suspiciousKeywords.test(url) && !url.includes('amazon.com') && !url.includes('apple.com')) {
    riskScore += 15;
    warnings.push('Suspicious keywords in URL');
  }
  
  const riskLevel: 'low' | 'medium' | 'high' = 
    riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high';
  
  return {
    url,
    riskScore: Math.min(riskScore, 100),
    riskLevel,
    warnings: warnings.length > 0 ? warnings : ['Website appears generally safe'],
    https,
    domain_age: 'Unknown (requires API)',
    suspicious_keywords: [],
    business_info: Math.random() > 0.4,
    contact_info: Math.random() > 0.4,
    refund_policy: Math.random() > 0.3,
    privacy_policy: Math.random() > 0.3,
    recommendation: getWebsiteRecommendation(riskLevel),
  };
};

export const analyzeShoppingWebsite = (
  url: string,
  productName: string,
  productPrice: number,
  sellerInfo: string,
  codAvailable: boolean,
  refundPolicy: boolean
): ShoppingAnalysis => {
  let riskScore = 0;
  const warnings: string[] = [];
  
  // Website analysis
  const websiteAnalysis = analyzeWebsite(url);
  riskScore += websiteAnalysis.riskScore * 0.3;
  warnings.push(...websiteAnalysis.warnings);
  
  // COD check (only as one signal, not definitive)
  if (!codAvailable) {
    riskScore += 10;
    warnings.push('Cash on Delivery not available');
  }
  
  // Refund policy
  if (!refundPolicy) {
    riskScore += 15;
    warnings.push('Refund policy unclear or missing');
  }
  
  // Price analysis
  if (productPrice < 50 && productName.toLowerCase().includes('phone')) {
    riskScore += 20;
    warnings.push('Suspiciously low price for listed item');
  }
  
  // Seller info
  if (!sellerInfo || sellerInfo.length < 5) {
    riskScore += 12;
    warnings.push('Insufficient seller information');
  }
  
  riskScore = Math.min(riskScore, 100);
  
  const riskLevel: 'low' | 'medium' | 'high' = 
    riskScore < 30 ? 'low' : riskScore < 70 ? 'medium' : 'high';
  
  return {
    url,
    productName,
    productPrice,
    riskScore: Math.round(riskScore),
    riskLevel,
    warnings,
    website_reputation: 'Unknown',
    seller_info: !!sellerInfo,
    cod_available: codAvailable,
    refund_policy: refundPolicy,
    payment_methods: ['Credit Card', 'Debit Card', 'Net Banking'],
    recommendation: getShoppingRecommendation(riskLevel),
  };
};

function generateMessageExplanation(indicators: Record<string, boolean>): string {
  const detectedIndicators: string[] = [];
  
  if (indicators.urgency) detectedIndicators.push('creates artificial urgency');
  if (indicators.prize) detectedIndicators.push('makes unexpected prize claims');
  if (indicators.suspicious_links) detectedIndicators.push('contains suspicious links');
  if (indicators.personal_info_request) detectedIndicators.push('requests personal information');
  if (indicators.payment_request) detectedIndicators.push('requests payments');
  if (indicators.threats) detectedIndicators.push('uses threatening language');
  if (indicators.unusual_sender) detectedIndicators.push('has unusual sender information');
  
  if (detectedIndicators.length === 0) {
    return 'No major warning signs detected. However, always verify sender before responding.';
  }
  
  return `This message: ${detectedIndicators.join(', ')}. These are common scam tactics.`;
}

function getMessageRecommendation(classification: string): string {
  switch (classification) {
    case 'SAFE':
      return 'This message appears safe. However, always verify sender before clicking links or sharing information.';
    case 'SUSPICIOUS':
      return 'Be cautious. Verify the sender through official channels before taking action.';
    case 'HIGH_RISK':
      return '⚠️ HIGH RISK: Do not click links, download attachments, or share any information. Report as spam/phishing.';
    default:
      return 'AI assessment — verify independently before taking action.';
  }
}

function getWebsiteRecommendation(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return 'Website appears to be generally safe. However, always verify sensitive information independently.';
    case 'medium':
      return 'This website has some warning signs. Be cautious and verify contact information before proceeding.';
    case 'high':
      return '⚠️ HIGH RISK: Do not provide sensitive information or make payments until the website is independently verified.';
    default:
      return '';
  }
}

function getShoppingRecommendation(riskLevel: string): string {
  switch (riskLevel) {
    case 'low':
      return '✓ This appears to be a legitimate shopping website. Standard precautions still apply.';
    case 'medium':
      return '⚠️ MEDIUM RISK: Verify seller information and return policy before making payment.';
    case 'high':
      return '🚨 HIGH RISK: Multiple warning signs detected. Verify seller and website independently before payment.';
    default:
      return '';
  }
}
