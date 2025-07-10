"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Search, Filter, Plus, Star, Clock, Users, MoreVertical } from "lucide-react"

const conversationsData = [
  {
    id: 1,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-user.jpg",
      status: "online",
    },
    subject: "Issue with recent order",
    lastMessage: "I haven't received my order yet, can you help?",
    lastMessageTime: "2 hours ago",
    status: "open",
    priority: "high",
    unreadCount: 3,
    tags: ["order", "shipping"],
    assignedTo: "Sarah Wilson",
  },
  {
    id: 2,
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder-user.jpg",
      status: "offline",
    },
    subject: "Product return request",
    lastMessage: "Thank you for the quick response!",
    lastMessageTime: "1 day ago",
    status: "resolved",
    priority: "medium",
    unreadCount: 0,
    tags: ["return", "refund"],
    assignedTo: "Mike Johnson",
  },
  {
    id: 3,
    customer: {
      name: "Bob Wilson",
      email: "bob@example.com",
      avatar: "/placeholder-user.jpg",
      status: "away",
    },
    subject: "Technical support needed",
    lastMessage: "The app keeps crashing when I try to checkout",
    lastMessageTime: "3 hours ago",
    status: "pending",
    priority: "high",
    unreadCount: 1,
    tags: ["technical", "app"],
    assignedTo: "Alex Chen",
  },
]

const messagesData = [
  {
    id: 1,
    conversationId: 1,
    sender: "customer",
    senderName: "John Doe",
    message: "Hi, I placed an order 5 days ago but haven't received any shipping updates. Order #12345",
    timestamp: "2024-01-20 10:30 AM",
    attachments: [],
  },
  {
    id: 2,
    conversationId: 1,
    sender: "admin",
    senderName: "Sarah Wilson",
    message: "Hi John, I apologize for the delay. Let me check your order status right away.",
    timestamp: "2024-01-20 10:45 AM",
    attachments: [],
  },
  {
    id: 3,
    conversationId: 1,
    sender: "admin",
    senderName: "Sarah Wilson",
    message:
      "I've found your order. It was shipped yesterday and should arrive by tomorrow. Here's your tracking number: TRK123456789",
    timestamp: "2024-01-20 10:50 AM",
    attachments: [],
  },
  {
    id: 4,
    conversationId: 1,
    sender: "customer",
    senderName: "John Doe",
    message: "I haven't received my order yet, can you help?",
    timestamp: "2024-01-20 2:30 PM",
    attachments: [],
  },
]

const statsData = {
  totalMessages: 1247,
  openConversations: 23,
  avgResponseTime: "2.5 hours",
  satisfactionRate: 94,
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(conversationsData[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-3 h-3 bg-green-500 rounded-full" />
      case "away":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full" />
      case "offline":
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  const filteredConversations = conversationsData.filter((conversation) => {
    const matchesSearch =
      conversation.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || conversation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const conversationMessages = messagesData.filter((msg) => msg.conversationId === selectedConversation?.id)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Manage customer conversations and support tickets</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Conversations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.openConversations}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-15%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.satisfactionRate}%</div>
            <p className="text-xs text-muted-foreground">Customer satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start New Conversation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Customer Email</Label>
                      <Input placeholder="customer@example.com" />
                    </div>
                    <div>
                      <Label>Subject</Label>
                      <Input placeholder="Enter subject" />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea placeholder="Type your message..." />
                    </div>
                    <Button className="w-full">Start Conversation</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-24">
                  <Filter className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[450px]">
              <div className="space-y-2 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {conversation.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">{getStatusIcon(conversation.customer.status)}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium truncate">{conversation.customer.name}</p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground truncate mb-1">
                          {conversation.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mb-2">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {getStatusBadge(conversation.status)}
                            {getPriorityBadge(conversation.priority)}
                          </div>
                          <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedConversation.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedConversation.customer.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1">
                        {getStatusIcon(selectedConversation.customer.status)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConversation.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedConversation.status)}
                    {getPriorityBadge(selectedConversation.priority)}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{selectedConversation.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      Assigned to: {selectedConversation.assignedTo}
                    </span>
                    <div className="flex gap-1">
                      {selectedConversation.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  <div className="space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "customer" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedConversation.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {selectedConversation.customer.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.senderName} • {message.timestamp}
                          </p>
                        </div>
                        {message.sender === "admin" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SW</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[60px]"
                    />
                    <Button onClick={handleSendMessage} className="self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
