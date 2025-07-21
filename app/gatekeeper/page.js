"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, QrCode, Scan, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock student data for verification
const studentData = {
  id: "S12345",
  name: "John Doe",
  department: "Computer Science",
  year: "3rd Year",
  hostel: "Block A",
  room: "A-204",
  passId: "REQ-001",
  purpose: "Home Visit",
  exitDate: "2025-05-10",
  exitTime: "10:00 AM",
  returnDate: "2025-05-12",
  returnTime: "6:00 PM",
  status: "approved",
  entryStatus: "exited", // or "returned" or null
  exitTimestamp: "2025-05-10 10:15 AM",
  returnTimestamp: null,
}

export default function GatekeeperScreen() {
  const [isScanning, setIsScanning] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [scanHistory, setScanHistory] = useState([
    {
      timestamp: "2025-05-10 10:15 AM",
      student: "John Doe",
      studentId: "S12345",
      action: "exit",
      status: "success",
    },
    {
      timestamp: "2025-05-09 6:30 PM",
      student: "Jane Smith",
      studentId: "S12346",
      action: "return",
      status: "success",
    },
    {
      timestamp: "2025-05-09 4:45 PM",
      student: "Alex Johnson",
      studentId: "S12347",
      action: "exit",
      status: "success",
    },
    {
      timestamp: "2025-05-09 2:20 PM",
      student: "Emily Brown",
      studentId: "S12348",
      action: "return",
      status: "error",
    },
  ])

  const startScanning = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setVerificationResult(studentData)
      setVerificationStatus("success")

      // Add to scan history
      const newScanEntry = {
        timestamp: new Date().toLocaleString(),
        student: studentData.name,
        studentId: studentData.id,
        action: studentData.entryStatus === "exited" ? "return" : "exit",
        status: "success",
      }

      setScanHistory((prev) => [newScanEntry, ...prev])
    }, 2000)
  }

  const resetScan = () => {
    setVerificationResult(null)
    setVerificationStatus(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gatekeeper Screen</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>QR Code Scanner</CardTitle>
            <CardDescription>Scan student gate pass QR code to verify entry/exit permission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              {!verificationResult ? (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg w-full max-w-md aspect-video bg-muted/30">
                  {isScanning ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <QrCode className="h-16 w-16 text-muted-foreground animate-pulse" />
                        <Scan className="h-8 w-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-muted-foreground">Scanning...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                      <p className="text-muted-foreground">No QR code detected</p>
                      <Button onClick={startScanning}>
                        <Scan className="mr-2 h-4 w-4" />
                        Start Scanning
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-md">
                  <div
                    className={cn(
                      "p-4 mb-4 rounded-lg",
                      verificationStatus === "success"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={cn(
                          "font-semibold",
                          verificationStatus === "success" ? "text-green-700" : "text-red-700",
                        )}
                      >
                        {verificationStatus === "success" ? "Verification Successful" : "Verification Failed"}
                      </h3>
                      <Badge className={cn(verificationStatus === "success" ? "bg-green-500" : "bg-red-500")}>
                        {verificationStatus === "success" ? "Valid" : "Invalid"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{verificationResult.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {verificationResult.id} • {verificationResult.department}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Hostel & Room</p>
                        <p className="text-sm text-muted-foreground">
                          {verificationResult.hostel}, {verificationResult.room}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Pass ID</p>
                        <p className="text-sm text-muted-foreground">{verificationResult.passId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Purpose</p>
                        <p className="text-sm text-muted-foreground">{verificationResult.purpose}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Current Status</p>
                        <Badge
                          className={cn(verificationResult.entryStatus === "exited" ? "bg-yellow-500" : "bg-green-500")}
                        >
                          {verificationResult.entryStatus === "exited" ? "Outside Campus" : "Returned"}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Exit Details</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{verificationResult.exitDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{verificationResult.exitTime}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Return Details</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{verificationResult.returnDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{verificationResult.returnTime}</span>
                        </div>
                      </div>
                    </div>

                    {verificationResult.exitTimestamp && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm font-medium">Actual Exit</p>
                          <p className="text-sm text-muted-foreground">{verificationResult.exitTimestamp}</p>
                        </div>
                      </>
                    )}

                    {verificationResult.returnTimestamp && (
                      <div>
                        <p className="text-sm font-medium">Actual Return</p>
                        <p className="text-sm text-muted-foreground">{verificationResult.returnTimestamp}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {verificationResult ? (
              <div className="flex gap-4">
                <Button variant="outline" onClick={resetScan}>
                  Scan Another
                </Button>
                <Button>{verificationResult.entryStatus === "exited" ? "Mark as Returned" : "Mark as Exited"}</Button>
              </div>
            ) : (
              !isScanning && (
                <Button onClick={startScanning}>
                  <Scan className="mr-2 h-4 w-4" />
                  Start Scanning
                </Button>
              )
            )}
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
            <CardDescription>Recent gate pass verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="exit">Exits</TabsTrigger>
                <TabsTrigger value="return">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {scanHistory.map((scan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn("p-2 rounded-full", scan.action === "exit" ? "bg-yellow-100" : "bg-green-100")}
                        >
                          {scan.action === "exit" ? (
                            <QrCode className="h-5 w-5 text-yellow-600" />
                          ) : (
                            <QrCode className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{scan.student}</p>
                          <p className="text-sm text-muted-foreground">{scan.studentId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={cn(scan.action === "exit" ? "bg-yellow-500" : "bg-green-500")}>
                          {scan.action === "exit" ? "Exit" : "Return"}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{scan.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="exit" className="mt-6">
                <div className="space-y-4">
                  {scanHistory
                    .filter((scan) => scan.action === "exit")
                    .map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="bg-yellow-100 p-2 rounded-full">
                            <QrCode className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium">{scan.student}</p>
                            <p className="text-sm text-muted-foreground">{scan.studentId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-500">Exit</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{scan.timestamp}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="return" className="mt-6">
                <div className="space-y-4">
                  {scanHistory
                    .filter((scan) => scan.action === "return")
                    .map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <QrCode className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{scan.student}</p>
                            <p className="text-sm text-muted-foreground">{scan.studentId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-500">Return</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{scan.timestamp}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
