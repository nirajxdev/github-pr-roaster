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
      {/* Main text */}
      <motion.span
        className="relative z-10 text-neon-red text-glow"
        animate={{
          textShadow: [
            "0 0 10px #ff0033, 0 0 20px #ff0033, 0 0 30px #ff0033",
            "0 0 20px #ff0033, 0 0 30px #ff0033, 0 0 40px #ff0033, 0 0 50px #ff0033",
            "0 0 10px #ff0033, 0 0 20px #ff0033, 0 0 30px #ff0033",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>

      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-cyan-400 opacity-70"
        style={{ clipPath: "inset(40% 0 40% 0)" }}
        animate={{
          x: [-2, 2, -2],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      <motion.span
        className="absolute inset-0 text-neon-pink opacity-70"
        style={{ clipPath: "inset(60% 0 10% 0)" }}
        animate={{
          x: [2, -2, 2],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 4,
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
