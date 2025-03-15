"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Mail, MessageCircle, FileText, ExternalLink, Github } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find resources and support to help you make the most of Staff Rota
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Documentation
            </CardTitle>
            <CardDescription>
              Learn how to use Staff Rota with our comprehensive guides
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Getting Started</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Setting up your organization</li>
                <li>Adding staff members</li>
                <li>Creating schedules</li>
                <li>Managing shifts</li>
              </ul>
            </div>
            <Button asChild className="w-full">
              <Link href="/docs">
                View Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Support
            </CardTitle>
            <CardDescription>
              Get help from our support team or community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our support team is available Monday to Friday, 9am - 5pm GMT
                </p>
              </div>
              <div className="grid gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="mailto:support@staffrota.app">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="https://github.com/yourusername/staff-rota/issues" target="_blank">
                    <Github className="mr-2 h-4 w-4" />
                    Report an Issue
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resources
            </CardTitle>
            <CardDescription>
              Additional resources and guides
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/docs/faq"
                  className="flex items-center justify-between hover:text-primary"
                >
                  Frequently Asked Questions
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/docs/best-practices"
                  className="flex items-center justify-between hover:text-primary"
                >
                  Best Practices Guide
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/docs/tutorials"
                  className="flex items-center justify-between hover:text-primary"
                >
                  Video Tutorials
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Community
            </CardTitle>
            <CardDescription>
              Connect with other Staff Rota users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Join our community to share tips, ask questions, and connect with other users.
            </p>
            <div className="grid gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://discord.gg/staffrota" target="_blank">
                  Join Discord Community
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="https://forum.staffrota.app" target="_blank">
                  Visit Forum
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 