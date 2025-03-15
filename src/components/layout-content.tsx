"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  Settings,
  HelpCircle,
  BookOpen,
  Home
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: Calendar
  },
  {
    name: "Staff",
    href: "/staff",
    icon: Users
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings
  },
  {
    name: "Documentation",
    href: "/docs",
    icon: BookOpen
  },
  {
    name: "Help & Support",
    href: "/help",
    icon: HelpCircle
  }
]

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-semibold">Staff Rota</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Button
                        asChild
                        variant="ghost"
                        className={cn(
                          "w-full justify-start",
                          pathname === item.href && "bg-gray-50"
                        )}
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
} 