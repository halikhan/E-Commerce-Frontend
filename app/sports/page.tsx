"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Search, Heart, Dumbbell, Trophy, Target, Bike, Waves, Mountain } from "lucide-react"
import Link from "next/link"

const subcategories = [
  { name: "Fitness Equipment", icon: Dumbbell, count: 156, href: "/sports/fitness" },
  { name: "Team Sports", icon: Trophy, count: 234, href: "/sports/team" },
  { name: "Outdoor Sports", icon: Mountain, count: 189, href: "/sports/outdoor" },
  { name: "Water Sports", icon: Waves, count: 98, href: "/sports/water" },
  { name: "Cycling", icon: Bike, count: 145, href: "/sports/cycling" },
  { name: "Target Sports", icon: Target, count: 87, href: "/sports/target" },
]

const products = [
  {
    id: 1,
    name: "Professional Basketball",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Official Size",
    brand: "Spalding",
    category: "Team Sports",
    sport: "Basketball",
    inStock: true,
  },
  {
    id: 2,
    name: "Adjustable Dumbbells Set",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    brand: "Bowflex",
    category: "Fitness Equipment",
    sport: "Fitness",
    inStock: true,
  },
  {
    id: 3,
    name: "Mountain Bike Helmet",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Safety Certified",
    brand: "Giro",
    category: "Cycling",
    sport: "Cycling",
    inStock: true,
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 567,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Eco-Friendly",
    brand: "Manduka",
    category: "Fitness Equipment",
    sport: "Yoga",
    inStock: true,
  },
  {
    id: 5,
    name: "Swimming Goggles Pro",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.4,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Anti-Fog",
    brand: "Speedo",
    category: "Water Sports",
    sport: "Swimming",
    inStock: false,
  },
  {
    id: 6,
    name: "Tennis Racket Carbon",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Professional",
    brand: "Wilson",
    category: "Target Sports",
    sport: "Tennis",
    inStock: true,
  },
]

const brands = ["Nike", "Adidas", "Under Armour", "Spalding", "Wilson", "Bowflex", "Giro", "Speedo"]
const sports = ["Basketball", "Football", "Tennis", "Swimming", "Cycling", "Fitness", "Yoga", "Running"]

export default function SportsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSports, setSelectedSports] = useState<string[]>([])
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
                <Input placeholder="Search sports equipment..." className="pl-10" />
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
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium">Sports</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-6 w-6" />
              <Badge className="bg-yellow-500 text-black">Champion Gear</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sports & Fitness</h1>
            <p className="text-xl text-white/90 mb-6">
              Gear up for victory with professional sports equipment and fitness gear
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop Equipment
            </Button>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Sport</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map((subcategory) => (
              <Link key={subcategory.name} href={subcategory.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <subcategory.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-orange-600 transition-colors">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-500">{subcategory.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>\
