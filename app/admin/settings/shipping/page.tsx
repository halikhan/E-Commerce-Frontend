"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Package, MapPin, Clock, Save, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const shippingZones = [
  {
    id: 1,
    name: "Domestic (US)",
    countries: ["United States"],
    methods: [
      { name: "Standard Shipping", cost: 5.99, time: "5-7 business days" },
      { name: "Express Shipping", cost: 12.99, time: "2-3 business days" },
      { name: "Overnight", cost: 24.99, time: "1 business day" },
    ],
  },
  {
    id: 2,
    name: "North America",
    countries: ["Canada", "Mexico"],
    methods: [
      { name: "International Standard", cost: 15.99, time: "7-14 business days" },
      { name: "International Express", cost: 29.99, time: "3-5 business days" },
    ],
  },
  {
    id: 3,
    name: "Europe",
    countries: ["United Kingdom", "Germany", "France", "Italy", "Spain"],
    methods: [
      { name: "EU Standard", cost: 19.99, time: "10-15 business days" },
      { name: "EU Express", cost: 39.99, time: "5-7 business days" },
    ],
  },
]

const carriers = [
  { id: "ups", name: "UPS", enabled: true, apiKey: "configured" },
  { id: "fedex", name: "FedEx", enabled: true, apiKey: "configured" },
  { id: "usps", name: "USPS", enabled: false, apiKey: "not_configured" },
  { id: "dhl", name: "DHL", enabled: false, apiKey: "not_configured" },
]

export default function ShippingSettings() {
  const [zones, setZones] = useState(shippingZones)
  const [shippingCarriers, setShippingCarriers] = useState(carriers)

  const toggleCarrier = (id: string) => {
    setShippingCarriers((prev) =>
      prev.map((carrier) => (carrier.id === id ? { ...carrier, enabled: !carrier.enabled } : carrier)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipping Settings</h1>
          <p className="text-muted-foreground">Configure shipping zones, methods, and carrier integrations</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="zones" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="zones">Shipping Zones</TabsTrigger>
          <TabsTrigger value="carriers">Carriers</TabsTrigger>
          <TabsTrigger value="packaging">Packaging</TabsTrigger>
          <TabsTrigger value="rules">Rules & Restrictions</TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Shipping Zones</h2>
              <p className="text-muted-foreground">Define shipping areas and their methods</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Zone
            </Button>
          </div>

          <div className="space-y-4">
            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {zone.name}
                      </CardTitle>
                      <CardDescription>Countries: {zone.countries.join(", ")}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shipping Method</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Delivery Time</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {zone.methods.map((method, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{method.name}</TableCell>
                          <TableCell>${method.cost}</TableCell>
                          <TableCell>{method.time}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shipping Method
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carriers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Carriers
              </CardTitle>
              <CardDescription>Configure carrier integrations for real-time rates and tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shippingCarriers.map((carrier) => (
                  <div key={carrier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{carrier.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          API Status:{" "}
                          {carrier.apiKey === "configured" ? (
                            <Badge className="bg-green-100 text-green-800">Configured</Badge>
                          ) : (
                            <Badge variant="outline">Not Configured</Badge>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={carrier.enabled}
                        onCheckedChange={() => toggleCarrier(carrier.id)}
                        disabled={carrier.apiKey === "not_configured"}
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
              <CardTitle>Carrier Settings</CardTitle>
              <CardDescription>Global settings for carrier integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="real-time-rates" defaultChecked />
                <Label htmlFor="real-time-rates">Enable real-time shipping rates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="tracking-updates" defaultChecked />
                <Label htmlFor="tracking-updates">Automatic tracking updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="insurance" />
                <Label htmlFor="insurance">Automatic shipping insurance</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Packaging Options
              </CardTitle>
              <CardDescription>Configure package dimensions and materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-length">Default Length (in)</Label>
                  <Input id="default-length" type="number" defaultValue="12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-width">Default Width (in)</Label>
                  <Input id="default-width" type="number" defaultValue="9" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-height">Default Height (in)</Label>
                  <Input id="default-height" type="number" defaultValue="6" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-weight">Default Weight (lbs)</Label>
                  <Input id="default-weight" type="number" step="0.1" defaultValue="1.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packaging-type">Default Packaging</Label>
                  <Select defaultValue="box">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="envelope">Envelope</SelectItem>
                      <SelectItem value="tube">Tube</SelectItem>
                      <SelectItem value="pak">Pak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dimensional-weight" />
                <Label htmlFor="dimensional-weight">Use dimensional weight pricing</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Shipping Rules & Restrictions
              </CardTitle>
              <CardDescription>Configure shipping limitations and special rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="free-shipping-threshold">Free Shipping Threshold ($)</Label>
                <Input id="free-shipping-threshold" type="number" defaultValue="75" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-weight">Maximum Package Weight (lbs)</Label>
                <Input id="max-weight" type="number" defaultValue="70" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processing-time">Processing Time (business days)</Label>
                <Select defaultValue="1-2">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="same-day">Same Day</SelectItem>
                    <SelectItem value="1">1 Business Day</SelectItem>
                    <SelectItem value="1-2">1-2 Business Days</SelectItem>
                    <SelectItem value="2-3">2-3 Business Days</SelectItem>
                    <SelectItem value="3-5">3-5 Business Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="weekend-shipping" />
                <Label htmlFor="weekend-shipping">Allow weekend shipping</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="po-box-restriction" defaultChecked />
                <Label htmlFor="po-box-restriction">Restrict shipping to PO Boxes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="signature-required" />
                <Label htmlFor="signature-required">Require signature for high-value orders</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
