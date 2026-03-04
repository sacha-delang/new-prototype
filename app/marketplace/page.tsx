"use client"

import { useState, useMemo } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  marketplaceSoftware,
  marketTrends,
  allMarketplaceCategories,
  allOrigins,
} from "@/lib/marketplace-data"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { SoftwareCard } from "@/components/marketplace/software-card"
import { MarketTrends } from "@/components/marketplace/market-trends"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Sparkles, LayoutGrid } from "lucide-react"

const MAX_PRICE = 50
const ITEMS_PER_PAGE = 9

export default function MarketplacePage() {
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE])
  const [currentPage, setCurrentPage] = useState(1)
  const [showAll, setShowAll] = useState(false)

  const hasActiveFilters =
    search.length > 0 ||
    selectedCategories.length > 0 ||
    selectedOrigins.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < MAX_PRICE

  const filtered = useMemo(() => {
    let result = [...marketplaceSoftware]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.origin.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q)
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category))
    }

    if (selectedOrigins.length > 0) {
      result = result.filter((s) => selectedOrigins.includes(s.origin))
    }

    result = result.filter(
      (s) => s.priceValue >= priceRange[0] && s.priceValue <= priceRange[1]
    )

    // When no filters active and not showing all, show only featured/trending
    if (!hasActiveFilters && !showAll) {
      const featured = result.filter((s) => s.featured || s.trending)
      return featured
    }

    return result
  }, [search, selectedCategories, selectedOrigins, priceRange, hasActiveFilters, showAll])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const toggleOrigin = (origin: string) => {
    setSelectedOrigins((prev) =>
      prev.includes(origin)
        ? prev.filter((o) => o !== origin)
        : [...prev, origin]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategories([])
    setSelectedOrigins([])
    setPriceRange([0, MAX_PRICE])
    setCurrentPage(1)
    setShowAll(false)
  }

  const isFeaturedView = !hasActiveFilters && !showAll

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Software Marketplace
            </h1>
            <p className="text-sm text-muted-foreground">
              Discover, compare, and evaluate {marketplaceSoftware.length} vetted
              software tools for your organization.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isFeaturedView ? "default" : "outline"}
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => {
                setShowAll(false)
                clearFilters()
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </Button>
            <Button
              variant={showAll || hasActiveFilters ? "default" : "outline"}
              size="sm"
              className="gap-1.5 text-xs"
              onClick={() => {
                setShowAll(true)
                setCurrentPage(1)
              }}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All Tools
              <Badge variant="secondary" className="ml-0.5 h-4 px-1 text-[10px]">
                {marketplaceSoftware.length}
              </Badge>
            </Button>
          </div>
        </div>

        <MarketplaceFilters
          search={search}
          onSearchChange={(v) => {
            setSearch(v)
            setShowAll(true)
            setCurrentPage(1)
          }}
          selectedCategories={selectedCategories}
          onToggleCategory={(cat) => {
            toggleCategory(cat)
            setShowAll(true)
          }}
          allCategories={allMarketplaceCategories}
          selectedOrigins={selectedOrigins}
          onToggleOrigin={(origin) => {
            toggleOrigin(origin)
            setShowAll(true)
          }}
          allOrigins={allOrigins}
          priceRange={priceRange}
          onPriceRangeChange={(v) => {
            setPriceRange(v)
            setShowAll(true)
            setCurrentPage(1)
          }}
          maxPrice={MAX_PRICE}
          onClearFilters={clearFilters}
          resultCount={filtered.length}
        />

        {isFeaturedView && (
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Showing featured and trending tools
            </span>
            <span className="text-xs text-muted-foreground">
              ({filtered.length} of {marketplaceSoftware.length})
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((software) => (
                  <SoftwareCard key={software.id} software={software} />
                ))}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    No tools found
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try adjusting your filters or search query.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 text-xs"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  {filtered.length === 0
                    ? 0
                    : (safePage - 1) * ITEMS_PER_PAGE + 1}
                  -{Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of{" "}
                  {filtered.length} tools
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setCurrentPage(Math.max(1, safePage - 1))
                    }
                    disabled={safePage <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                          p === safePage
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, safePage + 1))
                    }
                    disabled={safePage >= totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {isFeaturedView && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAll(true)
                    setCurrentPage(1)
                  }}
                  className="gap-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                  View all {marketplaceSoftware.length} tools
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <MarketTrends trends={marketTrends} />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
