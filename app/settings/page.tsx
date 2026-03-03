"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { User, Bell, CreditCard, Palette, Shield, Save } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    email: "alex.rivera@company.com",
    role: "Admin",
    department: "Engineering",
    phone: "+1 (555) 123-4567",
  })
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    inAppAlerts: true,
    slackAlerts: false,
    renewalReminders: true,
    priceHikeAlerts: true,
    unusedLicenseAlerts: true,
    weeklyDigest: true,
    monthlyReport: false,
  })
  const [defaultView, setDefaultView] = useState("list")
  const [currency, setCurrency] = useState("usd")

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully")
  }

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved")
  }

  const handleSavePreferences = () => {
    toast.success("Preferences saved")
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account, notifications, and application preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="gap-6">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="profile" className="gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5">
              <Bell className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-1.5">
              <Palette className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-5 max-w-lg">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      AR
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">{profile.name}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">{profile.role}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-foreground">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="department" className="text-foreground">Department</Label>
                      <Input
                        id="department"
                        value={profile.department}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone" className="text-foreground">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Role</Label>
                    <Input value={profile.role} disabled className="bg-muted text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Contact your organization admin to change roles.</p>
                  </div>
                  <Button onClick={handleSaveProfile} className="w-fit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you receive alerts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6 max-w-lg">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-4">Delivery Channels</p>
                    <div className="flex flex-col gap-4">
                      {[
                        { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive alerts via email" },
                        { key: "inAppAlerts" as const, label: "In-App Notifications", desc: "Show notifications in the dashboard" },
                        { key: "slackAlerts" as const, label: "Slack Notifications", desc: "Forward alerts to your Slack channel" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <Switch
                            checked={notifSettings[item.key]}
                            onCheckedChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-foreground mb-4">Alert Types</p>
                    <div className="flex flex-col gap-4">
                      {[
                        { key: "renewalReminders" as const, label: "Renewal Reminders", desc: "Get notified before subscription renewals" },
                        { key: "priceHikeAlerts" as const, label: "Price Hike Alerts", desc: "Alert when a vendor announces price increases" },
                        { key: "unusedLicenseAlerts" as const, label: "Unused License Alerts", desc: "Notify when licenses have low activity" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <Switch
                            checked={notifSettings[item.key]}
                            onCheckedChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-foreground mb-4">Reports</p>
                    <div className="flex flex-col gap-4">
                      {[
                        { key: "weeklyDigest" as const, label: "Weekly Digest", desc: "Summary of key metrics every Monday" },
                        { key: "monthlyReport" as const, label: "Monthly Report", desc: "Detailed cost and savings report" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <Switch
                            checked={notifSettings[item.key]}
                            onCheckedChange={(v) => setNotifSettings({ ...notifSettings, [item.key]: v })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSaveNotifications} className="w-fit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="flex flex-col gap-6 max-w-lg">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Current Plan</CardTitle>
                  <CardDescription>Your organization's subscription details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="text-lg font-semibold text-foreground">Business Pro</p>
                        <p className="text-sm text-muted-foreground">Up to 100 tracked subscriptions</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs text-muted-foreground">Monthly Cost</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">$49/mo</p>
                      </div>
                      <div className="rounded-md border border-border p-3">
                        <p className="text-xs text-muted-foreground">Next Billing</p>
                        <p className="mt-1 text-lg font-semibold text-foreground">Apr 1, 2026</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-fit" onClick={() => toast.info("Plan management coming soon")}>
                      Manage Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Payment Method</CardTitle>
                  <CardDescription>Your default payment method for Tool4Tooling.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <div className="flex h-10 w-14 items-center justify-center rounded-md bg-secondary text-xs font-bold text-foreground">
                        VISA
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Default</Badge>
                    </div>
                    <Button variant="outline" className="w-fit" onClick={() => toast.info("Payment management coming soon")}>
                      Update Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Team Members</CardTitle>
                  <CardDescription>Users with access to this dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Alex Rivera", email: "alex.rivera@company.com", role: "Admin", initials: "AR" },
                      { name: "Sarah Chen", email: "sarah.chen@company.com", role: "Editor", initials: "SC" },
                      { name: "Marcus Johnson", email: "marcus.j@company.com", role: "Viewer", initials: "MJ" },
                    ].map((member) => (
                      <div key={member.email} className="flex items-center gap-3 rounded-md border border-border p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {member.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs shrink-0">{member.role}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-fit mt-1" onClick={() => toast.info("Team management coming soon")}>
                      Invite Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Application Preferences</CardTitle>
                <CardDescription>Customize your dashboard experience.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6 max-w-lg">
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Choose your preferred color scheme.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Default Subscription View</Label>
                    <Select value={defaultView} onValueChange={setDefaultView}>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="grid">Grid View</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Default view when opening the Subscriptions page.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Currency Display</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="bg-background text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (&euro;)</SelectItem>
                        <SelectItem value="gbp">GBP (&pound;)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="border-t border-border pt-6">
                    <p className="text-sm font-semibold text-foreground mb-4">Data & Privacy</p>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Usage Analytics</p>
                          <p className="text-xs text-muted-foreground">Help improve the product with anonymous usage data</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-chart-2/10 text-chart-2 text-xs">Enabled</Badge>
                          <Shield className="h-4 w-4 text-chart-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSavePreferences} className="w-fit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
