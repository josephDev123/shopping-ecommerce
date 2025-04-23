import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimateInPanelProps {
  children: React.ReactNode;
  state: "visible" | "hidden";
  closeModal: () => void;
  parentVariants?: Record<string, any>;
  childVariants?: Record<string, any>;
}

export default function AnimateInPanel({
  children,
  state,
  parentVariants,
  childVariants,
  closeModal,
}: AnimateInPanelProps) {
  const handleOverlayClose = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).id === "animate-in-panel") {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {state === "visible" && (
        <motion.section
          id="animate-in-panel"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={parentVariants}
          onClick={handleOverlayClose}
          className="flex flex-col fixed inset-0 w-full h-full z-40 bg-gray-900/45 backdrop-blur-none"
        >
          <motion.div variants={childVariants} className="sm:w-72 w-64 h-full">
            {children}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
