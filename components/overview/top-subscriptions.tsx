"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const opportunities = [
  { current: "Zoom Business ($350/mo)", alternative: "Google Meet (included)", savings: "$350/mo" },
  { current: "Jira Premium ($420/mo)", alternative: "Linear (already active)", savings: "$420/mo" },
  { current: "Asana Business ($200/mo)", alternative: "Notion (already active)", savings: "$200/mo" },
  { current: "WeTransfer Pro ($450/mo)", alternative: "Google Drive (included)", savings: "$450/mo" },
]

export function TopSubscriptions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Savings Opportunities
        </CardTitle>
        <Link
          href="/insights"
          className="text-xs font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {opportunities.map((opp, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary/30"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current</p>
                  <p className="text-sm font-semibold text-foreground">{opp.current}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Alternative</p>
                  <p className="text-sm font-semibold text-foreground">{opp.alternative}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Est. Savings</p>
                <p className="text-lg font-bold text-primary">{opp.savings}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
