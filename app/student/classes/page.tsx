"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Plus,
  Shield,
  Users,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const enrolledClasses = [
  {
    id: "1",
    name: "Math 8A",
    code: "MATH8A-2026",
    teacher: "Mrs. Johnson",
    subject: "Mathematics",
    students: 24,
    joinedDate: "Sep 5, 2025",
  },
  {
    id: "2",
    name: "Science 8B",
    code: "SCI8B-2026",
    teacher: "Mr. Roberts",
    subject: "Science",
    students: 26,
    joinedDate: "Sep 5, 2025",
  },
  {
    id: "3",
    name: "History 8C",
    code: "HIS8C-2026",
    teacher: "Ms. Davis",
    subject: "History",
    students: 22,
    joinedDate: "Oct 1, 2025",
  },
]

export default function StudentClassesPage() {
  const [classCode, setClassCode] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinClass = async () => {
    if (!classCode.trim()) return
    setIsJoining(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsJoining(false)
    setIsDialogOpen(false)
    setClassCode("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Classes</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your enrolled classes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
              <Plus className="w-4 h-4" />
              Join Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join a Class</DialogTitle>
              <DialogDescription>
                Enter the class code provided by your teacher to join their class.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="class-code">Class Code</Label>
                <Input
                  id="class-code"
                  placeholder="e.g., MATH8A-2026"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                  className="font-mono"
                />
              </div>

              {/* Privacy Notice */}
              <div className="bg-accent/10 rounded-lg p-4 flex gap-3">
                <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your privacy is protected</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Teachers only see class-level trends and analytics. They cannot see your 
                    individual assessment details or personal information.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleJoinClass}
                disabled={!classCode.trim() || isJoining}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                {isJoining ? "Joining..." : "Join Class"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Privacy Banner */}
      <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Privacy First:</span> Your teachers can only see 
          anonymous class-level trends, not your individual assessment details or identity.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4">
        {enrolledClasses.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-card rounded-xl border border-border p-4 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {cls.subject}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{cls.code}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{cls.name}</h3>
                <p className="text-muted-foreground mt-1">{cls.teacher}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {cls.students} students
                  </span>
                  <span>Joined {cls.joinedDate}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {enrolledClasses.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground">No classes yet</h3>
          <p className="text-muted-foreground mt-1">
            Ask your teacher for a class code to get started
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mt-4 bg-foreground text-background hover:bg-foreground/90 gap-2"
          >
            <Plus className="w-4 h-4" />
            Join Your First Class
          </Button>
        </div>
      )}
    </div>
  )
}
