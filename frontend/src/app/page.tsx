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
  Sparkles
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
      title: "GitHub PR Analysis",
      description: "Paste any public GitHub PR URL and our system fetches all code changes, file diffs, and context.",
      color: "text-neon-red",
    },
    {
      icon: Brain,
      title: "AI-Powered Roasting",
      description: "Powered by Google Gemini AI, trained to spot code smells, anti-patterns, and questionable decisions.",
      color: "text-neon-pink",
    },
    {
      icon: Target,
      title: "Brutal but Constructive",
      description: "Get specific feedback with line references, code quotes, and actionable improvements.",
      color: "text-terminal-amber",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "No waiting around. Submit your PR and get your roast within seconds.",
      color: "text-terminal-green",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Paste Your PR",
      description: "Copy any GitHub Pull Request URL and paste it into the terminal input below.",
    },
    {
      number: "02",
      title: "Hit Roast",
      description: "Click the ROAST ME button and let our AI analyze every line of your code changes.",
    },
    {
      number: "03",
      title: "Get Roasted",
      description: "Receive a devastating verdict, specific criticisms, and actionable fixes to redeem yourself.",
    },
  ];

  const exampleRoast = {
    verdict: "This PR looks like it was written during a caffeine-fueled panic attack at 3 AM.",
    grilling: [
      "Variable named 'data' – wow, how descriptive. What's next, 'stuff'?",
      "A 200-line function that does... everything? Ever heard of single responsibility?",
      "Error handling that catches exceptions and does nothing. Bold strategy.",
    ],
    penance: [
      "Break that monster function into smaller, focused units",
      "Add meaningful variable names that a human can understand",
      "Implement proper try-catch blocks with actual error handling",
    ],
  };

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,51,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)]" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Skull className="w-12 h-12 md:w-16 md:h-16 text-neon-red" />
              </motion.div>
              <GlitchText 
                text="PR_ROASTER" 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
              />
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Skull className="w-12 h-12 md:w-16 md:h-16 text-neon-red" />
              </motion.div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light mb-4">
              Get Your Code <span className="text-neon-red font-bold">Brutally</span> Reviewed
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
              Submit any GitHub Pull Request and let our AI roast your code with sarcasm, 
              specific feedback, and actionable improvements.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={scrollToTerminal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-neon-red to-neon-pink text-white font-bold text-lg tracking-wider rounded-lg border-2 border-neon-red/50 shadow-neon hover:shadow-neon-lg transition-all"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                START ROASTING
              </span>
            </motion.button>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 border-2 border-gray-700 text-gray-400 font-bold text-lg tracking-wider rounded-lg hover:border-neon-red/50 hover:text-neon-red transition-all"
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="bg-black/80 border border-neon-red/30 rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-neon-red/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-gray-600 text-sm ml-2">pr-roaster@elite:~</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <p className="text-terminal-green">$ analyzing pr...</p>
                <p className="text-terminal-amber">$ brutality_level: MAXIMUM</p>
                <p className="text-gray-500">$ target: your_code.ts</p>
                <motion.p 
                  className="text-neon-red"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  $ roast_ready: true_
                </motion.p>
              </div>
            </div>
            <motion.div
              className="absolute -inset-1 bg-neon-red/10 rounded-lg blur-xl -z-10"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-gray-600" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-neon-red">What</span> We Do
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              PR Roaster combines GitHub API integration with advanced AI to deliver 
              the most brutally honest code reviews you&apos;ll ever receive.
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
                className="feature-card bg-black/80 border border-gray-800 rounded-lg p-6 hover:border-neon-red/50"
              >
                <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-neon-red">How</span> It Works
            </h2>
            <p className="text-gray-500 text-lg">
              Three simple steps to get your code absolutely destroyed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <span className="step-number text-6xl font-bold text-neon-red/20">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 right-0 translate-x-1/2 w-8 h-px bg-gradient-to-r from-neon-red to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Roast Section */}
      <section className="py-24 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-neon-red">Example</span> Roast
            </h2>
            <p className="text-gray-500 text-lg">
              Here&apos;s a taste of what you&apos;re in for.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Verdict */}
            <div className="bg-black/80 border-2 border-neon-red/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Skull className="w-6 h-6 text-neon-red" />
                <span className="text-neon-red font-bold tracking-wider">THE VERDICT</span>
              </div>
              <p className="text-white/90 italic">&ldquo;{exampleRoast.verdict}&rdquo;</p>
            </div>

            {/* Grilling */}
            <div className="bg-black/80 border-2 border-terminal-amber/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-6 h-6 text-terminal-amber" />
                <span className="text-terminal-amber font-bold tracking-wider">THE GRILLING</span>
              </div>
              <ul className="space-y-2">
                {exampleRoast.grilling.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <span className="text-terminal-amber">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Penance */}
            <div className="bg-black/80 border-2 border-terminal-green/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-terminal-green" />
                <span className="text-terminal-green font-bold tracking-wider">THE PENANCE</span>
              </div>
              <ol className="space-y-2">
                {exampleRoast.penance.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <span className="text-terminal-green font-bold">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal Section - The actual roasting interface */}
      <section id="terminal-section" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-neon-red">Ready</span> to Get Roasted?
            </h2>
            <p className="text-gray-500 text-lg">
              Paste your GitHub PR URL below and face the music.
            </p>
          </motion.div>

          {/* Terminal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Terminal window */}
            <div className="relative bg-black/80 border-2 border-neon-red/30 rounded-lg overflow-hidden backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-neon-red/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-red/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <Terminal className="w-4 h-4" />
                  <span>pr-roaster@elite:~</span>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-4 h-4 text-neon-red" />
                </motion.div>
              </div>

              {/* Terminal body */}
              <div className="p-6 md:p-8">
                {/* ASCII Art */}
                <motion.pre
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-neon-red/60 text-[8px] md:text-[10px] leading-tight mb-8 font-mono hidden md:block"
                >
{`
    ██████╗  ██████╗  █████╗ ███████╗████████╗███████╗██████╗ 
    ██╔══██╗██╔═══██╗██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
    ██████╔╝██║   ██║███████║███████╗   ██║   █████╗  ██████╔╝
    ██╔══██╗██║   ██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗
    ██║  ██║╚██████╔╝██║  ██║███████║   ██║   ███████╗██║  ██║
    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`}
                </motion.pre>

                {/* System messages */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-left mb-6 space-y-1"
                >
                  <p className="text-terminal-green text-sm">[SYS] Roast engine loaded.</p>
                  <p className="text-terminal-amber text-sm">[WARN] Brutality level: MAXIMUM</p>
                  <p className="text-gray-500 text-sm">[INFO] Awaiting target PR...</p>
                </motion.div>

                {/* Input Section */}
                <TerminalInput
                  value={prLink}
                  onChange={(e) => setPrLink(e.target.value)}
                  onSubmit={handleRoast}
                  isHovered={isHovered}
                />

                {/* Roast Button */}
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

            {/* Glow effect on hover */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-neon-red/20 via-neon-pink/20 to-neon-red/20 rounded-lg blur-xl -z-10"
              animate={{
                opacity: isHovered ? 0.8 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Loading Terminal */}
          <AnimatePresence>
            {isLoading && <LoadingTerminal />}
          </AnimatePresence>

          {/* Roast Result */}
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
                    className="mt-6 text-gray-500 hover:text-neon-red transition-colors text-sm underline"
                  >
                    [ROAST ANOTHER VICTIM]
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 p-4 bg-red-900/30 border border-red-500/50 rounded-lg"
                >
                  <p className="text-red-400">
                    <span className="text-red-500 font-bold">[ERROR]</span> {result.error}
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Skull className="w-6 h-6 text-neon-red" />
            <span className="text-xl font-bold text-neon-red">PR_ROASTER</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Making developers cry since 2024. Your code&apos;s feelings may be hurt.
          </p>
          <div className="flex items-center justify-center gap-6 text-gray-600 text-sm">
            <span>Powered by Gemini AI</span>
            <span>•</span>
            <span>Built with Next.js</span>
            <span>•</span>
            <span>Styled with Tailwind</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
