"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useStaff } from "@/contexts/StaffContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function StaffPage() {
  const { staff, deleteStaff } = useStaff()

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      deleteStaff(id)
      toast.success("Staff member deleted successfully")
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Staff Directory</h1>
            <p className="text-gray-600">View and manage staff members</p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/staff/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Staff
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            {staff.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No staff members found</p>
                <Button asChild>
                  <Link href="/staff/new">Add Your First Staff Member</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Shift Preference</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell className="capitalize">
                        {member.shiftPreferences.join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/staff/${member.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 