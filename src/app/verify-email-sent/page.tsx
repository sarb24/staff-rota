"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

export default function VerifyEmailSentPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We've sent you a verification link
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Icons.mail className="h-12 w-12 text-primary" />
          <p className="text-center text-sm text-muted-foreground">
            We've sent a verification link to your email address.
            Please check your inbox and click the link to verify your account.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            If you don't see the email, check your spam folder.
          </p>
          <Button asChild variant="outline">
            <Link href="/login">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 