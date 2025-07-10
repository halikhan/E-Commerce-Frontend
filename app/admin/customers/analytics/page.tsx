"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Calendar, Download } from "lucide-react"

const customerSegments = [
  { segment: "VIP Customers", count: 156, percentage: 6.1, avgOrderValue: 285.5, totalSpent: 44532.0 },
  { segment: "Frequent Buyers", count: 423, percentage: 16.6, avgOrderValue: 165.25, totalSpent: 69901.75 },
  { segment: "Regular Customers", count: 1245, percentage: 48.9, avgOrderValue: 95.8, totalSpent: 119271.0 },
  { segment: "New Customers", count: 719, percentage: 28.4, avgOrderValue: 67.45, totalSpent: 48485.55 },
]

const topCustomers = [
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    orders: 24,
    totalSpent: 3456.78,
    avgOrderValue: 144.03,
    lastOrder: "2024-01-20",
  },
  {
    name: "Michael Chen",
    email: "michael@example.com",
    orders: 19,
    totalSpent: 2987.45,
    avgOrderValue: 157.23,
    lastOrder: "2024-01-19",
  },
  {
    name: "Emily Davis",
    email: "emily@example.com",
    orders: 22,
    totalSpent: 2834.56,
    avgOrderValue: 128.84,
    lastOrder: "2024-01-18",
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    orders: 16,
    totalSpent: 2567.89,
    avgOrderValue: 160.49,
    lastOrder: "2024-01-17",
  },
  {
    name: "Lisa Anderson",
    email: "lisa@example.com",
    orders: 18,
    totalSpent: 2345.67,
    avgOrderValue: 130.31,
    lastOrder: "2024-01-16",
  },
]

const cohortData = [
  { month: "Jan 2024", newCustomers: 245, retained1Month: 147, retained3Month: 98, retained6Month: 73 },
  { month: "Dec 2023", newCustomers: 198, retained1Month: 134, retained3Month: 89, retained6Month: 67 },
  { month: "Nov 2023", newCustomers: 223, retained1Month: 156, retained3Month: 112, retained6Month: 89 },
  { month: "Oct 2023", newCustomers: 189, retained1Month: 123, retained3Month: 87, retained6Month: 65 },
]

export default function CustomerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Customer Analytics</h1>
          <p className="text-muted-foreground">Analyze customer behavior and lifetime value</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156.78</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89.45</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Purchase Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.8%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.7% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{segment.count} customers</span>
                      <span>{segment.percentage}% of total</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold">${segment.avgOrderValue.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Avg Order Value</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Acquisition Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Acquisition Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Customer Acquisition Chart</h3>
                <p className="text-muted-foreground">Interactive chart showing customer growth over time</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">+245</div>
                    <div className="text-muted-foreground">New This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">12.5%</div>
                    <div className="text-muted-foreground">Growth Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers by Value</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Avg Order Value</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>${customer.avgOrderValue.toFixed(2)}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.totalSpent > 3000 ? "default" : customer.totalSpent > 2000 ? "secondary" : "outline"
                      }
                    >
                      {customer.totalSpent > 3000 ? "VIP" : customer.totalSpent > 2000 ? "Premium" : "Regular"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cohort Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Retention Cohort Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cohort Month</TableHead>
                  <TableHead>New Customers</TableHead>
                  <TableHead>1 Month Retention</TableHead>
                  <TableHead>3 Month Retention</TableHead>
                  <TableHead>6 Month Retention</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohortData.map((cohort, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{cohort.month}</TableCell>
                    <TableCell>{cohort.newCustomers}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{cohort.retained1Month}</span>
                        <Badge variant="outline">
                          {((cohort.retained1Month / cohort.newCustomers) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{cohort.retained3Month}</span>
                        <Badge variant="outline">
                          {((cohort.retained3Month / cohort.newCustomers) * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{cohort.retained6Month}</span>
                        <Badge variant="outline">
                          {((cohort.retained6Month / cohort.newCustomers) * 100).toFixed(1)}%
                        </Badge>
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
