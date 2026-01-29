"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft,
  CheckCircle2,
  Mail,
  Plus,
  Shield,
  Upload,
  User,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const classes = [
  { id: "1", name: "Math 8A", code: "MATH8A-2026" },
  { id: "2", name: "Math 8B", code: "MATH8B-2026" },
  { id: "3", name: "Algebra 9A", code: "ALG9A-2026" },
]

interface StudentEntry {
  id: string
  name: string
  email: string
}

export default function CreateStudentsPage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [students, setStudents] = useState<StudentEntry[]>([
    { id: "1", name: "", email: "" }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const addStudent = () => {
    setStudents([...students, { id: Date.now().toString(), name: "", email: "" }])
  }

  const removeStudent = (id: string) => {
    if (students.length > 1) {
      setStudents(students.filter(s => s.id !== id))
    }
  }

  const updateStudent = (id: string, field: "name" | "email", value: string) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClass || students.some(s => !s.name || !s.email)) return
    
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
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
          <h1 className="text-2xl font-bold text-foreground">Accounts Created!</h1>
          <p className="text-muted-foreground mt-2">
            {students.filter(s => s.name && s.email).length} student accounts have been created
          </p>
        </div>

        {/* Email Preview */}
        <div className="bg-card rounded-xl border border-border p-6 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-medium text-foreground">Email Notification Preview</h3>
          </div>
          <div className="bg-muted rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-xs">M</span>
              </div>
              <span className="font-medium">METY Foundation</span>
            </div>
            <p className="text-foreground mb-2">Hi [Student Name],</p>
            <p className="text-muted-foreground mb-2">
              Your teacher has created a METY account for you. You can now use 
              self-assessment to identify what you know and where you need help.
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Your login:</strong><br />
              Email: [student@email.com]<br />
              Temporary password: [Generated]
            </p>
            <p className="text-muted-foreground">
              <strong>Class:</strong> {classes.find(c => c.id === selectedClass)?.name}
            </p>
          </div>
        </div>

        {/* Consent Note */}
        <div className="bg-accent/10 rounded-xl p-4 mt-4 flex gap-3">
          <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Students will be asked to accept METY&apos;s privacy policy when they first log in. 
            Parental consent indicators will be tracked in your class roster.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => {
              setStudents([{ id: "1", name: "", email: "" }])
              setIsSuccess(false)
            }}
            variant="outline"
            className="flex-1"
          >
            Create More Students
          </Button>
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
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/teacher" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create Student Accounts</h1>
        <p className="text-muted-foreground mt-1">
          Add students to your class individually or in bulk
        </p>
      </div>

      {/* Class Selection */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        <Label htmlFor="class-select" className="mb-2 block">Select Class</Label>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger id="class-select">
            <SelectValue placeholder="Choose a class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name} ({cls.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Entry Methods */}
      <Tabs defaultValue="single" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Add Individually</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload (CSV)</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Student {index + 1}</span>
                    {students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStudent(student.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${student.id}`}>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id={`name-${student.id}`}
                          placeholder="Student name"
                          value={student.name}
                          onChange={(e) => updateStudent(student.id, "name", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`email-${student.id}`}>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id={`email-${student.id}`}
                          type="email"
                          placeholder="student@school.edu"
                          value={student.email}
                          onChange={(e) => updateStudent(student.id, "email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addStudent}
              className="w-full mt-4 gap-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              Add Another Student
            </Button>

            <Button
              type="submit"
              disabled={!selectedClass || students.some(s => !s.name || !s.email) || isSubmitting}
              className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              {isSubmitting ? "Creating Accounts..." : `Create ${students.length} Account${students.length > 1 ? "s" : ""}`}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="bulk" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground">Upload CSV File</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop or click to upload
              </p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Choose File
              </Button>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">CSV Format</h4>
              <p className="text-xs text-muted-foreground font-mono">
                name,email<br />
                John Smith,john@school.edu<br />
                Jane Doe,jane@school.edu
              </p>
            </div>

            <Button variant="link" size="sm" className="mt-2 px-0">
              Download CSV Template
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Privacy Notice */}
      <div className="bg-muted rounded-xl p-4 flex gap-3">
        <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Consent Management</p>
          <p className="mt-1">
            Students will receive a METY-branded welcome email with login instructions. 
            Parental consent status is tracked for COPPA compliance.
          </p>
        </div>
      </div>
    </div>
  )
}
