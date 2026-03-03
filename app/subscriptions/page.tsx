"use client"

import { useState, useMemo } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, AlertTriangle, TrendingUp, Calendar, ExternalLink } from "lucide-react"

type SubRow = {
  name: string
  subtitle: string
  logo: string
  logoBg: string
  category: string
  costNum: number
  cost: string
  users: string
  usage: number
  usageColor: string
  origin: string
  renewal: string
}

const allSubscriptions: SubRow[] = [
  { name: "Slack Enterprise", subtitle: "Team Communication", logo: "SL", logoBg: "bg-primary", category: "Collaboration", costNum: 450, cost: "$450.00", users: "150/150", usage: 94, usageColor: "bg-primary", origin: "USA", renewal: "Oct 12, 2026" },
  { name: "Asana Business", subtitle: "Project Management", logo: "AS", logoBg: "bg-chart-3", category: "Productivity", costNum: 200, cost: "$200.00", users: "45/60", usage: 42, usageColor: "bg-chart-3", origin: "USA", renewal: "Sep 28, 2026" },
  { name: "WeTransfer Pro", subtitle: "File Storage", logo: "WF", logoBg: "bg-chart-2", category: "Utilities", costNum: 450, cost: "$450.00", users: "12/20", usage: 82, usageColor: "bg-chart-2", origin: "NETHERLANDS", renewal: "Nov 05, 2026" },
  { name: "Adobe Creative Cloud", subtitle: "Design Suite", logo: "AD", logoBg: "bg-destructive", category: "Creative", costNum: 2890, cost: "$2,890.00", users: "80/100", usage: 68, usageColor: "bg-chart-2", origin: "USA", renewal: "Jan 20, 2026" },
  { name: "Alibaba Cloud", subtitle: "Infrastructure", logo: "AL", logoBg: "bg-chart-3", category: "Cloud IT", costNum: 1200, cost: "$1,200.00", users: "Unlimited", usage: 89, usageColor: "bg-chart-4", origin: "CHINA", renewal: "Dec 15, 2026" },
  { name: "Notion Team", subtitle: "Knowledge Base", logo: "NO", logoBg: "bg-foreground", category: "Productivity", costNum: 240, cost: "$240.00", users: "60/75", usage: 72, usageColor: "bg-chart-2", origin: "USA", renewal: "Mar 15, 2026" },
  { name: "GitHub Enterprise", subtitle: "Version Control", logo: "GH", logoBg: "bg-foreground", category: "Development", costNum: 525, cost: "$525.00", users: "40/50", usage: 96, usageColor: "bg-primary", origin: "USA", renewal: "Jul 20, 2026" },
  { name: "AWS", subtitle: "Cloud Infrastructure", logo: "AW", logoBg: "bg-chart-3", category: "Cloud IT", costNum: 2450, cost: "$2,450.00", users: "45/50", usage: 87, usageColor: "bg-chart-2", origin: "USA", renewal: "Mar 15, 2026" },
  { name: "Zoom Business", subtitle: "Video Conferencing", logo: "ZM", logoBg: "bg-primary", category: "Collaboration", costNum: 350, cost: "$350.00", users: "90/150", usage: 45, usageColor: "bg-chart-3", origin: "USA", renewal: "Apr 01, 2026" },
  { name: "Figma Organization", subtitle: "Design Platform", logo: "FG", logoBg: "bg-chart-4", category: "Creative", costNum: 180, cost: "$180.00", users: "15/20", usage: 88, usageColor: "bg-chart-2", origin: "USA", renewal: "Apr 01, 2026" },
  { name: "Datadog Pro", subtitle: "Monitoring & APM", logo: "DD", logoBg: "bg-chart-5", category: "Development", costNum: 380, cost: "$380.00", users: "15/25", usage: 42, usageColor: "bg-chart-3", origin: "USA", renewal: "May 10, 2026" },
  { name: "HubSpot CRM", subtitle: "Sales & Marketing", logo: "HS", logoBg: "bg-chart-3", category: "Productivity", costNum: 890, cost: "$890.00", users: "25/40", usage: 60, usageColor: "bg-chart-3", origin: "USA", renewal: "Oct 01, 2026" },
  { name: "Jira Premium", subtitle: "Project Tracking", logo: "JR", logoBg: "bg-primary", category: "Development", costNum: 420, cost: "$420.00", users: "40/60", usage: 55, usageColor: "bg-chart-3", origin: "AUSTRALIA", renewal: "May 10, 2026" },
  { name: "OpenAI API", subtitle: "AI Services", logo: "OA", logoBg: "bg-foreground", category: "AI/ML", costNum: 820, cost: "$820.00", users: "30/30", usage: 78, usageColor: "bg-chart-2", origin: "USA", renewal: "Monthly" },
  { name: "Anthropic API", subtitle: "AI Services", logo: "AN", logoBg: "bg-chart-5", category: "AI/ML", costNum: 650, cost: "$650.00", users: "20/25", usage: 65, usageColor: "bg-chart-2", origin: "USA", renewal: "Monthly" },
  { name: "CrowdStrike Falcon", subtitle: "Endpoint Security", logo: "CS", logoBg: "bg-destructive", category: "Security", costNum: 560, cost: "$560.00", users: "90/90", usage: 100, usageColor: "bg-primary", origin: "USA", renewal: "Aug 01, 2026" },
  { name: "Salesforce CRM", subtitle: "Customer Platform", logo: "SF", logoBg: "bg-primary", category: "Productivity", costNum: 1650, cost: "$1,650.00", users: "35/50", usage: 71, usageColor: "bg-chart-2", origin: "USA", renewal: "Mar 07, 2026" },
  { name: "SAP Concur", subtitle: "Expense Management", logo: "SP", logoBg: "bg-chart-3", category: "Utilities", costNum: 320, cost: "$320.00", users: "90/100", usage: 83, usageColor: "bg-chart-2", origin: "GERMANY", renewal: "Jun 15, 2026" },
  { name: "Cloudflare Enterprise", subtitle: "CDN & Security", logo: "CF", logoBg: "bg-chart-3", category: "Security", costNum: 750, cost: "$750.00", users: "Unlimited", usage: 95, usageColor: "bg-primary", origin: "USA", renewal: "Sep 20, 2026" },
  { name: "Linear", subtitle: "Issue Tracking", logo: "LN", logoBg: "bg-chart-5", category: "Development", costNum: 160, cost: "$160.00", users: "30/40", usage: 91, usageColor: "bg-primary", origin: "USA", renewal: "Nov 01, 2026" },
  { name: "Miro Enterprise", subtitle: "Whiteboarding", logo: "MR", logoBg: "bg-chart-3", category: "Collaboration", costNum: 280, cost: "$280.00", users: "40/60", usage: 52, usageColor: "bg-chart-3", origin: "NETHERLANDS", renewal: "Jul 15, 2026" },
  { name: "1Password Business", subtitle: "Password Manager", logo: "1P", logoBg: "bg-foreground", category: "Security", costNum: 200, cost: "$200.00", users: "90/90", usage: 98, usageColor: "bg-primary", origin: "CANADA", renewal: "Dec 01, 2026" },
  { name: "Snowflake", subtitle: "Data Warehouse", logo: "SF", logoBg: "bg-primary", category: "AI/ML", costNum: 1100, cost: "$1,100.00", users: "12/15", usage: 76, usageColor: "bg-chart-2", origin: "USA", renewal: "Aug 15, 2026" },
  { name: "Intercom", subtitle: "Customer Support", logo: "IC", logoBg: "bg-chart-3", category: "Productivity", costNum: 420, cost: "$420.00", users: "18/25", usage: 64, usageColor: "bg-chart-2", origin: "IRELAND", renewal: "Feb 28, 2026" },
]

const allCategories = Array.from(new Set(allSubscriptions.map((s) => s.category))).sort()

const ITEMS_PER_PAGE = 8

const criticalAlerts = [
  { icon: AlertTriangle, title: "Unused Asana Seats (15)", description: "Estimated $300/mo waste identified based on last 30 days activity.", borderColor: "border-l-muted-foreground" },
  { icon: Calendar, title: "Upcoming Renewal: Notion", description: "Renewal scheduled for Sep 30th. Check seat counts before auto-pay.", borderColor: "border-l-chart-3" },
  { icon: AlertTriangle, title: "Zoom license overlap", description: "62% of meetings now use Google Meet. Consider reducing seats.", borderColor: "border-l-chart-3" },
]

const originInsights = [
  { region: "North America", pct: "64%", color: "bg-foreground" },
  { region: "Europe", pct: "22%", color: "bg-chart-2" },
  { region: "Asia/China", pct: "14%", color: "bg-chart-3" },
]

export default function SubscriptionsPage() {
  const [view, setView] = useState<"list" | "grid">("list")
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    let result = allSubscriptions
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.origin.toLowerCase().includes(q) ||
          s.subtitle.toLowerCase().includes(q)
      )
    }
    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category))
    }
    return result
  }, [search, selectedCategories])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSearch("")
    setCurrentPage(1)
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Active Subscriptions</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor {allSubscriptions.length} active software stacks across your organization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-lg border border-border">
              <button
                onClick={() => setView("list")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  view === "list" ? "bg-foreground text-card" : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView("grid")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  view === "grid" ? "bg-foreground text-card" : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                Grid View
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 text-sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter Category
                  {selectedCategories.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                      {selectedCategories.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {allCategories.map((cat) => (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {(selectedCategories.length > 0 || search) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-muted-foreground">
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, category, or origin..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            className="h-10 w-full border-border bg-card pl-9 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {view === "list" ? (
          <Card className="border-border bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Service</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cost/mo</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Users</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Usage %</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Origin</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Renewal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((sub) => (
                      <TableRow key={sub.name} className="border-border group">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${sub.logoBg} text-xs font-bold text-primary-foreground`}>
                              {sub.logo}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{sub.name}</p>
                              <p className="text-xs text-muted-foreground">{sub.subtitle}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{sub.category}</TableCell>
                        <TableCell className="font-semibold text-foreground">{sub.cost}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{sub.users}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
                              <div className={`h-full rounded-full ${sub.usageColor}`} style={{ width: `${sub.usage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground">{sub.usage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] font-semibold uppercase">
                            {sub.origin}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{sub.renewal}</TableCell>
                      </TableRow>
                    ))}
                    {paginated.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center text-sm text-muted-foreground">
                          No subscriptions match your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Showing {filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} subscriptions
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                    disabled={safePage <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                        p === safePage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                    disabled={safePage >= totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginated.map((sub) => (
                <Card key={sub.name} className="border-border bg-card group hover:border-primary/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${sub.logoBg} text-xs font-bold text-primary-foreground`}>
                          {sub.logo}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{sub.name}</p>
                          <p className="text-xs text-muted-foreground">{sub.subtitle}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Cost/mo</p>
                        <p className="text-sm font-bold text-foreground">{sub.cost}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Users</p>
                        <p className="text-sm font-medium text-foreground">{sub.users}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Usage</p>
                        <span className="text-xs font-medium text-foreground">{sub.usage}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div className={`h-full rounded-full ${sub.usageColor}`} style={{ width: `${sub.usage}%` }} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] font-semibold uppercase">{sub.origin}</Badge>
                      <span className="text-xs text-muted-foreground">{sub.renewal}</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-[10px]">{sub.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {paginated.length === 0 && (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                No subscriptions match your search.
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Showing {filtered.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} subscriptions
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                  disabled={safePage <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                      p === safePage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage >= totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <span className="text-destructive font-bold text-lg">!</span>
                <CardTitle className="text-lg font-semibold text-foreground">Critical Alerts</CardTitle>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">View All</button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {criticalAlerts.map((alert, i) => (
                  <div key={i} className={`flex items-start gap-3 rounded-lg border border-border ${alert.borderColor} border-l-[3px] p-3.5`}>
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                      <alert.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold text-foreground">Global Origin Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {originInsights.map((item) => (
                  <div key={item.region}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <span className="text-sm text-foreground">{item.region}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.pct}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
