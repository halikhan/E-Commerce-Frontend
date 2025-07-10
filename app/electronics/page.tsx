"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingCart,
  Search,
  Filter,
  Star,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  Zap,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Speaker,
  Eye,
  TrendingUp,
  Flame,
  Truck,
  Shield,
  RotateCcw,
  DollarSign,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Trending notification data
const trendingNotifications = [
  "🔥 iPhone 15 Pro - 50 sold in last hour!",
  "⚡ MacBook Pro M3 - Limited stock remaining!",
  "🎧 Sony WH-1000XM5 - #1 Best Seller!",
  "📱 Samsung Galaxy S24 - New arrival trending!",
  "💻 Gaming Laptops - Up to 40% off today!",
]

const subcategories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    count: 234,
    href: "/electronics/smartphones",
    color: "from-blue-500 to-cyan-500",
  },
  { name: "Laptops", icon: Laptop, count: 156, href: "/electronics/laptops", color: "from-purple-500 to-pink-500" },
  {
    name: "Headphones",
    icon: Headphones,
    count: 189,
    href: "/electronics/headphones",
    color: "from-green-500 to-emerald-500",
  },
  { name: "Cameras", icon: Camera, count: 98, href: "/electronics/cameras", color: "from-orange-500 to-red-500" },
  {
    name: "Smart Watches",
    icon: Watch,
    count: 145,
    href: "/electronics/watches",
    color: "from-indigo-500 to-purple-500",
  },
  { name: "Speakers", icon: Speaker, count: 87, href: "/electronics/speakers", color: "from-pink-500 to-rose-500" },
]

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviews: 2847,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    brand: "Apple",
    category: "Smartphones",
    inStock: true,
    fastDelivery: true,
    warranty: "2 years",
    features: ["5G Ready", "Pro Camera", "A17 Pro Chip", "Titanium Design"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    trending: true,
    discount: 8,
    model3D: true,
  },
  {
    id: 2,
    name: "MacBook Pro 16-inch M3 Max",
    price: 2499.99,
    originalPrice: 2799.99,
    rating: 4.8,
    reviews: 1923,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Pro Choice",
    brand: "Apple",
    category: "Laptops",
    inStock: true,
    fastDelivery: true,
    warranty: "1 year",
    features: ["M3 Max Chip", "18-hour Battery", "Liquid Retina XDR", "Studio-quality Mics"],
    colors: ["Space Gray", "Silver"],
    trending: true,
    discount: 11,
    model3D: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 3456,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Editor's Choice",
    brand: "Sony",
    category: "Headphones",
    inStock: true,
    fastDelivery: false,
    warranty: "2 years",
    features: ["Industry Leading ANC", "30hr Battery", "Multipoint Connection", "Quick Charge"],
    colors: ["Black", "Silver"],
    trending: false,
    discount: 13,
    model3D: false,
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra 512GB",
    price: 1299.99,
    originalPrice: 1399.99,
    rating: 4.6,
    reviews: 1876,
    image: "/placeholder.svg?height=300&width=300",
    badge: "AI Powered",
    brand: "Samsung",
    category: "Smartphones",
    inStock: true,
    fastDelivery: true,
    warranty: "1 year",
    features: ["Galaxy AI", "S Pen Included", "200MP Camera", "Titanium Frame"],
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    trending: true,
    discount: 7,
    model3D: true,
  },
  {
    id: 5,
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    price: 2499.99,
    originalPrice: 2699.99,
    rating: 4.8,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Professional",
    brand: "Canon",
    category: "Cameras",
    inStock: false,
    fastDelivery: false,
    warranty: "2 years",
    features: ["24.2MP Full-Frame", "40fps Burst", "8K Video", "In-Body Stabilization"],
    colors: ["Black"],
    trending: false,
    discount: 7,
    model3D: false,
  },
  {
    id: 6,
    name: "Apple Watch Series 9 GPS + Cellular",
    price: 499.99,
    originalPrice: 549.99,
    rating: 4.5,
    reviews: 2134,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Health Focus",
    brand: "Apple",
    category: "Smart Watches",
    inStock: true,
    fastDelivery: true,
    warranty: "1 year",
    features: ["S9 Chip", "Double Tap", "Precision Finding", "Carbon Neutral"],
    colors: ["Pink", "Starlight", "Midnight", "Silver", "Red"],
    trending: true,
    discount: 9,
    model3D: true,
  },
]

const brands = ["Apple", "Samsung", "Sony", "Canon", "Dell", "JBL", "Microsoft", "Google", "Bose", "LG"]

export default function ElectronicsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [currentNotification, setCurrentNotification] = useState(0)

  // Trending notification rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % trendingNotifications.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-hide notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  // Real-time filtering
  useEffect(() => {
    let filtered = products

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - trending first, then by rating
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1
          if (!a.trending && b.trending) return 1
          return b.rating - a.rating
        })
    }

    setFilteredProducts(filtered)
  }, [selectedBrands, priceRange, sortBy])

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Trending Notification Bar */}
      {showNotification && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 relative overflow-hidden animate-in slide-in-from-top duration-500">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 animate-pulse" />
              <span className="font-medium animate-in fade-in duration-1000">
                {trendingNotifications[currentNotification]}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotification(false)}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-pulse" />
        </div>
      )}

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
                <Input placeholder="Search electronics..." className="pl-10" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-500">
                  2
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-gray-50/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Electronics</span>
          </div>
        </div>
      </div>

      {/* Hero Section with 3D Elements */}
      <section className="relative h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="border border-white/20 flex items-center justify-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Zap className="w-4 h-4 text-white animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-left duration-700">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Zap className="h-8 w-8 text-yellow-300" />
              </div>
              <Badge className="bg-yellow-500 text-black font-semibold px-3 py-1">Latest Tech 2024</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-in slide-in-from-left duration-1000">
              Electronics
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-in slide-in-from-left duration-1000 delay-200">
              Discover cutting-edge technology with 3D product previews, AI recommendations, and lightning-fast delivery
            </p>
            <div className="flex gap-4 animate-in slide-in-from-left duration-1000 delay-300">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <Zap className="h-5 w-5 mr-2" />
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
              >
                <Eye className="h-5 w-5 mr-2" />
                View in 3D
              </Button>
            </div>
          </div>
        </div>

        {/* Floating 3D Product Preview */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block animate-in slide-in-from-right duration-1000 delay-500">
          <div className="relative">
            <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-xl mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <Smartphone className="h-10 w-10" />
                </div>
                <p className="font-semibold">3D Product View</p>
                <p className="text-sm opacity-75">Interactive Preview</p>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping" />
          </div>
        </div>
      </section>

      {/* Subcategories with Enhanced Design */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive electronics collection with advanced filtering and 3D product views
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {subcategories.map((subcategory, index) => (
              <Link key={subcategory.name} href={subcategory.href}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6 text-center relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${subcategory.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                    >
                      <subcategory.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{subcategory.count} items</p>
                    <Badge
                      variant="outline"
                      className="text-xs group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors"
                    >
                      Explore
                    </Badge>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-lg" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-purple-600" />
                  Smart Filters
                </h3>

                {/* Price Range with Visual Feedback */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price Range
                  </h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={3000} step={50} className="mb-3" />
                  <div className="flex justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                    <span className="font-semibold">${priceRange[0]}</span>
                    <span className="font-semibold">${priceRange[1]}</span>
                  </div>
                </div>

                {/* Enhanced Brands Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Brands ({selectedBrands.length} selected)
                  </h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div
                        key={brand}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer flex-1 font-medium">
                          {brand}
                        </label>
                        <Badge variant="outline" className="text-xs">
                          {products.filter((p) => p.brand === brand).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Features
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "3D Preview Available", icon: RotateCcw },
                      { label: "Fast Delivery", icon: Truck },
                      { label: "In Stock", icon: CheckCircle },
                      { label: "Trending", icon: TrendingUp },
                      { label: "Extended Warranty", icon: Shield },
                    ].map((feature) => (
                      <div
                        key={feature.label}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox id={feature.label} />
                        <feature.icon className="h-4 w-4 text-gray-500" />
                        <label htmlFor={feature.label} className="flex items-center text-sm cursor-pointer flex-1">
                          {feature.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Customer Rating
                  </h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer flex-1">
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
                        <Badge variant="outline" className="text-xs">
                          {products.filter((p) => p.rating >= rating).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Enhanced Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border-0">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Showing</span>
                  <Badge className="bg-purple-100 text-purple-700">{filteredProducts.length}</Badge>
                  <span className="text-sm text-gray-600">of {products.length} products</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/50 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg bg-white/50">
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

            {/* Enhanced Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Multiple Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                          -{product.discount}% OFF
                        </Badge>
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 shadow-lg">
                          {product.badge}
                        </Badge>
                        {product.trending && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg animate-pulse">
                            <Flame className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>

                      {/* Stock Status */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary" className="bg-gray-800 text-white text-lg px-4 py-2">
                            Out of Stock
                          </Badge>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {product.model3D && (
                          <Button
                            size="icon"
                            variant="secondary"
                            className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      {/* Feature Badges */}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        {product.fastDelivery && (
                          <Badge className="bg-green-500 text-white border-0 shadow-lg">
                            <Truck className="h-3 w-3 mr-1" />
                            Fast
                          </Badge>
                        )}
                        {product.model3D && (
                          <Badge className="bg-blue-500 text-white border-0 shadow-lg">
                            <RotateCcw className="h-3 w-3 mr-1" />
                            3D
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Brand and Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs font-medium">
                          {product.brand}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                          {product.warranty}
                        </Badge>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-lg mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
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
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-gray-50">
                              +{product.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="flex gap-1 mb-4">
                        {product.colors.slice(0, 4).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-gray-200 shadow-sm"
                            style={{
                              backgroundColor: color.toLowerCase().includes("black")
                                ? "#000000"
                                : color.toLowerCase().includes("white")
                                  ? "#ffffff"
                                  : color.toLowerCase().includes("blue")
                                    ? "#3b82f6"
                                    : color.toLowerCase().includes("red")
                                      ? "#ef4444"
                                      : color.toLowerCase().includes("gray")
                                        ? "#6b7280"
                                        : color.toLowerCase().includes("silver")
                                          ? "#e5e7eb"
                                          : color.toLowerCase().includes("gold")
                                            ? "#f59e0b"
                                            : "#8b5cf6",
                            }}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            +{product.colors.length - 4}
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                        <Badge className="bg-green-100 text-green-700 border-0">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </Badge>
                      </div>

                      {/* Action Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
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

            {/* Load More / Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" disabled className="bg-white/50">
                  Previous
                </Button>
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                  1
                </Button>
                <Button variant="outline" className="bg-white/50">
                  2
                </Button>
                <Button variant="outline" className="bg-white/50">
                  3
                </Button>
                <Button variant="outline" className="bg-white/50">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Buy Now Button (Mobile) */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <Button
          size="lg"
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl animate-pulse"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Quick Buy
        </Button>
      </div>
    </div>
  )
}
