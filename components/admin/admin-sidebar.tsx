"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Box,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Users,
  Wallet,
  Search,
  Bell,
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  ChevronDown,
  Command,
  MessageSquare,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
    badge: null,
    hot: true,
  },
  {
    title: "Products",
    icon: Package,
    badge: "12",
    items: [
      { title: "All Products", url: "/admin/products", hot: true },
      { title: "Manage Products", url: "/admin/products/manage", new: true },
      { title: "Categories", url: "/admin/products/categories" },
      { title: "Inventory", url: "/admin/products/inventory" },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    badge: "5",
    items: [
      { title: "All Orders", url: "/admin/orders" },
      { title: "Processing", url: "/admin/orders/processing", hot: true },
      { title: "Returns", url: "/admin/orders/returns" },
      { title: "Refunds", url: "/admin/orders/refunds" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    items: [
      { title: "Customer List", url: "/admin/customers" },
      { title: "Segments", url: "/admin/customers/segments", new: true },
      { title: "Analytics", url: "/admin/customers/analytics" },
    ],
  },
  {
    title: "Vendors",
    icon: Wallet,
    items: [
      { title: "Vendor List", url: "/admin/vendors" },
      { title: "Payouts", url: "/admin/vendors/payouts" },
      { title: "Payout History", url: "/admin/vendors/payout-history", new: true },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      { title: "Revenue", url: "/admin/reports/revenue" },
      { title: "Conversion", url: "/admin/analytics/conversion", new: true },
      { title: "Orders Report", url: "/admin/reports/orders" },
      { title: "Export Data", url: "/admin/reports/export" },
    ],
  },
  {
    title: "Marketing",
    icon: Tag,
    items: [
      { title: "Discounts", url: "/admin/discounts" },
      { title: "Promotions", url: "/admin/promotions/automations", new: true },
      { title: "Campaigns", url: "/admin/marketing/campaigns" },
      { title: "Newsletter", url: "/admin/newsletter", new: true },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    badge: "3",
    items: [
      { title: "Messages", url: "/admin/messages", new: true },
      { title: "Reviews", url: "/admin/reviews", new: true },
      { title: "Notifications", url: "/admin/notifications", new: true },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    items: [
      { title: "Homepage Banners", url: "/admin/content/banners" },
      { title: "Blog", url: "/admin/content/blog" },
      { title: "Categories", url: "/admin/content/categories", new: true },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "General", url: "/admin/settings" },
      { title: "Advanced", url: "/admin/settings/advanced", new: true },
      { title: "Payment", url: "/admin/settings/payment" },
      { title: "Shipping", url: "/admin/settings/shipping" },
      { title: "Notifications", url: "/admin/settings/notifications" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            router.push("/admin")
            break
          case "2":
            e.preventDefault()
            router.push("/admin/orders")
            break
          case "/":
            e.preventDefault()
            document.getElementById("sidebar-search")?.focus()
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  // Prefetch on hover
  const handleMouseEnter = (url: string) => {
    setHoveredItem(url)
    router.prefetch(url)
  }

  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return menuItems

    return menuItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.items?.some((subItem) => subItem.title.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }, [searchQuery])

  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-border/40 p-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Box className="h-8 w-8 text-primary drop-shadow-sm" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              EcomAdmin
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Turbo Mode
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="sidebar-search"
            placeholder="Type to search... (⌘/)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
          />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            ⌘/
          </kbd>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "w-full justify-between hover:bg-primary/10 transition-all duration-200 group",
                            "hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]",
                          )}
                          onMouseEnter={() => handleMouseEnter(item.items?.[0]?.url || "")}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                            <span className="font-medium">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="h-5 text-xs bg-primary/20 text-primary">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-1">
                        <SidebarMenuSub className="ml-4 border-l border-border/30 pl-4 space-y-1">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "transition-all duration-200 hover:bg-primary/5 group relative",
                                  pathname === subItem.url &&
                                    "bg-primary/10 text-primary font-medium border-l-2 border-primary",
                                )}
                                onMouseEnter={() => handleMouseEnter(subItem.url)}
                              >
                                <a href={subItem.url} className="flex items-center justify-between">
                                  <span>{subItem.title}</span>
                                  <div className="flex items-center gap-1">
                                    {subItem.hot && (
                                      <Badge variant="destructive" className="h-4 text-xs">
                                        HOT
                                      </Badge>
                                    )}
                                    {subItem.new && (
                                      <Badge variant="default" className="h-4 text-xs bg-green-500">
                                        NEW
                                      </Badge>
                                    )}
                                    {hoveredItem === subItem.url && (
                                      <ArrowRight className="h-3 w-3 text-primary animate-pulse" />
                                    )}
                                  </div>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-all duration-200 hover:bg-primary/10 group hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]",
                        pathname === item.url &&
                          "bg-primary/15 text-primary font-medium shadow-sm border-l-4 border-primary",
                      )}
                      onMouseEnter={() => handleMouseEnter(item.url)}
                    >
                      <a href={item.url} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {item.badge && (
                            <Badge variant="secondary" className="h-5 text-xs bg-primary/20 text-primary">
                              {item.badge}
                            </Badge>
                          )}
                          {item.hot && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                          {hoveredItem === item.url && <ArrowRight className="h-3 w-3 text-primary animate-pulse" />}
                        </div>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3 text-green-500" />
          <span>Performance: 98% uptime</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Command className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
