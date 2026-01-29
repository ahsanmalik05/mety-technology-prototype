"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Shield,
  ArrowRight,
  User,
  GraduationCap,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Role = "student" | "parent" | "teacher"

const roleConfig = {
  student: {
    icon: GraduationCap,
    title: "Student",
    description: "Access your assessments and track progress",
    color: "bg-primary"
  },
  parent: {
    icon: Users,
    title: "Parent",
    description: "Monitor your children's learning journey",
    color: "bg-accent"
  },
  teacher: {
    icon: User,
    title: "Teacher",
    description: "Manage classes and view analytics",
    color: "bg-foreground"
  }
}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get("role") as Role) || "student"
  
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle authentication
    console.log("[v0] Form submitted:", { email, password, name, role: selectedRole, isLogin })
  }

  return (
    <div className="min-h-dvh bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
              <span className="font-bold text-background">M</span>
            </div>
            <span className="font-semibold text-foreground text-xl">METY Foundation</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground text-balance leading-tight">
              Discover what you know and what you need to learn
            </h1>
            <p className="mt-4 text-muted-foreground text-lg text-pretty">
              Join 500,000+ students who have improved their grades using our 
              research-backed self-assessment method.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-card border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-muted-foreground">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span> from 10,000+ reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>GDPR & COPPA Compliant</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary-foreground text-sm">M</span>
            </div>
            <span className="font-semibold text-foreground">METY Foundation</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {isLogin 
                  ? "Sign in to continue your learning journey" 
                  : "Start improving your grades today"}
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <Label className="text-sm text-muted-foreground mb-3 block">I am a...</Label>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(roleConfig) as Role[]).map((role) => {
                  const config = roleConfig[role]
                  const isSelected = selectedRole === role
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`
                        flex flex-col items-center p-3 rounded-lg border-2 transition-all
                        ${isSelected 
                          ? "border-foreground bg-foreground/5" 
                          : "border-border hover:border-muted-foreground/50"}
                      `}
                    >
                      <div className={`w-8 h-8 rounded-lg ${isSelected ? config.color : "bg-muted"} flex items-center justify-center mb-2`}>
                        <config.icon className={`w-4 h-4 ${isSelected ? (role === "teacher" ? "text-background" : "text-foreground") : "text-muted-foreground"}`} />
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                        {config.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Login/Signup Toggle */}
            <Tabs value={isLogin ? "login" : "signup"} onValueChange={(v) => setIsLogin(v === "login")} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Log in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <Link href="/forgot-password" className="text-sm text-accent hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
                {isLogin ? "Log in" : "Create account"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Guest Option (Students only) */}
            {selectedRole === "student" && (
              <div className="mt-6 pt-6 border-t border-border">
                <Link href="/assessment">
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    Continue as Guest
                    <span className="text-xs text-muted-foreground">(No account needed)</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Security Indicator */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>256-bit SSL encryption</span>
              <span className="mx-2">•</span>
              <Shield className="w-3 h-3" />
              <span>Privacy protected</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
