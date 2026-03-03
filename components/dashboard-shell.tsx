"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Search, Bell, Sun, Moon, CreditCard, TrendingUp, Users, LayoutDashboard, Settings, AlertTriangle, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const initialNotifications = [
  { id: "1", title: "Auto-renewal approaching", description: "Salesforce renewal in 4 days", read: false, time: "2h ago" },
  { id: "2", title: "Price hike detected", description: "Slack increasing 15% next cycle", read: false, time: "5h ago" },
  { id: "3", title: "Unused seats alert", description: "15 Asana seats inactive for 30 days", read: false, time: "1d ago" },
  { id: "4", title: "Optimization applied", description: "Zoom licenses reduced from 90 to 76", read: true, time: "2d ago" },
  { id: "5", title: "New survey responses", description: "12 new employee responses for Jira", read: true, time: "3d ago" },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setCommandOpen(false)
    command()
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
          <button
            onClick={() => setCommandOpen(true)}
            className="flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search tools, employees, or alerts...</span>
            <kbd className="pointer-events-none hidden h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              <span className="text-xs">{"⌘"}</span>K
            </kbd>
          </button>
          <div className="flex items-center gap-3 ml-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-[18px] w-[18px]" />
                ) : (
                  <Moon className="h-[18px] w-[18px]" />
                )}
              </button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <Bell className="h-[18px] w-[18px]" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-secondary/50 cursor-pointer ${
                          !n.read ? "bg-primary/5" : ""
                        }`}
                        onClick={() => markRead(n.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!n.read && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                            <p className={`text-sm truncate ${!n.read ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>
                              {n.title}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.description}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(n.id)
                          }}
                          className="mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <DropdownMenuSeparator />
                <button
                  onClick={() => router.push("/insights")}
                  className="flex w-full items-center justify-center py-2.5 text-xs font-medium text-primary hover:underline"
                >
                  View all alerts
                </button>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">Alex Rivera</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                AR
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search tools, pages, alerts..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/subscriptions"))}>
              <CreditCard className="mr-2 h-4 w-4" />
              Subscriptions
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/insights"))}>
              <TrendingUp className="mr-2 h-4 w-4" />
              Insights
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/employees"))}>
              <Users className="mr-2 h-4 w-4" />
              Employees
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Subscriptions">
            {["AWS", "Slack", "Google Workspace", "Microsoft 365", "OpenAI API", "GitHub Enterprise", "Figma", "Notion", "Datadog", "Jira", "Zoom", "HubSpot"].map((name) => (
              <CommandItem key={name} onSelect={() => runCommand(() => router.push("/subscriptions"))}>
                <CreditCard className="mr-2 h-4 w-4" />
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Alerts">
            <CommandItem onSelect={() => runCommand(() => router.push("/insights"))}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Auto-renewal approaching - Salesforce
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/insights"))}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Price hike on Slack - 15% increase
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/insights"))}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Unused Asana seats (15)
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/insights"))}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Duplicate subscriptions found
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              Toggle {theme === "dark" ? "Light" : "Dark"} Mode
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}
