"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Flame, Skull, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoastResultProps {
  roast: string;
}

const bulletRegex = /^(?:\u2022|[-*]|\d+\.)\s+/;

function toListItems(block: string) {
  const lines = block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const cleaned = lines
    .map((line) => line.replace(bulletRegex, "").trim())
    .filter(Boolean);

  if (cleaned.length > 1) {
    return cleaned;
  }

  return block
    .split(/(?:^|\s)(?:\u2022|[-*])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseRoast(roast: string) {
  const sections = {
    verdict: "",
    grilling: [] as string[],
    penance: [] as string[],
  };

  const verdictMatch = roast.match(/\[THE VERDICT\]([\s\S]*?)(?=\[THE GRILLING\]|$)/i);
  if (verdictMatch) {
    sections.verdict = verdictMatch[1].trim();
  }

  const grillingMatch = roast.match(/\[THE GRILLING\]([\s\S]*?)(?=\[THE PENANCE\]|$)/i);
  if (grillingMatch) {
    sections.grilling = toListItems(grillingMatch[1]);
  }

  const penanceMatch = roast.match(/\[THE PENANCE\]([\s\S]*?)$/i);
  if (penanceMatch) {
    sections.penance = toListItems(penanceMatch[1]);
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-surface/80 border border-accent/40 rounded-2xl p-6 overflow-hidden shadow-soft"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Skull className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-semibold text-accent tracking-[0.2em] uppercase">
              The Verdict
            </h3>
          </div>
          <p className="text-lg text-foreground/90 italic leading-relaxed">
            &ldquo;{verdict}&rdquo;
          </p>
        </div>
        <motion.div
          className="absolute -inset-1 bg-accent/20 rounded-2xl blur-xl -z-10"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-surface/80 border border-accent-2/35 rounded-2xl p-6 shadow-soft"
      >
        <div className="flex items-center gap-3 mb-4">
          <Flame className="w-6 h-6 text-accent-2" />
          <h3 className="text-xl font-semibold text-accent-2 tracking-[0.2em] uppercase">
            The Grilling
          </h3>
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
              <AlertTriangle className="w-5 h-5 text-accent-2 shrink-0 mt-0.5" />
              <span className="text-muted">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-surface/80 border border-accent-3/35 rounded-2xl p-6 shadow-soft"
      >
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-accent-3" />
          <h3 className="text-xl font-semibold text-accent-3 tracking-[0.2em] uppercase">
            The Penance
          </h3>
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
              <span
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-xs font-semibold",
                  "bg-accent-3/15 text-accent-3 border border-accent-3/40"
                )}
              >
                {index + 1}
              </span>
              <span className="text-muted">{item}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </motion.div>
  );
}
