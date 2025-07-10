"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Search,
  Heart,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Book,
  Palette,
  Car,
  Baby,
  Gamepad2,
  Music,
  Utensils,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allCategories = [
  {
    name: "Electronics",
    description: "Latest gadgets and tech innovations",
    image: "/placeholder.svg?height=300&width=400",
    icon: Smartphone,
    count: "1,234 items",
    href: "/electronics",
    color: "from-blue-500 to-purple-500",
    featured: true,
    trending: true,
  },
  {
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "/placeholder.svg?height=300&width=400",
    icon: Shirt,
    count: "2,567 items",
    href: "/fashion",
    color: "from-pink-500 to-rose-500",
    featured: true,
    trending: false,
  },
  {
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "/placeholder.svg?height=300&width=400",
    icon: Home,
    count: "890 items",
    href: "/home-garden",
    color: "from-green-500 to-emerald-500",
    featured: true,
    trending: false,
  },
  {
    name: "Sports & Fitness",
    description: "Gear up for your active lifestyle",
    image: "/placeholder.svg?height=300&width=400",
    icon: Dumbbell,
    count: "456 items",
    href: "/sports",
    color: "from-orange-500 to-red-500",
    featured: true,
    trending: true,
  },
  {
    name: "Books & Media",
    description: "Knowledge and entertainment",
    image: "/placeholder.svg?height=300&width=400",
    icon: Book,
    count: "3,421 items",
    href: "/books",
    color: "from-indigo-500 to-purple-500",
    featured: false,
    trending: false,
  },
  {
    name: "Beauty & Personal Care",
    description: "Look and feel your best",
    image: "/placeholder.svg?height=300&width=400",
    icon: Palette,
    count: "678 items",
    href: "/beauty",
    color: "from-cyan-500 to-blue-500",
    featured: false,
    trending: true,
  },
  {
    name: "Automotive",
    description: "Car accessories and parts",
    image: "/placeholder.svg?height=300&width=400",
    icon: Car,
    count: "234 items",
    href: "/automotive",
    color: "from-gray-500 to-slate-500",
    featured: false,
    trending: false,
  },
  {
    name: "Baby & Kids",
    description: "Everything for little ones",
    image: "/placeholder.svg?height=300&width=400",
    icon: Baby,
    count: "567 items",
    href: "/baby",
    color: "from-yellow-500 to-orange-500",
    featured: false,
    trending: false,
  },
  {
    name: "Gaming",
    description: "Games and gaming accessories",
    image: "/placeholder.svg?height=300&width=400",
    icon: Gamepad2,
    count: "345 items",
    href: "/gaming",
    color: "from-purple-500 to-pink-500",
    featured: false,
    trending: true,
  },
  {
    name: "Music & Instruments",
    description: "Make beautiful music",
    image: "/placeholder.svg?height=300&width=400",
    icon: Music,
    count: "123 items",
    href: "/music",
    color: "from-teal-500 to-cyan-500",
    featured: false,
    trending: false,
  },
  {
    name: "Food & Beverages",
    description: "Gourmet foods and beverages",
    image: "/placeholder.svg?height=300&width=400",
    icon: Utensils,
    count: "789 items",
    href: "/food",
    color: "from-red-500 to-orange-500",
    featured: false,
    trending: false,
  },
]

const featuredCategories = allCategories.filter((cat) => cat.featured)
const trendingCategories = allCategories.filter((cat) => cat.trending)

export default function CategoriesPage() {
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
                <Input placeholder="Search categories..." className="pl-10" />
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
            <span className="font-medium">All Categories</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">All Categories</h1>
            <p className="text-xl text-white/90 mb-8">
              Explore our complete collection of products across all categories. Find exactly what you're looking for.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Start Shopping
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Categories</h2>
            <p className="text-xl text-gray-600">Our most popular shopping destinations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <category.icon className="h-16 w-16 text-white" />
                      </div>
                      {category.trending && (
                        <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">Trending</Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{category.description}</p>
                      <p className="text-sm text-gray-500 font-medium">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🔥 Trending Now</h2>
            <p className="text-xl text-gray-600">Categories that are hot right now</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCategories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-1/3">
                        <div className={`h-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <category.icon className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-red-500 text-white">Hot</Badge>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Browse All Categories</h2>
            <p className="text-xl text-gray-600">Complete collection of all our product categories</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCategories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                      {category.trending && <Badge className="bg-red-500 text-white text-xs">Hot</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
