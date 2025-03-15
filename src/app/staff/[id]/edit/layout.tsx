import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Staff Member - Staff Rota",
  description: "Edit staff member details",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 