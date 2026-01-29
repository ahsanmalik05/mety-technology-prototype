"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  BarChart3,
  BookOpen, 
  Plus,
  TrendingDown,
  TrendingUp,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"

const classes = [
  {
    id: "1",
    name: "Math 8A",
    subject: "Mathematics",
    code: "MATH8A-2026",
    students: 24,
    recentActivity: 18,
    topGap: "Quadratic equations",
  },
  {
    id: "2",
    name: "Math 8B",
    subject: "Mathematics",
    code: "MATH8B-2026",
    students: 26,
    recentActivity: 22,
    topGap: "Factoring polynomials",
  },
  {
    id: "3",
    name: "Algebra 9A",
    subject: "Mathematics",
    code: "ALG9A-2026",
    students: 28,
    recentActivity: 15,
    topGap: "Systems of equations",
  },
]

const recentActivity = [
  { id: "1", class: "Math 8A", action: "12 students completed assessment", topic: "Fractions", date: "2 hours ago" },
  { id: "2", class: "Math 8B", action: "8 students completed assessment", topic: "Decimals", date: "5 hours ago" },
  { id: "3", class: "Algebra 9A", action: "New student joined", topic: null, date: "1 day ago" },
  { id: "4", class: "Math 8A", action: "15 students completed assessment", topic: "Linear equations", date: "2 days ago" },
]

const topKnowledgeGaps = [
  { topic: "Quadratic equations", percentage: 68, trend: "down" },
  { topic: "Factoring polynomials", percentage: 62, trend: "up" },
  { topic: "Graphing functions", percentage: 58, trend: "down" },
  { topic: "Word problems", percentage: 55, trend: "stable" },
  { topic: "Fractions division", percentage: 52, trend: "up" },
]

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome, Sarah!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening in your classes
          </p>
        </div>
        <Link href="/teacher/classes/new">
          <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Add New Class
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Users className="w-4 h-4" />
            Total Students
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">78</p>
          <p className="text-xs text-muted-foreground">Across 3 classes</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            Assessments
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">245</p>
          <p className="text-xs text-muted-foreground">This month</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <TrendingUp className="w-4 h-4" />
            Avg. Known
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">64%</p>
          <p className="text-xs text-success">+5% from last month</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <BarChart3 className="w-4 h-4" />
            Active Rate
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">82%</p>
          <p className="text-xs text-muted-foreground">Students this week</p>
        </div>
      </div>

      {/* Classes Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Classes</h2>
          <Link href="/teacher/classes">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
              View all
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={`/teacher/classes/${cls.id}`}>
                <div className="bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                        {cls.subject}
                      </span>
                      <h3 className="font-semibold text-foreground text-lg mt-2">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{cls.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {cls.students} students
                    </span>
                    <span className="tabular-nums">{cls.recentActivity} active</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Top knowledge gap:</p>
                    <p className="text-sm font-medium text-foreground">{cls.topGap}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.class}</span>
                      {" - "}{activity.action}
                    </p>
                    {activity.topic && (
                      <p className="text-sm text-muted-foreground">{activity.topic}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Knowledge Gaps */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Knowledge Gaps</h2>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Topics where students most commonly identify gaps (across all classes)
            </p>
            <div className="space-y-4">
              {topKnowledgeGaps.map((gap, index) => (
                <div key={gap.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{gap.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground tabular-nums">{gap.percentage}%</span>
                      {gap.trend === "down" && <TrendingDown className="w-4 h-4 text-destructive" />}
                      {gap.trend === "up" && <TrendingUp className="w-4 h-4 text-success" />}
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${gap.percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-destructive/60 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/teacher/reports">
              <Button variant="ghost" size="sm" className="w-full mt-4 gap-1">
                View Detailed Analytics
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
