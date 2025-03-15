"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useStaff } from "@/contexts/StaffContext"
import { ShiftType, Employee } from "@/types/scheduling"
import { toast } from "sonner"

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const SHIFT_TYPES: ShiftType[] = ["morning", "afternoon", "night"]

interface StaffEditFormProps {
  id: string
}

export function StaffEditForm({ id }: StaffEditFormProps) {
  const router = useRouter()
  const { staff, updateStaff } = useStaff()
  const [formData, setFormData] = useState<Employee | null>(null)

  useEffect(() => {
    const staffMember = staff.find(s => s.id === parseInt(id))
    if (!staffMember) {
      toast.error("Staff member not found")
      router.push("/staff")
      return
    }
    setFormData(staffMember)
  }, [staff, id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    try {
      await updateStaff(formData)
      toast.success("Staff member updated successfully")
      router.push("/staff")
    } catch (error) {
      toast.error("Failed to update staff member")
    }
  }

  const handleShiftToggle = (shift: ShiftType) => {
    if (!formData) return

    setFormData(prev => {
      if (!prev) return prev
      const newPreferences = prev.shiftPreferences.includes(shift)
        ? prev.shiftPreferences.filter(s => s !== shift)
        : [...prev.shiftPreferences, shift]
      return { ...prev, shiftPreferences: newPreferences }
    })
  }

  const handleDayToggle = (day: string) => {
    if (!formData) return

    setFormData(prev => {
      if (!prev) return prev
      const newDays = prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
      return { ...prev, workingDays: newDays }
    })
  }

  if (!formData) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Edit Staff Member</h1>
            <p className="text-gray-600">Update staff member details</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/staff">Back to Staff</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Staff Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData(prev => prev ? { ...prev, name: e.target.value } : null)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={e => setFormData(prev => prev ? { ...prev, role: e.target.value } : null)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => prev ? { ...prev, email: e.target.value } : null)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractedHours">Contracted Hours per Week</Label>
                <Input
                  id="contractedHours"
                  type="number"
                  min="0"
                  max="168"
                  value={formData.contractedHours}
                  onChange={e => setFormData(prev => prev ? { ...prev, contractedHours: parseInt(e.target.value) } : null)}
                  required
                />
                <p className="text-sm text-gray-500">Enter the number of hours this staff member is contracted to work per week</p>
              </div>

              <div className="space-y-2">
                <Label>Shift Preferences</Label>
                <div className="grid grid-cols-3 gap-4">
                  {SHIFT_TYPES.map(shift => (
                    <div key={shift} className="flex items-center space-x-2">
                      <Checkbox
                        id={`shift-${shift}`}
                        checked={formData.shiftPreferences.includes(shift)}
                        onCheckedChange={() => handleShiftToggle(shift)}
                      />
                      <Label htmlFor={`shift-${shift}`} className="capitalize">
                        {shift}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Working Days</Label>
                <div className="grid grid-cols-4 gap-4">
                  {DAYS_OF_WEEK.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day}`}
                        checked={formData.workingDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label htmlFor={`day-${day}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={e => setFormData(prev => prev ? { ...prev, phone: e.target.value } : null)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  value={formData.notes || ""}
                  onChange={e => setFormData(prev => prev ? { ...prev, notes: e.target.value } : null)}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/staff">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 