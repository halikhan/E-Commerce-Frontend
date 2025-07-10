"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  ShoppingCart,
  Search,
  Menu,
  User,
  Heart,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  Timer,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    title: "Summer Mega Sale 2024",
    subtitle: "Up to 70% off on selected items + Free Shipping",
    image: "/placeholder.svg?height=500&width=1200",
    cta: "Shop Now",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 2,
    title: "New Tech Arrivals",
    subtitle: "Discover the latest gadgets and innovations",
    image: "/placeholder.svg?height=500&width=1200",
    cta: "Explore Tech",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 3,
    title: "Fashion Forward",
    subtitle: "Trending styles for every season",
    image: "/placeholder.svg?height=500&width=1200",
    cta: "Shop Fashion",
    color: "from-pink-600 to-rose-600",
  },
]

const categories = [
  {
    name: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    count: "1,234 items",
    href: "/electronics",
    color: "from-blue-500 to-purple-500",
    icon: "⚡",
  },
  {
    name: "Fashion",
    image: "/placeholder.svg?height=200&width=200",
    count: "2,567 items",
    href: "/fashion",
    color: "from-pink-500 to-rose-500",
    icon: "👗",
  },
  {
    name: "Home & Garden",
    image: "/placeholder.svg?height=200&width=200",
    count: "890 items",
    href: "/home-garden",
    color: "from-green-500 to-emerald-500",
    icon: "🏠",
  },
  {
    name: "Sports",
    image: "/placeholder.svg?height=200&width=200",
    count: "456 items",
    href: "/sports",
    color: "from-orange-500 to-red-500",
    icon: "⚽",
  },
  {
    name: "Books",
    image: "/placeholder.svg?height=200&width=200",
    count: "3,421 items",
    href: "/books",
    color: "from-indigo-500 to-purple-500",
    icon: "📚",
  },
  {
    name: "Beauty",
    image: "/placeholder.svg?height=200&width=200",
    count: "678 items",
    href: "/beauty",
    color: "from-cyan-500 to-blue-500",
    icon: "💄",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro Max",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1284,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Best Seller",
    discount: 25,
    colors: ["#000000", "#FFFFFF", "#FF6B6B"],
  },
  {
    id: 2,
    name: "Smart Watch Series 9",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviews: 892,
    image: "/placeholder.svg?height=400&width=300",
    badge: "New",
    discount: 33,
    colors: ["#000000", "#C0C0C0", "#FFD700"],
  },
  {
    id: 3,
    name: "Premium Laptop Stand",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviews: 2341,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Top Rated",
    discount: 31,
    colors: ["#8B4513", "#000000", "#FFFFFF"],
  },
  {
    id: 4,
    name: "USB-C Hub 7-in-1",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviews: 1567,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Popular",
    discount: 38,
    colors: ["#708090", "#000000"],
  },
]

const dealsOfTheDay = [
  {
    id: 1,
    name: "Gaming Mouse RGB Pro",
    price: 49.99,
    originalPrice: 89.99,
    discount: 44,
    image: "/placeholder.svg?height=250&width=250",
    timeLeft: "2h 34m",
    sold: 156,
    total: 200,
  },
  {
    id: 2,
    name: "Bluetooth Speaker Waterproof",
    price: 79.99,
    originalPrice: 139.99,
    discount: 43,
    image: "/placeholder.svg?height=250&width=250",
    timeLeft: "5h 12m",
    sold: 89,
    total: 150,
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing quality and lightning-fast shipping! The customer service is outstanding. Will definitely order again!",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    location: "New York, USA",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Great customer service and excellent products. The deals are unbeatable. Highly recommended to everyone!",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    location: "California, USA",
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment:
      "Perfect shopping experience! Good value for money, quick delivery, and beautiful packaging. Love this store!",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    location: "Texas, USA",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  EcomStore
                </span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10 border-2 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-purple-500">
                  2
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 h-12 text-sm">
            <Link href="/categories" className="hover:text-purple-600 font-medium transition-colors">
              All Categories
            </Link>
            <Link href="/electronics" className="hover:text-purple-600 transition-colors">
              Electronics
            </Link>
            <Link href="/fashion" className="hover:text-purple-600 transition-colors">
              Fashion
            </Link>
            <Link href="/home-garden" className="hover:text-purple-600 transition-colors">
              Home & Garden
            </Link>
            <Link href="/sports" className="hover:text-purple-600 transition-colors">
              Sports
            </Link>
            <Link
              href="/deals"
              className="text-red-600 font-bold hover:text-red-700 transition-colors flex items-center gap-1"
            >
              <Zap className="h-4 w-4" />
              Hot Deals
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className={`relative h-full bg-gradient-to-br ${slide.color}`}>
              <div className="absolute inset-0 bg-black/20" />
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover -z-10 opacity-30"
              />
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-white/20 text-white border-white/30">Limited Time</Badge>
                    <Badge className="bg-yellow-500 text-black">Free Shipping</Badge>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90">{slide.subtitle}</p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-3">
                      {slide.cta}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-3 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Category Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing products across all categories with unbeatable prices and quality
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div
                      className={`relative h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      <span className="text-4xl">{category.icon}</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600">Hand-picked favorites just for you</p>
            </div>
            <Button variant="outline" size="lg" className="hidden md:flex bg-transparent">
              View All Products
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">-{product.discount}%</Badge>
                    <Badge className="absolute top-3 right-3 bg-black/80 text-white">{product.badge}</Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-12 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3 group-hover:text-purple-600 transition-colors">
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
                      <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                      <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-red-600">⚡ Deals of the Day</h2>
            <div className="flex items-center justify-center gap-4 text-3xl font-bold">
              <div className="flex items-center gap-2">
                <Timer className="h-8 w-8 text-red-600" />
                <span className="text-red-600">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-600 mt-4">Limited time offers - Don't miss out!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {dealsOfTheDay.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-1/2">
                      <Image
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-red-600 text-white text-lg px-3 py-1">
                        -{deal.discount}%
                      </Badge>
                    </div>
                    <div className="w-1/2 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-3">{deal.name}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-red-600">${deal.price}</span>
                        <span className="text-xl text-gray-400 line-through">${deal.originalPrice}</span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>
                            Sold: {deal.sold}/{deal.total}
                          </span>
                          <span>{Math.round((deal.sold / deal.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">⏰ Ends in {deal.timeLeft}</p>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Buy Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        {testimonial.verified && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $50 worldwide</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Easy Returns</h4>
                <p className="text-sm text-gray-600">30-day hassle-free returns</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Secure Payment</h4>
                <p className="text-sm text-gray-600">SSL encrypted checkout</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Timer className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Round-the-clock assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">EcomStore</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted online shopping destination with quality products, unbeatable prices, and exceptional
                service.
              </p>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-white bg-transparent"
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-white bg-transparent"
                >
                  Twitter
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-white bg-transparent"
                >
                  Instagram
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Categories</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/electronics" className="hover:text-white transition-colors">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/fashion" className="hover:text-white transition-colors">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/home-garden" className="hover:text-white transition-colors">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="hover:text-white transition-colors">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="hover:text-white transition-colors">
                    Hot Deals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new products and exclusive offers.</p>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcomStore. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
