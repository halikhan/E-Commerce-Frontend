"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  Home,
  Leaf,
  Lightbulb,
  Sofa,
  TreePine,
  Utensils,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const subcategories = [
  { name: "Furniture", icon: Sofa, count: 234, href: "/home-garden/furniture" },
  { name: "Lighting", icon: Lightbulb, count: 156, href: "/home-garden/lighting" },
  { name: "Garden Tools", icon: TreePine, count: 189, href: "/home-garden/tools" },
  { name: "Kitchen", icon: Utensils, count: 298, href: "/home-garden/kitchen" },
  { name: "Plants", icon: Leaf, count: 145, href: "/home-garden/plants" },
  { name: "Decor", icon: Home, count: 187, href: "/home-garden/decor" },
]

const products = [
  {
    id: 1,
    name: "Modern Dining Table Set",
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Best Seller",
    brand: "IKEA",
    category: "Furniture",
    inStock: true,
    room: "Dining Room",
  },
  {
    id: 2,
    name: "LED Ceiling Light Fixture",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Energy Efficient",
    brand: "Philips",
    category: "Lighting",
    inStock: true,
    room: "Living Room",
  },
  {
    id: 3,
    name: "Garden Tool Set (20 pieces)",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Complete Set",
    brand: "Fiskars",
    category: "Garden Tools",
    inStock: true,
    room: "Garden",
  },
  {
    id: 4,
    name: "Stainless Steel Cookware Set",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 345,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Professional",
    brand: "Cuisinart",
    category: "Kitchen",
    inStock: true,
    room: "Kitchen",
  },
  {
    id: 5,
    name: "Indoor Plant Collection",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviews: 123,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Air Purifying",
    brand: "PlantShop",
    category: "Plants",
    inStock: false,
    room: "Any Room",
  },
  {
    id: 6,
    name: "Decorative Wall Art Set",
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.3,
    reviews: 78,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Handmade",
    brand: "ArtisanCraft",
    category: "Decor",
    inStock: true,
    room: "Living Room",
  },
]

const brands = ["IKEA", "Philips", "Fiskars", "Cuisinart", "PlantShop", "ArtisanCraft", "West Elm", "CB2"]
const rooms = ["Living Room", "Bedroom", "Kitchen", "Dining Room", "Bathroom", "Garden", "Office"]

export default function HomeGardenPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EcomStore
              </span>
            </Link>
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search home & garden..." className="pl-10" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Home & Garden</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6" />
              <Badge className="bg-yellow-500 text-black">Home Essentials</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Home & Garden</h1>
            <p className="text-xl text-white/90 mb-6">
              Transform your space with beautiful furniture, decor, and garden essentials
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((subcategory) => (
              <Link key={subcategory.name} href={subcategory.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <subcategory.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-green-600 transition-colors">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-500">{subcategory.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={1500} step={25} className="mb-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Room</h4>
                  <div className="space-y-2">
                    {rooms.map((room) => (
                      <div key={room} className="flex items-center space-x-2">
                        <Checkbox id={room} />
                        <label htmlFor={room} className="text-sm cursor-pointer">
                          {room}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
                          <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          & Up
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-gray-600">Showing {products.length} of 890 products</span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border rounded-md px-3 py-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">{product.badge}</Badge>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary" className="bg-gray-800 text-white">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {product.room}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-green-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
