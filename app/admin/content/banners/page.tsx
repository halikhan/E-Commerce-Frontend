"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ImageIcon, Plus, Edit, Trash2, Eye, EyeOff, Calendar, Target } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const bannerData = [
  {
    id: 1,
    title: "Summer Sale 2024",
    description: "Up to 50% off on summer collection",
    image: "/placeholder.svg?height=200&width=800",
    position: "hero",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    clicks: 1250,
    impressions: 15600,
    ctr: 8.01,
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Check out our latest products",
    image: "/placeholder.svg?height=200&width=800",
    position: "sidebar",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    clicks: 890,
    impressions: 12400,
    ctr: 7.18,
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "Free shipping on orders over $75",
    image: "/placeholder.svg?height=200&width=800",
    position: "top-bar",
    status: "scheduled",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    clicks: 0,
    impressions: 0,
    ctr: 0,
  },
]

const positions = [
  { value: "hero", label: "Hero Section" },
  { value: "top-bar", label: "Top Bar" },
  { value: "sidebar", label: "Sidebar" },
  { value: "footer", label: "Footer" },
  { value: "popup", label: "Popup Modal" },
]

export default function BannersPage() {
  const [banners, setBanners] = useState(bannerData)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newBanner, setNewBanner] = useState({
    title: "",
    description: "",
    position: "hero",
    startDate: "",
    endDate: "",
    targetUrl: "",
    status: "draft",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleBannerStatus = (id: number) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, status: banner.status === "active" ? "draft" : "active" } : banner,
      ),
    )
  }

  const handleCreateBanner = () => {
    const banner = {
      id: banners.length + 1,
      ...newBanner,
      clicks: 0,
      impressions: 0,
      ctr: 0,
      image: "/placeholder.svg?height=200&width=800",
    }
    setBanners((prev) => [...prev, banner])
    setNewBanner({
      title: "",
      description: "",
      position: "hero",
      startDate: "",
      endDate: "",
      targetUrl: "",
      status: "draft",
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banner Management</h1>
          <p className="text-muted-foreground">Create and manage promotional banners across your site</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Banner</DialogTitle>
              <DialogDescription>Design a new promotional banner for your website</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="banner-title">Banner Title</Label>
                  <Input
                    id="banner-title"
                    value={newBanner.title}
                    onChange={(e) => setNewBanner((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter banner title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-position">Position</Label>
                  <Select
                    value={newBanner.position}
                    onValueChange={(value) => setNewBanner((prev) => ({ ...prev, position: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos.value} value={pos.value}>
                          {pos.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="banner-description">Description</Label>
                <Textarea
                  id="banner-description"
                  value={newBanner.description}
                  onChange={(e) => setNewBanner((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter banner description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-url">Target URL</Label>
                <Input
                  id="target-url"
                  value={newBanner.targetUrl}
                  onChange={(e) => setNewBanner((prev) => ({ ...prev, targetUrl: e.target.value }))}
                  placeholder="https://example.com/landing-page"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newBanner.startDate}
                    onChange={(e) => setNewBanner((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newBanner.endDate}
                    onChange={(e) => setNewBanner((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Banner Image</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your image here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateBanner}>Create Banner</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Banners</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.filter((b) => b.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently displaying</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.reduce((sum, b) => sum + b.clicks, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(banners.reduce((sum, b) => sum + b.ctr, 0) / banners.length).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">Click-through rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Banners</CardTitle>
          <CardDescription>Manage your promotional banners and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.title}
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{banner.title}</div>
                        <div className="text-sm text-muted-foreground">{banner.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{positions.find((p) => p.value === banner.position)?.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(banner.status)}>{banner.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(banner.startDate).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">to {new Date(banner.endDate).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{banner.clicks} clicks</div>
                      <div className="text-muted-foreground">{banner.ctr}% CTR</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleBannerStatus(banner.id)}>
                        {banner.status === "active" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
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
    </div>
  )
}
