"use client"

import * as React from "react"
import { Clock, Package, Truck, CheckCircle, AlertCircle, MoreHorizontal, Search, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock data for processing orders
const processingOrders = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-${String(i + 1000).padStart(4, "0")}`,
  customer: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  items: Math.floor(Math.random() * 5) + 1,
  total: Math.floor(Math.random() * 500) + 50,
  status: ["pending", "processing", "packed", "shipped"][Math.floor(Math.random() * 4)],
  priority: ["low", "medium", "high", "urgent"][Math.floor(Math.random() * 4)],
  orderDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  estimatedShip: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  warehouse: ["Main", "East", "West"][Math.floor(Math.random() * 3)],
  shippingMethod: ["Standard", "Express", "Overnight"][Math.floor(Math.random() * 3)],
  progress: Math.floor(Math.random() * 100),
}))

const statusConfig = {
  pending: { color: "bg-yellow-500", label: "Pending", icon: Clock },
  processing: { color: "bg-blue-500", label: "Processing", icon: Package },
  packed: { color: "bg-purple-500", label: "Packed", icon: CheckCircle },
  shipped: { color: "bg-green-500", label: "Shipped", icon: Truck },
}

const priorityConfig = {
  low: { color: "bg-gray-500", label: "Low" },
  medium: { color: "bg-blue-500", label: "Medium" },
  high: { color: "bg-orange-500", label: "High" },
  urgent: { color: "bg-red-500", label: "Urgent" },
}

export default function OrderProcessingPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [warehouseFilter, setWarehouseFilter] = React.useState("all")

  const filteredOrders = React.useMemo(() => {
    return processingOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter
      const matchesWarehouse = warehouseFilter === "all" || order.warehouse === warehouseFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesWarehouse
    })
  }, [searchQuery, statusFilter, priorityFilter, warehouseFilter])

  const stats = React.useMemo(() => {
    const total = processingOrders.length
    const pending = processingOrders.filter((o) => o.status === "pending").length
    const processing = processingOrders.filter((o) => o.status === "processing").length
    const packed = processingOrders.filter((o) => o.status === "packed").length
    const urgent = processingOrders.filter((o) => o.priority === "urgent").length

    return { total, pending, processing, packed, urgent }
  }, [])

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
  }

  const handleBulkExport = () => {
    console.log("Exporting processing orders...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Processing</h1>
          <p className="text-muted-foreground">Monitor and manage orders in various processing stages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80">
            <Package className="mr-2 h-4 w-4" />
            Bulk Process
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.total}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Active orders</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stats.pending}</div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.processing}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Being prepared</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.packed}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Ready to ship</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.urgent}</div>
            <p className="text-xs text-red-600 dark:text-red-400">High priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Queue</CardTitle>
          <CardDescription>Manage orders through different processing stages with real-time updates.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="packed">Packed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warehouses</SelectItem>
                  <SelectItem value="Main">Main</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Ship Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                  return (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-muted-foreground">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell className="font-medium">${order.total}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusConfig[order.status as keyof typeof statusConfig].color} text-white`}
                        >
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${priorityConfig[order.priority as keyof typeof priorityConfig].color} text-white border-0`}
                        >
                          {priorityConfig[order.priority as keyof typeof priorityConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={order.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground">{order.progress}%</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.warehouse}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{order.estimatedShip}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "processing")}>
                              <Package className="mr-2 h-4 w-4" />
                              Start Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "packed")}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Packed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "shipped")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Ship Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
