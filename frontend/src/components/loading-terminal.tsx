"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

const loadingMessages = [
  "Scanning for code crimes...",
  "Calibrating sarcasm levels...",
  "Loading insult database...",
  "Analyzing architectural sins...",
  "Preparing brutal honesty...",
  "Detecting copy-paste patterns...",
  "Measuring technical debt...",
  "Evaluating naming disasters...",
];

export function LoadingTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-8 w-full max-w-2xl mx-auto"
    >
      <div className="bg-surface/80 border border-border/70 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-5 h-5 text-accent" />
          </motion.div>
          <span className="text-accent font-semibold tracking-[0.2em] uppercase text-sm">
            Roast in progress
          </span>
        </div>

        <div className="space-y-2 font-mono text-sm">
          {loadingMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center gap-2"
            >
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
                className="text-accent-3"
              >
                $ 
              </motion.span>
              <span className="text-muted">{message}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: index * 0.3 + 0.5 }}
                className="text-accent-3"
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 h-1.5 bg-surface-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-2"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
