"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Users, ShoppingCart, CreditCard, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

// Mock data for conversion analytics
const conversionData = [
  { date: "2024-01-01", visitors: 1200, sessions: 980, addToCart: 245, checkout: 156, purchases: 89, revenue: 4450 },
  { date: "2024-01-02", visitors: 1350, sessions: 1100, addToCart: 278, checkout: 189, purchases: 112, revenue: 5600 },
  { date: "2024-01-03", visitors: 1180, sessions: 950, addToCart: 234, checkout: 145, purchases: 78, revenue: 3900 },
  { date: "2024-01-04", visitors: 1420, sessions: 1200, addToCart: 298, checkout: 201, purchases: 134, revenue: 6700 },
  { date: "2024-01-05", visitors: 1580, sessions: 1350, addToCart: 345, checkout: 234, purchases: 156, revenue: 7800 },
  { date: "2024-01-06", visitors: 1680, sessions: 1420, addToCart: 378, checkout: 267, purchases: 189, revenue: 9450 },
  { date: "2024-01-07", visitors: 1750, sessions: 1500, addToCart: 398, checkout: 289, purchases: 201, revenue: 10050 },
]

const funnelData = [
  { stage: "Visitors", count: 12000, percentage: 100, color: "#3b82f6" },
  { stage: "Sessions", count: 9800, percentage: 81.7, color: "#8b5cf6" },
  { stage: "Add to Cart", count: 2800, percentage: 23.3, color: "#10b981" },
  { stage: "Checkout", count: 1890, percentage: 15.8, color: "#f59e0b" },
  { stage: "Purchase", count: 1234, percentage: 10.3, color: "#ef4444" },
]

const deviceData = [
  { device: "Desktop", visitors: 4500, conversions: 567, rate: 12.6 },
  { device: "Mobile", visitors: 6200, conversions: 496, rate: 8.0 },
  { device: "Tablet", visitors: 1300, conversions: 171, rate: 13.2 },
]

const sourceData = [
  { source: "Organic Search", visitors: 3800, conversions: 456, rate: 12.0, color: "#3b82f6" },
  { source: "Paid Search", visitors: 2100, conversions: 294, rate: 14.0, color: "#8b5cf6" },
  { source: "Social Media", visitors: 1900, conversions: 152, rate: 8.0, color: "#10b981" },
  { source: "Direct", visitors: 2400, conversions: 288, rate: 12.0, color: "#f59e0b" },
  { source: "Email", visitors: 1200, conversions: 144, rate: 12.0, color: "#ef4444" },
  { source: "Referral", visitors: 600, conversions: 90, rate: 15.0, color: "#6b7280" },
]

export default function ConversionAnalyticsPage() {
  const [timeRange, setTimeRange] = React.useState("7d")
  const [selectedMetric, setSelectedMetric] = React.useState("conversion_rate")

  const overallStats = React.useMemo(() => {
    const totalVisitors = conversionData.reduce((sum, day) => sum + day.visitors, 0)
    const totalPurchases = conversionData.reduce((sum, day) => sum + day.purchases, 0)
    const totalRevenue = conversionData.reduce((sum, day) => sum + day.revenue, 0)
    const conversionRate = ((totalPurchases / totalVisitors) * 100).toFixed(2)
    const avgOrderValue = (totalRevenue / totalPurchases).toFixed(2)

    return {
      totalVisitors,
      totalPurchases,
      totalRevenue,
      conversionRate: Number.parseFloat(conversionRate),
      avgOrderValue: Number.parseFloat(avgOrderValue),
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversion Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze your conversion funnel performance and optimization opportunities
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {overallStats.totalVisitors.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {overallStats.totalPurchases.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {overallStats.conversionRate}%
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              ${overallStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.7% from last period
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">${overallStats.avgOrderValue}</div>
            <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +6.8% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Track users through each stage of the conversion process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{stage.count.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{stage.percentage}%</div>
                    </div>
                  </div>
                  <Progress
                    value={stage.percentage}
                    className="h-2"
                    style={{
                      background: `linear-gradient(to right, ${stage.color} 0%, ${stage.color}40 100%)`,
                    }}
                  />
                  {index < funnelData.length - 1 && (
                    <div className="text-xs text-muted-foreground text-center">
                      Drop-off: {(funnelData[index].percentage - funnelData[index + 1].percentage).toFixed(1)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Conversion rates by traffic source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((source) => (
                <div key={source.source} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <div>
                      <div className="font-medium">{source.source}</div>
                      <div className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitors</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{source.rate}%</div>
                    <div className="text-sm text-muted-foreground">{source.conversions} conversions</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Trends</CardTitle>
          <CardDescription>Daily conversion metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              visitors: { label: "Visitors", color: "hsl(var(--chart-1))" },
              purchases: { label: "Purchases", color: "hsl(var(--chart-2))" },
              revenue: { label: "Revenue", color: "hsl(var(--chart-3))" },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  name="Visitors"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="purchases"
                  stroke="var(--color-purchases)"
                  strokeWidth={2}
                  name="Purchases"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Device Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Device Performance</CardTitle>
          <CardDescription>Conversion rates across different device types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {deviceData.map((device) => (
              <div key={device.device} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{device.device}</h3>
                  <Badge variant="outline">{device.rate}%</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Visitors</span>
                    <span>{device.visitors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversions</span>
                    <span>{device.conversions.toLocaleString()}</span>
                  </div>
                  <Progress value={device.rate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
