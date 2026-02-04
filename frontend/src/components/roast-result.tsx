"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Flame, Skull, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoastResultProps {
  roast: string;
}

function parseRoast(roast: string) {
  const sections = {
    verdict: "",
    grilling: [] as string[],
    penance: [] as string[],
  };

  // Extract THE VERDICT
  const verdictMatch = roast.match(/\[THE VERDICT\]([\s\S]*?)(?=\[THE GRILLING\]|$)/i);
  if (verdictMatch) {
    sections.verdict = verdictMatch[1].trim();
  }

  // Extract THE GRILLING
  const grillingMatch = roast.match(/\[THE GRILLING\]([\s\S]*?)(?=\[THE PENANCE\]|$)/i);
  if (grillingMatch) {
    sections.grilling = grillingMatch[1]
      .split(/[•\-\*]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  // Extract THE PENANCE
  const penanceMatch = roast.match(/\[THE PENANCE\]([\s\S]*?)$/i);
  if (penanceMatch) {
    sections.penance = penanceMatch[1]
      .split(/\d+\.\s*/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return sections;
}

export function RoastResult({ roast }: RoastResultProps) {
  const { verdict, grilling, penance } = parseRoast(roast);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-8 space-y-6"
    >
      {/* THE VERDICT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-black/80 border-2 border-neon-red rounded-lg p-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-red/10 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Skull className="w-6 h-6 text-neon-red" />
            <h3 className="text-xl font-bold text-neon-red tracking-wider">THE VERDICT</h3>
          </div>
          <p className="text-lg text-white/90 italic leading-relaxed">
            &ldquo;{verdict}&rdquo;
          </p>
        </div>
        <motion.div
          className="absolute -inset-1 bg-neon-red/20 rounded-lg blur-xl -z-10"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* THE GRILLING */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-black/80 border-2 border-terminal-amber/50 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-6 h-6 text-terminal-amber" />
          <h3 className="text-xl font-bold text-terminal-amber tracking-wider">THE GRILLING</h3>
        </div>
        <ul className="space-y-3">
          {grilling.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-terminal-amber shrink-0 mt-0.5" />
              <span className="text-gray-300">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* THE PENANCE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-black/80 border-2 border-terminal-green/50 rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-terminal-green" />
          <h3 className="text-xl font-bold text-terminal-green tracking-wider">THE PENANCE</h3>
        </div>
        <ol className="space-y-3">
          {penance.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-sm font-bold",
                "bg-terminal-green/20 text-terminal-green border border-terminal-green/50"
              )}>
                {index + 1}
              </span>
              <span className="text-gray-300">{item}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </motion.div>
  );
}
