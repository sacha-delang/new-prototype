"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Copy, Info } from "lucide-react"

const alertItems = [
  {
    icon: AlertTriangle,
    iconBg: "bg-destructive/10 text-destructive",
    borderColor: "border-l-destructive",
    title: "Duplicate Subscriptions found (2)",
    description: "Two departments paying for Canva Pro separately.",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-warning/10 text-warning",
    borderColor: "border-l-warning",
    title: "15% Price Hike on Slack",
    description: "Scheduled for next billing cycle on Nov 1st.",
  },
  {
    icon: Info,
    iconBg: "bg-primary/10 text-primary",
    borderColor: "border-l-primary",
    title: "Unused Licenses detected",
    description: "5 users haven't logged into HubSpot for 30 days.",
  },
]

export function RecentAlerts() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Alerts & Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {alertItems.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-lg border border-border ${alert.borderColor} border-l-[3px] p-3.5`}
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${alert.iconBg}`}>
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
  )
}
