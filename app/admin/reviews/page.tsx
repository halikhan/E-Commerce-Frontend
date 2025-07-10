"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Star, Search, Eye, MessageSquare, Trash2, CheckCircle, XCircle, TrendingUp, MessageCircle } from "lucide-react"

const reviewsData = [
  {
    id: 1,
    customer: "John Doe",
    customerEmail: "john@example.com",
    product: "Wireless Bluetooth Headphones",
    productId: "PRD-001",
    rating: 5,
    title: "Excellent sound quality!",
    comment:
      "These headphones exceeded my expectations. The sound quality is crystal clear and the battery life is amazing.",
    date: "2024-01-20",
    status: "approved",
    helpful: 12,
    verified: true,
    images: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: 2,
    customer: "Jane Smith",
    customerEmail: "jane@example.com",
    product: "Smart Watch Pro",
    productId: "PRD-002",
    rating: 4,
    title: "Great features, minor issues",
    comment:
      "Love the fitness tracking features. The only issue is the battery drains faster than expected during GPS usage.",
    date: "2024-01-19",
    status: "pending",
    helpful: 8,
    verified: true,
    images: [],
  },
  {
    id: 3,
    customer: "Mike Johnson",
    customerEmail: "mike@example.com",
    product: "Gaming Laptop",
    productId: "PRD-003",
    rating: 2,
    title: "Disappointed with performance",
    comment: "The laptop runs hot and the performance is not as advertised. Would not recommend.",
    date: "2024-01-18",
    status: "flagged",
    helpful: 3,
    verified: false,
    images: [],
  },
  {
    id: 4,
    customer: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    product: "Wireless Earbuds",
    productId: "PRD-004",
    rating: 5,
    title: "Perfect for workouts",
    comment: "These earbuds stay in place during intense workouts and the sound quality is fantastic.",
    date: "2024-01-17",
    status: "approved",
    helpful: 15,
    verified: true,
    images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
  },
]

const statsData = {
  totalReviews: 1247,
  averageRating: 4.2,
  pendingReviews: 23,
  flaggedReviews: 8,
  ratingDistribution: [
    { stars: 5, count: 623, percentage: 50 },
    { stars: 4, count: 312, percentage: 25 },
    { stars: 3, count: 187, percentage: 15 },
    { stars: 2, count: 75, percentage: 6 },
    { stars: 1, count: 50, percentage: 4 },
  ],
}

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const filteredReviews = reviewsData.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-muted-foreground">Manage customer reviews and product ratings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalReviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.averageRating}</div>
            <div className="flex items-center mt-1">{renderStars(Math.round(statsData.averageRating))}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statsData.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Need moderation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statsData.flaggedReviews}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">All Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {review.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.customer}</p>
                            <p className="text-sm text-muted-foreground">{review.customerEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{review.product}</p>
                          <p className="text-sm text-muted-foreground">{review.productId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div>
                          <p className="font-medium truncate">{review.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{review.comment}</p>
                          {review.verified && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedReview(review)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Details</DialogTitle>
                              </DialogHeader>
                              {selectedReview && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Customer</Label>
                                      <p className="font-medium">{selectedReview.customer}</p>
                                      <p className="text-sm text-muted-foreground">{selectedReview.customerEmail}</p>
                                    </div>
                                    <div>
                                      <Label>Product</Label>
                                      <p className="font-medium">{selectedReview.product}</p>
                                      <p className="text-sm text-muted-foreground">{selectedReview.productId}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Rating</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                      {renderStars(selectedReview.rating)}
                                      <span className="font-medium">{selectedReview.rating}/5</span>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Review Title</Label>
                                    <p className="font-medium mt-1">{selectedReview.title}</p>
                                  </div>
                                  <div>
                                    <Label>Review Comment</Label>
                                    <p className="mt-1">{selectedReview.comment}</p>
                                  </div>
                                  {selectedReview.images.length > 0 && (
                                    <div>
                                      <Label>Images</Label>
                                      <div className="flex gap-2 mt-2">
                                        {selectedReview.images.map((image: string, index: number) => (
                                          <img
                                            key={index}
                                            src={image || "/placeholder.svg"}
                                            alt={`Review image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded border"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex gap-2 pt-4">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button variant="outline">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statsData.ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <div className="text-sm text-muted-foreground w-16 text-right">
                        {item.count} ({item.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Review trends chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-approve reviews</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve reviews from verified purchases
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Require moderation</p>
                    <p className="text-sm text-muted-foreground">All reviews require manual approval</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow images</p>
                    <p className="text-sm text-muted-foreground">Allow customers to upload images with reviews</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email notifications</p>
                    <p className="text-sm text-muted-foreground">Send email when new reviews are submitted</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
