"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  Star,
  Search,
  Menu,
  User,
  Heart,
  ChevronLeft,
  ChevronRight,
  Timer,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    title: "Summer Sale 2024",
    subtitle: "Up to 70% off on selected items",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover the latest trends",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On orders over $50",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Learn More",
  },
]

const categories = [
  { name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: "1,234 items" },
  { name: "Fashion", image: "/placeholder.svg?height=200&width=200", count: "2,567 items" },
  { name: "Home & Garden", image: "/placeholder.svg?height=200&width=200", count: "890 items" },
  { name: "Sports", image: "/placeholder.svg?height=200&width=200", count: "456 items" },
  { name: "Books", image: "/placeholder.svg?height=200&width=200", count: "3,421 items" },
  { name: "Beauty", image: "/placeholder.svg?height=200&width=200", count: "678 items" },
]

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 128,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.3,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Sale",
  },
  {
    id: 4,
    name: "USB-C Cable",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.2,
    reviews: 456,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Popular",
  },
]

const dealsOfTheDay = [
  {
    id: 1,
    name: "Gaming Mouse",
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "2h 34m",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: "/placeholder.svg?height=200&width=200",
    timeLeft: "5h 12m",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality and fast shipping! Will definitely order again.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Great customer service and excellent products. Highly recommended!",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    name: "Emily Davis",
    rating: 4,
    comment: "Good value for money. The delivery was quick and packaging was perfect.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
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
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">EcomStore</span>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 h-12 text-sm">
            <Link href="/categories" className="hover:text-primary">
              All Categories
            </Link>
            <Link href="/electronics" className="hover:text-primary">
              Electronics
            </Link>
            <Link href="/fashion" className="hover:text-primary">
              Fashion
            </Link>
            <Link href="/home" className="hover:text-primary">
              Home & Garden
            </Link>
            <Link href="/sports" className="hover:text-primary">
              Sports
            </Link>
            <Link href="/deals" className="text-red-600 font-medium">
              Deals
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className="relative h-full bg-gradient-to-r from-primary/90 to-primary/70">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover -z-10" />
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-lg">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-6">{slide.subtitle}</p>
                  <Button size="lg" variant="secondary">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </section>

      {/* Category Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-2 left-2">{product.badge}</Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Deals of the Day</h2>
            <div className="flex items-center justify-center gap-4 text-2xl font-bold">
              <div className="flex items-center gap-2">
                <Timer className="h-6 w-6 text-red-600" />
                <span className="text-red-600">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dealsOfTheDay.map((deal) => (
              <Card key={deal.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-1/2">
                      <Image
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-600">-{deal.discount}%</Badge>
                    </div>
                    <div className="w-1/2 p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2">{deal.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-red-600">${deal.price}</span>
                        <span className="text-lg text-muted-foreground line-through">${deal.originalPrice}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Ends in {deal.timeLeft}</p>
                      <Button className="bg-red-600 hover:bg-red-700">Buy Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              <h4 className="font-semibold">Free Shipping</h4>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RotateCcw className="h-8 w-8 text-primary" />
              <h4 className="font-semibold">Easy Returns</h4>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">SSL encrypted checkout</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Timer className="h-8 w-8 text-primary" />
              <h4 className="font-semibold">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">Customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-xl font-bold">EcomStore</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted online shopping destination with quality products and excellent service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/electronics" className="hover:text-white">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/fashion" className="hover:text-white">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/home" className="hover:text-white">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="hover:text-white">
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new products and offers.</p>
              <div className="flex gap-2">
                <Input placeholder="Your email" className="bg-gray-800 border-gray-700" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EcomStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
