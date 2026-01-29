"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  BookOpen, 
  Calendar,
  Heart,
  Plus,
  TrendingUp,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"

const children = [
  {
    id: "1",
    name: "Jamie",
    grade: "8th Grade",
    avatar: "J",
    recentActivity: "Completed Math assessment",
    activityDate: "2 hours ago",
    totalAssessments: 12,
    averageKnown: 72,
    streak: 5,
  },
  {
    id: "2",
    name: "Alex",
    grade: "5th Grade",
    avatar: "A",
    recentActivity: "Joined Science class",
    activityDate: "1 day ago",
    totalAssessments: 8,
    averageKnown: 65,
    streak: 3,
  },
]

const recentActivity = [
  {
    id: "1",
    child: "Jamie",
    action: "Completed assessment",
    subject: "Mathematics - Fractions",
    date: "2 hours ago",
    result: "67% known",
  },
  {
    id: "2",
    child: "Alex",
    action: "Completed assessment",
    subject: "Science - Plants",
    date: "1 day ago",
    result: "75% known",
  },
  {
    id: "3",
    child: "Jamie",
    action: "Joined class",
    subject: "History 8C - Ms. Davis",
    date: "2 days ago",
    result: null,
  },
  {
    id: "4",
    child: "Alex",
    action: "Completed assessment",
    subject: "English - Grammar",
    date: "3 days ago",
    result: "80% known",
  },
]

export default function ParentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome, Parent!
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor your children&apos;s learning progress
        </p>
      </div>

      {/* Supportive Message */}
      <div className="bg-primary/20 rounded-xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Supporting your child&apos;s learning</h2>
          <p className="text-sm text-muted-foreground mt-1 text-pretty">
            METY helps identify what your child knows and where they need support. 
            Celebrate their strengths and work together on areas for growth.
          </p>
        </div>
      </div>

      {/* Children Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Your Children</h2>
          <Link href="/parent/link">
            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
              <Plus className="w-4 h-4" />
              Link Child
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {children.map((child, index) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={`/parent/children/${child.id}`}>
                <div className="bg-card rounded-xl border border-border p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-lg font-semibold text-accent-foreground">{child.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">{child.grade}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{child.recentActivity}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{child.activityDate}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xl font-bold text-foreground tabular-nums">{child.totalAssessments}</p>
                      <p className="text-xs text-muted-foreground">Assessments</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground tabular-nums">{child.averageKnown}%</p>
                      <p className="text-xs text-muted-foreground">Avg. Known</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground tabular-nums">{child.streak}</p>
                      <p className="text-xs text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        </div>
        <div className="bg-card rounded-xl border border-border divide-y divide-border">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              className="p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.child}</span>
                  {" "}{activity.action}
                </p>
                <p className="text-sm text-muted-foreground truncate">{activity.subject}</p>
              </div>
              <div className="text-right flex-shrink-0">
                {activity.result && (
                  <p className="text-sm font-medium text-accent">{activity.result}</p>
                )}
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-muted rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-3">Tips for Supporting Learning</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Celebrate progress, not just perfection. Every assessment helps identify learning opportunities.</span>
          </li>
          <li className="flex items-start gap-2">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Encourage regular self-assessments to build metacognitive skills.</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Focus on &ldquo;don&apos;t know yet&rdquo; rather than &ldquo;don&apos;t know&rdquo; - growth mindset matters!</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
