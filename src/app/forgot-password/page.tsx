"use client"

import { useState } from "react"
import { sendPasswordResetEmail } from "@/lib/email"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"input" | "loading" | "success" | "error">("input")
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setStatus("loading")
    try {
      await sendPasswordResetEmail(email)
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Failed to send reset email")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "input" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
              <div className="text-center">
                <Button asChild variant="link">
                  <Link href="/login">Back to Login</Link>
                </Button>
              </div>
            </form>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Icons.spinner className="h-6 w-6 animate-spin" />
              <p>Sending reset link...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <Icons.check className="h-6 w-6 text-green-500" />
              <p className="text-center">
                If an account exists with that email address, we've sent a password reset link.
                Please check your email.
              </p>
              <Button asChild>
                <Link href="/login">Back to Login</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <Icons.warning className="h-6 w-6 text-red-500" />
              <p className="text-center text-red-500">{error}</p>
              <Button onClick={() => setStatus("input")} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 