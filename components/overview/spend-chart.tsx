"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"

// ── real subscription data (mirrors subscriptions page) ──────────────
const subscriptions = [
  { name: "Slack Enterprise", category: "Collaboration", cost: 450 },
  { name: "Zoom Business", category: "Collaboration", cost: 350 },
  { name: "Miro Enterprise", category: "Collaboration", cost: 280 },
  { name: "Asana Business", category: "Productivity", cost: 200 },
  { name: "Notion Team", category: "Productivity", cost: 240 },
  { name: "HubSpot CRM", category: "Productivity", cost: 890 },
  { name: "Salesforce CRM", category: "Productivity", cost: 1650 },
  { name: "Intercom", category: "Productivity", cost: 420 },
  { name: "GitHub Enterprise", category: "Development", cost: 525 },
  { name: "Datadog Pro", category: "Development", cost: 380 },
  { name: "Jira Premium", category: "Development", cost: 420 },
  { name: "Linear", category: "Development", cost: 160 },
  { name: "Adobe Creative Cloud", category: "Creative", cost: 2890 },
  { name: "Figma Organization", category: "Creative", cost: 180 },
  { name: "OpenAI API", category: "AI/ML", cost: 820 },
  { name: "Anthropic API", category: "AI/ML", cost: 650 },
  { name: "Snowflake", category: "AI/ML", cost: 1100 },
  { name: "AWS", category: "Cloud IT", cost: 2450 },
  { name: "Alibaba Cloud", category: "Cloud IT", cost: 1200 },
  { name: "WeTransfer Pro", category: "Utilities", cost: 450 },
  { name: "SAP Concur", category: "Utilities", cost: 320 },
  { name: "CrowdStrike Falcon", category: "Security", cost: 560 },
  { name: "Cloudflare Enterprise", category: "Security", cost: 750 },
  { name: "1Password Business", category: "Security", cost: 200 },
]

const TOOL_COLORS = [
  "oklch(0.55 0.15 260)",  // indigo
  "oklch(0.60 0.16 145)",  // green
  "oklch(0.70 0.17 55)",   // amber
  "oklch(0.58 0.22 27)",   // red-orange
  "oklch(0.65 0.14 200)",  // teal
  "oklch(0.52 0.18 300)",  // purple
  "oklch(0.72 0.12 80)",   // yellow-green
  "oklch(0.50 0.16 230)",  // blue-grey
]

type ToolEntry = { name: string; cost: number; color: string }
type ChartRow = { category: string; total: number; tools: ToolEntry[]; [key: string]: unknown }

export function SpendChart() {
  const { chartData, allToolKeys } = useMemo(() => {
    // group by category
    const grouped: Record<string, { name: string; cost: number }[]> = {}
    for (const s of subscriptions) {
      if (!grouped[s.category]) grouped[s.category] = []
      grouped[s.category].push({ name: s.name, cost: s.cost })
    }

    // assign a unique colour index to every tool across all categories
    let colorIdx = 0
    const toolColorMap: Record<string, string> = {}
    const keys: string[] = []

    const rows: ChartRow[] = Object.entries(grouped)
      .sort(([, a], [, b]) => {
        const totalA = a.reduce((s, t) => s + t.cost, 0)
        const totalB = b.reduce((s, t) => s + t.cost, 0)
        return totalA - totalB
      })
      .map(([cat, tools]) => {
        const row: ChartRow = {
          category: cat,
          total: tools.reduce((s, t) => s + t.cost, 0),
          tools: [],
        }
        // sort tools within category by cost descending so biggest slice is at bottom
        const sorted = [...tools].sort((a, b) => b.cost - a.cost)
        for (const t of sorted) {
          const key = t.name.replace(/\s+/g, "_")
          if (!toolColorMap[key]) {
            toolColorMap[key] = TOOL_COLORS[colorIdx % TOOL_COLORS.length]
            colorIdx++
          }
          if (!keys.includes(key)) keys.push(key)
          row[key] = t.cost
          ;(row.tools as ToolEntry[]).push({ name: t.name, cost: t.cost, color: toolColorMap[key] })
        }
        return row
      })

    return { chartData: rows, allToolKeys: keys, toolColorMap }
  }, [])

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Software Expenses by Category
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Monthly cost breakdown across {subscriptions.length} active subscriptions
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 28, right: 10, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="category"
                className="fill-muted-foreground"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                className="fill-muted-foreground"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", opacity: 0.25 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const row = payload[0]?.payload as ChartRow
                  return (
                    <div
                      className="rounded-lg border border-border bg-card p-3 shadow-lg"
                      style={{ minWidth: 200 }}
                    >
                      <p className="mb-2 text-xs font-semibold text-foreground">{row.category}</p>
                      <div className="flex flex-col gap-1.5">
                        {row.tools.map((t) => (
                          <div key={t.name} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <span
                                className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                                style={{ backgroundColor: t.color }}
                              />
                              <span className="text-xs text-muted-foreground">{t.name}</span>
                            </div>
                            <span className="text-xs font-medium text-foreground tabular-nums">
                              ${t.cost.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 border-t border-border pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-muted-foreground">Total</span>
                        <span className="text-xs font-bold text-foreground tabular-nums">
                          ${row.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                }}
              />
              {allToolKeys.map((key, i) => {
                const isLast = i === allToolKeys.length - 1
                const color = TOOL_COLORS[i % TOOL_COLORS.length]
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="stack"
                    radius={isLast ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    fill={color}
                  >
                    {/* Cell-level fill isn't needed — each Bar key already has a unique color */}
                  </Bar>
                )
              })}
              {/* Total label on the last (topmost) stacked bar */}
              {allToolKeys.length > 0 && (
                <Bar dataKey={() => 0} stackId="stack" fill="transparent" isAnimationActive={false}>
                  <LabelList
                    dataKey="total"
                    position="top"
                    formatter={(v: number) => `$${(v / 1000).toFixed(1)}k`}
                    className="fill-muted-foreground"
                    fontSize={11}
                    fontWeight={600}
                  />
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
