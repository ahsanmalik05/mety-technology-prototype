"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  CheckCircle2,
  Mail,
  Shield,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const steps = [
  {
    number: 1,
    title: "Enter Child's Email",
    description: "We'll send them a consent request"
  },
  {
    number: 2,
    title: "Child Approves",
    description: "Your child confirms the link in their account"
  },
  {
    number: 3,
    title: "Connected!",
    description: "View their learning progress"
  },
]

export default function LinkChildPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-8 h-8 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Request Sent!</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto text-pretty">
            We&apos;ve sent a consent request to <span className="font-medium text-foreground">{email}</span>. 
            Once your child approves the link, they&apos;ll appear in your dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                setEmail("")
                setIsSuccess(false)
              }}
              variant="outline"
            >
              Link Another Child
            </Button>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Link a Child</h1>
        <p className="text-muted-foreground mt-1">
          Connect with your child&apos;s account to view their learning progress
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-muted rounded-xl p-6">
        <h2 className="font-semibold text-foreground mb-4">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex sm:flex-col gap-3">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-sm font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="font-medium text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link Form */}
      <div className="bg-card rounded-xl border border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="child-email">Child&apos;s METY Account Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="child-email"
                type="email"
                placeholder="child@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your child must have a METY account. They can create one at mety.org
            </p>
          </div>

          <Button
            type="submit"
            disabled={!email.trim() || isSubmitting}
            className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2"
          >
            {isSubmitting ? (
              "Sending Request..."
            ) : (
              <>
                Send Link Request
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Privacy Notice */}
      <div className="bg-accent/10 rounded-xl p-6 flex gap-4">
        <Shield className="w-6 h-6 text-accent flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-foreground">Consent-Based Access</h3>
          <p className="text-sm text-muted-foreground mt-1 text-pretty">
            Your child must approve this connection from their account. This ensures they 
            are comfortable sharing their learning progress with you. They can revoke access 
            at any time.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              View assessment history and results
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              See class enrollments
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Track learning progress over time
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
