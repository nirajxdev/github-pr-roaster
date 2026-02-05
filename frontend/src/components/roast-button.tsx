"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoastButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function RoastButton({ onClick, disabled, isLoading }: RoastButtonProps) {
  const isInactive = disabled || isLoading;

  return (
    <motion.div className="relative inline-block">
      {!isInactive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl bg-accent/30"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.35, 0, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-xl bg-accent-2/20"
            animate={{
              scale: [1, 1.8, 1.8],
              opacity: [0.25, 0, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3,
            }}
          />
        </>
      )}

      <Button
        onClick={onClick}
        disabled={isInactive}
        size="lg"
        className={cn(
          "relative px-12 py-6 text-base md:text-lg font-semibold tracking-[0.25em] uppercase",
          "rounded-xl bg-gradient-to-r from-accent to-accent-2 text-white",
          "hover:from-accent-2 hover:to-accent",
          "border border-accent/50",
          "shadow-neon hover:shadow-neon-lg",
          "transition-all duration-300",
          "group",
          isInactive && "opacity-50 cursor-not-allowed grayscale"
        )}
      >
        <motion.span
          className="relative z-10 flex items-center gap-3"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-5 h-5" />
              </motion.span>
              <span>ROASTING</span>
            </>
          ) : (
            <>
              <motion.span
                animate={!isInactive ? { rotate: [0, 8, -8, 0] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <Flame className="w-5 h-5" />
              </motion.span>
              <span>ROAST ME</span>
              <motion.span
                animate={!isInactive ? { opacity: [1, 0.6, 1], scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
              </motion.span>
            </>
          )}
        </motion.span>

        <motion.div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
      </Button>

      {!isInactive && (
        <motion.div
          className="absolute -inset-2 bg-accent/20 rounded-xl blur-xl -z-10"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
