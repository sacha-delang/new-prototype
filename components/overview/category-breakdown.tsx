"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  { name: "Slack", rating: 4.8, max: 5 },
  { name: "Zoom", rating: 3.2, max: 5 },
  { name: "HubSpot", rating: 4.5, max: 5 },
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
        <div className="flex flex-col gap-5">
          {tools.map((tool) => (
            <div key={tool.name}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-foreground">{tool.name}</span>
                <span className="text-muted-foreground">{tool.rating} / {tool.max}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-foreground"
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
