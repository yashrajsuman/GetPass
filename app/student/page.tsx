"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, QrCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for past requests
const pastRequests = [
  {
    id: "REQ-001",
    purpose: "Home Visit",
    date: "2025-05-10",
    time: "10:00 AM",
    returnDate: "2025-05-12",
    returnTime: "6:00 PM",
    status: "approved",
  },
  {
    id: "REQ-002",
    purpose: "Medical Appointment",
    date: "2025-05-08",
    time: "2:30 PM",
    returnDate: "2025-05-08",
    returnTime: "5:30 PM",
    status: "rejected",
  },
  {
    id: "REQ-003",
    purpose: "Family Function",
    date: "2025-05-15",
    time: "9:00 AM",
    returnDate: "2025-05-16",
    returnTime: "8:00 PM",
    status: "pending",
  },
]

export default function StudentDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date())
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Apply for Gate Pass</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>New Gate Pass Request</DialogTitle>
              <DialogDescription>Fill in the details to request a new gate pass.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Visit</SelectItem>
                    <SelectItem value="medical">Medical Appointment</SelectItem>
                    <SelectItem value="family">Family Function</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="details">Additional Details</Label>
                <Textarea id="details" placeholder="Provide more information about your request" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Exit Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label>Exit Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8am">8:00 AM</SelectItem>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                      <SelectItem value="4pm">4:00 PM</SelectItem>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label>Return Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8am">8:00 AM</SelectItem>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                      <SelectItem value="4pm">4:00 PM</SelectItem>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                      <SelectItem value="6pm">6:00 PM</SelectItem>
                      <SelectItem value="7pm">7:00 PM</SelectItem>
                      <SelectItem value="8pm">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact">Emergency Contact</Label>
                <Input id="contact" placeholder="Phone number" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastRequests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{request.purpose}</CardTitle>
                    <Badge
                      className={cn(
                        request.status === "approved" && "bg-green-500",
                        request.status === "rejected" && "bg-red-500",
                        request.status === "pending" && "bg-yellow-500",
                      )}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>Request ID: {request.id}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Exit: {request.date} at {request.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Return: {request.returnDate} at {request.returnTime}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  {request.status === "approved" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" onClick={() => setSelectedRequest(request)}>
                          <QrCode className="mr-2 h-4 w-4" />
                          View QR Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Gate Pass QR Code</DialogTitle>
                          <DialogDescription>
                            Show this QR code to the gatekeeper when exiting or entering.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-4">
                          <div className="bg-white p-4 rounded-lg">
                            <QrCode className="h-48 w-48" />
                          </div>
                          <div className="mt-4 text-center">
                            <p className="font-semibold">{selectedRequest?.purpose}</p>
                            <p className="text-sm text-muted-foreground">ID: {selectedRequest?.id}</p>
                            <p className="text-sm text-muted-foreground">
                              Valid from {selectedRequest?.date} to {selectedRequest?.returnDate}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  {request.status === "rejected" && (
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  )}
                  {request.status === "pending" && (
                    <Button variant="outline" className="w-full">
                      Cancel Request
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastRequests
              .filter((request) => request.status === "pending")
              .map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{request.purpose}</CardTitle>
                      <Badge className="bg-yellow-500">Pending</Badge>
                    </div>
                    <CardDescription>Request ID: {request.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Exit: {request.date} at {request.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Return: {request.returnDate} at {request.returnTime}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Cancel Request
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="approved" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastRequests
              .filter((request) => request.status === "approved")
              .map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{request.purpose}</CardTitle>
                      <Badge className="bg-green-500">Approved</Badge>
                    </div>
                    <CardDescription>Request ID: {request.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Exit: {request.date} at {request.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Return: {request.returnDate} at {request.returnTime}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" onClick={() => setSelectedRequest(request)}>
                          <QrCode className="mr-2 h-4 w-4" />
                          View QR Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Gate Pass QR Code</DialogTitle>
                          <DialogDescription>
                            Show this QR code to the gatekeeper when exiting or entering.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-4">
                          <div className="bg-white p-4 rounded-lg">
                            <QrCode className="h-48 w-48" />
                          </div>
                          <div className="mt-4 text-center">
                            <p className="font-semibold">{selectedRequest?.purpose}</p>
                            <p className="text-sm text-muted-foreground">ID: {selectedRequest?.id}</p>
                            <p className="text-sm text-muted-foreground">
                              Valid from {selectedRequest?.date} to {selectedRequest?.returnDate}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastRequests
              .filter((request) => request.status === "rejected")
              .map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{request.purpose}</CardTitle>
                      <Badge className="bg-red-500">Rejected</Badge>
                    </div>
                    <CardDescription>Request ID: {request.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Exit: {request.date} at {request.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Return: {request.returnDate} at {request.returnTime}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
