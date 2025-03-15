"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  UserPlus, 
  Clock, 
  CalendarPlus, 
  Share2, 
  ChevronRight,
  ArrowLeft
} from "lucide-react"

const steps = [
  {
    title: "Add Staff Members",
    description: "Start by adding your team members to the system. Include their names, roles, and contact information.",
    icon: UserPlus,
    link: "/staff/new",
    buttonText: "Add Staff"
  },
  {
    title: "Set Working Hours",
    description: "Define working hours and shift patterns for your team members. This helps in creating efficient schedules.",
    icon: Clock,
    link: "/settings/hours",
    buttonText: "Set Hours"
  },
  {
    title: "Create Schedule",
    description: "Create your first staff schedule. Use our intuitive calendar interface to assign shifts to team members.",
    icon: CalendarPlus,
    link: "/schedule/new",
    buttonText: "Create Schedule"
  },
  {
    title: "Share with Team",
    description: "Share the schedule with your team. They can view their shifts and receive notifications about updates.",
    icon: Share2,
    link: "/settings/sharing",
    buttonText: "Share Settings"
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Getting Started Guide</h1>
            <p className="text-gray-600">Follow these steps to set up your staff rota system</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <step.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <span className="text-blue-500">Step {index + 1}:</span> 
                    {step.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <Button asChild>
                    <Link href={step.link}>
                      {step.buttonText}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-lg text-white">
          <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
          <p className="mb-6 text-blue-100">
            Check out our detailed documentation and support resources to make the most of Staff Rota.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              View Documentation
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-600">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 