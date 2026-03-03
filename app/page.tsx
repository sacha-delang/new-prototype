"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { StatsCards } from "@/components/overview/stats-cards"
import { SpendChart } from "@/components/overview/spend-chart"
import { CategoryBreakdown } from "@/components/overview/category-breakdown"
import { RecentAlerts } from "@/components/overview/recent-alerts"
import { TopSubscriptions } from "@/components/overview/top-subscriptions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const activeServices = [
  { name: "Slack", logo: "S", logoBg: "bg-primary", category: "Communication", cost: "$50.00", renewal: "Oct 12, 2023", status: "PRICE HIKE EXPECTED", statusColor: "text-destructive bg-destructive/10" },
  { name: "OpenAI", logo: "O", logoBg: "bg-chart-3", category: "AI Services", cost: "$759.00", renewal: "Oct 28, 2023", status: "RENEWING SOON", statusColor: "text-primary bg-primary/10" },
  { name: "AWS", logo: "A", logoBg: "bg-chart-5", category: "Infrastructure", cost: "$800.00", renewal: "Oct 30, 2023", status: "STABLE", statusColor: "text-foreground bg-secondary" },
]

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subscriptions in Use</h1>
          <p className="text-sm text-muted-foreground">
            {"Manage and track your organization's active SaaS portfolio."}
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SpendChart />
          </div>
          <div className="flex flex-col gap-6">
            <RecentAlerts />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopSubscriptions />
          </div>
          <div className="flex flex-col gap-6">
            <CategoryBreakdown />
            <Card className="border-border bg-card overflow-hidden">
              <CardContent className="flex items-center justify-center p-8">
                <p className="text-lg font-semibold text-primary text-center leading-relaxed">
                  Request<br />personal consultation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              Active Cloud & AI Services
            </CardTitle>
            <Link
              href="/subscriptions"
              className="text-xs font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Service</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Monthly Cost</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Next Renewal</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status/Alert</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeServices.map((service) => (
                  <TableRow key={service.name} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${service.logoBg} text-xs font-bold text-primary-foreground`}>
                          {service.logo}
                        </div>
                        <span className="font-medium text-foreground">{service.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{service.category}</TableCell>
                    <TableCell className="font-mono text-sm text-foreground">{service.cost}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{service.renewal}</TableCell>
                    <TableCell>
                      <Badge className={`text-[10px] font-semibold ${service.statusColor}`}>
                        {service.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
