"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft,
  CheckCircle2,
  Copy,
  QrCode
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Art",
  "Music",
  "Foreign Language",
  "Economics",
  "Psychology",
  "Other",
]

const grades = [
  { value: "2", label: "2nd Grade" },
  { value: "3", label: "3rd Grade" },
  { value: "4", label: "4th Grade" },
  { value: "5", label: "5th Grade" },
  { value: "6", label: "6th Grade" },
  { value: "7", label: "7th Grade" },
  { value: "8", label: "8th Grade" },
  { value: "9", label: "9th Grade (Freshman)" },
  { value: "10", label: "10th Grade (Sophomore)" },
  { value: "11", label: "11th Grade (Junior)" },
  { value: "12", label: "12th Grade (Senior)" },
  { value: "college", label: "College" },
]

export default function NewClassPage() {
  const [className, setClassName] = useState("")
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!className.trim() || !subject || !grade) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Generate a class code
    const code = `${subject.substring(0, 3).toUpperCase()}${grade}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setGeneratedCode(code)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-8 h-8 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Class Created!</h1>
          <p className="text-muted-foreground mt-2">
            Share the join code with your students
          </p>
        </div>

        {/* Join Code Card */}
        <div className="bg-card rounded-xl border border-border p-6 mt-6">
          <p className="text-sm text-muted-foreground mb-2">Class Join Code</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-lg p-4">
              <p className="text-2xl font-mono font-bold text-foreground tracking-wider text-center">
                {generatedCode}
              </p>
            </div>
            <Button
              onClick={handleCopyCode}
              variant="outline"
              size="icon"
              className="h-14 w-14 bg-transparent"
            >
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Students can enter this code at mety.org to join your class
          </p>
        </div>

        {/* QR Code Option */}
        <div className="bg-muted rounded-xl p-6 mt-4 flex items-center gap-4">
          <div className="w-20 h-20 bg-card rounded-lg border border-border flex items-center justify-center">
            <QrCode className="w-10 h-10 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">QR Code</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Display in your classroom for easy joining
            </p>
            <Button variant="link" size="sm" className="px-0 mt-1">
              Download QR Code
            </Button>
          </div>
        </div>

        {/* Class Details */}
        <div className="bg-card rounded-xl border border-border p-6 mt-4">
          <h3 className="font-medium text-foreground mb-4">Class Details</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium text-foreground">{className}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subject</dt>
              <dd className="font-medium text-foreground">{subject}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Grade</dt>
              <dd className="font-medium text-foreground">
                {grades.find(g => g.value === grade)?.label}
              </dd>
            </div>
            {description && (
              <div className="pt-3 border-t border-border">
                <dt className="text-muted-foreground mb-1">Description</dt>
                <dd className="text-foreground">{description}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Link href="/teacher/classes" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View All Classes
            </Button>
          </Link>
          <Link href="/teacher" className="flex-1">
            <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/teacher/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Classes
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Add New Class</h1>
        <p className="text-muted-foreground mt-1">
          Create a class and get a join code for your students
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-name">Class Name</Label>
            <Input
              id="class-name"
              placeholder="e.g., Math 8A"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject} required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the class..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!className.trim() || !subject || !grade || isSubmitting}
          className="w-full bg-foreground text-background hover:bg-foreground/90"
          size="lg"
        >
          {isSubmitting ? "Creating Class..." : "Create Class"}
        </Button>
      </form>
    </div>
  )
}
