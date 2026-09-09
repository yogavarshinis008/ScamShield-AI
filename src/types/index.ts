export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface ScanResult {
  id: string;
  type: 'message' | 'website' | 'shopping';
  content: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: string[];
  explanation: string;
  recommendation: string;
  timestamp: Date;
}

export interface MessageAnalysis {
  classification: 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK';
  riskScore: number;
  indicators: {
    urgency: boolean;
    prize: boolean;
    suspicious_links: boolean;
    personal_info_request: boolean;
    payment_request: boolean;
    threats: boolean;
    unusual_sender: boolean;
  };
  explanation: string;
  recommendation: string;
}

export interface WebsiteAnalysis {
  url: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  https: boolean;
  domain_age: string;
  suspicious_keywords: string[];
  business_info: boolean;
  contact_info: boolean;
  refund_policy: boolean;
  privacy_policy: boolean;
  recommendation: string;
}

export interface ShoppingAnalysis {
  url: string;
  productName: string;
  productPrice: number;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  warnings: string[];
  website_reputation: string;
  seller_info: boolean;
  cod_available: boolean;
  refund_policy: boolean;
  payment_methods: string[];
  recommendation: string;
}

export interface Report {
  id: string;
  type: 'website' | 'message' | 'shopping' | 'payment';
  identifier: string;
  description: string;
  warnings: string[];
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'confirmed';
}
