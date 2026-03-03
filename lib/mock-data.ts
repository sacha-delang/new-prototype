// Mock data for Tools4Tooling prototype dashboard

export type Subscription = {
  id: string
  name: string
  category: "Cloud" | "AI" | "Productivity" | "Communication" | "Security" | "Development" | "Analytics"
  monthlyCost: number
  billingCycle: "monthly" | "annual"
  status: "active" | "trial" | "cancelled"
  users: number
  renewalDate: string
  logo: string
  sentiment: number // 1-5
  usagePercent: number
}

export type Invoice = {
  id: string
  invoiceNumber: string
  subscription: string
  product: string
  amount: number
  date: string
  status: "paid" | "pending" | "overdue"
  source: "email" | "accounting"
}

export type Alert = {
  id: string
  type: "price_increase" | "price_decrease" | "duplicate" | "low_sentiment" | "unused" | "renewal"
  title: string
  description: string
  severity: "high" | "medium" | "low"
  subscription: string
  date: string
  actionable: boolean
}

export type SentimentEntry = {
  subscriptionId: string
  subscriptionName: string
  avgRating: number
  totalResponses: number
  usageRating: number
  satisfactionRating: number
  features: { name: string; rating: number }[]
}

export type SavingsOpportunity = {
  id: string
  currentService: string
  currentCost: number
  alternative: string
  alternativeCost: number
  savingsPercent: number
  featureMatch: number
  recommendation: string
}

export const subscriptions: Subscription[] = [
  { id: "1", name: "AWS", category: "Cloud", monthlyCost: 2450, billingCycle: "monthly", status: "active", users: 45, renewalDate: "2026-03-15", logo: "A", sentiment: 4.2, usagePercent: 87 },
  { id: "2", name: "Google Workspace", category: "Productivity", monthlyCost: 1080, billingCycle: "annual", status: "active", users: 90, renewalDate: "2026-06-01", logo: "G", sentiment: 4.5, usagePercent: 95 },
  { id: "3", name: "Slack", category: "Communication", monthlyCost: 675, billingCycle: "monthly", status: "active", users: 90, renewalDate: "2026-03-01", logo: "S", sentiment: 4.1, usagePercent: 92 },
  { id: "4", name: "Microsoft 365", category: "Productivity", monthlyCost: 990, billingCycle: "annual", status: "active", users: 85, renewalDate: "2026-09-15", logo: "M", sentiment: 3.8, usagePercent: 68 },
  { id: "5", name: "OpenAI API", category: "AI", monthlyCost: 820, billingCycle: "monthly", status: "active", users: 30, renewalDate: "2026-03-01", logo: "O", sentiment: 4.6, usagePercent: 78 },
  { id: "6", name: "GitHub Enterprise", category: "Development", monthlyCost: 525, billingCycle: "annual", status: "active", users: 40, renewalDate: "2026-07-20", logo: "GH", sentiment: 4.7, usagePercent: 96 },
  { id: "7", name: "Datadog", category: "Analytics", monthlyCost: 380, billingCycle: "monthly", status: "active", users: 15, renewalDate: "2026-03-01", logo: "D", sentiment: 3.5, usagePercent: 42 },
  { id: "8", name: "Jira", category: "Development", monthlyCost: 420, billingCycle: "annual", status: "active", users: 40, renewalDate: "2026-05-10", logo: "J", sentiment: 2.9, usagePercent: 55 },
  { id: "9", name: "Zoom", category: "Communication", monthlyCost: 350, billingCycle: "monthly", status: "active", users: 90, renewalDate: "2026-03-01", logo: "Z", sentiment: 3.6, usagePercent: 45 },
  { id: "10", name: "Notion", category: "Productivity", monthlyCost: 240, billingCycle: "monthly", status: "active", users: 60, renewalDate: "2026-03-01", logo: "N", sentiment: 4.3, usagePercent: 72 },
  { id: "11", name: "CrowdStrike", category: "Security", monthlyCost: 560, billingCycle: "annual", status: "active", users: 90, renewalDate: "2026-08-01", logo: "CS", sentiment: 4.0, usagePercent: 100 },
  { id: "12", name: "Anthropic API", category: "AI", monthlyCost: 650, billingCycle: "monthly", status: "active", users: 20, renewalDate: "2026-03-01", logo: "AN", sentiment: 4.4, usagePercent: 65 },
  { id: "13", name: "New Relic", category: "Analytics", monthlyCost: 310, billingCycle: "monthly", status: "trial", users: 10, renewalDate: "2026-03-15", logo: "NR", sentiment: 3.2, usagePercent: 25 },
  { id: "14", name: "Figma", category: "Development", monthlyCost: 180, billingCycle: "annual", status: "active", users: 15, renewalDate: "2026-04-01", logo: "F", sentiment: 4.8, usagePercent: 88 },
  { id: "15", name: "HubSpot", category: "Analytics", monthlyCost: 890, billingCycle: "annual", status: "active", users: 25, renewalDate: "2026-10-01", logo: "HS", sentiment: 3.7, usagePercent: 60 },
]

export const invoices: Invoice[] = [
  { id: "1", invoiceNumber: "INV-2026-001", subscription: "AWS", product: "EC2 + S3 + Lambda", amount: 2450, date: "2026-02-01", status: "paid", source: "accounting" },
  { id: "2", invoiceNumber: "INV-2026-002", subscription: "Google Workspace", product: "Business Standard", amount: 1080, date: "2026-02-01", status: "paid", source: "email" },
  { id: "3", invoiceNumber: "INV-2026-003", subscription: "Slack", product: "Pro Plan", amount: 675, date: "2026-02-01", status: "paid", source: "email" },
  { id: "4", invoiceNumber: "INV-2026-004", subscription: "Microsoft 365", product: "Business Premium", amount: 990, date: "2026-02-01", status: "paid", source: "accounting" },
  { id: "5", invoiceNumber: "INV-2026-005", subscription: "OpenAI API", product: "API Usage", amount: 820, date: "2026-02-01", status: "paid", source: "email" },
  { id: "6", invoiceNumber: "INV-2026-006", subscription: "GitHub Enterprise", product: "Enterprise Cloud", amount: 525, date: "2026-02-01", status: "paid", source: "accounting" },
  { id: "7", invoiceNumber: "INV-2026-007", subscription: "Datadog", product: "Infrastructure Pro", amount: 380, date: "2026-02-01", status: "pending", source: "email" },
  { id: "8", invoiceNumber: "INV-2026-008", subscription: "Jira", product: "Premium Plan", amount: 420, date: "2026-02-01", status: "paid", source: "accounting" },
  { id: "9", invoiceNumber: "INV-2026-009", subscription: "Zoom", product: "Business Plan", amount: 350, date: "2026-02-01", status: "paid", source: "email" },
  { id: "10", invoiceNumber: "INV-2026-010", subscription: "Notion", product: "Team Plan", amount: 240, date: "2026-02-01", status: "paid", source: "email" },
  { id: "11", invoiceNumber: "INV-2026-011", subscription: "CrowdStrike", product: "Falcon Pro", amount: 560, date: "2026-02-01", status: "overdue", source: "accounting" },
  { id: "12", invoiceNumber: "INV-2026-012", subscription: "Anthropic API", product: "Claude API", amount: 650, date: "2026-02-01", status: "paid", source: "email" },
  { id: "13", invoiceNumber: "INV-2026-013", subscription: "AWS", product: "EC2 + S3 + Lambda", amount: 2380, date: "2026-01-01", status: "paid", source: "accounting" },
  { id: "14", invoiceNumber: "INV-2026-014", subscription: "Google Workspace", product: "Business Standard", amount: 1080, date: "2026-01-01", status: "paid", source: "email" },
  { id: "15", invoiceNumber: "INV-2026-015", subscription: "OpenAI API", product: "API Usage", amount: 750, date: "2026-01-01", status: "paid", source: "email" },
]

export const alerts: Alert[] = [
  { id: "1", type: "price_increase", title: "AWS price increase detected", description: "AWS monthly cost increased by 2.9% compared to last month ($2,380 to $2,450). Review usage to identify potential savings.", severity: "high", subscription: "AWS", date: "2026-02-15", actionable: true },
  { id: "2", type: "duplicate", title: "Overlapping features: Google Workspace & Microsoft 365", description: "Both services offer email, document editing, cloud storage, and video conferencing. Consider consolidating to save up to $990/mo.", severity: "high", subscription: "Microsoft 365", date: "2026-02-14", actionable: true },
  { id: "3", type: "low_sentiment", title: "Low employee satisfaction: Jira", description: "Jira scored 2.9/5 in employee sentiment. 45% of surveyed users rated it as frustrating. Consider alternatives like Linear or Asana.", severity: "medium", subscription: "Jira", date: "2026-02-13", actionable: true },
  { id: "4", type: "duplicate", title: "Overlapping features: Datadog & New Relic", description: "Both monitoring tools provide APM, infrastructure monitoring, and log management. Consolidating could save $310-$380/mo.", severity: "medium", subscription: "Datadog", date: "2026-02-12", actionable: true },
  { id: "5", type: "unused", title: "Low usage detected: Zoom", description: "Zoom usage is at 45% with most video calls happening through Google Meet (included in Google Workspace). Consider downgrading.", severity: "medium", subscription: "Zoom", date: "2026-02-11", actionable: true },
  { id: "6", type: "renewal", title: "Upcoming renewal: GitHub Enterprise", description: "GitHub Enterprise annual subscription renews on July 20, 2026. Current cost: $525/mo. Review plan and negotiate renewal terms.", severity: "low", subscription: "GitHub Enterprise", date: "2026-02-10", actionable: false },
  { id: "7", type: "price_increase", title: "OpenAI API cost increase", description: "OpenAI API spending increased by 9.3% month-over-month ($750 to $820). Review API usage patterns and token consumption.", severity: "medium", subscription: "OpenAI API", date: "2026-02-09", actionable: true },
  { id: "8", type: "low_sentiment", title: "Below average satisfaction: Datadog", description: "Datadog scored 3.5/5 in employee sentiment with only 42% utilization. Team finds the interface complex for daily monitoring.", severity: "low", subscription: "Datadog", date: "2026-02-08", actionable: true },
]

export const sentimentData: SentimentEntry[] = [
  { subscriptionId: "1", subscriptionName: "AWS", avgRating: 4.2, totalResponses: 38, usageRating: 4.5, satisfactionRating: 3.9, features: [{ name: "Reliability", rating: 4.8 }, { name: "Console UI", rating: 3.2 }, { name: "Documentation", rating: 4.1 }, { name: "Cost Transparency", rating: 3.5 }] },
  { subscriptionId: "2", subscriptionName: "Google Workspace", avgRating: 4.5, totalResponses: 82, usageRating: 4.8, satisfactionRating: 4.2, features: [{ name: "Gmail", rating: 4.7 }, { name: "Google Drive", rating: 4.6 }, { name: "Google Meet", rating: 4.0 }, { name: "Docs/Sheets", rating: 4.5 }] },
  { subscriptionId: "3", subscriptionName: "Slack", avgRating: 4.1, totalResponses: 85, usageRating: 4.6, satisfactionRating: 3.6, features: [{ name: "Messaging", rating: 4.5 }, { name: "Channels", rating: 4.3 }, { name: "Search", rating: 3.2 }, { name: "Integrations", rating: 4.4 }] },
  { subscriptionId: "4", subscriptionName: "Microsoft 365", avgRating: 3.8, totalResponses: 70, usageRating: 3.5, satisfactionRating: 4.1, features: [{ name: "Excel", rating: 4.5 }, { name: "Teams", rating: 3.0 }, { name: "OneDrive", rating: 3.8 }, { name: "Outlook", rating: 3.9 }] },
  { subscriptionId: "5", subscriptionName: "OpenAI API", avgRating: 4.6, totalResponses: 25, usageRating: 4.3, satisfactionRating: 4.9, features: [{ name: "GPT-4 Quality", rating: 4.8 }, { name: "API Docs", rating: 4.5 }, { name: "Response Speed", rating: 4.2 }, { name: "Pricing", rating: 3.8 }] },
  { subscriptionId: "6", subscriptionName: "GitHub Enterprise", avgRating: 4.7, totalResponses: 38, usageRating: 4.8, satisfactionRating: 4.6, features: [{ name: "Version Control", rating: 4.9 }, { name: "CI/CD", rating: 4.5 }, { name: "Code Review", rating: 4.7 }, { name: "Security", rating: 4.3 }] },
  { subscriptionId: "7", subscriptionName: "Datadog", avgRating: 3.5, totalResponses: 12, usageRating: 3.0, satisfactionRating: 4.0, features: [{ name: "Dashboards", rating: 4.1 }, { name: "Alerting", rating: 3.8 }, { name: "Log Management", rating: 3.2 }, { name: "Ease of Use", rating: 2.9 }] },
  { subscriptionId: "8", subscriptionName: "Jira", avgRating: 2.9, totalResponses: 35, usageRating: 3.2, satisfactionRating: 2.6, features: [{ name: "Issue Tracking", rating: 3.5 }, { name: "Sprint Planning", rating: 3.1 }, { name: "UI/UX", rating: 2.0 }, { name: "Performance", rating: 2.3 }] },
  { subscriptionId: "9", subscriptionName: "Zoom", avgRating: 3.6, totalResponses: 75, usageRating: 2.8, satisfactionRating: 4.4, features: [{ name: "Video Quality", rating: 4.5 }, { name: "Screen Share", rating: 4.2 }, { name: "Recording", rating: 3.8 }, { name: "Necessity", rating: 2.1 }] },
  { subscriptionId: "10", subscriptionName: "Notion", avgRating: 4.3, totalResponses: 50, usageRating: 4.0, satisfactionRating: 4.6, features: [{ name: "Documentation", rating: 4.7 }, { name: "Organization", rating: 4.5 }, { name: "Collaboration", rating: 4.2 }, { name: "Templates", rating: 3.8 }] },
  { subscriptionId: "14", subscriptionName: "Figma", avgRating: 4.8, totalResponses: 14, usageRating: 4.7, satisfactionRating: 4.9, features: [{ name: "Design Tools", rating: 4.9 }, { name: "Collaboration", rating: 4.8 }, { name: "Prototyping", rating: 4.6 }, { name: "Dev Handoff", rating: 4.5 }] },
]

export const savingsOpportunities: SavingsOpportunity[] = [
  { id: "1", currentService: "Microsoft 365", currentCost: 990, alternative: "Google Workspace (already subscribed)", alternativeCost: 0, savingsPercent: 100, featureMatch: 85, recommendation: "Google Workspace already covers email, docs, sheets, and video conferencing. Consider dropping Microsoft 365 and migrating remaining Excel-dependent workflows." },
  { id: "2", currentService: "Zoom", currentCost: 350, alternative: "Google Meet (included in Google Workspace)", alternativeCost: 0, savingsPercent: 100, featureMatch: 80, recommendation: "Google Meet is already included in your Google Workspace subscription. Most teams already use it for daily meetings. Migrate remaining Zoom users." },
  { id: "3", currentService: "New Relic", currentCost: 310, alternative: "Datadog (already subscribed)", alternativeCost: 0, savingsPercent: 100, featureMatch: 90, recommendation: "Datadog already provides the same APM and monitoring capabilities. Consolidate monitoring into a single platform." },
  { id: "4", currentService: "Jira", currentCost: 420, alternative: "Linear", alternativeCost: 320, savingsPercent: 24, featureMatch: 92, recommendation: "Linear offers a faster, more modern project management experience with higher employee satisfaction scores. Migration tools available." },
  { id: "5", currentService: "Datadog", currentCost: 380, alternative: "Grafana Cloud", alternativeCost: 220, savingsPercent: 42, featureMatch: 78, recommendation: "Grafana Cloud offers competitive monitoring features at lower cost. Best if your team prefers open-source tools and custom dashboards." },
  { id: "6", currentService: "AWS (partial)", currentCost: 2450, alternative: "Reserved Instances / Savings Plans", alternativeCost: 1715, savingsPercent: 30, featureMatch: 100, recommendation: "Commit to 1-year reserved instances for predictable workloads. Analysis shows 60% of your EC2 usage is stable and eligible for savings plans." },
]

export const monthlySpendHistory = [
  { month: "Sep", total: 9200, cloud: 2300, ai: 1250, productivity: 2100, communication: 950, security: 520, development: 1080, analytics: 1000 },
  { month: "Oct", total: 9450, cloud: 2320, ai: 1300, productivity: 2150, communication: 960, security: 540, development: 1100, analytics: 1080 },
  { month: "Nov", total: 9600, cloud: 2350, ai: 1380, productivity: 2200, communication: 980, security: 550, development: 1100, analytics: 1040 },
  { month: "Dec", total: 9800, cloud: 2370, ai: 1420, productivity: 2250, communication: 1000, security: 555, development: 1110, analytics: 1095 },
  { month: "Jan", total: 10050, cloud: 2380, ai: 1400, productivity: 2310, communication: 1020, security: 560, development: 1125, analytics: 1255 },
  { month: "Feb", total: 10520, cloud: 2450, ai: 1470, productivity: 2310, communication: 1025, security: 560, development: 1125, analytics: 1580 },
]

export const categoryBreakdown = [
  { category: "Cloud", amount: 2450, color: "var(--chart-1)" },
  { category: "Productivity", amount: 2310, color: "var(--chart-2)" },
  { category: "AI", amount: 1470, color: "var(--chart-3)" },
  { category: "Analytics", amount: 1580, color: "var(--chart-4)" },
  { category: "Communication", amount: 1025, color: "var(--chart-5)" },
  { category: "Development", amount: 1125, color: "var(--chart-1)" },
  { category: "Security", amount: 560, color: "var(--chart-2)" },
]

export const totalMonthlyCost = subscriptions.reduce((sum, s) => sum + s.monthlyCost, 0)
export const totalSubscriptions = subscriptions.length
export const potentialSavings = savingsOpportunities.reduce((sum, s) => sum + (s.currentCost - s.alternativeCost), 0)
export const activeAlerts = alerts.filter(a => a.severity === "high").length
