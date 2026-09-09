import SafetyTip from '../components/SafetyTip';

const safetyTips = [
  {
    title: '🔐 Never Share Your OTP',
    description: 'One-Time Passwords are confidential. Banks and services will never ask for your OTP. Never share it with anyone, even if they claim to be from your bank.',
    type: 'warning' as const,
  },
  {
    title: '🔐 Never Share Your UPI PIN',
    description: 'Your UPI PIN is like your ATM PIN. Never share it with anyone. Legitimate services will never ask for your UPI PIN.',
    type: 'warning' as const,
  },
  {
    title: '✓ Verify Sellers Before Payment',
    description: 'Check seller ratings, reviews, and return policies. Look for contact information and business registration. Use trusted payment methods with buyer protection.',
    type: 'tip' as const,
  },
  {
    title: '✓ Check Refund & Return Policies',
    description: 'Before making any purchase, read the return and refund policies. Legitimate businesses always have clear policies for returns and refunds.',
    type: 'tip' as const,
  },
  {
    title: '⚠️ Be Careful with Unexpected Prizes',
    description: 'If you did not enter a contest, you likely did not win. Prize claim scams are common. Be suspicious of unexpected winning notifications.',
    type: 'warning' as const,
  },
  {
    title: '⚠️ Don\'t Click Suspicious Links',
    description: 'Hover over links to see the actual URL. Phishing links often disguise themselves as legitimate sites. Never click links in unsolicited messages.',
    type: 'warning' as const,
  },
  {
    title: '✓ Verify Website Addresses',
    description: 'Always check the URL bar for correct spelling. Scammers use similar-looking domains (e.g., amaz0n.com instead of amazon.com).',
    type: 'tip' as const,
  },
  {
    title: '⚠️ Don\'t Rush Into Payments',
    description: 'Scammers create urgency to prevent you from thinking clearly. Take time to verify before proceeding with any financial transaction.',
    type: 'warning' as const,
  },
  {
    title: '✓ Use Trusted Payment Platforms',
    description: 'Use established payment methods like bank transfers, credit cards, or official payment gateways. These offer better protection against fraud.',
    type: 'tip' as const,
  },
  {
    title: '✓ Report Suspected Fraud',
    description: 'If you encounter a scam, report it to the platform and relevant authorities. Your report helps protect other users.',
    type: 'tip' as const,
  },
];

export default function SafetyCenter() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Safety Center</h1>
        <p className="text-gray-400">Learn how to protect yourself from online scams and fraud</p>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyTips.map((tip, index) => (
          <SafetyTip
            key={index}
            title={tip.title}
            description={tip.description}
            type={tip.type}
          />
        ))}
      </div>

      {/* Additional Resources */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-cyan-400">🛡️ If You're a Victim</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Immediately change your passwords</li>
              <li>• Contact your bank if financial information was compromised</li>
              <li>• File a complaint with cybercrime authorities</li>
              <li>• Monitor your accounts for suspicious activity</li>
              <li>• Consider identity theft protection services</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-cyan-400">📱 Report Scams To</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Your bank or payment provider</li>
              <li>• The platform where you encountered it</li>
              <li>• Local cybercrime authorities</li>
              <li>• FTC (USA) or IC3 (India)</li>
              <li>• Your country's consumer protection agency</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Scam Types */}
      <div className="glassmorphism-strong p-8 rounded-lg border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Common Scam Types to Watch For</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h4 className="font-bold text-red-300 mb-1">Phishing Scams</h4>
            <p className="text-sm text-gray-300">Fake emails/messages pretending to be from banks or services to steal login credentials</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4 py-2">
            <h4 className="font-bold text-orange-300 mb-1">Prize/Lottery Scams</h4>
            <p className="text-sm text-gray-300">Claims of winning prizes you never entered, asking for payment to claim</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h4 className="font-bold text-yellow-300 mb-1">Fake Shopping Websites</h4>
            <p className="text-sm text-gray-300">Online stores with unrealistic prices that never deliver or steal card information</p>
          </div>
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h4 className="font-bold text-red-300 mb-1">Tech Support Scams</h4>
            <p className="text-sm text-gray-300">Pop-ups claiming your device has malware, demanding payment or remote access</p>
          </div>
          <div className="border-l-4 border-pink-500 pl-4 py-2">
            <h4 className="font-bold text-pink-300 mb-1">Romance Scams</h4>
            <p className="text-sm text-gray-300">Fake dating profiles building relationships to eventually request money</p>
          </div>
        </div>
      </div>
    </div>
  );
}
