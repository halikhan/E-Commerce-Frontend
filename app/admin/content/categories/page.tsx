"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Folder, Plus, Edit, Trash2, Eye, EyeOff, Search, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const categories = [
  {
    id: 1,
    name: "Fashion & Style",
    slug: "fashion-style",
    description: "Latest fashion trends and style guides",
    postCount: 24,
    status: "active",
    featured: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Technology",
    slug: "technology",
    description: "Tech reviews and gadget guides",
    postCount: 18,
    status: "active",
    featured: false,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    description: "Home improvement and gardening tips",
    postCount: 15,
    status: "active",
    featured: true,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
  },
  {
    id: 4,
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Health tips and wellness advice",
    postCount: 12,
    status: "inactive",
    featured: false,
    createdAt: "2024-01-03",
    updatedAt: "2024-01-10",
  },
  {
    id: 5,
    name: "Travel",
    slug: "travel",
    description: "Travel guides and destination reviews",
    postCount: 8,
    status: "active",
    featured: false,
    createdAt: "2023-12-28",
    updatedAt: "2024-01-08",
  },
]

export default function ContentCategories() {
  const [categoryList, setCategoryList] = useState(categories)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    featured: false,
  })

  const filteredCategories = categoryList.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || category.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleCategoryStatus = (id: number) => {
    setCategoryList((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, status: category.status === "active" ? "inactive" : "active" } : category,
      ),
    )
  }

  const toggleFeatured = (id: number) => {
    setCategoryList((prev) =>
      prev.map((category) => (category.id === id ? { ...category, featured: !category.featured } : category)),
    )
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleCreateCategory = () => {
    const category = {
      id: categoryList.length + 1,
      ...newCategory,
      slug: newCategory.slug || generateSlug(newCategory.name),
      postCount: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    setCategoryList((prev) => [...prev, category])
    setNewCategory({ name: "", slug: "", description: "", featured: false })
    setIsCreateDialogOpen(false)
  }

  const totalCategories = categoryList.length
  const activeCategories = categoryList.filter((c) => c.status === "active").length
  const featuredCategories = categoryList.filter((c) => c.featured).length
  const totalPosts = categoryList.reduce((sum, c) => sum + c.postCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Categories</h1>
          <p className="text-muted-foreground">Organize your blog content with categories</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>Add a new category to organize your blog content</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newCategory.name}
                  onChange={(e) => {
                    const name = e.target.value
                    setNewCategory((prev) => ({
                      ...prev,
                      name,
                      slug: generateSlug(name),
                    }))
                  }}
                  placeholder="Enter category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-slug">URL Slug</Label>
                <Input
                  id="category-slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="category-url-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this category"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newCategory.featured}
                  onCheckedChange={(checked) => setNewCategory((prev) => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Category</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCategory}>Create Category</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCategories}</div>
            <p className="text-xs text-muted-foreground">Currently visible</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredCategories}</div>
            <p className="text-xs text-muted-foreground">Featured categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Content Categories</CardTitle>
              <CardDescription>Manage your blog post categories</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{category.slug}</code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.postCount} posts</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(category.status)}>{category.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={category.featured} onCheckedChange={() => toggleFeatured(category.id)} size="sm" />
                  </TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleCategoryStatus(category.id)}>
                        {category.status === "active" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
