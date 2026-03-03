"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, AlertTriangle, TrendingUp, Calendar } from "lucide-react"

type SubRow = {
  name: string
  subtitle: string
  logo: string
  logoBg: string
  category: string
  cost: string
  users: string
  usage: number
  usageColor: string
  origin: string
  originBg: string
  renewal: string
}

const subscriptionRows: SubRow[] = [
  { name: "Slack Enterprise", subtitle: "Team Communication", logo: "SL", logoBg: "bg-primary", category: "Collaboration", cost: "$450.00", users: "150/150", usage: 94, usageColor: "bg-primary", origin: "USA", originBg: "bg-secondary text-foreground", renewal: "Oct 12, 2026" },
  { name: "Asana Business", subtitle: "Project Management", logo: "AS", logoBg: "bg-chart-3", category: "Productivity", cost: "$200.00", users: "45/60", usage: 42, usageColor: "bg-chart-3", origin: "USA", originBg: "bg-secondary text-foreground", renewal: "Sep 28, 2026" },
  { name: "WeTransfer Pro", subtitle: "File Storage", logo: "WF", logoBg: "bg-chart-2", category: "Utilities", cost: "$450.00", users: "12/20", usage: 82, usageColor: "bg-chart-2", origin: "NETHERLANDS", originBg: "bg-secondary text-foreground", renewal: "Nov 05, 2026" },
  { name: "Adobe Creative Cloud", subtitle: "Design Suite", logo: "AD", logoBg: "bg-destructive", category: "Creative", cost: "$2,890.00", users: "80/100", usage: 68, usageColor: "bg-chart-2", origin: "USA", originBg: "bg-secondary text-foreground", renewal: "Jan 20, 2026" },
  { name: "Alibaba Cloud", subtitle: "Infrastructure", logo: "AL", logoBg: "bg-chart-3", category: "Cloud IT", cost: "$1,200.00", users: "Unlimited", usage: 89, usageColor: "bg-chart-4", origin: "CHINA", originBg: "bg-secondary text-foreground", renewal: "Dec 15, 2026" },
]

const criticalAlerts = [
  { icon: CreditCardIcon, title: "Unused Asana Seats (15)", description: "Estimated $300/mo waste identified based on last 30 days activity.", borderColor: "border-l-muted-foreground" },
  { icon: CalendarIcon, title: "Upcoming Renewal: Notion", description: "Renewal scheduled for Sep 30th. Check seat counts before auto-pay.", borderColor: "border-l-chart-3" },
]

function CreditCardIcon({ className }: { className?: string }) {
  return <AlertTriangle className={className} />
}
function CalendarIcon({ className }: { className?: string }) {
  return <Calendar className={className} />
}

const originInsights = [
  { region: "North America", pct: "64%", color: "bg-foreground" },
  { region: "Europe", pct: "22%", color: "bg-chart-2" },
  { region: "Asia/China", pct: "14%", color: "bg-chart-3" },
]

export default function SubscriptionsPage() {
  const [view, setView] = useState<"list" | "grid">("list")
  const [search, setSearch] = useState("")

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Active Subscriptions</h1>
            <p className="text-sm text-muted-foreground">
              Manage and monitor 24 active software stacks across your organization.
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
            <Button variant="outline" className="gap-2 text-sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filter Category
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tools, employees, or alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full border-border bg-card pl-9 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

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
                  {subscriptionRows.map((sub) => (
                    <TableRow key={sub.name} className="border-border">
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
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-xs text-muted-foreground">Showing 1-10 of 24 subscriptions</p>
              <div className="flex items-center gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium">1</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md text-sm text-muted-foreground hover:bg-secondary">2</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md text-sm text-muted-foreground hover:bg-secondary">3</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <div key={item.region} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-sm text-foreground">{item.region}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.pct}</span>
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
