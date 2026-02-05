"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <motion.span
        className="relative z-10 text-accent text-glow"
        animate={{
          textShadow: [
            "0 0 10px rgba(255, 107, 74, 0.4), 0 0 24px rgba(255, 107, 74, 0.3)",
            "0 0 14px rgba(255, 107, 74, 0.6), 0 0 32px rgba(255, 107, 74, 0.4)",
            "0 0 10px rgba(255, 107, 74, 0.4), 0 0 24px rgba(255, 107, 74, 0.3)",
          ],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>

      <motion.span
        className="absolute inset-0 text-accent-3 opacity-70"
        style={{ clipPath: "inset(40% 0 40% 0)" }}
        animate={{
          x: [-2, 2, -2],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3.4,
          ease: "linear",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      <motion.span
        className="absolute inset-0 text-accent-2 opacity-70"
        style={{ clipPath: "inset(60% 0 10% 0)" }}
        animate={{
          x: [2, -2, 2],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 4.2,
          delay: 0.1,
          ease: "linear",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </div>
  );
}
