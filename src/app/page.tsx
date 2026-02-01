"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useTransition } from "react";
import { TerminalInput } from "@/components/terminal-input";
import { RoastButton } from "@/components/roast-button";
import { GlitchText } from "@/components/glitch-text";
import { RoastResult } from "@/components/roast-result";
import { LoadingTerminal } from "@/components/loading-terminal";
import { Terminal, Skull, Zap } from "lucide-react";
import { roastPR, type RoastResult as RoastResultType } from "./actions";

export default function Home() {
  const [prLink, setPrLink] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<RoastResultType | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRoast = () => {
    if (prLink.trim()) {
      setShowResult(false);
      startTransition(async () => {
        const roastResult = await roastPR(prLink);
        setResult(roastResult);
        setShowResult(true);
      });
    }
  };

  const handleReset = () => {
    setPrLink("");
    setResult(null);
    setShowResult(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,51,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)]" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Skull className="w-10 h-10 text-neon-red" />
            </motion.div>
            <GlitchText 
              text="PR_ROASTER" 
              className="text-5xl md:text-7xl font-bold tracking-tighter"
            />
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Skull className="w-10 h-10 text-neon-red" />
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl tracking-wide"
          >
            <span className="text-neon-red">&gt;</span> INITIALIZING ROAST PROTOCOL...
            <span className="cursor ml-1" />
          </motion.p>
        </motion.div>

        {/* Terminal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
                transition={{ delay: 0.6, duration: 0.8 }}
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
                transition={{ delay: 0.8, duration: 0.5 }}
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
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-6"
              >
                <RoastButton onClick={handleRoast} disabled={!prLink.trim() || isPending} isLoading={isPending} />
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
          {isPending && <LoadingTerminal />}
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

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 text-gray-600 text-sm"
        >
          <span className="text-neon-red/50">⚠</span> Warning: Your code&apos;s feelings may be hurt
        </motion.p>
      </div>
    </main>
  );
}
