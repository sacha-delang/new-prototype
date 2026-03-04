"use client"

import { type MarketTrend } from "@/lib/marketplace-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"

export function MarketTrends({ trends }: { trends: MarketTrend[] }) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground">
          Market Trends
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Real-time migration patterns across your industry
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/20"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-foreground">
                {trend.fromTool}
              </span>
              <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="text-xs font-semibold text-primary">
                {trend.toTool}
              </span>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5">
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3 text-chart-2" />
              ) : (
                <TrendingDown className="h-3 w-3 text-chart-3" />
              )}
              <span
                className={`text-sm font-bold ${
                  trend.direction === "up"
                    ? "text-chart-2"
                    : "text-chart-3"
                }`}
              >
                {trend.percentage}%
              </span>
              <span className="text-[10px] text-muted-foreground">
                of users switching
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {trend.description}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {trend.timeframe}
              </span>
              <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full transition-all ${
                    trend.direction === "up" ? "bg-chart-2" : "bg-chart-3"
                  }`}
                  style={{ width: `${Math.min(trend.percentage * 3, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
