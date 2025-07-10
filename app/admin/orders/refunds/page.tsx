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
import { Search, Filter, DollarSign, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const refundsData = [
  {
    id: 1,
    refundId: "REF-2024-001",
    orderNumber: "ORD-2024-1234",
    customer: "John Doe",
    customerEmail: "john@example.com",
    amount: 89.99,
    reason: "Product Defective",
    method: "Credit Card",
    status: "Pending",
    requestDate: "2024-01-20",
    processedDate: null,
    transactionId: null,
    notes: "Customer reported left speaker not working",
  },
  {
    id: 2,
    refundId: "REF-2024-002",
    orderNumber: "ORD-2024-1235",
    customer: "Jane Smith",
    customerEmail: "jane@example.com",
    amount: 49.99,
    reason: "Wrong Item Received",
    method: "PayPal",
    status: "Completed",
    requestDate: "2024-01-18",
    processedDate: "2024-01-19",
    transactionId: "TXN-789456123",
    notes: "Refund processed successfully",
  },
  {
    id: 3,
    refundId: "REF-2024-003",
    orderNumber: "ORD-2024-1236",
    customer: "Bob Johnson",
    customerEmail: "bob@example.com",
    amount: 39.98,
    reason: "Size Issue",
    method: "Credit Card",
    status: "Processing",
    requestDate: "2024-01-15",
    processedDate: null,
    transactionId: null,
    notes: "Awaiting bank processing",
  },
  {
    id: 4,
    refundId: "REF-2024-004",
    orderNumber: "ORD-2024-1237",
    customer: "Alice Brown",
    customerEmail: "alice@example.com",
    amount: 39.99,
    reason: "Damaged Item",
    method: "Store Credit",
    status: "Completed",
    requestDate: "2024-01-12",
    processedDate: "2024-01-13",
    transactionId: "SC-456789",
    notes: "Store credit issued to customer account",
  },
  {
    id: 5,
    refundId: "REF-2024-005",
    orderNumber: "ORD-2024-1238",
    customer: "Charlie Wilson",
    customerEmail: "charlie@example.com",
    amount: 129.99,
    reason: "Order Cancellation",
    method: "Credit Card",
    status: "Failed",
    requestDate: "2024-01-10",
    processedDate: "2024-01-11",
    transactionId: null,
    notes: "Payment gateway error - retry needed",
  },
  {
    id: 6,
    refundId: "REF-2024-006",
    orderNumber: "ORD-2024-1239",
    customer: "Diana Prince",
    customerEmail: "diana@example.com",
    amount: 24.99,
    reason: "Not Satisfied",
    method: "Credit Card",
    status: "Approved",
    requestDate: "2024-01-22",
    processedDate: null,
    transactionId: null,
    notes: "Approved for processing",
  },
]

export default function RefundsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [selectedRefund, setSelectedRefund] = useState<(typeof refundsData)[0] | null>(null)

  const filteredRefunds = refundsData.filter((refund) => {
    const matchesSearch =
      refund.refundId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || refund.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesMethod =
      methodFilter === "all" || refund.method.toLowerCase().replace(" ", "") === methodFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary"
      case "approved":
        return "default"
      case "processing":
        return "outline"
      case "completed":
        return "default"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const pendingRefunds = refundsData.filter((item) => item.status === "Pending").length
  const processingRefunds = refundsData.filter((item) => item.status === "Processing").length
  const totalRefunded = refundsData
    .filter((item) => item.status === "Completed")
    .reduce((sum, item) => sum + item.amount, 0)
  const failedRefunds = refundsData.filter((item) => item.status === "Failed").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Refunds Management</h1>
          <p className="text-muted-foreground">Process and track customer refunds</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Refunds</Button>
          <Button>Process Pending</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Refunds</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRefunds}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingRefunds}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRefunded.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Refunds</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedRefunds}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
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
                placeholder="Search refund ID, customer, or order..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="creditcard">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="storecredit">Store Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Refunds Table */}
      <Card>
        <CardHeader>
          <CardTitle>Refunds List ({filteredRefunds.length} refunds)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Refund ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRefunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{refund.refundId}</div>
                        <div className="text-sm text-muted-foreground">Order: {refund.orderNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{refund.customer}</div>
                        <div className="text-sm text-muted-foreground">{refund.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${refund.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        {refund.method}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{refund.reason}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(refund.status)}
                        <Badge variant={getStatusBadgeVariant(refund.status)}>{refund.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{refund.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedRefund(refund)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Refund Details - {refund.refundId}</DialogTitle>
                            </DialogHeader>
                            {selectedRefund && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Customer</Label>
                                    <p className="font-medium">{selectedRefund.customer}</p>
                                    <p className="text-sm text-muted-foreground">{selectedRefund.customerEmail}</p>
                                  </div>
                                  <div>
                                    <Label>Order Number</Label>
                                    <p className="font-medium">{selectedRefund.orderNumber}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label>Refund Amount</Label>
                                    <p className="font-medium text-lg">${selectedRefund.amount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <Label>Method</Label>
                                    <p className="font-medium">{selectedRefund.method}</p>
                                  </div>
                                  <div>
                                    <Label>Reason</Label>
                                    <p className="font-medium">{selectedRefund.reason}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Status</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      {getStatusIcon(selectedRefund.status)}
                                      <Badge variant={getStatusBadgeVariant(selectedRefund.status)}>
                                        {selectedRefund.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Request Date</Label>
                                    <p className="font-medium">{selectedRefund.requestDate}</p>
                                  </div>
                                </div>
                                {selectedRefund.processedDate && (
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Processed Date</Label>
                                      <p className="font-medium">{selectedRefund.processedDate}</p>
                                    </div>
                                    <div>
                                      <Label>Transaction ID</Label>
                                      <p className="font-medium">{selectedRefund.transactionId || "N/A"}</p>
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <Label>Notes</Label>
                                  <p className="text-sm">{selectedRefund.notes}</p>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  {selectedRefund.status === "Pending" && (
                                    <>
                                      <Button>Approve Refund</Button>
                                      <Button variant="outline">Reject Refund</Button>
                                    </>
                                  )}
                                  {selectedRefund.status === "Approved" && <Button>Process Refund</Button>}
                                  {selectedRefund.status === "Failed" && <Button>Retry Refund</Button>}
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {refund.status === "Pending" && (
                          <>
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {refund.status === "Failed" && (
                          <Button variant="outline" size="sm">
                            Retry
                          </Button>
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
