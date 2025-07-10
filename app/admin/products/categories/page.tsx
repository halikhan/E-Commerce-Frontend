"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, FolderTree, Package } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and gadgets",
    products: 245,
    status: "Active",
    parent: null,
    children: [
      { id: 11, name: "Smartphones", products: 89, parent: "Electronics" },
      { id: 12, name: "Laptops", products: 67, parent: "Electronics" },
      { id: 13, name: "Headphones", products: 89, parent: "Electronics" },
    ],
  },
  {
    id: 2,
    name: "Fashion",
    slug: "fashion",
    description: "Clothing and accessories",
    products: 189,
    status: "Active",
    parent: null,
    children: [
      { id: 21, name: "Men's Clothing", products: 78, parent: "Fashion" },
      { id: 22, name: "Women's Clothing", products: 95, parent: "Fashion" },
      { id: 23, name: "Accessories", products: 16, parent: "Fashion" },
    ],
  },
  {
    id: 3,
    name: "Home & Garden",
    slug: "home-garden",
    description: "Home improvement and garden supplies",
    products: 156,
    status: "Active",
    parent: null,
    children: [
      { id: 31, name: "Furniture", products: 67, parent: "Home & Garden" },
      { id: 32, name: "Kitchen", products: 45, parent: "Home & Garden" },
      { id: 33, name: "Garden Tools", products: 44, parent: "Home & Garden" },
    ],
  },
  {
    id: 4,
    name: "Sports",
    slug: "sports",
    description: "Sports equipment and fitness gear",
    products: 98,
    status: "Active",
    parent: null,
    children: [
      { id: 41, name: "Fitness Equipment", products: 34, parent: "Sports" },
      { id: 42, name: "Outdoor Sports", products: 28, parent: "Sports" },
      { id: 43, name: "Team Sports", products: 36, parent: "Sports" },
    ],
  },
  {
    id: 5,
    name: "Books",
    slug: "books",
    description: "Books and educational materials",
    products: 234,
    status: "Draft",
    parent: null,
    children: [],
  },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 2, 3, 4])

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Product Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories and subcategories</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input id="categoryName" placeholder="Enter category name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categorySlug">URL Slug</Label>
                <Input id="categorySlug" placeholder="category-slug" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentCategory">Parent Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home-garden">Home & Garden</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryDescription">Description</Label>
                <Textarea id="categoryDescription" placeholder="Category description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Category</Button>
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
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">5 main + 12 subcategories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">1 draft category</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">922</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Products/Category</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54</div>
            <p className="text-xs text-muted-foreground">Per category</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Tree */}
      <Card>
        <CardHeader>
          <CardTitle>Category Hierarchy ({filteredCategories.length} categories)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border rounded-lg">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <FolderTree className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={category.status === "Active" ? "default" : "secondary"}>{category.status}</Badge>
                    <span className="text-sm text-muted-foreground">{category.products} products</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                {expandedCategories.includes(category.id) && category.children.length > 0 && (
                  <div className="border-t bg-muted/20">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-4 pl-12 border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{child.name}</div>
                            <div className="text-sm text-muted-foreground">Subcategory of {child.parent}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{child.products} products</span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
