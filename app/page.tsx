"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  ChevronDown, 
  Globe, 
  GraduationCap, 
  Lock, 
  Sparkles, 
  Users,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "pt", name: "Português" },
]

const stats = [
  { value: "500K+", label: "Students Helped" },
  { value: "45+", label: "Countries" },
  { value: "1.5-2.5", label: "Grade Improvement" },
]

const features = [
  {
    icon: Sparkles,
    title: "Identify Knowledge Gaps",
    description: "Discover exactly what you know and don't know in any subject"
  },
  {
    icon: BookOpen,
    title: "Research-Backed Method",
    description: "Cognitive Structure Analysis proven by peer-reviewed studies"
  },
  {
    icon: GraduationCap,
    title: "Works for All Ages",
    description: "From 2nd grade to college - ridiculously easy to use"
  },
]

export default function LandingPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-sm">M</span>
              </div>
              <span className="font-semibold text-foreground text-lg">METY Foundation</span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{selectedLanguage.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                Improve your grades by{" "}
                <span className="relative inline-block">
                  1.5-2.5 letters
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-accent"/>
                  </svg>
                </span>{" "}
                in 10 minutes
              </h1>
              <p className="mt-6 text-lg text-muted-foreground text-pretty max-w-xl">
                Discover what you know and what you don&apos;t with our research-backed 
                Cognitive Structure Analysis. Used by students in 45+ countries.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/assessment">
                  <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 gap-2">
                    Start Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/login?role=student">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Student / Parent Login
                  </Button>
                </Link>
                <Link href="/login?role=teacher">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                    Teacher Login
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                <Lock className="w-3 h-3" />
                No account required to start
              </p>
            </motion.div>

            {/* Right Content - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl shadow-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Mathematics - Algebra</p>
                      <p className="text-sm text-muted-foreground">Grade 8 Assessment</p>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-foreground">Linear equations - understood</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-foreground">Variable substitution - understood</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-warning" />
                      <span className="text-foreground">Quadratic formulas - needs review</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-destructive/60" />
                      <span className="text-foreground">Factoring polynomials - knowledge gap</span>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-accent">Next Step Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Focus on factoring polynomials to unlock quadratic formulas
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-foreground text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                10 min assessment
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              How CSA helps you learn better
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our self-assessment method is based on decades of cognitive science research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground text-pretty">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground text-balance">
                Trusted by educators worldwide
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Our research papers have been cited in leading educational journals. 
                Teachers use METY to understand class-wide knowledge gaps without 
                compromising individual student privacy.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">10,000+ Teachers</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Privacy-First Design</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">GDPR & COPPA Compliant</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border">
              <blockquote className="text-lg text-foreground italic">
                &ldquo;METY has transformed how I understand my students&apos; learning gaps. 
                The analytics help me tailor my teaching without singling out any student.&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-medium text-primary-foreground text-sm">SK</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Sarah K.</p>
                  <p className="text-sm text-muted-foreground">8th Grade Math Teacher, California</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Ready to discover what you know?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Start your free assessment now. No account required.
          </p>
          <div className="mt-8">
            <Link href="/assessment">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                Start Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="font-bold text-primary-foreground text-xs">M</span>
              </div>
              <span className="font-medium text-foreground">METY Foundation</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/research" className="hover:text-foreground transition-colors">Research</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 METY Foundation. All rights reserved.
            </p>
          </div>

          {/* Privacy Statement */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Your privacy is our priority. Student data is encrypted and never shared. 
              Teachers only see anonymized class-level analytics. We comply with GDPR, COPPA, 
              and FERPA regulations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
