"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  Plus,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"

const classes = [
  {
    id: "1",
    name: "Math 8A",
    subject: "Mathematics",
    grade: "8th Grade",
    code: "MATH8A-2026",
    students: 24,
    activeStudents: 18,
    totalAssessments: 156,
    avgKnown: 64,
    topGap: "Quadratic equations",
  },
  {
    id: "2",
    name: "Math 8B",
    subject: "Mathematics",
    grade: "8th Grade",
    code: "MATH8B-2026",
    students: 26,
    activeStudents: 22,
    totalAssessments: 189,
    avgKnown: 68,
    topGap: "Factoring polynomials",
  },
  {
    id: "3",
    name: "Algebra 9A",
    subject: "Mathematics",
    grade: "9th Grade",
    code: "ALG9A-2026",
    students: 28,
    activeStudents: 15,
    totalAssessments: 98,
    avgKnown: 58,
    topGap: "Systems of equations",
  },
]

export default function TeacherClassesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Classes</h1>
          <p className="text-muted-foreground mt-1">
            Manage your classes and view student analytics
          </p>
        </div>
        <Link href="/teacher/classes/new">
          <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
            <Plus className="w-4 h-4" />
            Add Class
          </Button>
        </Link>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4">
        {classes.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Link href={`/teacher/classes/${cls.id}`}>
              <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                        {cls.subject}
                      </span>
                      <span className="text-xs text-muted-foreground">{cls.grade}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono mt-1">{cls.code}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
                    <div>
                      <p className="text-2xl font-bold text-foreground tabular-nums">{cls.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground tabular-nums">{cls.activeStudents}</p>
                      <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground tabular-nums">{cls.totalAssessments}</p>
                      <p className="text-xs text-muted-foreground">Assessments</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground tabular-nums">{cls.avgKnown}%</p>
                      <p className="text-xs text-muted-foreground">Avg. Known</p>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-muted-foreground hidden lg:block" />
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Top knowledge gap:</p>
                    <p className="text-sm font-medium text-foreground">{cls.topGap}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{cls.activeStudents} active this week</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {classes.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground">No classes yet</h3>
          <p className="text-muted-foreground mt-1">
            Create your first class to get started
          </p>
          <Link href="/teacher/classes/new">
            <Button className="mt-4 bg-foreground text-background hover:bg-foreground/90 gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Class
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
