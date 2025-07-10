"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Search,
  Plus,
  Eye,
  Trash2,
  Send,
  Settings,
  Users,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Mail,
  Smartphone,
  Globe,
} from "lucide-react"

const notificationsData = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #12345 has been placed by John Doe",
    recipient: "All Admins",
    status: "sent",
    priority: "high",
    timestamp: "2024-01-20 10:30 AM",
    readBy: ["admin1", "admin2"],
    channels: ["email", "push", "in-app"],
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Stock Alert",
    message: "Wireless Headphones stock is running low (5 items left)",
    recipient: "Inventory Team",
    status: "sent",
    priority: "medium",
    timestamp: "2024-01-20 09:15 AM",
    readBy: ["admin3"],
    channels: ["email", "in-app"],
  },
  {
    id: 3,
    type: "customer",
    title: "New Customer Registration",
    message: "Jane Smith has created a new account",
    recipient: "Customer Service",
    status: "pending",
    priority: "low",
    timestamp: "2024-01-20 08:45 AM",
    readBy: [],
    channels: ["in-app"],
  },
  {
    id: 4,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance will begin at 2:00 AM",
    recipient: "All Users",
    status: "scheduled",
    priority: "high",
    timestamp: "2024-01-21 02:00 AM",
    readBy: [],
    channels: ["email", "push", "sms"],
  },
]

const templatesData = [
  {
    id: 1,
    name: "Order Confirmation",
    type: "order",
    subject: "Your order has been confirmed",
    content: "Thank you for your order! We're processing it now.",
    channels: ["email", "sms"],
    active: true,
  },
  {
    id: 2,
    name: "Low Stock Alert",
    type: "inventory",
    subject: "Low stock alert for {{product_name}}",
    content: "{{product_name}} is running low with only {{stock_count}} items left.",
    channels: ["email", "in-app"],
    active: true,
  },
  {
    id: 3,
    name: "Welcome Message",
    type: "customer",
    subject: "Welcome to our store!",
    content: "Welcome {{customer_name}}! We're excited to have you.",
    channels: ["email"],
    active: false,
  },
]

const statsData = {
  totalNotifications: 1247,
  sentToday: 89,
  openRate: 78,
  clickRate: 12,
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "order":
        return <Badge className="bg-blue-100 text-blue-800">Order</Badge>
      case "inventory":
        return <Badge className="bg-orange-100 text-orange-800">Inventory</Badge>
      case "customer":
        return <Badge className="bg-green-100 text-green-800">Customer</Badge>
      case "system":
        return <Badge className="bg-purple-100 text-purple-800">System</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4" />
      case "inventory":
        return <AlertTriangle className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Smartphone className="h-4 w-4" />
      case "push":
        return <Bell className="h-4 w-4" />
      case "in-app":
        return <Globe className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredNotifications = notificationsData.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Manage system notifications and alerts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalNotifications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent Today</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.sentToday}</div>
            <p className="text-xs text-muted-foreground">Notifications sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.openRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.clickRate}%</div>
            <p className="text-xs text-muted-foreground">Engagement rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">All Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="order">Order</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Notification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Notification</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="order">Order</SelectItem>
                              <SelectItem value="inventory">Inventory</SelectItem>
                              <SelectItem value="customer">Customer</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Priority</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input placeholder="Notification title" />
                      </div>
                      <div>
                        <Label>Message</Label>
                        <Textarea placeholder="Notification message" />
                      </div>
                      <div>
                        <Label>Recipients</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipients" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Admins</SelectItem>
                            <SelectItem value="inventory">Inventory Team</SelectItem>
                            <SelectItem value="customer-service">Customer Service</SelectItem>
                            <SelectItem value="managers">Managers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Channels</Label>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="email" defaultChecked />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="push" />
                            <Label htmlFor="push">Push</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="sms" />
                            <Label htmlFor="sms">SMS</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="in-app" defaultChecked />
                            <Label htmlFor="in-app">In-App</Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Send Now</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Channels</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          {getTypeBadge(notification.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">{notification.message}</p>
                        </div>
                      </TableCell>
                      <TableCell>{notification.recipient}</TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {notification.channels.map((channel) => (
                            <div key={channel} className="p-1 bg-muted rounded">
                              {getChannelIcon(channel)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{notification.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedNotification(notification)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Notification Details</DialogTitle>
                              </DialogHeader>
                              {selectedNotification && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Type</Label>
                                      <div className="flex items-center gap-2 mt-1">
                                        {getTypeIcon(selectedNotification.type)}
                                        {getTypeBadge(selectedNotification.type)}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Status</Label>
                                      <div className="mt-1">{getStatusBadge(selectedNotification.status)}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Title</Label>
                                    <p className="font-medium mt-1">{selectedNotification.title}</p>
                                  </div>
                                  <div>
                                    <Label>Message</Label>
                                    <p className="mt-1">{selectedNotification.message}</p>
                                  </div>
                                  <div>
                                    <Label>Recipients</Label>
                                    <p className="mt-1">{selectedNotification.recipient}</p>
                                  </div>
                                  <div>
                                    <Label>Channels</Label>
                                    <div className="flex gap-2 mt-1">
                                      {selectedNotification.channels.map((channel: string) => (
                                        <div key={channel} className="flex items-center gap-1 p-2 bg-muted rounded">
                                          {getChannelIcon(channel)}
                                          <span className="text-sm capitalize">{channel}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Read By</Label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {selectedNotification.readBy.length > 0
                                        ? `${selectedNotification.readBy.length} users`
                                        : "No one has read this notification yet"}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notification Templates</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Notification Template</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Template Name</Label>
                      <Input placeholder="Template name" />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order</SelectItem>
                          <SelectItem value="inventory">Inventory</SelectItem>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Input placeholder="Email subject line" />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea placeholder="Template content with {{variables}}" className="min-h-[120px]" />
                  </div>
                  <div>
                    <Label>Channels</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="template-email" defaultChecked />
                        <Label htmlFor="template-email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="template-push" />
                        <Label htmlFor="template-push">Push</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="template-sms" />
                        <Label htmlFor="template-sms">SMS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="template-in-app" />
                        <Label htmlFor="template-in-app">In-App</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Create Template</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templatesData.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTypeBadge(template.type)}
                      <Switch checked={template.active} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Content</Label>
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Channels</Label>
                    <div className="flex gap-1 mt-1">
                      {template.channels.map((channel) => (
                        <div key={channel} className="p-1 bg-muted rounded">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>SMTP Server</Label>
                  <Input placeholder="smtp.example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Port</Label>
                    <Input placeholder="587" />
                  </div>
                  <div>
                    <Label>Security</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="TLS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Username</Label>
                  <Input placeholder="your-email@example.com" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button>Test Connection</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Firebase Server Key</Label>
                  <Input placeholder="Your Firebase server key" />
                </div>
                <div>
                  <Label>Firebase Sender ID</Label>
                  <Input placeholder="Your Firebase sender ID" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Send push notifications to users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Badge Count</p>
                      <p className="text-sm text-muted-foreground">Show notification count on app icon</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Button>Test Push Notification</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>SMS Provider</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="aws-sns">AWS SNS</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>API Key</Label>
                  <Input placeholder="Your SMS API key" />
                </div>
                <div>
                  <Label>API Secret</Label>
                  <Input type="password" placeholder="Your SMS API secret" />
                </div>
                <div>
                  <Label>From Number</Label>
                  <Input placeholder="+1234567890" />
                </div>
                <Button>Test SMS</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-send Notifications</p>
                      <p className="text-sm text-muted-foreground">Automatically send system notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Batch Notifications</p>
                      <p className="text-sm text-muted-foreground">Group similar notifications together</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notification Sounds</p>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div>
                  <Label>Notification Retention (days)</Label>
                  <Input placeholder="30" type="number" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
