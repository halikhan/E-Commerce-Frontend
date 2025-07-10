"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Filter, AlertTriangle, Package, TrendingDown, TrendingUp, Download } from "lucide-react"

const inventoryData = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    sku: "WHP-001",
    category: "Electronics",
    currentStock: 5,
    minStock: 10,
    maxStock: 100,
    reorderPoint: 15,
    unitCost: 45.0,
    unitPrice: 89.99,
    status: "Low Stock",
    lastRestocked: "2024-01-15",
    supplier: "TechSupply Co",
  },
  {
    id: 2,
    name: "Gaming Mouse RGB",
    sku: "GMR-002",
    category: "Electronics",
    currentStock: 0,
    minStock: 5,
    maxStock: 50,
    reorderPoint: 8,
    unitCost: 25.0,
    unitPrice: 49.99,
    status: "Out of Stock",
    lastRestocked: "2024-01-10",
    supplier: "GameGear Ltd",
  },
  {
    id: 3,
    name: "Cotton T-Shirt Basic",
    sku: "CTB-003",
    category: "Fashion",
    currentStock: 45,
    minStock: 20,
    maxStock: 200,
    reorderPoint: 30,
    unitCost: 8.0,
    unitPrice: 19.99,
    status: "In Stock",
    lastRestocked: "2024-01-20",
    supplier: "Fashion Forward",
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    sku: "YMP-004",
    category: "Sports",
    currentStock: 12,
    minStock: 15,
    maxStock: 80,
    reorderPoint: 20,
    unitCost: 15.0,
    unitPrice: 39.99,
    status: "Low Stock",
    lastRestocked: "2024-01-18",
    supplier: "FitLife Supply",
  },
  {
    id: 5,
    name: "Coffee Maker Deluxe",
    sku: "CMD-005",
    category: "Home & Kitchen",
    currentStock: 8,
    minStock: 5,
    maxStock: 30,
    reorderPoint: 10,
    unitCost: 65.0,
    unitPrice: 129.99,
    status: "In Stock",
    lastRestocked: "2024-01-22",
    supplier: "Kitchen Pro",
  },
  {
    id: 6,
    name: "Smartphone Case Clear",
    sku: "SCC-006",
    category: "Electronics",
    currentStock: 150,
    minStock: 50,
    maxStock: 300,
    reorderPoint: 75,
    unitCost: 3.0,
    unitPrice: 12.99,
    status: "Overstocked",
    lastRestocked: "2024-01-25",
    supplier: "Mobile Accessories Inc",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || item.status.toLowerCase().replace(" ", "") === statusFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock":
        return "default"
      case "low stock":
        return "secondary"
      case "out of stock":
        return "destructive"
      case "overstocked":
        return "outline"
      default:
        return "outline"
    }
  }

  const lowStockItems = inventoryData.filter((item) => item.currentStock <= item.reorderPoint).length
  const outOfStockItems = inventoryData.filter((item) => item.currentStock === 0).length
  const totalValue = inventoryData.reduce((sum, item) => sum + item.currentStock * item.unitCost, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Monitor stock levels and manage inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Inventory
          </Button>
          <Button>Bulk Update Stock</Button>
        </div>
      </div>

      {/* Alerts */}
      {(lowStockItems > 0 || outOfStockItems > 0) && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Inventory Alert:</strong> {outOfStockItems} items are out of stock and {lowStockItems} items are
            running low.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.length}</div>
            <p className="text-xs text-muted-foreground">Active SKUs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Need reordering</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total stock value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="instock">In Stock</SelectItem>
                <SelectItem value="lowstock">Low Stock</SelectItem>
                <SelectItem value="outofstock">Out of Stock</SelectItem>
                <SelectItem value="overstocked">Overstocked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="home & kitchen">Home & Kitchen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory List ({filteredInventory.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Point</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
                        <div className="text-sm text-muted-foreground">{item.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{item.currentStock}</div>
                        <div className="text-xs text-muted-foreground">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                        <div className="w-full bg-muted rounded-full h-1">
                          <div
                            className={`h-1 rounded-full ${
                              item.currentStock <= item.reorderPoint
                                ? "bg-red-500"
                                : item.currentStock > item.maxStock * 0.8
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.reorderPoint}</TableCell>
                    <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{item.lastRestocked}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Update Stock
                        </Button>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
