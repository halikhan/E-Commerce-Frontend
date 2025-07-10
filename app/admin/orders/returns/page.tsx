"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react"

const returnsData = [
  {
    id: 1,
    rmaNumber: "RMA-2024-001",
    orderNumber: "ORD-2024-1234",
    customer: "John Doe",
    customerEmail: "john@example.com",
    product: "Wireless Headphones Pro",
    quantity: 1,
    reason: "Defective",
    status: "Pending Review",
    requestDate: "2024-01-20",
    expectedReturn: "2024-01-25",
    refundAmount: 89.99,
    description: "Left speaker not working properly",
  },
  {
    id: 2,
    rmaNumber: "RMA-2024-002",
    orderNumber: "ORD-2024-1235",
    customer: "Jane Smith",
    customerEmail: "jane@example.com",
    product: "Gaming Mouse RGB",
    quantity: 1,
    reason: "Wrong Item",
    status: "Approved",
    requestDate: "2024-01-18",
    expectedReturn: "2024-01-23",
    refundAmount: 49.99,
    description: "Received black instead of white color",
  },
  {
    id: 3,
    rmaNumber: "RMA-2024-003",
    orderNumber: "ORD-2024-1236",
    customer: "Bob Johnson",
    customerEmail: "bob@example.com",
    product: "Cotton T-Shirt Basic",
    quantity: 2,
    reason: "Size Issue",
    status: "Received",
    requestDate: "2024-01-15",
    expectedReturn: "2024-01-20",
    refundAmount: 39.98,
    description: "Size too small, need larger size",
  },
  {
    id: 4,
    rmaNumber: "RMA-2024-004",
    orderNumber: "ORD-2024-1237",
    customer: "Alice Brown",
    customerEmail: "alice@example.com",
    product: "Yoga Mat Premium",
    quantity: 1,
    reason: "Damaged",
    status: "Completed",
    requestDate: "2024-01-12",
    expectedReturn: "2024-01-17",
    refundAmount: 39.99,
    description: "Arrived with tears in the material",
  },
  {
    id: 5,
    rmaNumber: "RMA-2024-005",
    orderNumber: "ORD-2024-1238",
    customer: "Charlie Wilson",
    customerEmail: "charlie@example.com",
    product: "Coffee Maker Deluxe",
    quantity: 1,
    reason: "Not as Described",
    status: "Rejected",
    requestDate: "2024-01-10",
    expectedReturn: "N/A",
    refundAmount: 0,
    description: "Customer complaint not valid - item matches description",
  },
]

export default function ReturnsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReturn, setSelectedReturn] = useState<(typeof returnsData)[0] | null>(null)

  const filteredReturns = returnsData.filter((returnItem) => {
    const matchesSearch =
      returnItem.rmaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      returnItem.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || returnItem.status.toLowerCase().replace(" ", "") === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending review":
        return "secondary"
      case "approved":
        return "default"
      case "received":
        return "outline"
      case "completed":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending review":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "received":
        return <RotateCcw className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const pendingReturns = returnsData.filter((item) => item.status === "Pending Review").length
  const approvedReturns = returnsData.filter((item) => item.status === "Approved").length
  const totalRefunds = returnsData
    .filter((item) => item.status === "Completed")
    .reduce((sum, item) => sum + item.refundAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Returns & RMA</h1>
          <p className="text-muted-foreground">Manage product returns and refund requests</p>
        </div>
        <Button>Process Bulk Returns</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReturns}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Returns</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedReturns}</div>
            <p className="text-xs text-muted-foreground">Ready for processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunds</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunds.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">Of total orders</p>
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
                placeholder="Search RMA number, customer, or product..."
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
                <SelectItem value="pendingreview">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Returns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Returns List ({filteredReturns.length} returns)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RMA Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Refund Amount</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{returnItem.rmaNumber}</div>
                        <div className="text-sm text-muted-foreground">Order: {returnItem.orderNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{returnItem.customer}</div>
                        <div className="text-sm text-muted-foreground">{returnItem.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{returnItem.product}</div>
                        <div className="text-sm text-muted-foreground">Qty: {returnItem.quantity}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{returnItem.reason}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(returnItem.status)}
                        <Badge variant={getStatusBadgeVariant(returnItem.status)}>{returnItem.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${returnItem.refundAmount.toFixed(2)}</TableCell>
                    <TableCell>{returnItem.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedReturn(returnItem)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Return Details - {returnItem.rmaNumber}</DialogTitle>
                            </DialogHeader>
                            {selectedReturn && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Customer</Label>
                                    <p className="font-medium">{selectedReturn.customer}</p>
                                    <p className="text-sm text-muted-foreground">{selectedReturn.customerEmail}</p>
                                  </div>
                                  <div>
                                    <Label>Order Number</Label>
                                    <p className="font-medium">{selectedReturn.orderNumber}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Product</Label>
                                    <p className="font-medium">{selectedReturn.product}</p>
                                    <p className="text-sm text-muted-foreground">Quantity: {selectedReturn.quantity}</p>
                                  </div>
                                  <div>
                                    <Label>Reason</Label>
                                    <p className="font-medium">{selectedReturn.reason}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <p className="text-sm">{selectedReturn.description}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label>Status</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      {getStatusIcon(selectedReturn.status)}
                                      <Badge variant={getStatusBadgeVariant(selectedReturn.status)}>
                                        {selectedReturn.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Refund Amount</Label>
                                    <p className="font-medium">${selectedReturn.refundAmount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <Label>Request Date</Label>
                                    <p className="font-medium">{selectedReturn.requestDate}</p>
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button>Approve Return</Button>
                                  <Button variant="outline">Reject Return</Button>
                                  <Button variant="outline">Mark as Received</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {returnItem.status === "Pending Review" && (
                          <>
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
