"use client"

import * as React from "react"
import { Users, TrendingUp, Target, Plus, MoreHorizontal, Edit, Trash2, Eye, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for customer segments
const customerSegments = [
  {
    id: 1,
    name: "VIP Customers",
    description: "High-value customers with lifetime value > $1000",
    customerCount: 245,
    totalValue: 125000,
    avgOrderValue: 510,
    criteria: "Lifetime Value > $1000",
    status: "active",
    growth: 12.5,
    lastUpdated: "2024-01-15",
    color: "bg-purple-500",
  },
  {
    id: 2,
    name: "Frequent Buyers",
    description: "Customers who purchase more than 5 times per month",
    customerCount: 892,
    totalValue: 89000,
    avgOrderValue: 99,
    criteria: "Orders > 5/month",
    status: "active",
    growth: 8.3,
    lastUpdated: "2024-01-14",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "New Customers",
    description: "Customers who joined in the last 30 days",
    customerCount: 156,
    totalValue: 12000,
    avgOrderValue: 77,
    criteria: "Registration < 30 days",
    status: "active",
    growth: 25.1,
    lastUpdated: "2024-01-16",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "At-Risk Customers",
    description: "Customers who haven't purchased in 90+ days",
    customerCount: 324,
    totalValue: 45000,
    avgOrderValue: 139,
    criteria: "Last Purchase > 90 days",
    status: "active",
    growth: -15.2,
    lastUpdated: "2024-01-13",
    color: "bg-red-500",
  },
  {
    id: 5,
    name: "Mobile Shoppers",
    description: "Customers who primarily shop via mobile app",
    customerCount: 678,
    totalValue: 67000,
    avgOrderValue: 99,
    criteria: "Mobile Orders > 80%",
    status: "active",
    growth: 18.7,
    lastUpdated: "2024-01-15",
    color: "bg-orange-500",
  },
  {
    id: 6,
    name: "Discount Hunters",
    description: "Customers who primarily purchase during sales",
    customerCount: 445,
    totalValue: 34000,
    avgOrderValue: 76,
    criteria: "Discount Usage > 70%",
    status: "paused",
    growth: 5.4,
    lastUpdated: "2024-01-12",
    color: "bg-yellow-500",
  },
]

export default function CustomerSegmentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)

  const filteredSegments = React.useMemo(() => {
    return customerSegments.filter((segment) => {
      const matchesSearch =
        segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || segment.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const stats = React.useMemo(() => {
    const totalSegments = customerSegments.length
    const activeSegments = customerSegments.filter((s) => s.status === "active").length
    const totalCustomers = customerSegments.reduce((sum, s) => sum + s.customerCount, 0)
    const totalValue = customerSegments.reduce((sum, s) => sum + s.totalValue, 0)

    return { totalSegments, activeSegments, totalCustomers, totalValue }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Segments</h1>
          <p className="text-muted-foreground">Create and manage customer segments for targeted marketing campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80">
              <Plus className="mr-2 h-4 w-4" />
              Create Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Customer Segment</DialogTitle>
              <DialogDescription>
                Define criteria to automatically group customers for targeted campaigns.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="segment-name">Segment Name</Label>
                <Input id="segment-name" placeholder="Enter segment name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment-description">Description</Label>
                <Textarea id="segment-description" placeholder="Describe this customer segment" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment-criteria">Criteria</Label>
                <Input id="segment-criteria" placeholder="e.g., Lifetime Value > $500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="segment-color">Color</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segment-status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>Create Segment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Segments</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalSegments}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Configured segments</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Segments</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.activeSegments}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Currently running</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {stats.totalCustomers.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Across all segments</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              ${stats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400">Combined segment value</p>
          </CardContent>
        </Card>
      </div>

      {/* Segments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
          <CardDescription>Manage and analyze your customer segments for targeted marketing campaigns.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search segments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Segments Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSegments.map((segment) => (
              <Card key={segment.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${segment.color}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Segment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-sm">{segment.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={segment.status === "active" ? "default" : "secondary"}>{segment.status}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className={`h-3 w-3 ${segment.growth > 0 ? "text-green-500" : "text-red-500"}`} />
                      <span className={segment.growth > 0 ? "text-green-600" : "text-red-600"}>
                        {segment.growth > 0 ? "+" : ""}
                        {segment.growth}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Customers</div>
                      <div className="font-semibold">{segment.customerCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Value</div>
                      <div className="font-semibold">${segment.totalValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg Order</div>
                      <div className="font-semibold">${segment.avgOrderValue}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Updated</div>
                      <div className="font-semibold">{new Date(segment.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Criteria:</span>
                    </div>
                    <div className="text-sm font-mono bg-muted p-2 rounded">{segment.criteria}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSegments.length === 0 && (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No segments found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or create a new segment.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
