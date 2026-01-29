"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3,
  Home, 
  Settings, 
  Users,
  Menu,
  X,
  LogOut,
  UserPlus,
  FileText
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/teacher", icon: Home },
  { name: "My Classes", href: "/teacher/classes", icon: Users },
  { name: "Create Students", href: "/teacher/students/create", icon: UserPlus },
  { name: "Reports", href: "/teacher/reports", icon: FileText },
  { name: "Settings", href: "/teacher/settings", icon: Settings },
]

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 -m-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-sm">M</span>
              </div>
              <span className="font-semibold text-foreground hidden sm:inline">METY Foundation</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground bg-foreground/10 px-2 py-1 rounded">
              Teacher Account
            </span>
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-xs font-medium text-background">SK</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:top-14 lg:border-r lg:border-border bg-card">
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/20 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </Link>
          </div>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-foreground/20" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <aside className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border pt-14 z-50">
              <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/20 text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t border-border">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
