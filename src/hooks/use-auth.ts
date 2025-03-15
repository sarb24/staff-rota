import { useSession } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"
  const user = session?.user

  const isAdmin = user?.role === "ADMIN"
  const isManager = user?.role === "MANAGER"
  const isStaff = user?.role === "STAFF"

  const canManageStaff = isAdmin || isManager
  const canCreateSchedule = isAdmin || isManager
  const canEditSettings = isAdmin
  const canViewStaffMember = (userId: string) => {
    if (!user) return false
    if (isAdmin || isManager) return true
    return user.id === userId
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    isManager,
    isStaff,
    canManageStaff,
    canCreateSchedule,
    canEditSettings,
    canViewStaffMember,
  }
} 