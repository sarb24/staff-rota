"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { verifyEmailToken } from "@/lib/email"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setError("No verification token provided")
      return
    }

    const verifyEmail = async () => {
      try {
        await verifyEmailToken(token)
        setStatus("success")
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "Failed to verify email")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            Verifying your email address...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Icons.spinner className="h-6 w-6 animate-spin" />
              <p>Please wait while we verify your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <Icons.check className="h-6 w-6 text-green-500" />
              <p>Your email has been verified successfully!</p>
              <Button asChild>
                <Link href="/login">Continue to Login</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <Icons.warning className="h-6 w-6 text-red-500" />
              <p className="text-center text-red-500">{error}</p>
              <Button asChild variant="outline">
                <Link href="/login">Back to Login</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 