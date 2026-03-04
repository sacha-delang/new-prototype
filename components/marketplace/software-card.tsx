"use client"

import { useState } from "react"
import { type MarketplaceSoftware } from "@/lib/marketplace-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Zap,
  Cloud,
  Users,
  Lock,
  Cpu,
  BarChart3,
  Layers,
  Globe,
  Code,
  Palette,
  MessageCircle,
  Database,
  RefreshCw,
  Eye,
  Star,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"

const featureIcons = {
  shield: Shield,
  zap: Zap,
  cloud: Cloud,
  users: Users,
  lock: Lock,
  cpu: Cpu,
  "bar-chart": BarChart3,
  layers: Layers,
  globe: Globe,
  code: Code,
  palette: Palette,
  "message-circle": MessageCircle,
  database: Database,
  "refresh-cw": RefreshCw,
  eye: Eye,
} as const

const flagMap: Record<string, string> = {
  US: "\u{1F1FA}\u{1F1F8}",
  CA: "\u{1F1E8}\u{1F1E6}",
  NL: "\u{1F1F3}\u{1F1F1}",
  DE: "\u{1F1E9}\u{1F1EA}",
  AU: "\u{1F1E6}\u{1F1FA}",
  CN: "\u{1F1E8}\u{1F1F3}",
  IE: "\u{1F1EE}\u{1F1EA}",
}

export function SoftwareCard({ software }: { software: MarketplaceSoftware }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card className="group relative border-border bg-card transition-all hover:border-primary/30 hover:shadow-sm">
        {software.trending && (
          <div className="absolute -top-2.5 right-3">
            <Badge className="bg-chart-2 text-chart-2-foreground gap-1 text-[10px] font-semibold shadow-sm">
              <TrendingUp className="h-3 w-3" />
              Trending
            </Badge>
          </div>
        )}
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${software.logoBg} text-xs font-bold text-primary-foreground`}
              >
                {software.logo}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {software.name}
                </h3>
                <p className="text-xs text-muted-foreground">{software.tagline}</p>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {flagMap[software.originFlag] || ""} {software.origin}
            </span>
            <span className="text-muted-foreground/40">|</span>
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold uppercase"
            >
              {software.category}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            {software.features.map((feature) => {
              const Icon = featureIcons[feature.icon]
              return (
                <div key={feature.label} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-foreground">{feature.label}</span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <div>
              <p className="text-sm font-bold text-foreground">
                {software.priceLabel.replace("Starting at ", "")}
              </p>
              <p className="text-[10px] text-muted-foreground">starting price</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-chart-3 text-chart-3" />
              <span className="text-xs font-semibold text-foreground">
                {software.rating}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({software.reviews.toLocaleString()})
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs font-semibold"
            onClick={() => setOpen(true)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${software.logoBg} text-sm font-bold text-primary-foreground`}
              >
                {software.logo}
              </div>
              <div>
                <DialogTitle className="text-lg">{software.name}</DialogTitle>
                <DialogDescription>{software.tagline}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs font-semibold">
              {software.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {flagMap[software.originFlag] || ""} {software.origin}
            </Badge>
            {software.trending && (
              <Badge className="bg-chart-2 text-chart-2-foreground gap-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Key Features
            </h4>
            <div className="flex flex-col gap-2.5">
              {software.features.map((feature) => {
                const Icon = featureIcons[feature.icon]
                return (
                  <div key={feature.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-chart-2" />
                      <span className="text-sm text-foreground">
                        {feature.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Pricing
              </p>
              <p className="text-lg font-bold text-foreground">
                {software.priceLabel.replace("Starting at ", "")}
              </p>
              <p className="text-xs text-muted-foreground">starting price</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Rating
              </p>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-chart-3 text-chart-3" />
                <span className="text-lg font-bold text-foreground">
                  {software.rating}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {software.reviews.toLocaleString()} reviews
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button className="flex-1 text-sm font-semibold">
              Request Demo
            </Button>
            <Button variant="outline" className="flex-1 gap-1.5 text-sm">
              <ExternalLink className="h-3.5 w-3.5" />
              Visit Website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
