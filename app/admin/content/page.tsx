"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, ImageIcon, FileText, Eye } from "lucide-react"

const bannersData = [
  {
    id: 1,
    title: "Summer Sale 2024",
    description: "Up to 50% off on electronics",
    image: "/placeholder.svg?height=200&width=800",
    link: "/products?category=electronics",
    position: "Hero",
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    clicks: 1245,
    impressions: 15678,
  },
  {
    id: 2,
    title: "New Fashion Collection",
    description: "Discover the latest trends",
    image: "/placeholder.svg?height=200&width=800",
    link: "/products?category=fashion",
    position: "Secondary",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    clicks: 892,
    impressions: 12456,
  },
  {
    id: 3,
    title: "Free Shipping Weekend",
    description: "Free shipping on orders over $50",
    image: "/placeholder.svg?height=200&width=800",
    link: "/products",
    position: "Sidebar",
    status: "Scheduled",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    clicks: 0,
    impressions: 0,
  },
]

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Have Tech Gadgets for 2024",
    excerpt: "Discover the latest technology trends and gadgets that will revolutionize your daily life...",
    author: "John Smith",
    status: "Published",
    publishDate: "2024-01-15",
    views: 2456,
    comments: 23,
    category: "Technology",
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Fashion: A Complete Guide",
    excerpt: "Learn how to build a sustainable wardrobe without compromising on style...",
    author: "Sarah Johnson",
    status: "Published",
    publishDate: "2024-01-12",
    views: 1834,
    comments: 18,
    category: "Fashion",
    featured: false,
  },
  {
    id: 3,
    title: "Home Office Setup Ideas",
    excerpt: "Create the perfect workspace at home with these essential tips and product recommendations...",
    author: "Mike Davis",
    status: "Draft",
    publishDate: null,
    views: 0,
    comments: 0,
    category: "Home & Office",
    featured: false,
  },
  {
    id: 4,
    title: "Fitness Equipment Buying Guide",
    excerpt: "Everything you need to know before purchasing fitness equipment for your home gym...",
    author: "Lisa Wilson",
    status: "Scheduled",
    publishDate: "2024-02-01",
    views: 0,
    comments: 0,
    category: "Sports & Fitness",
    featured: false,
  },
]

export default function ContentPage() {
  const [selectedBanner, setSelectedBanner] = useState<(typeof bannersData)[0] | null>(null)
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null)
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false)
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "published":
        return "default"
      case "scheduled":
        return "secondary"
      case "draft":
        return "outline"
      case "inactive":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage homepage banners and blog content</p>
        </div>
      </div>

      <Tabs defaultValue="banners" className="space-y-4">
        <TabsList>
          <TabsTrigger value="banners">Homepage Banners</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Homepage Banners</h2>
            <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bannerTitle">Banner Title</Label>
                      <Input id="bannerTitle" placeholder="Enter banner title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bannerPosition">Position</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hero">Hero</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="sidebar">Sidebar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bannerDescription">Description</Label>
                    <Textarea id="bannerDescription" placeholder="Banner description" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bannerLink">Link URL</Label>
                    <Input id="bannerLink" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Banner Image</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Drag and drop an image here, or click to select</p>
                      <Button variant="outline" className="mt-2 bg-transparent">
                        Choose File
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsBannerDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsBannerDialogOpen(false)}>Create Banner</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Banner Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Currently displayed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,137</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28,134</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.6%</div>
                <p className="text-xs text-muted-foreground">Average CTR</p>
              </CardContent>
            </Card>
          </div>

          {/* Banners Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bannersData.map((banner) => (
              <Card key={banner.id}>
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2" variant={getStatusBadgeVariant(banner.status)}>
                      {banner.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{banner.title}</h3>
                      <Badge variant="outline">{banner.position}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{banner.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {banner.startDate} - {banner.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Clicks: {banner.clicks}</span>
                      <span>Views: {banner.impressions}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Blog Posts</h2>
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postTitle">Post Title</Label>
                    <Input id="postTitle" placeholder="Enter post title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postCategory">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="home">Home & Office</SelectItem>
                          <SelectItem value="sports">Sports & Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postAuthor">Author</Label>
                      <Input id="postAuthor" placeholder="Author name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postExcerpt">Excerpt</Label>
                    <Textarea id="postExcerpt" placeholder="Brief description of the post" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postContent">Content</Label>
                    <Textarea id="postContent" placeholder="Write your blog post content here..." rows={10} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                      Save as Draft
                    </Button>
                    <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                      Schedule
                    </Button>
                    <Button onClick={() => setIsPostDialogOpen(false)}>Publish Now</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blog Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Live on website</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Draft Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,290</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">41</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        {post.featured && <Badge variant="secondary">Featured</Badge>}
                        <Badge variant={getStatusBadgeVariant(post.status)}>{post.status}</Badge>
                      </div>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {post.author}</span>
                        <span>Category: {post.category}</span>
                        {post.publishDate && <span>Published: {post.publishDate}</span>}
                        {post.status === "Published" && (
                          <>
                            <span>Views: {post.views}</span>
                            <span>Comments: {post.comments}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
