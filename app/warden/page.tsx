"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Check, Clock, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for incoming requests
const incomingRequests = [
  {
    id: "REQ-004",
    studentId: "S12345",
    studentName: "John Doe",
    purpose: "Home Visit",
    date: "2025-05-12",
    time: "10:00 AM",
    returnDate: "2025-05-14",
    returnTime: "6:00 PM",
    status: "pending",
  },
  {
    id: "REQ-005",
    studentId: "S12346",
    studentName: "Jane Smith",
    purpose: "Medical Appointment",
    date: "2025-05-13",
    time: "2:30 PM",
    returnDate: "2025-05-13",
    returnTime: "5:30 PM",
    status: "pending",
  },
  {
    id: "REQ-006",
    studentId: "S12347",
    studentName: "Alex Johnson",
    purpose: "Family Function",
    date: "2025-05-15",
    time: "9:00 AM",
    returnDate: "2025-05-16",
    returnTime: "8:00 PM",
    status: "pending",
  },
  {
    id: "REQ-007",
    studentId: "S12348",
    studentName: "Emily Brown",
    purpose: "Internship Interview",
    date: "2025-05-14",
    time: "11:00 AM",
    returnDate: "2025-05-14",
    returnTime: "4:00 PM",
    status: "pending",
  },
  {
    id: "REQ-008",
    studentId: "S12349",
    studentName: "Michael Wilson",
    purpose: "Home Visit",
    date: "2025-05-16",
    time: "8:00 AM",
    returnDate: "2025-05-18",
    returnTime: "7:00 PM",
    status: "pending",
  },
]

// Mock data for processed requests
const processedRequests = [
  {
    id: "REQ-001",
    studentId: "S12340",
    studentName: "Robert Davis",
    purpose: "Home Visit",
    date: "2025-05-10",
    time: "10:00 AM",
    returnDate: "2025-05-12",
    returnTime: "6:00 PM",
    status: "approved",
  },
  {
    id: "REQ-002",
    studentId: "S12341",
    studentName: "Sarah Miller",
    purpose: "Medical Appointment",
    date: "2025-05-08",
    time: "2:30 PM",
    returnDate: "2025-05-08",
    returnTime: "5:30 PM",
    status: "rejected",
    reason: "Insufficient documentation provided",
  },
  {
    id: "REQ-003",
    studentId: "S12342",
    studentName: "David Wilson",
    purpose: "Family Function",
    date: "2025-05-09",
    time: "9:00 AM",
    returnDate: "2025-05-10",
    returnTime: "8:00 PM",
    status: "approved",
  },
]

export default function WardenDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  // Filter requests based on search query
  const filteredIncoming = incomingRequests.filter(
    (request) =>
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleApprove = (request: any) => {
    setSelectedRequest(request)
    // In a real app, you would update the status in the database
    alert(`Request ${request.id} approved`)
  }

  const handleReject = (request: any) => {
    setSelectedRequest(request)
    setShowRejectDialog(true)
  }

  const confirmReject = () => {
    // In a real app, you would update the status in the database
    alert(`Request ${selectedRequest.id} rejected: ${rejectReason}`)
    setShowRejectDialog(false)
    setRejectReason("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Warden Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>Review and process student gate pass requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Exit Date & Time</TableHead>
                  <TableHead>Return Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncoming.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                      No pending requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncoming.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>
                          <div>{request.studentName}</div>
                          <div className="text-sm text-muted-foreground">{request.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.purpose}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                            <span>{request.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{request.time}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                            <span>{request.returnDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{request.returnTime}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-green-500 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(request)}
                          >
                            <Check className="h-4 w-4" />
                            <span>Approve</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleReject(request)}
                          >
                            <X className="h-4 w-4" />
                            <span>Reject</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processed Requests</CardTitle>
          <CardDescription>History of approved and rejected requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{request.studentName}</div>
                            <div className="text-sm text-muted-foreground">{request.studentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                              <span>{request.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span>{request.time}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              request.status === "approved" && "bg-green-500",
                              request.status === "rejected" && "bg-red-500",
                            )}
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="approved" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedRequests
                      .filter((request) => request.status === "approved")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{request.studentName}</div>
                              <div className="text-sm text-muted-foreground">{request.studentId}</div>
                            </div>
                          </TableCell>
                          <TableCell>{request.purpose}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                                <span>{request.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{request.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Approved</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="rejected" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {processedRequests
                      .filter((request) => request.status === "rejected")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{request.studentName}</div>
                              <div className="text-sm text-muted-foreground">{request.studentId}</div>
                            </div>
                          </TableCell>
                          <TableCell>{request.purpose}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                                <span>{request.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{request.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{request.reason}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Gate Pass Request</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this request.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Rejection</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for rejection"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject} disabled={!rejectReason.trim()}>
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
