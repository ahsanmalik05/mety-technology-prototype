"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Copy,
  Download,
  FileText,
  Settings,
  TrendingDown,
  TrendingUp,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const classData = {
  id: "1",
  name: "Math 8A",
  subject: "Mathematics",
  code: "MATH8A-2026",
  grade: "8th Grade",
  students: 24,
  activeStudents: 18,
  totalAssessments: 156,
  averageKnown: 64,
}

const knowledgeGaps = [
  { topic: "Quadratic equations", unknown: 68, partial: 12, known: 20 },
  { topic: "Factoring polynomials", unknown: 62, partial: 18, known: 20 },
  { topic: "Graphing functions", unknown: 58, partial: 22, known: 20 },
  { topic: "Word problems", unknown: 55, partial: 20, known: 25 },
  { topic: "Fractions division", unknown: 52, partial: 18, known: 30 },
  { topic: "Linear equations", unknown: 45, partial: 25, known: 30 },
  { topic: "Decimal operations", unknown: 38, partial: 22, known: 40 },
  { topic: "Basic algebra", unknown: 25, partial: 25, known: 50 },
]

const trendData = [
  { week: "Week 1", known: 58, unknown: 42 },
  { week: "Week 2", known: 60, unknown: 40 },
  { week: "Week 3", known: 62, unknown: 38 },
  { week: "Week 4", known: 61, unknown: 39 },
  { week: "Week 5", known: 64, unknown: 36 },
  { week: "Week 6", known: 64, unknown: 36 },
]

const students = [
  { id: "1", name: "Student A", assessments: 8, avgKnown: 72, lastActive: "2 hours ago", consent: true },
  { id: "2", name: "Student B", assessments: 7, avgKnown: 68, lastActive: "1 day ago", consent: true },
  { id: "3", name: "Student C", assessments: 9, avgKnown: 65, lastActive: "3 hours ago", consent: true },
  { id: "4", name: "Student D", assessments: 6, avgKnown: 58, lastActive: "2 days ago", consent: true },
  { id: "5", name: "Student E", assessments: 5, avgKnown: 55, lastActive: "5 days ago", consent: false },
]

const recentTopics = [
  { topic: "Fractions and Decimals", date: "Jan 27", assessments: 18, avgKnown: 67 },
  { topic: "Linear Equations", date: "Jan 20", assessments: 22, avgKnown: 62 },
  { topic: "Graphing", date: "Jan 13", assessments: 16, avgKnown: 58 },
]

export default function ClassDetailsPage() {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classData.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/teacher/classes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Classes
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                {classData.subject}
              </span>
              <span className="text-xs text-muted-foreground">{classData.grade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{classData.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                {classData.code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-7 px-2"
              >
                <Copy className="w-3 h-3" />
                <span className="ml-1 text-xs">{copied ? "Copied!" : "Copy"}</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <Users className="w-4 h-4" />
            Students
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{classData.students}</p>
          <p className="text-xs text-muted-foreground">{classData.activeStudents} active this week</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <BookOpen className="w-4 h-4" />
            Assessments
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{classData.totalAssessments}</p>
          <p className="text-xs text-muted-foreground">Total completed</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <BarChart3 className="w-4 h-4" />
            Avg. Known
          </div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{classData.averageKnown}%</p>
          <p className="text-xs text-success flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +6% from last month
          </p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <FileText className="w-4 h-4" />
            Reports
          </div>
          <Button variant="outline" size="sm" className="mt-1 w-full bg-transparent">
            Generate Weekly
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Knowledge Gaps Chart */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Top Knowledge Gaps</h3>
              <div className="space-y-3">
                {knowledgeGaps.slice(0, 5).map((gap) => (
                  <div key={gap.topic}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{gap.topic}</span>
                      <span className="text-sm text-muted-foreground tabular-nums">{gap.unknown}% unknown</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                      <div className="bg-success h-full" style={{ width: `${gap.known}%` }} />
                      <div className="bg-warning h-full" style={{ width: `${gap.partial}%` }} />
                      <div className="bg-destructive/60 h-full" style={{ width: `${gap.unknown}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Knowledge Trend</h3>
              <ChartContainer
                config={{
                  known: { label: "Known", color: "var(--success)" },
                  unknown: { label: "Unknown", color: "var(--destructive)" },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="known"
                      stroke="var(--color-success)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          {/* Recent Topics */}
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Recent Assessment Topics</h3>
            </div>
            <div className="divide-y divide-border">
              {recentTopics.map((topic) => (
                <div key={topic.topic} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{topic.topic}</p>
                    <p className="text-sm text-muted-foreground">{topic.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground tabular-nums">{topic.avgKnown}% known</p>
                    <p className="text-sm text-muted-foreground tabular-nums">{topic.assessments} assessments</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="space-y-6">
          <div className="bg-card rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">All Topics</h3>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
            <div className="divide-y divide-border">
              {knowledgeGaps.map((gap, index) => (
                <motion.div
                  key={gap.topic}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{gap.topic}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-success tabular-nums">{gap.known}% known</span>
                      <span className="text-foreground tabular-nums">{gap.partial}% partial</span>
                      <span className="text-destructive tabular-nums">{gap.unknown}% unknown</span>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                    <div className="bg-success h-full transition-all" style={{ width: `${gap.known}%` }} />
                    <div className="bg-warning h-full transition-all" style={{ width: `${gap.partial}%` }} />
                    <div className="bg-destructive/60 h-full transition-all" style={{ width: `${gap.unknown}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Knowledge Distribution</h3>
              <ChartContainer
                config={{
                  unknown: { label: "Unknown", color: "var(--destructive)" },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={knowledgeGaps} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis dataKey="topic" type="category" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={120} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="unknown" fill="var(--color-unknown)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Weekly Progress</h3>
              <ChartContainer
                config={{
                  known: { label: "Known %", color: "var(--accent)" },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[50, 70]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="known"
                      stroke="var(--color-known)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-known)", strokeWidth: 0, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
              <FileText className="w-4 h-4" />
              Generate Weekly Report
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-accent">i</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Student names are anonymized to protect privacy. You can see aggregate data and activity levels, 
              but not individual assessment details.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Assessments</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Avg. Known</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Active</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Consent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <span className="font-medium text-foreground">{student.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-foreground tabular-nums">{student.assessments}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-foreground tabular-nums">{student.avgKnown}%</span>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground">{student.lastActive}</span>
                    </td>
                    <td className="p-4">
                      {student.consent ? (
                        <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Verified</span>
                      ) : (
                        <span className="text-xs bg-warning/20 text-foreground px-2 py-1 rounded">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
