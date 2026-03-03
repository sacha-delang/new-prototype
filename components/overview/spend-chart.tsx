"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { name: "CRM", toolA: 200, toolB: 120, toolC: 80 },
  { name: "Marketing", toolA: 180, toolB: 150, toolC: 100 },
  { name: "Content & Social", toolA: 250, toolB: 200, toolC: 120 },
  { name: "SEO & SEM", toolA: 300, toolB: 180, toolC: 80 },
  { name: "Analytics", toolA: 280, toolB: 220, toolC: 100 },
  { name: "Management", toolA: 320, toolB: 150, toolC: 90 },
  { name: "Design", toolA: 260, toolB: 200, toolC: 110 },
  { name: "Advertising", toolA: 340, toolB: 180, toolC: 70 },
  { name: "Finance", toolA: 220, toolB: 160, toolC: 90 },
]

export function SpendChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Marketing Software Expenses
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Estimated monthly expenses by category and tool
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="name"
                className="fill-muted-foreground"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis
                className="fill-muted-foreground"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--card-foreground)",
                  fontSize: 12,
                }}
                formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name === "toolA" ? "Tool A" : name === "toolB" ? "Tool B" : "Tool C"]}
                labelFormatter={(label) => label}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                formatter={(value) => value === "toolA" ? "Tool A" : value === "toolB" ? "Tool B" : "Tool C"}
                wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
              />
              <Bar dataKey="toolA" stackId="a" fill="var(--chart-1)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="toolB" stackId="a" fill="var(--chart-3)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="toolC" stackId="a" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
