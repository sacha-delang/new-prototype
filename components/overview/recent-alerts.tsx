"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Info, X } from "lucide-react"

const initialAlerts = [
  {
    id: "1",
    icon: AlertTriangle,
    iconBg: "bg-destructive/10 text-destructive",
    borderColor: "border-l-destructive",
    title: "Duplicate Subscriptions found (2)",
    description: "Two departments paying for Canva Pro separately.",
  },
  {
    id: "2",
    icon: AlertTriangle,
    iconBg: "bg-warning/10 text-warning",
    borderColor: "border-l-warning",
    title: "15% Price Hike on Slack",
    description: "Scheduled for next billing cycle on Nov 1st.",
  },
  {
    id: "3",
    icon: Info,
    iconBg: "bg-primary/10 text-primary",
    borderColor: "border-l-primary",
    title: "Unused Licenses detected",
    description: "5 users haven't logged into HubSpot for 30 days.",
  },
  {
    id: "4",
    icon: AlertTriangle,
    iconBg: "bg-warning/10 text-warning",
    borderColor: "border-l-warning",
    title: "Jira low satisfaction",
    description: "Employee rating dropped to 2.9/5 this quarter.",
  },
]

export function RecentAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const dismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Alerts & Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">All clear -- no active alerts.</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`group flex items-start gap-3 rounded-lg border border-border ${alert.borderColor} border-l-[3px] p-3.5`}
              >
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${alert.iconBg}`}>
                  <alert.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
                </div>
                <button
                  onClick={() => dismiss(alert.id)}
                  className="mt-0.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground"
                  aria-label={`Dismiss alert: ${alert.title}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
