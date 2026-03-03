"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    label: "TOTAL MONTHLY COST",
    value: "$4,285.50",
    href: "/subscriptions",
    extra: (
      <Badge className="bg-destructive/10 text-destructive text-[10px] font-semibold px-1.5 py-0.5 leading-none">
        +2.4% <span className="font-normal">vs last mo</span>
      </Badge>
    ),
  },
  {
    label: "ACTIVE TOOLS",
    value: "32",
    href: "/subscriptions",
    extra: (
      <span className="text-xs text-primary">2 Cancelled from last month</span>
    ),
  },
  {
    label: "POTENTIAL SAVINGS",
    value: "$3,400",
    href: "/insights",
    extra: (
      <Badge className="bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5 leading-none">
        OPTIMIZABLE
      </Badge>
    ),
  },
  {
    label: "UNUSED LICENSES",
    value: "14",
    href: "/insights",
    extra: (
      <span className="text-xs font-medium text-destructive">ACTION NEEDED</span>
    ),
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href}>
          <Card className="border-border bg-card transition-colors hover:border-primary/30 cursor-pointer">
            <CardContent className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.extra}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
