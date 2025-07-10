"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, Star, Timer, Flame, Zap, TrendingUp, Clock, Heart, Eye } from "lucide-react"
import Image from "next/image"

const flashDeals = [
  {
    id: 1,
    name: "Wireless Gaming Headset",
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    discount: 50,
    timeLeft: { hours: 2, minutes: 34, seconds: 15 },
    sold: 72,
    total: 100,
    badge: "Flash Deal",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 79.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    discount: 50,
    timeLeft: { hours: 1, minutes: 45, seconds: 30 },
    sold: 89,
    total: 120,
    badge: "Hot Deal",
  },
  {
    id: 3,
    name: "Bluetooth Speaker Pro",
    price: 39.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 342,
    image: "/placeholder.svg?height=300&width=300",
    discount: 50,
    timeLeft: { hours: 3, minutes: 12, seconds: 45 },
    sold: 156,
    total: 200,
    badge: "Limited",
  },
]

const dailyDeals = [
  {
    id: 4,
    name: "Premium Coffee Maker",
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300",
    discount: 40,
    badge: "Daily Deal",
    category: "Kitchen",
  },
  {
    id: 5,
    name: "Ergonomic Office Chair",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.4,
    reviews: 123,
    image: "/placeholder.svg?height=300&width=300",
    discount: 33,
    badge: "Office",
    category: "Furniture",
  },
  {
    id: 6,
    name: "4K Webcam HD",
    price: 59.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviews: 267,
    image: "/placeholder.svg?height=300&width=300",
    discount: 40,
    badge: "Tech Deal",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 445,
    image: "/placeholder.svg?height=300&width=300",
    discount: 40,
    badge: "Fitness",
    category: "Sports",
  },
  {
    id: 8,
    name: "LED Desk Lamp",
    price: 34.99,
    originalPrice: 59.99,
    rating: 4.2,
    reviews: 178,
    image: "/placeholder.svg?height=300&width=300",
    discount: 42,
    badge: "Home",
    category: "Lighting",
  },
]

const weeklyDeals = [
  {
    id: 9,
    name: "Laptop Stand Adjustable",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    discount: 38,
    badge: "Weekly Special",
    category: "Office",
  },
  {
    id: 10,
    name: "Wireless Charging Pad",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.4,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    discount: 38,
    badge: "Tech",
    category: "Electronics",
  },
]

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(countdown)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-16 grid-rows-8 h-full">
            {[...Array(128)].map((_, i) => (
              <div key={i} className="border border-white/20 flex items-center justify-center">
                <Flame className="w-3 h-3 text-white animate-pulse" style={{ animationDelay: `${i * 0.02}s` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
                <Flame className="h-8 w-8 text-red-200" />
              </div>
              <span className="text-xl font-semibold">🔥 Hot Deals Alert!</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent">
              Deals & Offers
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Unbeatable prices on your favorite products. Limited time offers you can't miss!
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Timer className="h-5 w-5 text-red-200" />
                <span className="text-lg font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="text-lg">Until next flash sale!</span>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Shop Flash Deals
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                View All Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-red-500 animate-pulse" />
              <span className="text-2xl font-bold text-red-600">Flash Deals</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">⚡ Lightning Fast Savings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Limited quantity, limited time. These deals won't last long!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashDeals.map((deal) => (
              <Card
                key={deal.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-red-200 bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 text-white border-0 animate-pulse">
                      -{deal.discount}% OFF
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      {deal.badge}
                    </Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-bold">
                            {String(deal.timeLeft.hours).padStart(2, "0")}:
                            {String(deal.timeLeft.minutes).padStart(2, "0")}:
                            {String(deal.timeLeft.seconds).padStart(2, "0")}
                          </span>
                        </div>
                        <Progress value={(deal.sold / deal.total) * 100} className="h-2 mb-1" />
                        <p className="text-xs">
                          {deal.sold}/{deal.total} sold
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {deal.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(deal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({deal.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-red-600">${deal.price}</span>
                      <span className="text-lg text-gray-400 line-through">${deal.originalPrice}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white border-0">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Grab Deal Now!
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Deals */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-semibold text-orange-600">Daily Specials</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Today's Best Deals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fresh deals every day. Check back tomorrow for new offers!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {dailyDeals.map((deal) => (
              <Card
                key={deal.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.name}
                      width={300}
                      height={300}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs">
                      -{deal.discount}%
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs">
                      {deal.badge}
                    </Badge>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full h-8 w-8 p-0">
                          <Heart className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-1">{deal.category}</p>
                    <h3 className="font-semibold mb-2 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {deal.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-2 w-2 ${
                              i < Math.floor(deal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({deal.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-lg font-bold text-orange-600">${deal.price}</span>
                      <span className="text-xs text-gray-400 line-through">${deal.originalPrice}</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 text-xs"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Deals */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Weekly Specials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Extended deals that last all week long</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weeklyDeals.map((deal) => (
              <Card
                key={deal.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-1/2 overflow-hidden">
                      <Image
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        -{deal.discount}%
                      </Badge>
                    </div>
                    <div className="w-1/2 p-6 flex flex-col justify-center">
                      <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {deal.badge}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                        {deal.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(deal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">({deal.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-purple-600">${deal.price}</span>
                        <span className="text-lg text-gray-400 line-through">${deal.originalPrice}</span>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
            <p className="text-xl mb-8 text-red-100">
              Subscribe to our newsletter and be the first to know about flash sales and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-red-600 hover:bg-gray-100 px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
