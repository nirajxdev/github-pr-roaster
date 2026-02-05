"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TerminalInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isHovered: boolean;
}

export function TerminalInput({ value, onChange, onSubmit, isHovered }: TerminalInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center gap-2 text-sm font-mono text-muted">
        <span className="text-accent">pr-roaster</span>
        <span className="text-muted">~/inbox</span>
        <span className="text-accent-3">$</span>
      </div>

      <div className="relative mt-3">
        <motion.div
          className={cn(
            "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-accent/30 via-accent-2/20 to-accent-3/20 blur transition-opacity duration-300",
            isHovered ? "opacity-70" : "opacity-30"
          )}
          animate={{
            opacity: isHovered ? [0.5, 0.8, 0.5] : [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Input
          type="url"
          placeholder="https://github.com/org/repo/pull/123"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative w-full h-14 text-base bg-surface/90 border border-border/70",
            "placeholder:text-muted/70 placeholder:font-mono",
            "focus:border-accent focus:shadow-neon",
            "transition-all duration-300"
          )}
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      <p className="mt-2 text-xs text-muted">
        Tip: paste a public GitHub PR URL to start the roast.
      </p>
    </motion.div>
  );
}
