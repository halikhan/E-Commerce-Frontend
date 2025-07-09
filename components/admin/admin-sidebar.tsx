"use client"

import { BarChart3, Box, FileText, Home, Package, Settings, ShoppingCart, Tag, Users, Wallet } from "lucide-react"

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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
  },
  {
    title: "Products",
    icon: Package,
    items: [
      { title: "All Products", url: "/admin/products" },
      { title: "Categories", url: "/admin/products/categories" },
      { title: "Inventory", url: "/admin/products/inventory" },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", url: "/admin/orders" },
      { title: "Returns", url: "/admin/orders/returns" },
      { title: "Refunds", url: "/admin/orders/refunds" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    items: [
      { title: "Customer List", url: "/admin/customers" },
      { title: "Analytics", url: "/admin/customers/analytics" },
    ],
  },
  {
    title: "Vendors",
    icon: Wallet,
    items: [
      { title: "Vendor List", url: "/admin/vendors" },
      { title: "Payouts", url: "/admin/vendors/payouts" },
    ],
  },
  {
    title: "Sales & Reports",
    icon: BarChart3,
    items: [
      { title: "Revenue", url: "/admin/reports/revenue" },
      { title: "Orders Report", url: "/admin/reports/orders" },
      { title: "Export Data", url: "/admin/reports/export" },
    ],
  },
  {
    title: "Discounts",
    icon: Tag,
    items: [
      { title: "Coupons", url: "/admin/discounts/coupons" },
      { title: "Promotions", url: "/admin/discounts/promotions" },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    items: [
      { title: "Homepage Banners", url: "/admin/content/banners" },
      { title: "Blog", url: "/admin/content/blog" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      { title: "Payment", url: "/admin/settings/payment" },
      { title: "Shipping", url: "/admin/settings/shipping" },
      { title: "Notifications", url: "/admin/settings/notifications" },
    ],
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Box className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">EcomAdmin</h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
