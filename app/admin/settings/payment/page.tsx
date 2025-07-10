"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Shield, Save, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const paymentMethods = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Accept credit cards, digital wallets, and more",
    enabled: true,
    status: "connected",
    fees: "2.9% + 30¢",
    icon: "💳",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "PayPal and PayPal Credit payments",
    enabled: true,
    status: "connected",
    fees: "2.9% + fixed fee",
    icon: "🅿️",
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    description: "Quick payments with Touch ID or Face ID",
    enabled: false,
    status: "not_configured",
    fees: "Same as card",
    icon: "🍎",
  },
  {
    id: "google_pay",
    name: "Google Pay",
    description: "Fast checkout with Google accounts",
    enabled: false,
    status: "not_configured",
    fees: "Same as card",
    icon: "🔍",
  },
]

export default function PaymentSettings() {
  const [methods, setMethods] = useState(paymentMethods)
  const [stripeSettings, setStripeSettings] = useState({
    publishableKey: "pk_test_...",
    secretKey: "",
    webhookSecret: "",
    currency: "USD",
  })

  const toggleMethod = (id: string) => {
    setMethods((prev) => prev.map((method) => (method.id === id ? { ...method, enabled: !method.enabled } : method)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "not_configured":
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" />
            Not Configured
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Settings</h1>
          <p className="text-muted-foreground">Configure payment methods and processing options</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="stripe">Stripe Config</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="taxes">Taxes & Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>Enable and configure payment options for your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {methods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{method.name}</h3>
                          {getStatusBadge(method.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                        <p className="text-xs text-muted-foreground">Processing fees: {method.fees}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={method.enabled}
                        onCheckedChange={() => toggleMethod(method.id)}
                        disabled={method.status === "not_configured"}
                      />
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Flow Settings</CardTitle>
              <CardDescription>Configure checkout and payment processing behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-mode">Payment Mode</Label>
                  <Select defaultValue="automatic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic Capture</SelectItem>
                      <SelectItem value="manual">Manual Capture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="save-cards" defaultChecked />
                <Label htmlFor="save-cards">Allow customers to save payment methods</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="guest-checkout" defaultChecked />
                <Label htmlFor="guest-checkout">Enable guest checkout</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stripe" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Stripe Configuration
              </CardTitle>
              <CardDescription>Configure your Stripe payment processing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publishable-key">Publishable Key</Label>
                <Input
                  id="publishable-key"
                  value={stripeSettings.publishableKey}
                  onChange={(e) => setStripeSettings((prev) => ({ ...prev, publishableKey: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secret-key">Secret Key</Label>
                <Input
                  id="secret-key"
                  type="password"
                  value={stripeSettings.secretKey}
                  onChange={(e) => setStripeSettings((prev) => ({ ...prev, secretKey: e.target.value }))}
                  placeholder="sk_test_..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Webhook Endpoint Secret</Label>
                <Input
                  id="webhook-secret"
                  type="password"
                  value={stripeSettings.webhookSecret}
                  onChange={(e) => setStripeSettings((prev) => ({ ...prev, webhookSecret: e.target.value }))}
                  placeholder="whsec_..."
                />
              </div>
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <div className="p-2 bg-muted rounded text-sm font-mono">https://yourdomain.com/api/webhooks/stripe</div>
                <p className="text-xs text-muted-foreground">Add this URL to your Stripe webhook endpoints</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Stripe Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure fraud protection and security measures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="fraud-detection" defaultChecked />
                <Label htmlFor="fraud-detection">Enable fraud detection</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="3d-secure" defaultChecked />
                <Label htmlFor="3d-secure">Require 3D Secure for high-value transactions</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-threshold">Risk Score Threshold</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (30)</SelectItem>
                    <SelectItem value="medium">Medium (60)</SelectItem>
                    <SelectItem value="high">High (80)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="blocked-countries">Blocked Countries</Label>
                <Textarea
                  id="blocked-countries"
                  placeholder="Enter country codes separated by commas (e.g., CN, RU, IR)"
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Taxes & Fees
              </CardTitle>
              <CardDescription>Configure tax calculation and additional fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-tax" defaultChecked />
                <Label htmlFor="auto-tax">Enable automatic tax calculation</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-provider">Tax Provider</Label>
                <Select defaultValue="stripe-tax">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe-tax">Stripe Tax</SelectItem>
                    <SelectItem value="taxjar">TaxJar</SelectItem>
                    <SelectItem value="avalara">Avalara</SelectItem>
                    <SelectItem value="manual">Manual Configuration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="processing-fee">Processing Fee (%)</Label>
                  <Input id="processing-fee" type="number" step="0.01" defaultValue="2.9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fixed-fee">Fixed Fee ($)</Label>
                  <Input id="fixed-fee" type="number" step="0.01" defaultValue="0.30" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="include-tax" />
                <Label htmlFor="include-tax">Prices include tax</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
