"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  CalendarIcon,
  TrendingUp,
  MousePointer,
  UserPlus,
  UserMinus,
  BarChart3,
} from "lucide-react"

const campaignsData = [
  {
    id: 1,
    name: "Weekly Product Updates",
    subject: "New arrivals this week!",
    status: "sent",
    recipients: 1247,
    openRate: 24.5,
    clickRate: 3.2,
    sentDate: "2024-01-20",
    type: "newsletter",
  },
  {
    id: 2,
    name: "Flash Sale Alert",
    subject: "50% OFF - Limited Time Only!",
    status: "scheduled",
    recipients: 2156,
    openRate: 0,
    clickRate: 0,
    sentDate: "2024-01-22",
    type: "promotional",
  },
  {
    id: 3,
    name: "Customer Feedback Survey",
    subject: "Help us improve - Quick survey",
    status: "draft",
    recipients: 0,
    openRate: 0,
    clickRate: 0,
    sentDate: null,
    type: "survey",
  },
  {
    id: 4,
    name: "Holiday Special Offers",
    subject: "Holiday deals you can't miss!",
    status: "sent",
    recipients: 3421,
    openRate: 31.8,
    clickRate: 5.7,
    sentDate: "2024-01-15",
    type: "promotional",
  },
]

const subscribersData = [
  {
    id: 1,
    email: "john@example.com",
    name: "John Doe",
    status: "active",
    subscribeDate: "2024-01-15",
    lastActivity: "2024-01-20",
    segments: ["VIP", "Electronics"],
  },
  {
    id: 2,
    email: "jane@example.com",
    name: "Jane Smith",
    status: "active",
    subscribeDate: "2024-01-10",
    lastActivity: "2024-01-19",
    segments: ["Fashion", "New Customer"],
  },
  {
    id: 3,
    email: "bob@example.com",
    name: "Bob Wilson",
    status: "unsubscribed",
    subscribeDate: "2023-12-20",
    lastActivity: "2024-01-05",
    segments: ["Sports"],
  },
  {
    id: 4,
    email: "alice@example.com",
    name: "Alice Brown",
    status: "bounced",
    subscribeDate: "2024-01-08",
    lastActivity: "2024-01-08",
    segments: ["Home & Garden"],
  },
]

const templatesData = [
  {
    id: 1,
    name: "Weekly Newsletter",
    type: "newsletter",
    subject: "Weekly Updates from {{company_name}}",
    previewText: "Check out what's new this week...",
    lastModified: "2024-01-18",
    isDefault: true,
  },
  {
    id: 2,
    name: "Promotional Email",
    type: "promotional",
    subject: "Special Offer Just for You!",
    previewText: "Don't miss out on these amazing deals...",
    lastModified: "2024-01-16",
    isDefault: false,
  },
  {
    id: 3,
    name: "Welcome Series",
    type: "welcome",
    subject: "Welcome to {{company_name}}!",
    previewText: "We're excited to have you join us...",
    lastModified: "2024-01-12",
    isDefault: false,
  },
]

const statsData = {
  totalSubscribers: 12847,
  activeSubscribers: 11234,
  avgOpenRate: 28.3,
  avgClickRate: 4.1,
  newSubscribers: 156,
  unsubscribes: 23,
}

export default function NewsletterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date>()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case "sending":
        return <Badge className="bg-yellow-100 text-yellow-800">Sending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSubscriberStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "unsubscribed":
        return <Badge className="bg-red-100 text-red-800">Unsubscribed</Badge>
      case "bounced":
        return <Badge className="bg-yellow-100 text-yellow-800">Bounced</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "newsletter":
        return <Badge className="bg-blue-100 text-blue-800">Newsletter</Badge>
      case "promotional":
        return <Badge className="bg-purple-100 text-purple-800">Promotional</Badge>
      case "survey":
        return <Badge className="bg-orange-100 text-orange-800">Survey</Badge>
      case "welcome":
        return <Badge className="bg-green-100 text-green-800">Welcome</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Newsletter</h1>
        <p className="text-muted-foreground">Manage email campaigns and subscriber lists</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{statsData.newSubscribers}</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.activeSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((statsData.activeSubscribers / statsData.totalSubscribers) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.avgOpenRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Click Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.avgClickRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Subscribers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{statsData.newSubscribers}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsubscribes</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statsData.unsubscribes}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sending">Sending</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Campaign</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Campaign Name</Label>
                          <Input placeholder="Enter campaign name" />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="newsletter">Newsletter</SelectItem>
                              <SelectItem value="promotional">Promotional</SelectItem>
                              <SelectItem value="survey">Survey</SelectItem>
                              <SelectItem value="welcome">Welcome</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Subject Line</Label>
                        <Input placeholder="Enter email subject" />
                      </div>
                      <div>
                        <Label>Preview Text</Label>
                        <Input placeholder="Preview text shown in inbox" />
                      </div>
                      <div>
                        <Label>Recipients</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Subscribers</SelectItem>
                            <SelectItem value="active">Active Subscribers</SelectItem>
                            <SelectItem value="vip">VIP Customers</SelectItem>
                            <SelectItem value="new">New Subscribers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Template</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newsletter">Weekly Newsletter</SelectItem>
                            <SelectItem value="promotional">Promotional Email</SelectItem>
                            <SelectItem value="welcome">Welcome Series</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Save as Draft</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button className="flex-1">Send Now</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(campaign.type)}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                      <TableCell>{campaign.openRate > 0 ? `${campaign.openRate}%` : "-"}</TableCell>
                      <TableCell>{campaign.clickRate > 0 ? `${campaign.clickRate}%` : "-"}</TableCell>
                      <TableCell>{campaign.sentDate || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
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

        <TabsContent value="subscribers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subscriber Management</h2>
            <div className="flex gap-2">
              <Button variant="outline">Import Subscribers</Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search subscribers..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="new">New Customer</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subscriber</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribe Date</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Segments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribersData.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{subscriber.name}</p>
                          <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getSubscriberStatusBadge(subscriber.status)}</TableCell>
                      <TableCell>{subscriber.subscribeDate}</TableCell>
                      <TableCell>{subscriber.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {subscriber.segments.map((segment) => (
                            <Badge key={segment} variant="outline" className="text-xs">
                              {segment}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
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
            <h2 className="text-xl font-semibold">Email Templates</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templatesData.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTypeBadge(template.type)}
                      {template.isDefault && (
                        <Badge variant="outline" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm text-muted-foreground">{template.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Preview Text</Label>
                    <p className="text-sm text-muted-foreground">{template.previewText}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Modified</Label>
                    <p className="text-sm text-muted-foreground">{template.lastModified}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Campaign performance chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Subscriber growth chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignsData
                  .filter((c) => c.status === "sent")
                  .sort((a, b) => b.openRate - a.openRate)
                  .slice(0, 5)
                  .map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{campaign.openRate}% open rate</p>
                        <p className="text-sm text-muted-foreground">{campaign.clickRate}% click rate</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>From Name</Label>
                  <Input placeholder="Your Store Name" />
                </div>
                <div>
                  <Label>From Email</Label>
                  <Input placeholder="noreply@yourstore.com" />
                </div>
                <div>
                  <Label>Reply-To Email</Label>
                  <Input placeholder="support@yourstore.com" />
                </div>
                <div>
                  <Label>Company Address</Label>
                  <Textarea placeholder="Your company address for compliance" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Double Opt-in</p>
                      <p className="text-sm text-muted-foreground">Require email confirmation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Welcome Email</p>
                      <p className="text-sm text-muted-foreground">Send welcome email to new subscribers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Unsubscribe Confirmation</p>
                      <p className="text-sm text-muted-foreground">Send confirmation when users unsubscribe</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div>
                  <Label>Unsubscribe Page URL</Label>
                  <Input placeholder="https://yourstore.com/unsubscribe" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Welcome Series</p>
                      <p className="text-sm text-muted-foreground">Automated welcome email sequence</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Abandoned Cart</p>
                      <p className="text-sm text-muted-foreground">Send emails for abandoned carts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Re-engagement</p>
                      <p className="text-sm text-muted-foreground">Win back inactive subscribers</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">GDPR Compliance</p>
                      <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">CAN-SPAM Compliance</p>
                      <p className="text-sm text-muted-foreground">Include required unsubscribe links</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div>
                  <Label>Privacy Policy URL</Label>
                  <Input placeholder="https://yourstore.com/privacy" />
                </div>
                <div>
                  <Label>Terms of Service URL</Label>
                  <Input placeholder="https://yourstore.com/terms" />
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
