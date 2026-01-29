"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight,
  Calendar,
  Clock,
  Filter,
  Mail,
  Printer,
  RefreshCw,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const assessments = [
  {
    id: "1",
    subject: "Mathematics",
    topic: "Fractions and Decimals",
    grade: "8th Grade",
    date: "Jan 27, 2026",
    known: 8,
    unknown: 4,
    partial: 0,
    total: 12,
  },
  {
    id: "2",
    subject: "Science",
    topic: "Cell Biology - Structure and Functions",
    grade: "8th Grade",
    date: "Jan 20, 2026",
    known: 10,
    unknown: 2,
    partial: 0,
    total: 12,
  },
  {
    id: "3",
    subject: "History",
    topic: "American Revolution - Causes and Effects",
    grade: "8th Grade",
    date: "Jan 13, 2026",
    known: 6,
    unknown: 4,
    partial: 2,
    total: 12,
  },
  {
    id: "4",
    subject: "English",
    topic: "Grammar - Verb Tenses",
    grade: "8th Grade",
    date: "Jan 6, 2026",
    known: 9,
    unknown: 2,
    partial: 1,
    total: 12,
  },
  {
    id: "5",
    subject: "Mathematics",
    topic: "Algebra - Linear Equations",
    grade: "8th Grade",
    date: "Dec 30, 2025",
    known: 7,
    unknown: 5,
    partial: 0,
    total: 12,
  },
  {
    id: "6",
    subject: "Science",
    topic: "Physics - Forces and Motion",
    grade: "8th Grade",
    date: "Dec 23, 2025",
    known: 5,
    unknown: 6,
    partial: 1,
    total: 12,
  },
]

export default function AssessmentHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  const filteredAssessments = assessments
    .filter((a) => {
      const matchesSearch = a.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSubject = subjectFilter === "all" || a.subject.toLowerCase() === subjectFilter
      return matchesSearch && matchesSubject
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "score-desc") return (b.known / b.total) - (a.known / a.total)
      if (sortBy === "score-asc") return (a.known / a.total) - (b.known / b.total)
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Assessment History</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your past assessments
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by topic or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="english">English</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="score-desc">Highest Score</SelectItem>
            <SelectItem value="score-asc">Lowest Score</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredAssessments.length} of {assessments.length} assessments
      </p>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">
                      {assessment.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">{assessment.grade}</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{assessment.topic}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {assessment.date}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      {assessment.total} items
                    </span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center gap-4 sm:gap-2 sm:text-right">
                  <div>
                    <p className="text-2xl font-bold text-foreground tabular-nums">
                      {Math.round((assessment.known / assessment.total) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Known</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden flex">
                <div 
                  className="bg-success h-full transition-all" 
                  style={{ width: `${(assessment.known / assessment.total) * 100}%` }}
                />
                {assessment.partial > 0 && (
                  <div 
                    className="bg-warning h-full transition-all" 
                    style={{ width: `${(assessment.partial / assessment.total) * 100}%` }}
                  />
                )}
                <div 
                  className="bg-destructive/60 h-full transition-all" 
                  style={{ width: `${(assessment.unknown / assessment.total) * 100}%` }}
                />
              </div>

              {/* Stats Row */}
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground tabular-nums">{assessment.known} known</span>
                </span>
                {assessment.partial > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-muted-foreground tabular-nums">{assessment.partial} partial</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-destructive/60" />
                  <span className="text-muted-foreground tabular-nums">{assessment.unknown} unknown</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 sm:px-6 py-3 bg-muted/30 border-t border-border flex flex-wrap items-center gap-2">
              <Link href={`/student/history/${assessment.id}`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  View Details
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="gap-1">
                <Printer className="w-3 h-3" />
                Print
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <Mail className="w-3 h-3" />
                Email
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <RefreshCw className="w-3 h-3" />
                Retake
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No assessments found matching your criteria</p>
          <Link href="/assessment">
            <Button className="mt-4 bg-foreground text-background hover:bg-foreground/90">
              Start New Assessment
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
