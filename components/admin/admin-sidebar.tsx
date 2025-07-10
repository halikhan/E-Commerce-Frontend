"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Settings,
  FileText,
  Truck,
  CreditCard,
  Tag,
  BarChart3,
  UserCheck,
  Megaphone,
  Gift,
  ChevronDown,
  ChevronRight,
  Star,
  MessageSquare,
  Bell,
  Mail,
  Palette,
  Globe,
  Database,
  Shield,
  Zap,
  DollarSign,
  Target,
  Calendar,
  Archive,
  BookOpen,
  Layers,
  PieChart,
  Download,
  Workflow,
} from "lucide-react"

interface NavItem {
  title: string
  href?: string
  icon: any
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    icon: Package,
    children: [
      { title: "All Products", href: "/admin/products", icon: Package },
      { title: "Manage Products", href: "/admin/products/manage", icon: Database, badge: "NEW" },
      { title: "Categories", href: "/admin/products/categories", icon: Layers },
      { title: "Inventory", href: "/admin/products/inventory", icon: Archive },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    children: [
      { title: "All Orders", href: "/admin/orders", icon: ShoppingCart },
      { title: "Processing", href: "/admin/orders/processing", icon: Zap, badge: "NEW" },
      { title: "Returns", href: "/admin/orders/returns", icon: BarChart3 },
      { title: "Refunds", href: "/admin/orders/refunds", icon: CreditCard },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    children: [
      { title: "All Customers", href: "/admin/customers", icon: Users },
      { title: "Analytics", href: "/admin/customers/analytics", icon: TrendingUp },
      { title: "Segments", href: "/admin/customers/segments", icon: Target, badge: "NEW" },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    children: [
      { title: "Reviews", href: "/admin/reviews", icon: Star, badge: "NEW" },
      { title: "Messages", href: "/admin/messages", icon: MessageSquare, badge: "NEW" },
      { title: "Notifications", href: "/admin/notifications", icon: Bell, badge: "NEW" },
      { title: "Newsletter", href: "/admin/newsletter", icon: Mail, badge: "NEW" },
    ],
  },
  {
    title: "Vendors",
    icon: UserCheck,
    children: [
      { title: "All Vendors", href: "/admin/vendors", icon: UserCheck },
      { title: "Payouts", href: "/admin/vendors/payouts", icon: DollarSign },
      { title: "Payout History", href: "/admin/vendors/payout-history", icon: Calendar, badge: "NEW" },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    children: [{ title: "Campaigns", href: "/admin/marketing/campaigns", icon: Megaphone, badge: "NEW" }],
  },
  {
    title: "Promotions",
    icon: Gift,
    children: [
      { title: "Discounts", href: "/admin/discounts", icon: Tag },
      { title: "Automations", href: "/admin/promotions/automations", icon: Workflow, badge: "NEW" },
    ],
  },
  {
    title: "Analytics",
    icon: TrendingUp,
    children: [{ title: "Conversion", href: "/admin/analytics/conversion", icon: PieChart, badge: "NEW" }],
  },
  {
    title: "Content",
    icon: FileText,
    children: [
      { title: "Overview", href: "/admin/content", icon: FileText },
      { title: "Banners", href: "/admin/content/banners", icon: Palette, badge: "NEW" },
      { title: "Blog", href: "/admin/content/blog", icon: BookOpen, badge: "NEW" },
      { title: "Categories", href: "/admin/content/categories", icon: Layers, badge: "NEW" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Overview", href: "/admin/reports", icon: BarChart3 },
      { title: "Revenue", href: "/admin/reports/revenue", icon: DollarSign, badge: "NEW" },
      { title: "Orders", href: "/admin/reports/orders", icon: ShoppingCart, badge: "NEW" },
      { title: "Export", href: "/admin/reports/export", icon: Download, badge: "NEW" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/admin/settings", icon: Settings },
      { title: "Advanced", href: "/admin/settings/advanced", icon: Shield, badge: "NEW" },
      { title: "Notifications", href: "/admin/settings/notifications", icon: Bell, badge: "NEW" },
      { title: "Payment", href: "/admin/settings/payment", icon: CreditCard, badge: "NEW" },
      { title: "Shipping", href: "/admin/settings/shipping", icon: Truck, badge: "NEW" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isExpanded = (title: string) => expandedItems.includes(title)

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = item.href === pathname
    const hasChildren = item.children && item.children.length > 0
    const expanded = isExpanded(item.title)

    return (
      <div key={item.title}>
        {item.href ? (
          <Link href={item.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 h-9",
                level > 0 && "ml-4 w-[calc(100%-1rem)]",
                isActive && "bg-primary/10 text-primary",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2 h-9", level > 0 && "ml-4 w-[calc(100%-1rem)]")}
            onClick={() => hasChildren && toggleExpanded(item.title)}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
            {hasChildren && (expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </Button>
        )}

        {hasChildren && expanded && (
          <div className="mt-1 space-y-1">{item.children?.map((child) => renderNavItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">Admin Panel</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">{navigation.map((item) => renderNavItem(item))}</nav>
      </ScrollArea>

      <div className="border-t p-4">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
            <Globe className="h-4 w-4" />
            View Site
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminSidebar
