"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TerminalInput } from "@/components/terminal-input";
import { RoastButton } from "@/components/roast-button";
import { GlitchText } from "@/components/glitch-text";
import { RoastResult } from "@/components/roast-result";
import { LoadingTerminal } from "@/components/loading-terminal";
import {
  Terminal,
  Skull,
  Zap,
  GitPullRequest,
  Brain,
  Shield,
  Clock,
  ChevronDown,
  Flame,
  Code2,
  Target,
  Sparkles,
} from "lucide-react";
import { roastPR, type RoastResult as RoastResultType } from "@/lib/utils";

export default function Home() {
  const [prLink, setPrLink] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RoastResultType | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRoast = async () => {
    if (prLink.trim()) {
      setShowResult(false);
      setIsLoading(true);
      try {
        const roastResult = await roastPR(prLink);
        setResult(roastResult);
        setShowResult(true);
      } catch (error) {
        setResult({ success: false, error: "Failed to connect to the server." });
        setShowResult(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setPrLink("");
    setResult(null);
    setShowResult(false);
  };

  const scrollToTerminal = () => {
    document.getElementById("terminal-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: GitPullRequest,
      title: "Diff-Aware Context",
      description: "Paste a public GitHub PR and we fetch the diff, file list, and metadata in seconds.",
      color: "text-accent",
    },
    {
      icon: Brain,
      title: "LLM-Powered Roast",
      description: "A tuned Gemini model spots smells, patterns, and risky choices with a sharp tongue.",
      color: "text-accent-3",
    },
    {
      icon: Target,
      title: "Actionable Callouts",
      description: "Line-specific feedback, clear fixes, and practical next steps you can ship today.",
      color: "text-accent-2",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "No waiting around. Submit a link and get a roast while the coffee is still hot.",
      color: "text-foreground",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Paste the PR",
      description: "Copy any GitHub Pull Request URL and drop it into the terminal field.",
    },
    {
      number: "02",
      title: "Hit Roast",
      description: "We analyze the diff, the metadata, and the choices that got you here.",
    },
    {
      number: "03",
      title: "Fix the Flames",
      description: "Get a verdict, a list of issues, and a clear path to redemption.",
    },
  ];

  const exampleRoast = {
    verdict: "This PR reads like a 3 AM sprint fueled by panic and cold coffee.",
    grilling: [
      "Variable named 'data' - bold choice. Let me guess, the next one is 'thing'?",
      "A 200-line function that does everything. Single responsibility is crying.",
      "Errors caught and ignored. The bugs thank you for the free pass.",
    ],
    penance: [
      "Split the mega function into smaller, focused units",
      "Name things like humans will maintain this code",
      "Handle errors explicitly and surface actionable messages",
    ],
  };

  return (
    <main className="relative min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute top-28 -left-32 h-[380px] w-[380px] rounded-full bg-accent-3/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              AI Code Roast
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Skull className="w-9 h-9 text-accent" />
              <GlitchText
                text="PR ROASTER"
                className="text-3xl md:text-4xl font-display font-semibold tracking-tight"
              />
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-display font-semibold leading-tight">
              Brutally honest PR reviews, <span className="text-accent">instantly</span>.
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl">
              Paste any public GitHub pull request. We analyze the diff and return a roast you can fix in minutes.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.button
                onClick={scrollToTerminal}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent-2 text-white font-semibold tracking-wide border border-accent/50 shadow-neon hover:shadow-neon-lg transition-all"
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Start Roasting
                </span>
              </motion.button>
              <motion.a
                href="#features"
                whileHover={{ scale: 1.04 }}
                className="px-8 py-4 rounded-xl border border-border/70 text-muted font-semibold tracking-wide hover:border-accent/50 hover:text-accent transition-all"
              >
                See How It Works
              </motion.a>
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-2" />
                Clear feedback
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent-3" />
                Safe by design
              </span>
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" />
                Diff-aware
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-surface/80 border border-border/70 rounded-2xl p-6 text-left shadow-soft backdrop-blur">
              <div className="flex items-center gap-2 mb-4 text-xs text-muted">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-2" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-3" />
                <span className="ml-2">pr-roaster@studio:~</span>
              </div>
              <div className="font-mono text-sm space-y-1 text-muted">
                <p className="text-accent-3">$ scanning diff...</p>
                <p className="text-accent-2">$ sarcasm_level: 9000</p>
                <p>$ target: src/components/button.tsx</p>
                <motion.p
                  className="text-accent"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  $ roast_ready: true_
                </motion.p>
              </div>
            </div>
            <motion.div
              className="absolute -inset-1 bg-accent/20 rounded-2xl blur-2xl -z-10"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1, duration: 2.2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-muted" />
        </motion.div>
      </section>

      <section id="features" className="py-20 md:py-24 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              What You Get
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              PR Roaster combines GitHub context with AI analysis to deliver fast, direct, and useful code feedback.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card bg-surface/70 border border-border/60 rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-2 border border-border/60 mb-4">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              How It Works
            </h2>
            <p className="text-muted text-lg">
              Three calm steps. One ruthless review.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-surface/70 border border-border/60 rounded-2xl p-6 shadow-soft"
              >
                <span className="step-number text-5xl font-semibold text-accent/20">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Example Roast
            </h2>
            <p className="text-muted text-lg">
              A quick sample of the verdict, the grilling, and the fix.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-surface/80 border border-accent/40 rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Skull className="w-6 h-6 text-accent" />
                <span className="text-accent font-semibold tracking-[0.2em] uppercase text-sm">The Verdict</span>
              </div>
              <p className="text-foreground/90 italic">&ldquo;{exampleRoast.verdict}&rdquo;</p>
            </div>

            <div className="bg-surface/80 border border-accent-2/35 rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-6 h-6 text-accent-2" />
                <span className="text-accent-2 font-semibold tracking-[0.2em] uppercase text-sm">The Grilling</span>
              </div>
              <ul className="space-y-2">
                {exampleRoast.grilling.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface/80 border border-accent-3/35 rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-accent-3" />
                <span className="text-accent-3 font-semibold tracking-[0.2em] uppercase text-sm">The Penance</span>
              </div>
              <ol className="space-y-2">
                {exampleRoast.penance.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <span className="text-accent-3 font-semibold">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="terminal-section" className="py-20 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Ready to Roast?
            </h2>
            <p className="text-muted text-lg">
              Drop your GitHub PR URL below and face the feedback.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative bg-surface/80 border border-border/70 rounded-2xl overflow-hidden backdrop-blur-sm shadow-soft">
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border/60">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-accent-2" />
                  <div className="w-3 h-3 rounded-full bg-accent-3" />
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 text-muted text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>pr-roaster@studio:~</span>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-accent" />
                </motion.div>
              </div>

              <div className="p-6 md:p-8">
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-accent/60 text-[9px] md:text-[11px] leading-tight mb-8 font-mono hidden md:block"
                >
{`
  PR ROASTER
  ==========
  code review, but spicy
`}
                </motion.pre>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-left mb-6 space-y-1"
                >
                  <p className="text-accent-3 text-sm">[SYS] Roast engine loaded.</p>
                  <p className="text-accent-2 text-sm">[WARN] Brutality level: HIGH</p>
                  <p className="text-muted text-sm">[INFO] Awaiting target PR...</p>
                </motion.div>

                <TerminalInput
                  value={prLink}
                  onChange={(e) => setPrLink(e.target.value)}
                  onSubmit={handleRoast}
                  isHovered={isHovered}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-6"
                >
                  <RoastButton onClick={handleRoast} disabled={!prLink.trim() || isLoading} isLoading={isLoading} />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent-2/15 to-accent-3/20 rounded-2xl blur-2xl -z-10"
              animate={{
                opacity: isHovered ? 0.7 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <AnimatePresence>
            {isLoading && <LoadingTerminal />}
          </AnimatePresence>

          <AnimatePresence>
            {showResult && result && (
              result.success && result.roast ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <RoastResult roast={result.roast} />
                  <motion.button
                    onClick={handleReset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 text-muted hover:text-accent transition-colors text-sm underline"
                  >
                    Roast another victim
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
                >
                  <p className="text-red-200">
                    <span className="text-red-300 font-semibold">[ERROR]</span> {result.error}
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border/70">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Skull className="w-6 h-6 text-accent" />
            <span className="text-xl font-semibold text-accent">PR ROASTER</span>
          </div>
          <p className="text-muted text-sm mb-4">
            Making developers cry since 2024. Your code's feelings may be hurt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted text-sm">
            <span>Powered by Gemini AI</span>
            <span>|</span>
            <span>Built with Next.js</span>
            <span>|</span>
            <span>Styled with Tailwind</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
