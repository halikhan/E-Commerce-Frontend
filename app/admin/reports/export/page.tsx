"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Calendar, Database, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const exportHistory = [
  {
    id: 1,
    name: "Orders Report - January 2024",
    type: "orders",
    format: "CSV",
    status: "completed",
    createdAt: "2024-01-15 10:30:00",
    fileSize: "2.4 MB",
    records: 1250,
  },
  {
    id: 2,
    name: "Customer Data Export",
    type: "customers",
    format: "Excel",
    status: "processing",
    createdAt: "2024-01-15 09:15:00",
    fileSize: "1.8 MB",
    records: 890,
  },
  {
    id: 3,
    name: "Product Inventory Report",
    type: "products",
    format: "PDF",
    status: "failed",
    createdAt: "2024-01-14 16:45:00",
    fileSize: "0 MB",
    records: 0,
  },
  {
    id: 4,
    name: "Revenue Analytics Q4",
    type: "revenue",
    format: "CSV",
    status: "completed",
    createdAt: "2024-01-14 14:20:00",
    fileSize: "5.2 MB",
    records: 3450,
  },
]

const reportTypes = [
  { value: "orders", label: "Orders", description: "Order data with customer and product details" },
  { value: "customers", label: "Customers", description: "Customer profiles and contact information" },
  { value: "products", label: "Products", description: "Product catalog with inventory data" },
  { value: "revenue", label: "Revenue", description: "Financial data and revenue analytics" },
  { value: "inventory", label: "Inventory", description: "Stock levels and inventory movements" },
  { value: "vendors", label: "Vendors", description: "Vendor information and performance data" },
]

export default function ExportReports() {
  const [exportConfig, setExportConfig] = useState({
    reportType: "orders",
    format: "csv",
    dateRange: "30days",
    includeFields: {
      orders: ["id", "customer", "total", "status", "date"],
      customers: ["name", "email", "phone", "address"],
      products: ["name", "sku", "price", "stock"],
      revenue: ["date", "amount", "source", "category"],
    },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleExport = () => {
    // Simulate export process
    console.log("Starting export with config:", exportConfig)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Export</h1>
          <p className="text-muted-foreground">Export your data in various formats for analysis</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Export</TabsTrigger>
          <TabsTrigger value="history">Export History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Export Configuration
                </CardTitle>
                <CardDescription>Configure your data export settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select
                    value={exportConfig.reportType}
                    onValueChange={(value) => setExportConfig((prev) => ({ ...prev, reportType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {reportTypes.find((t) => t.value === exportConfig.reportType)?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Export Format</Label>
                    <Select
                      value={exportConfig.format}
                      onValueChange={(value) => setExportConfig((prev) => ({ ...prev, format: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel (XLSX)</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-range">Date Range</Label>
                    <Select
                      value={exportConfig.dateRange}
                      onValueChange={(value) => setExportConfig((prev) => ({ ...prev, dateRange: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="1year">Last Year</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" placeholder="Start Date" />
                    <Input type="date" placeholder="End Date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filename">Export Filename</Label>
                  <Input
                    id="filename"
                    placeholder="my-export-2024"
                    defaultValue={`${exportConfig.reportType}-export-${new Date().toISOString().split("T")[0]}`}
                  />
                </div>

                <Button onClick={handleExport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Start Export
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Field Selection</CardTitle>
                <CardDescription>Choose which fields to include in your export</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exportConfig.reportType === "orders" && (
                    <div className="space-y-2">
                      <Label>Order Fields</Label>
                      <div className="space-y-2">
                        {[
                          "Order ID",
                          "Customer Name",
                          "Customer Email",
                          "Order Total",
                          "Order Status",
                          "Order Date",
                          "Payment Method",
                          "Shipping Address",
                        ].map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox id={field} defaultChecked />
                            <Label htmlFor={field} className="text-sm">
                              {field}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {exportConfig.reportType === "customers" && (
                    <div className="space-y-2">
                      <Label>Customer Fields</Label>
                      <div className="space-y-2">
                        {[
                          "Customer ID",
                          "Full Name",
                          "Email Address",
                          "Phone Number",
                          "Registration Date",
                          "Total Orders",
                          "Total Spent",
                          "Address",
                        ].map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox id={field} defaultChecked />
                            <Label htmlFor={field} className="text-sm">
                              {field}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {exportConfig.reportType === "products" && (
                    <div className="space-y-2">
                      <Label>Product Fields</Label>
                      <div className="space-y-2">
                        {[
                          "Product ID",
                          "Product Name",
                          "SKU",
                          "Category",
                          "Price",
                          "Stock Quantity",
                          "Description",
                          "Created Date",
                        ].map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox id={field} defaultChecked />
                            <Label htmlFor={field} className="text-sm">
                              {field}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Export History
              </CardTitle>
              <CardDescription>View and download your previous exports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Export Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exportHistory.map((export_item) => (
                    <TableRow key={export_item.id}>
                      <TableCell className="font-medium">{export_item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{export_item.type}</Badge>
                      </TableCell>
                      <TableCell>{export_item.format}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(export_item.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(export_item.status)}
                            {export_item.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(export_item.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{export_item.fileSize}</TableCell>
                      <TableCell>{export_item.records.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {export_item.status === "completed" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            View Details
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

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Exports
              </CardTitle>
              <CardDescription>Automate your data exports with scheduled jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Scheduled Exports</h3>
                <p className="text-muted-foreground mb-4">Set up automatic exports to run on a schedule</p>
                <Button>Create Scheduled Export</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
