"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AnimatePresenceWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      <motion.section
        className="w-fit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
