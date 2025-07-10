"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Edit, Trash2, Copy, Tag, Percent, Gift } from "lucide-react"

const coupons = [
  {
    id: 1,
    code: "SAVE20",
    type: "Percentage",
    value: 20,
    minOrder: 100,
    maxDiscount: 50,
    uses: 145,
    maxUses: 500,
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    code: "WELCOME10",
    type: "Fixed",
    value: 10,
    minOrder: 50,
    maxDiscount: 10,
    uses: 89,
    maxUses: 1000,
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
  },
  {
    id: 3,
    code: "FREESHIP",
    type: "Free Shipping",
    value: 0,
    minOrder: 75,
    maxDiscount: 15,
    uses: 234,
    maxUses: null,
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 4,
    code: "EXPIRED50",
    type: "Percentage",
    value: 50,
    minOrder: 200,
    maxDiscount: 100,
    uses: 12,
    maxUses: 100,
    status: "Expired",
    startDate: "2023-11-01",
    endDate: "2023-12-31",
  },
]

const promotions = [
  {
    id: 1,
    name: "Summer Sale 2024",
    type: "Category Discount",
    discount: "25% off Electronics",
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    orders: 456,
  },
  {
    id: 2,
    name: "Buy 2 Get 1 Free",
    type: "BOGO",
    discount: "Fashion Items",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    orders: 234,
  },
  {
    id: 3,
    name: "Flash Sale Weekend",
    type: "Time Limited",
    discount: "30% off Everything",
    status: "Scheduled",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    orders: 0,
  },
]

export default function DiscountsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || coupon.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "scheduled":
        return "secondary"
      case "expired":
        return "destructive"
      case "paused":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Discounts & Promotions</h1>
          <p className="text-muted-foreground">Manage coupons, promotions, and special offers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Discount
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 expiring soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,420</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coupon Usage</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">468</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="coupons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Search & Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search coupon codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Coupons Table */}
          <Card>
            <CardHeader>
              <CardTitle>Coupon Codes ({filteredCoupons.length} coupons)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{coupon.code}</code>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{coupon.type}</TableCell>
                      <TableCell>
                        {coupon.type === "Percentage"
                          ? `${coupon.value}%`
                          : coupon.type === "Fixed"
                            ? `$${coupon.value}`
                            : "Free Shipping"}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {coupon.uses} / {coupon.maxUses || "∞"}
                          </div>
                          <div className="w-full bg-muted rounded-full h-1">
                            <div
                              className="bg-primary h-1 rounded-full"
                              style={{
                                width: coupon.maxUses ? `${(coupon.uses / coupon.maxUses) * 100}%` : "0%",
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(coupon.status)}>{coupon.status}</Badge>
                      </TableCell>
                      <TableCell>{coupon.endDate}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map((promotion) => (
                  <div key={promotion.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{promotion.name}</h4>
                      <p className="text-sm text-muted-foreground">{promotion.discount}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          {promotion.startDate} - {promotion.endDate}
                        </span>
                        <span>{promotion.orders} orders</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(promotion.status)}>{promotion.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
