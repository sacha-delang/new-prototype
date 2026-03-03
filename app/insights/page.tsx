"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Monitor, CheckCircle, TrendingUp, Lightbulb, AlertTriangle, Info, ArrowUp } from "lucide-react"

const spendingData = [
  { month: "Jan", withoutSavings: 100, withSavings: 120 },
  { month: "Feb", withoutSavings: 98, withSavings: 130 },
  { month: "Mar", withoutSavings: 115, withSavings: 140 },
  { month: "Apr", withoutSavings: 120, withSavings: 148 },
  { month: "May", withoutSavings: 140, withSavings: 155 },
  { month: "Jun", withoutSavings: 145, withSavings: 160 },
  { month: "Jul", withoutSavings: 150, withSavings: 168 },
  { month: "Aug", withoutSavings: 160, withSavings: 175 },
  { month: "Sep", withoutSavings: 170, withSavings: 180 },
  { month: "Oct", withoutSavings: 180, withSavings: 188 },
  { month: "Nov", withoutSavings: 200, withSavings: 195 },
  { month: "Dec", withoutSavings: 195, withSavings: 200 },
]

const optimizationTips = [
  {
    icon: "zoom",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Cancel unused Zoom licenses",
    description: "14 licenses have had no activity for 30+ days.",
    savings: "EST. SAVINGS: $280/mo",
    action: "Apply",
    actionColor: "bg-primary text-primary-foreground",
  },
  {
    icon: "slack",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    title: "Switch Slack to Annual",
    description: "Save 15% by moving to annual billing for 142 seats.",
    savings: "EST. SAVINGS: $240/yr",
    action: "Learn More",
    actionColor: "bg-primary text-primary-foreground",
  },
  {
    icon: "canva",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    title: "Consolidate Canva Seats",
    description: "Marketing & Design have separate team billing plans.",
    savings: "EST. SAVINGS: $45/mo",
    action: "Merge",
    actionColor: "bg-primary text-primary-foreground",
  },
  {
    icon: "hubspot",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    title: "Downgrade HubSpot Tier",
    description: "Sales Hub Enterprise features underutilized vs Professional.",
    savings: "EST. SAVINGS: $200/yr",
    action: "Review",
    actionColor: "bg-primary text-primary-foreground",
  },
]

const priorityAlerts = [
  {
    icon: AlertTriangle,
    iconColor: "text-destructive",
    title: "Auto-renewal approaching",
    description: "Salesforce renewal in 4 days. Contact CSM for renegotiation.",
  },
  {
    icon: ArrowUp,
    iconColor: "text-warning",
    title: "Unused Seat Overflow",
    description: "Github Enterprise seats at 92% capacity. 8 seats remaining.",
  },
  {
    icon: Info,
    iconColor: "text-primary",
    title: "Price Hike Alert",
    description: "aigma announced 10% price increase for Business plan starting Dec 1st.",
  },
]

export default function InsightsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subscription Savings Overview</h1>
          <p className="text-sm text-muted-foreground">
            Track your cost optimization progress and potential savings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="flex items-start justify-between p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Subscription Spend
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">$4,285.50</p>
              </div>
              <Monitor className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Total Savings Achieved
                </p>
                <CheckCircle className="h-5 w-5 text-chart-2" />
              </div>
              <p className="mt-2 text-2xl font-bold text-chart-2">$1,140.50</p>
              <p className="text-xs text-muted-foreground">from license optimizations</p>
              <p className="text-xs text-chart-2 font-medium">~12%</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Annual Run Rate
                </p>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">$16,049</p>
              <p className="text-xs text-muted-foreground">projected annual spend</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Potential Savings
                </p>
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold text-primary">$500.00</p>
              <p className="text-xs text-muted-foreground">available optimization today</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Projected vs. Current Spending
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Visualization of savings realized through Tool4Tooling
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <span className="text-xs text-muted-foreground">Without Savings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">{"Current (With Savings)"}</span>
                </div>
                <Badge variant="outline" className="text-xs">Last 12 Months</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    className="fill-muted-foreground"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    className="fill-muted-foreground"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--card-foreground)",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, paddingBottom: 10, color: "var(--muted-foreground)" }}
                    formatter={(value) => value === "withSavings" ? "Blue Line" : "Red Line"}
                  />
                  <Line type="monotone" dataKey="withSavings" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 4, fill: "var(--chart-1)" }} />
                  <Line type="monotone" dataKey="withoutSavings" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 4, fill: "var(--chart-3)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Optimization Tips & Suggestions</h2>
              <button className="text-sm font-medium text-primary hover:underline">View All Tips</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {optimizationTips.map((tip, i) => (
                <Card key={i} className="border-border bg-primary/5">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${tip.iconBg}`}>
                        <span className={`text-xs font-bold ${tip.iconColor}`}>
                          {tip.icon[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{tip.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{tip.savings}</p>
                      <Button size="sm" className={`h-7 text-xs ${tip.actionColor}`}>
                        {tip.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">Priority Alerts</h2>
            {priorityAlerts.map((alert, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="flex items-start gap-3 p-4">
                  <alert.icon className={`mt-0.5 h-4 w-4 shrink-0 ${alert.iconColor}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-none bg-foreground text-card overflow-hidden">
              <CardContent className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-card/70">Quarterly Outlook</p>
                <p className="mt-2 text-xl font-bold text-card leading-tight">
                  On track to save<br />$50 more
                </p>
                <div className="mt-4">
                  <Progress value={65} className="h-2 bg-card/20 [&>div]:bg-primary" />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-card/70">
                  <span>$2,200 achieved</span>
                  <span>65% of target</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
