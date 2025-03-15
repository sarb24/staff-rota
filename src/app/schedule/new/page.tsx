"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useStaff } from "@/contexts/StaffContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react"
import { toast } from "sonner"
import { ShiftType } from "@/types/scheduling"

const SHIFT_TYPES: ShiftType[] = ["morning", "afternoon", "night"]

export default function NewSchedulePage() {
  const router = useRouter()
  const { staff, addScheduleEntry } = useStaff()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedStaff, setSelectedStaff] = useState<string>("")
  const [selectedShift, setSelectedShift] = useState<ShiftType | "">("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedStaff || !selectedShift) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      await addScheduleEntry({
        employeeId: parseInt(selectedStaff),
        date: selectedDate,
        shift: selectedShift as ShiftType
      })
      toast.success("Schedule created successfully")
      router.push("/schedule")
    } catch (error) {
      console.error("Error creating schedule:", error)
      toast.error("Failed to create schedule")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Create New Schedule</h1>
            <p className="text-gray-600">Assign shifts to staff members</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/schedule">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Schedule
            </Link>
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Schedule Details</CardTitle>
              <CardDescription>
                Select a date, staff member, and shift type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Staff Member</label>
                <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Shift</label>
                <Select 
                  value={selectedShift} 
                  onValueChange={(value: string) => setSelectedShift(value as ShiftType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIFT_TYPES.map((shift) => (
                      <SelectItem key={shift} value={shift}>
                        {shift.charAt(0).toUpperCase() + shift.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating..." : "Create Schedule"}
                </Button>
                <Button type="button" variant="outline" asChild className="flex-1">
                  <Link href="/schedule">Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">
            After creating a schedule, you can view and manage it in the schedule overview page.
          </p>
        </div>
      </div>
    </div>
  )
} 