"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Printer,
  Save,
  Sparkles,
  X,
  Plus,
  Minus
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
import { Progress } from "@/components/ui/progress"

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

type Step = "entry" | "generating" | "assessment" | "results"

interface KnowledgeItem {
  id: string
  text: string
  status: "known" | "unknown" | "partial" | null
}

const sampleTopics: KnowledgeItem[] = [
  { id: "1", text: "Understanding the definition of fractions", status: null },
  { id: "2", text: "Adding fractions with the same denominator", status: null },
  { id: "3", text: "Adding fractions with different denominators", status: null },
  { id: "4", text: "Subtracting fractions", status: null },
  { id: "5", text: "Multiplying fractions", status: null },
  { id: "6", text: "Dividing fractions", status: null },
  { id: "7", text: "Converting between fractions and decimals", status: null },
  { id: "8", text: "Simplifying fractions", status: null },
  { id: "9", text: "Finding equivalent fractions", status: null },
  { id: "10", text: "Comparing and ordering fractions", status: null },
  { id: "11", text: "Mixed numbers and improper fractions", status: null },
  { id: "12", text: "Word problems involving fractions", status: null },
]

export default function AssessmentPage() {
  const [step, setStep] = useState<Step>("entry")
  const [grade, setGrade] = useState("")
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [items, setItems] = useState<KnowledgeItem[]>(sampleTopics)
  const [customItem, setCustomItem] = useState("")

  const completedItems = items.filter((item) => item.status !== null).length
  const progress = (completedItems / items.length) * 100
  const knownItems = items.filter((item) => item.status === "known")
  const unknownItems = items.filter((item) => item.status === "unknown")
  const partialItems = items.filter((item) => item.status === "partial")

  const handleGenerate = () => {
    setStep("generating")
    // Simulate API call
    setTimeout(() => {
      setStep("assessment")
    }, 2500)
  }

  const handleStatusChange = (id: string, status: "known" | "unknown" | "partial") => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === status ? null : status } : item
      )
    )
  }

  const handleAddCustomItem = () => {
    if (customItem.trim()) {
      setItems((prev) => [
        ...prev,
        { id: `custom-${Date.now()}`, text: customItem.trim(), status: null },
      ])
      setCustomItem("")
    }
  }

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-xs">M</span>
              </div>
              <span className="font-semibold text-foreground hidden sm:inline">METY</span>
            </Link>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Topic Entry */}
          {step === "entry" && (
            <motion.div
              key="entry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-foreground" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
                  What do you want to learn?
                </h1>
                <p className="mt-2 text-muted-foreground text-pretty">
                  Tell us about the topic you&apos;re studying and we&apos;ll create a personalized assessment
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select value={grade} onValueChange={setGrade}>
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select your grade" />
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

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((s) => (
                            <SelectItem key={s} value={s.toLowerCase()}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic Description</Label>
                    <Textarea
                      id="topic"
                      placeholder="e.g., Fractions - adding, subtracting, and comparing fractions with different denominators"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Be specific about what you&apos;re studying. The more detail, the better the assessment.
                    </p>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!grade || !subject || !topic}
                    className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2"
                    size="lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate Assessment Template
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Takes less than 30 seconds to generate
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Generating */}
          {step === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Loader2 className="w-8 h-8 text-foreground animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Creating your assessment...</h2>
              <p className="mt-2 text-muted-foreground">Analyzing your topic and building knowledge checkpoints</p>
              <div className="mt-8 w-64">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Assessment */}
          {step === "assessment" && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                    {subject.charAt(0).toUpperCase() + subject.slice(1)} - {topic || "Fractions"}
                  </h1>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {completedItems}/{items.length} completed
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-border bg-muted/50">
                  <h2 className="font-semibold text-foreground">Self-Assessment</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    For each topic below, mark whether you know it, don&apos;t know it, or partially understand it
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-foreground">{item.text}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(item.id, "known")}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${item.status === "known"
                              ? "bg-success text-success-foreground"
                              : "bg-muted text-muted-foreground hover:bg-success/20 hover:text-success"}
                          `}
                        >
                          I know this
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, "partial")}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${item.status === "partial"
                              ? "bg-warning text-warning-foreground"
                              : "bg-muted text-muted-foreground hover:bg-warning/20 hover:text-foreground"}
                          `}
                        >
                          Partial
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, "unknown")}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${item.status === "unknown"
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-muted text-muted-foreground hover:bg-destructive/20 hover:text-destructive"}
                          `}
                        >
                          Don&apos;t know
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Add Custom Item */}
                <div className="p-4 sm:p-6 border-t border-border bg-muted/30">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add your own topic to assess..."
                      value={customItem}
                      onChange={(e) => setCustomItem(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddCustomItem()}
                    />
                    <Button onClick={handleAddCustomItem} variant="outline" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setStep("results")}
                  disabled={completedItems < items.length}
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90 gap-2"
                  size="lg"
                >
                  View Results
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Complete all items to see your personalized learning recommendations
              </p>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
                  Assessment Complete!
                </h1>
                <p className="mt-2 text-muted-foreground text-pretty">
                  Here&apos;s your personalized learning map for {topic || "Fractions"}
                </p>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-success/10 rounded-xl p-4 text-center border border-success/20">
                  <p className="text-3xl font-bold text-success tabular-nums">{knownItems.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">I Know</p>
                </div>
                <div className="bg-warning/10 rounded-xl p-4 text-center border border-warning/20">
                  <p className="text-3xl font-bold text-foreground tabular-nums">{partialItems.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Partial</p>
                </div>
                <div className="bg-destructive/10 rounded-xl p-4 text-center border border-destructive/20">
                  <p className="text-3xl font-bold text-destructive tabular-nums">{unknownItems.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Don&apos;t Know</p>
                </div>
              </div>

              {/* Knowledge Gaps - Focus Areas */}
              {(unknownItems.length > 0 || partialItems.length > 0) && (
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-destructive rounded-full" />
                    Focus Areas (Knowledge Gaps)
                  </h2>
                  <ul className="space-y-3">
                    {unknownItems.map((item) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Minus className="w-3 h-3 text-destructive" />
                        </div>
                        <span className="text-foreground">{item.text}</span>
                      </li>
                    ))}
                    {partialItems.map((item) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-foreground">~</span>
                        </div>
                        <span className="text-foreground">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-accent/10 rounded-xl border border-accent/20 p-6 mb-6">
                <h2 className="font-semibold text-foreground mb-2">Recommended Next Steps</h2>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">
                  Based on your assessment, here&apos;s how to improve your understanding:
                </p>
                <ol className="space-y-2 list-decimal list-inside text-foreground">
                  {unknownItems.slice(0, 3).map((item, i) => (
                    <li key={item.id} className="text-sm">
                      Study: <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                  {unknownItems.length === 0 && partialItems.slice(0, 3).map((item) => (
                    <li key={item.id} className="text-sm">
                      Review: <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* What I Know */}
              {knownItems.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6 mb-6">
                  <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full" />
                    What I Know
                  </h2>
                  <ul className="space-y-2">
                    {knownItems.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/assessment" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full gap-2 bg-transparent">
                    <ArrowLeft className="w-4 h-4" />
                    New Assessment
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Printer className="w-4 h-4" />
                  Print Results
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  Email Results
                </Button>
                <Link href="/login">
                  <Button size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90 gap-2">
                    <Save className="w-4 h-4" />
                    Save to Account
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
