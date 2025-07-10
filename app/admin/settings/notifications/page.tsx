"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, Smartphone, Settings, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const notificationTypes = [
  {
    id: "order_placed",
    title: "New Order Placed",
    description: "When a customer places a new order",
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
  {
    id: "payment_received",
    title: "Payment Received",
    description: "When payment is successfully processed",
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  {
    id: "low_inventory",
    title: "Low Inventory Alert",
    description: "When product stock falls below threshold",
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  {
    id: "customer_signup",
    title: "New Customer Registration",
    description: "When a new customer creates an account",
    email: true,
    sms: false,
    push: false,
    slack: true,
  },
  {
    id: "vendor_application",
    title: "Vendor Application",
    description: "When a new vendor applies to join",
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
]

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState(notificationTypes)
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "admin@ecommerce.com",
    smtpPassword: "",
    fromName: "E-commerce Platform",
    fromEmail: "noreply@ecommerce.com",
  })

  const updateNotification = (id: string, channel: string, value: boolean) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, [channel]: value } : notif)))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground">Configure how and when you receive notifications</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="preferences" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="email">Email Setup</TabsTrigger>
          <TabsTrigger value="sms">SMS Setup</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose which notifications you want to receive and how</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-5 gap-4 pb-4 border-b">
                  <div className="font-medium">Notification Type</div>
                  <div className="text-center font-medium flex items-center justify-center gap-1">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                  <div className="text-center font-medium flex items-center justify-center gap-1">
                    <Smartphone className="h-4 w-4" />
                    SMS
                  </div>
                  <div className="text-center font-medium flex items-center justify-center gap-1">
                    <Bell className="h-4 w-4" />
                    Push
                  </div>
                  <div className="text-center font-medium flex items-center justify-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Slack
                  </div>
                </div>

                {notifications.map((notification) => (
                  <div key={notification.id} className="grid grid-cols-5 gap-4 items-center py-3">
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">{notification.description}</div>
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.email}
                        onCheckedChange={(checked) => updateNotification(notification.id, "email", checked)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.sms}
                        onCheckedChange={(checked) => updateNotification(notification.id, "sms", checked)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.push}
                        onCheckedChange={(checked) => updateNotification(notification.id, "push", checked)}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Switch
                        checked={notification.slack}
                        onCheckedChange={(checked) => updateNotification(notification.id, "slack", checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpHost: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpPort: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Username</Label>
                  <Input
                    id="smtp-user"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpUser: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, smtpPassword: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, fromName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings((prev) => ({ ...prev, fromEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Email Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                SMS Configuration
              </CardTitle>
              <CardDescription>Configure SMS provider for text notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sms-provider">SMS Provider</Label>
                <Select defaultValue="twilio">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="aws-sns">AWS SNS</SelectItem>
                    <SelectItem value="nexmo">Nexmo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="Enter API key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" type="password" placeholder="Enter API secret" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-id">Sender ID</Label>
                <Input id="sender-id" placeholder="e.g., ECOMMERCE" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Test SMS</Button>
                <Button>Save SMS Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Slack Integration
                  <Badge variant="secondary">Connected</Badge>
                </CardTitle>
                <CardDescription>Send notifications to Slack channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Webhook URL</Label>
                  <Input id="slack-webhook" placeholder="https://hooks.slack.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slack-channel">Default Channel</Label>
                  <Input id="slack-channel" placeholder="#notifications" />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Test Slack Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Discord Integration
                  <Badge variant="outline">Not Connected</Badge>
                </CardTitle>
                <CardDescription>Send notifications to Discord channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="discord-webhook">Webhook URL</Label>
                  <Input id="discord-webhook" placeholder="https://discord.com/api/webhooks/..." />
                </div>
                <Button className="w-full">Connect Discord</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
