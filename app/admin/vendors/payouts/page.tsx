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
import { Search, Filter, DollarSign, Calendar, CheckCircle, Clock, Download, Send } from "lucide-react"

const payoutsData = [
  {
    id: 1,
    vendorName: "TechGear Solutions",
    vendorEmail: "contact@techgear.com",
    payoutId: "PAY-2024-001",
    amount: 8750.0,
    commission: 7.5,
    salesAmount: 116666.67,
    period: "January 2024",
    status: "Pending",
    dueDate: "2024-02-01",
    processedDate: null,
    method: "Bank Transfer",
    accountDetails: "****1234",
  },
  {
    id: 2,
    vendorName: "Fashion Forward",
    vendorEmail: "hello@fashionforward.com",
    payoutId: "PAY-2024-002",
    amount: 6265.0,
    commission: 7.0,
    salesAmount: 89500.0,
    period: "January 2024",
    status: "Completed",
    dueDate: "2024-02-01",
    processedDate: "2024-02-01",
    method: "PayPal",
    accountDetails: "hello@fashionforward.com",
  },
  {
    id: 3,
    vendorName: "Home Essentials Co",
    vendorEmail: "info@homeessentials.com",
    payoutId: "PAY-2024-003",
    amount: 2394.0,
    commission: 7.0,
    salesAmount: 34200.0,
    period: "January 2024",
    status: "Processing",
    dueDate: "2024-02-01",
    processedDate: null,
    method: "Bank Transfer",
    accountDetails: "****5678",
  },
  {
    id: 4,
    vendorName: "Sports World",
    vendorEmail: "sales@sportsworld.com",
    payoutId: "PAY-2024-004",
    amount: 10976.0,
    commission: 7.0,
    salesAmount: 156800.0,
    period: "January 2024",
    status: "Completed",
    dueDate: "2024-02-01",
    processedDate: "2024-02-02",
    method: "Bank Transfer",
    accountDetails: "****9012",
  },
  {
    id: 5,
    vendorName: "Book Haven",
    vendorEmail: "orders@bookhaven.com",
    payoutId: "PAY-2024-005",
    amount: 1875.0,
    commission: 6.0,
    salesAmount: 31250.0,
    period: "January 2024",
    status: "Failed",
    dueDate: "2024-02-01",
    processedDate: null,
    method: "Bank Transfer",
    accountDetails: "****3456",
  },
]

export default function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayout, setSelectedPayout] = useState<(typeof payoutsData)[0] | null>(null)

  const filteredPayouts = payoutsData.filter((payout) => {
    const matchesSearch =
      payout.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.payoutId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.vendorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payout.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary"
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
      case "processing":
        return <Send className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const pendingPayouts = payoutsData.filter((item) => item.status === "Pending").length
  const totalPending = payoutsData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.amount, 0)
  const totalPaid = payoutsData
    .filter((item) => item.status === "Completed")
    .reduce((sum, item) => sum + item.amount, 0)
  const failedPayouts = payoutsData.filter((item) => item.status === "Failed").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Vendor Payouts</h1>
          <p className="text-muted-foreground">Manage commission payments to vendors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Payouts
          </Button>
          <Button>Process All Pending</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayouts}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">To be paid out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedPayouts}</div>
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
                placeholder="Search vendor or payout ID..."
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
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payouts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payouts List ({filteredPayouts.length} payouts)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payout.vendorName}</div>
                        <div className="text-sm text-muted-foreground">{payout.vendorEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{payout.payoutId}</TableCell>
                    <TableCell className="font-medium">${payout.amount.toFixed(2)}</TableCell>
                    <TableCell>${payout.salesAmount.toFixed(2)}</TableCell>
                    <TableCell>{payout.commission}%</TableCell>
                    <TableCell>{payout.period}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payout.status)}
                        <Badge variant={getStatusBadgeVariant(payout.status)}>{payout.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>{payout.dueDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPayout(payout)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Payout Details - {payout.payoutId}</DialogTitle>
                            </DialogHeader>
                            {selectedPayout && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Vendor</Label>
                                    <p className="font-medium">{selectedPayout.vendorName}</p>
                                    <p className="text-sm text-muted-foreground">{selectedPayout.vendorEmail}</p>
                                  </div>
                                  <div>
                                    <Label>Payout Period</Label>
                                    <p className="font-medium">{selectedPayout.period}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label>Sales Amount</Label>
                                    <p className="font-medium">${selectedPayout.salesAmount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <Label>Commission Rate</Label>
                                    <p className="font-medium">{selectedPayout.commission}%</p>
                                  </div>
                                  <div>
                                    <Label>Payout Amount</Label>
                                    <p className="font-medium text-lg">${selectedPayout.amount.toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Payment Method</Label>
                                    <p className="font-medium">{selectedPayout.method}</p>
                                  </div>
                                  <div>
                                    <Label>Account Details</Label>
                                    <p className="font-medium">{selectedPayout.accountDetails}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Status</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      {getStatusIcon(selectedPayout.status)}
                                      <Badge variant={getStatusBadgeVariant(selectedPayout.status)}>
                                        {selectedPayout.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Due Date</Label>
                                    <p className="font-medium">{selectedPayout.dueDate}</p>
                                  </div>
                                </div>
                                {selectedPayout.processedDate && (
                                  <div>
                                    <Label>Processed Date</Label>
                                    <p className="font-medium">{selectedPayout.processedDate}</p>
                                  </div>
                                )}
                                <div className="flex gap-2 pt-4">
                                  {selectedPayout.status === "Pending" && <Button>Process Payout</Button>}
                                  {selectedPayout.status === "Failed" && <Button>Retry Payout</Button>}
                                  <Button variant="outline">Download Receipt</Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {payout.status === "Pending" && (
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {payout.status === "Failed" && (
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
