"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  { name: "Slack", rating: 4.8, max: 5 },
  { name: "Figma", rating: 4.8, max: 5 },
  { name: "GitHub", rating: 4.7, max: 5 },
  { name: "HubSpot", rating: 4.5, max: 5 },
  { name: "Zoom", rating: 3.2, max: 5 },
  { name: "Jira", rating: 2.9, max: 5 },
]

export function CategoryBreakdown() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Employee Tool Satisfaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {tools.map((tool) => (
            <div key={tool.name}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium text-foreground">{tool.name}</span>
                <span className={`text-xs font-medium ${
                  tool.rating >= 4.0 ? "text-chart-2" : tool.rating >= 3.0 ? "text-chart-3" : "text-destructive"
                }`}>
                  {tool.rating} / {tool.max}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${
                    tool.rating >= 4.0 ? "bg-chart-2" : tool.rating >= 3.0 ? "bg-chart-3" : "bg-destructive"
                  }`}
                  style={{ width: `${(tool.rating / tool.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
