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
      {/* Terminal prompt */}
      <div className="flex items-center gap-2">
        <span className="text-neon-red font-bold text-lg">~/roaster</span>
        <span className="text-white">&gt;</span>
      </div>

      {/* Input container with glow */}
      <div className="relative mt-3">
        <motion.div
          className={cn(
            "absolute -inset-0.5 bg-gradient-to-r from-neon-red to-neon-pink rounded-lg blur opacity-30 transition-opacity duration-300",
            isHovered && "opacity-60"
          )}
          animate={{
            opacity: isHovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Input
          type="url"
          placeholder="paste_pr_link_here"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "relative w-full h-14 text-lg bg-black/90 border-2 border-neon-red/50",
            "placeholder:text-gray-600 placeholder:font-mono",
            "focus:border-neon-red focus:shadow-neon-lg",
            "transition-all duration-300"
          )}
          spellCheck={false}
          autoComplete="off"
        />
        
        {/* Blinking cursor overlay when empty */}
        {!value && (
          <motion.span
            className="absolute left-[185px] top-1/2 -translate-y-1/2 w-2 h-6 bg-neon-red pointer-events-none"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      {/* Helper text */}
      <p className="mt-2 text-xs text-gray-600 text-left">
        <span className="text-neon-red/70">$</span> Enter a GitHub PR URL to begin the roast
      </p>
    </motion.div>
  );
}
