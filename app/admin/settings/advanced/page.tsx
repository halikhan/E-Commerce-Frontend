"use client"

import * as React from "react"
import { Shield, Database, Zap, Globe, Code, AlertTriangle, Save, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdvancedSettingsPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false)

  const handleSave = () => {
    console.log("Saving advanced settings...")
    setHasUnsavedChanges(false)
  }

  const handleReset = () => {
    console.log("Resetting to defaults...")
    setHasUnsavedChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Settings</h1>
          <p className="text-muted-foreground">Configure advanced system settings and integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {hasUnsavedChanges && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unsaved Changes</AlertTitle>
          <AlertDescription>
            You have unsaved changes. Make sure to save your settings before leaving this page.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>

        {/* Performance Settings */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Optimization
              </CardTitle>
              <CardDescription>Configure caching, compression, and performance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                    <Input
                      id="cache-ttl"
                      type="number"
                      defaultValue="3600"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-connections">Max Database Connections</Label>
                    <Input
                      id="max-connections"
                      type="number"
                      defaultValue="100"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compression-level">Compression Level</Label>
                    <Select onValueChange={() => setHasUnsavedChanges(true)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compression level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Low (1)</SelectItem>
                        <SelectItem value="6">Medium (6)</SelectItem>
                        <SelectItem value="9">High (9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Redis Caching</Label>
                      <p className="text-sm text-muted-foreground">Use Redis for session and data caching</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable CDN</Label>
                      <p className="text-sm text-muted-foreground">Serve static assets via CDN</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Image Optimization</Label>
                      <p className="text-sm text-muted-foreground">Automatically optimize images</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      defaultValue="30"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      defaultValue="5"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select onValueChange={() => setHasUnsavedChanges(true)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ chars)</SelectItem>
                        <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                        <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>IP Whitelist</Label>
                      <p className="text-sm text-muted-foreground">Restrict admin access by IP</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all admin actions</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Allowed IP Addresses</Label>
                <Textarea
                  id="allowed-ips"
                  placeholder="Enter IP addresses, one per line"
                  className="min-h-[100px]"
                  onChange={() => setHasUnsavedChanges(true)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Settings */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
              <CardDescription>Configure database connections and optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input id="db-host" defaultValue="localhost" onChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Database Port</Label>
                    <Input id="db-port" type="number" defaultValue="5432" onChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input id="db-name" defaultValue="ecommerce" onChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pool-size">Connection Pool Size</Label>
                    <Input id="pool-size" type="number" defaultValue="20" onChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="query-timeout">Query Timeout (seconds)</Label>
                    <Input
                      id="query-timeout"
                      type="number"
                      defaultValue="30"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Query Logging</Label>
                      <p className="text-sm text-muted-foreground">Log slow queries for optimization</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Backup Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select onValueChange={() => setHasUnsavedChanges(true)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Retention Period (days)</Label>
                    <Input
                      id="backup-retention"
                      type="number"
                      defaultValue="30"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Configure API endpoints, rate limiting, and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-version">API Version</Label>
                    <Select onValueChange={() => setHasUnsavedChanges(true)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v1">v1 (Legacy)</SelectItem>
                        <SelectItem value="v2">v2 (Current)</SelectItem>
                        <SelectItem value="v3">v3 (Beta)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
                    <Input
                      id="rate-limit"
                      type="number"
                      defaultValue="1000"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-timeout">Request Timeout (seconds)</Label>
                    <Input
                      id="api-timeout"
                      type="number"
                      defaultValue="30"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable CORS</Label>
                      <p className="text-sm text-muted-foreground">Allow cross-origin requests</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>API Key Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require API keys for access</p>
                    </div>
                    <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Request Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all API requests</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="allowed-origins">Allowed Origins</Label>
                <Textarea
                  id="allowed-origins"
                  placeholder="Enter allowed origins, one per line"
                  className="min-h-[100px]"
                  onChange={() => setHasUnsavedChanges(true)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>Configure payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Stripe</Badge>
                    <span className="text-sm">Connected</span>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">PayPal</Badge>
                    <span className="text-sm">Connected</span>
                  </div>
                  <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Square</Badge>
                    <span className="text-sm text-muted-foreground">Not connected</span>
                  </div>
                  <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Providers</CardTitle>
                <CardDescription>Configure shipping integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">FedEx</Badge>
                    <span className="text-sm">Connected</span>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">UPS</Badge>
                    <span className="text-sm">Connected</span>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => setHasUnsavedChanges(true)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">USPS</Badge>
                    <span className="text-sm text-muted-foreground">Not connected</span>
                  </div>
                  <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Developer Settings */}
        <TabsContent value="developer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Developer Tools
              </CardTitle>
              <CardDescription>Configure development and debugging settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed error messages</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SQL Query Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all database queries</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Performance Profiling</Label>
                      <p className="text-sm text-muted-foreground">Enable performance monitoring</p>
                    </div>
                    <Switch onCheckedChange={() => setHasUnsavedChanges(true)} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select onValueChange={() => setHasUnsavedChanges(true)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-webhook-url.com"
                      onChange={() => setHasUnsavedChanges(true)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea
                  id="custom-css"
                  placeholder="/* Add your custom CSS here */"
                  className="min-h-[150px] font-mono"
                  onChange={() => setHasUnsavedChanges(true)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
