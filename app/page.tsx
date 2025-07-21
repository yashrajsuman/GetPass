import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { QrCode, Shield, User } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">GatePass - Digital Outpass System</h1>
        <p className="text-xl text-muted-foreground">
          A modern solution for managing campus entry and exit permissions
        </p>

        <div className="grid gap-6 md:grid-cols-3 mt-8">
          <Card>
            <CardHeader className="space-y-1 flex flex-col items-center">
              <User className="h-8 w-8 mb-2" />
              <CardTitle>Student</CardTitle>
              <CardDescription>Apply for gate passes and view history</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/student">
                <Button>Student Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1 flex flex-col items-center">
              <Shield className="h-8 w-8 mb-2" />
              <CardTitle>Warden</CardTitle>
              <CardDescription>Approve or reject student requests</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/warden">
                <Button>Warden Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1 flex flex-col items-center">
              <QrCode className="h-8 w-8 mb-2" />
              <CardTitle>Gatekeeper</CardTitle>
              <CardDescription>Scan and verify student passes</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/gatekeeper">
                <Button>Gatekeeper Screen</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
