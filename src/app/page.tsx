"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, BarChart, Clock, Settings, PlusCircle } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Staff Rota</h1>
          <p className="text-xl text-gray-600">Streamline your staff scheduling and management</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <CalendarDays className="h-8 w-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Schedule</h2>
            </div>
            <p className="text-gray-600 mb-6">Create and manage staff schedules with our intuitive calendar interface.</p>
            <Button asChild className="w-full">
              <Link href="/schedule">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Schedule
              </Link>
            </Button>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Staff</h2>
            </div>
            <p className="text-gray-600 mb-6">Manage your team members, roles, and availability all in one place.</p>
            <Button asChild className="w-full">
              <Link href="/staff">
                <Users className="mr-2 h-4 w-4" />
                View Staff
              </Link>
            </Button>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
            </div>
            <p className="text-gray-600 mb-6">Get insights into scheduling patterns and staff performance.</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/reports">View Reports</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Key Features</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <span>Real-time schedule updates</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Users className="h-5 w-5 text-blue-500 mr-3" />
                <span>Team availability management</span>
              </li>
              <li className="flex items-center text-gray-700">
                <Settings className="h-5 w-5 text-blue-500 mr-3" />
                <span>Customizable scheduling rules</span>
              </li>
              <li className="flex items-center text-gray-700">
                <BarChart className="h-5 w-5 text-blue-500 mr-3" />
                <span>Advanced reporting and analytics</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm text-white">
            <h3 className="text-2xl font-semibold mb-6">Getting Started</h3>
            <p className="mb-6 text-blue-100">
              New to Staff Rota? Follow these simple steps to get your team up and running.
            </p>
            <ol className="space-y-4 list-decimal list-inside text-blue-50">
              <li>Add your staff members</li>
              <li>Set up working hours</li>
              <li>Create your first schedule</li>
              <li>Share with your team</li>
            </ol>
            <Button asChild className="mt-8 bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/guide">View Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
} 