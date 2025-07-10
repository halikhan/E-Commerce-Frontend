"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Zap, Plus, Search, Play, Edit, Trash2, Users, ShoppingCart, Mail, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const automations = [
  {
    id: 1,
    name: "Welcome Series",
    trigger: "Customer Registration",
    type: "email_sequence",
    status: "active",
    audience: "New Customers",
    triggered: 245,
    completed: 189,
    revenue: 8920,
    createdAt: "2024-01-10",
    lastTriggered: "2024-01-15 14:30",
  },
  {
    id: 2,
    name: "Abandoned Cart Recovery",
    trigger: "Cart Abandonment",
    type: "email_sequence",
    status: "active",
    audience: "Cart Abandoners",
    triggered: 1250,
    completed: 420,
    revenue: 15680,
    createdAt: "2024-01-05",
    lastTriggered: "2024-01-15 16:45",
  },
  {
    id: 3,
    name: "VIP Customer Rewards",
    trigger: "High Value Purchase",
    type: "discount_code",
    status: "paused",
    audience: "VIP Customers",
    triggered: 89,
    completed: 67,
    revenue: 12450,
    createdAt: "2023-12-20",
    lastTriggered: "2024-01-12 09:15",
  },
  {
    id: 4,
    name: "Birthday Promotion",
    trigger: "Customer Birthday",
    type: "email_discount",
    status: "active",
    audience: "All Customers",
    triggered: 156,
    completed: 98,
    revenue: 4560,
    createdAt: "2024-01-01",
    lastTriggered: "2024-01-15 12:00",
  },
]

const triggerTypes = [
  { value: "customer_registration", label: "Customer Registration", icon: Users },
  { value: "cart_abandonment", label: "Cart Abandonment", icon: ShoppingCart },
  { value: "purchase_complete", label: "Purchase Complete", icon: ShoppingCart },
  { value: "customer_birthday", label: "Customer Birthday", icon: Calendar },
  { value: "high_value_purchase", label: "High Value Purchase", icon: ShoppingCart },
  { value: "product_view", label: "Product View", icon: Users },
]

export default function PromotionAutomations() {
  const [automationList, setAutomationList] = useState(automations)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAutomations = automationList.filter((automation) => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || automation.status === statusFilter
    const matchesType = typeFilter === "all" || automation.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleAutomationStatus = (id: number) => {
    setAutomationList((prev) =>
      prev.map((automation) =>
        automation.id === id
          ? { ...automation, status: automation.status === "active" ? "paused" : "active" }
          : automation,
      ),
    )
  }

  const totalTriggered = automationList.reduce((sum, a) => sum + a.triggered, 0)
  const totalRevenue = automationList.reduce((sum, a) => sum + a.revenue, 0)
  const avgCompletionRate =
    automationList.length > 0
      ? (
          automationList.reduce((sum, a) => sum + (a.triggered > 0 ? (a.completed / a.triggered) * 100 : 0), 0) /
          automationList.length
        ).toFixed(1)
      : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotion Automations</h1>
          <p className="text-muted-foreground">Automate your marketing and promotional campaigns</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Automation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automationList.filter((a) => a.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Running automations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Triggered</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTriggered.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Revenue</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">Average completion</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="automations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="automations">All Automations</TabsTrigger>
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="automations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Marketing Automations</CardTitle>
                  <CardDescription>Manage your automated marketing workflows</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search automations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email_sequence">Email Sequence</SelectItem>
                      <SelectItem value="discount_code">Discount Code</SelectItem>
                      <SelectItem value="email_discount">Email + Discount</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Automation</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAutomations.map((automation) => (
                    <TableRow key={automation.id}>
                      <TableCell className="font-medium">{automation.name}</TableCell>
                      <TableCell>{automation.trigger}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{automation.type.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(automation.status)}>{automation.status}</Badge>
                          <Switch
                            checked={automation.status === "active"}
                            onCheckedChange={() => toggleAutomationStatus(automation.id)}
                            size="sm"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Triggered: {automation.triggered}</div>
                          <div className="text-muted-foreground">
                            Completed: {automation.completed} (
                            {automation.triggered > 0
                              ? ((automation.completed / automation.triggered) * 100).toFixed(1)
                              : 0}
                            %)
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${automation.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {automation.lastTriggered ? new Date(automation.lastTriggered).toLocaleString() : "Never"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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

        <TabsContent value="triggers">
          <Card>
            <CardHeader>
              <CardTitle>Available Triggers</CardTitle>
              <CardDescription>Events that can trigger your automations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {triggerTypes.map((trigger) => (
                  <Card key={trigger.value} className="p-4">
                    <div className="flex items-center gap-3">
                      <trigger.icon className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{trigger.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          Trigger when {trigger.label.toLowerCase()} occurs
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Automation Templates</CardTitle>
              <CardDescription>Pre-built automation workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Automation Templates</h3>
                <p className="text-muted-foreground mb-4">Quick-start templates for common automation workflows</p>
                <Button>Browse Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Automation Analytics</CardTitle>
              <CardDescription>Performance insights for your automations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">Detailed automation performance metrics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
