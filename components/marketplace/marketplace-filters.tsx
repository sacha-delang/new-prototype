"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Search, SlidersHorizontal, MapPin, X } from "lucide-react"

type MarketplaceFiltersProps = {
  search: string
  onSearchChange: (v: string) => void
  selectedCategories: string[]
  onToggleCategory: (cat: string) => void
  allCategories: string[]
  selectedOrigins: string[]
  onToggleOrigin: (origin: string) => void
  allOrigins: string[]
  priceRange: [number, number]
  onPriceRangeChange: (v: [number, number]) => void
  maxPrice: number
  onClearFilters: () => void
  resultCount: number
}

export function MarketplaceFilters({
  search,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  allCategories,
  selectedOrigins,
  onToggleOrigin,
  allOrigins,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  onClearFilters,
  resultCount,
}: MarketplaceFiltersProps) {
  const hasActiveFilters =
    search.length > 0 ||
    selectedCategories.length > 0 ||
    selectedOrigins.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search software by name, category, or origin..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full border-border bg-card pl-9 text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                Category
                {selectedCategories.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 px-1.5 text-[10px]"
                  >
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {allCategories.map((cat) => (
                <DropdownMenuCheckboxItem
                  key={cat}
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => onToggleCategory(cat)}
                >
                  {cat}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                Origin
                {selectedOrigins.length > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 px-1.5 text-[10px]"
                  >
                    {selectedOrigins.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {allOrigins.map((origin) => (
                <DropdownMenuCheckboxItem
                  key={origin}
                  checked={selectedOrigins.includes(origin)}
                  onCheckedChange={() => onToggleOrigin(origin)}
                >
                  {origin}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Price Range
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-foreground">
              ${priceRange[0]}
            </span>
            <Slider
              value={priceRange}
              onValueChange={(v) =>
                onPriceRangeChange(v as [number, number])
              }
              min={0}
              max={maxPrice}
              step={1}
              className="w-48"
            />
            <span className="text-xs font-medium text-foreground">
              ${priceRange[1]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {resultCount} tools found
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-7 gap-1 text-xs text-muted-foreground"
            >
              <X className="h-3 w-3" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedOrigins.length > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {selectedCategories.map((cat) => (
            <Badge
              key={cat}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1.5 text-xs"
              onClick={() => onToggleCategory(cat)}
            >
              {cat}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {selectedOrigins.map((origin) => (
            <Badge
              key={origin}
              variant="secondary"
              className="cursor-pointer gap-1 pr-1.5 text-xs"
              onClick={() => onToggleOrigin(origin)}
            >
              {origin}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
