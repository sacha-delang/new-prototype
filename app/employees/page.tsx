"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { sentimentData, type SentimentEntry } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Star, Send, ArrowUpDown } from "lucide-react"

export default function EmployeesPage() {
  const [sortBy, setSortBy] = useState<"name" | "rating">("rating")
  const [selectedSub, setSelectedSub] = useState<SentimentEntry | null>(null)

  const sorted = [...sentimentData].sort((a, b) =>
    sortBy === "rating" ? a.avgRating - b.avgRating : a.subscriptionName.localeCompare(b.subscriptionName)
  )

  const chartData = sorted.map((s) => ({
    name: s.subscriptionName,
    rating: s.avgRating,
    usage: s.usageRating,
    satisfaction: s.satisfactionRating,
  }))

  const avgOverall = (sentimentData.reduce((sum, s) => sum + s.avgRating, 0) / sentimentData.length).toFixed(1)
  const lowestRated = [...sentimentData].sort((a, b) => a.avgRating - b.avgRating)[0]
  const highestRated = [...sentimentData].sort((a, b) => b.avgRating - a.avgRating)[0]
  const totalResponses = sentimentData.reduce((sum, s) => sum + s.totalResponses, 0)

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Employee Sentiment</h1>
            <p className="text-sm text-muted-foreground">
              Employee satisfaction ratings for each subscription.
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="mr-2 h-4 w-4" />
            Send Survey
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">Overall Avg.</p>
              <div className="mt-1 flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-2xl font-bold text-foreground">{avgOverall}</span>
                <span className="text-sm text-muted-foreground">/5</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">Total Responses</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{totalResponses}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">Highest Rated</p>
              <p className="mt-1 text-lg font-semibold text-primary">{highestRated.subscriptionName}</p>
              <p className="text-xs text-muted-foreground">{highestRated.avgRating}/5</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground">Lowest Rated</p>
              <p className="mt-1 text-lg font-semibold text-destructive">{lowestRated.subscriptionName}</p>
              <p className="text-xs text-muted-foreground">{lowestRated.avgRating}/5</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-foreground">
              Sentiment Scores by Tool
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Average employee rating per subscription (ascending)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    className="fill-muted-foreground"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    className="fill-muted-foreground"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={110}
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
                  <Bar dataKey="rating" radius={[0, 4, 4, 0]} barSize={20}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.rating >= 4.0
                            ? "var(--chart-2)"
                            : entry.rating >= 3.0
                            ? "var(--chart-3)"
                            : "var(--chart-4)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-foreground">
                  Detailed Ratings
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setSortBy(sortBy === "rating" ? "name" : "rating")}
                >
                  <ArrowUpDown className="mr-1 h-3 w-3" />
                  Sort by {sortBy === "rating" ? "name" : "rating"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {sorted.map((entry) => (
                  <button
                    key={entry.subscriptionId}
                    onClick={() => setSelectedSub(entry)}
                    className={`flex items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                      selectedSub?.subscriptionId === entry.subscriptionId
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {entry.subscriptionName}
                        </span>
                        {entry.avgRating < 3.0 && (
                          <Badge variant="destructive" className="text-xs">
                            Low
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {entry.totalResponses} responses
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star
                        className={`h-4 w-4 ${
                          entry.avgRating >= 4.0
                            ? "fill-primary text-primary"
                            : entry.avgRating >= 3.0
                            ? "fill-warning text-warning"
                            : "fill-destructive text-destructive"
                        }`}
                      />
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {entry.avgRating.toFixed(1)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-foreground">
                {selectedSub ? `${selectedSub.subscriptionName} - Feature Breakdown` : "Select a Subscription"}
              </CardTitle>
              {selectedSub && (
                <p className="text-xs text-muted-foreground">
                  Based on {selectedSub.totalResponses} employee responses
                </p>
              )}
            </CardHeader>
            <CardContent>
              {selectedSub ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Usage Frequency</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-lg font-semibold text-foreground">
                          {selectedSub.usageRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-md border border-border p-3">
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-lg font-semibold text-foreground">
                          {selectedSub.satisfactionRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-foreground">Features</p>
                    {selectedSub.features.map((feature) => (
                      <div key={feature.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{feature.name}</span>
                          <span className="font-mono text-xs text-foreground">
                            {feature.rating.toFixed(1)}/5
                          </span>
                        </div>
                        <Progress
                          value={feature.rating * 20}
                          className="mt-1.5 h-1.5 bg-secondary [&>div]:bg-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                  Click on a subscription to see feature-level ratings
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
