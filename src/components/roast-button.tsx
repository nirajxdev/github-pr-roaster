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
      {/* Animated pulse rings */}
      {!isInactive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-md bg-neon-red/30"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-md bg-neon-red/20"
            animate={{
              scale: [1, 1.8, 1.8],
              opacity: [0.3, 0, 0],
            }}
            transition={{
              duration: 2,
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
          "relative px-12 py-6 text-xl font-bold tracking-widest",
          "bg-gradient-to-r from-neon-red to-neon-pink",
          "hover:from-neon-pink hover:to-neon-red",
          "border-2 border-neon-red/50",
          "transition-all duration-300",
          "group",
          isInactive && "opacity-50 cursor-not-allowed grayscale"
        )}
      >
        {/* Button content */}
        <motion.span
          className="relative z-10 flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-6 h-6" />
              </motion.span>
              <span>ROASTING...</span>
            </>
          ) : (
            <>
              <motion.span
                animate={!isInactive ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Flame className="w-6 h-6" />
              </motion.span>
              <span>ROAST ME</span>
              <motion.span
                animate={!isInactive ? { 
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Zap className="w-6 h-6" />
              </motion.span>
            </>
          )}
        </motion.span>

        {/* Inner glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-md bg-white/0 group-hover:bg-white/10 transition-colors duration-300"
        />
      </Button>

      {/* Shadow glow */}
      {!isInactive && (
        <motion.div
          className="absolute -inset-2 bg-neon-red/20 rounded-lg blur-xl -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}
