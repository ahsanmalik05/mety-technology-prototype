"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Clock,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"

const recentAssessments = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Fractions and Decimals",
    grade: "8th Grade",
    date: "2 days ago",
    known: 8,
    unknown: 4,
    total: 12,
  },
  {
    id: "2",
    subject: "Science",
    topic: "Cell Biology",
    grade: "8th Grade",
    date: "1 week ago",
    known: 10,
    unknown: 2,
    total: 12,
  },
  {
    id: "3",
    subject: "History",
    topic: "American Revolution",
    grade: "8th Grade",
    date: "2 weeks ago",
    known: 6,
    unknown: 6,
    total: 12,
  },
]

const enrolledClasses = [
  {
    id: "1",
    name: "Math 8A",
    teacher: "Mrs. Johnson",
    students: 24,
  },
  {
    id: "2",
    name: "Science 8B",
    teacher: "Mr. Roberts",
    students: 26,
  },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, Jamie!
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to discover what you know?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/assessment">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-primary p-6 rounded-xl flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 bg-background/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-primary-foreground">Start New Assessment</h2>
              <p className="text-sm text-primary-foreground/80">Identify knowledge gaps in any topic</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary-foreground" />
          </motion.div>
        </Link>
        <Link href="/student/classes">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-card border border-border p-6 rounded-xl flex items-center gap-4 cursor-pointer"
          >
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">Join a Class</h2>
              <p className="text-sm text-muted-foreground">Connect with your teacher</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            Assessments
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">12</p>
          <p className="text-xs text-muted-foreground">Total completed</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            Knowledge
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">68%</p>
          <p className="text-xs text-muted-foreground">Average known</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Calendar className="w-4 h-4" />
            Streak
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">5</p>
          <p className="text-xs text-muted-foreground">Days active</p>
        </div>
      </div>

      {/* Recent Assessments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Assessments</h2>
          <Link href="/student/history">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              View all
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {recentAssessments.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={`/student/history/${assessment.id}`}>
                <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {assessment.subject}
                        </span>
                        <span className="text-xs text-muted-foreground">{assessment.grade}</span>
                      </div>
                      <h3 className="font-medium text-foreground">{assessment.topic}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {assessment.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground tabular-nums">
                        {Math.round((assessment.known / assessment.total) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">Known</p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden flex">
                    <div 
                      className="bg-success h-full" 
                      style={{ width: `${(assessment.known / assessment.total) * 100}%` }}
                    />
                    <div 
                      className="bg-destructive/60 h-full" 
                      style={{ width: `${(assessment.unknown / assessment.total) * 100}%` }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enrolled Classes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">My Classes</h2>
          <Link href="/student/classes">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              Manage
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {enrolledClasses.map((cls) => (
            <div key={cls.id} className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-medium text-foreground">{cls.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cls.teacher}</p>
              <p className="text-xs text-muted-foreground mt-2">{cls.students} students</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
