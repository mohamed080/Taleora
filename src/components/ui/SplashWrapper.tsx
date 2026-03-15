"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";

interface SplashWrapperProps {
  children: React.ReactNode;
}

/**
 * SplashWrapper Component
 * Ensures the LoadingScreen/Splash is shown for a minimum duration
 * on initial application load.
 */
export const SplashWrapper = ({ children }: SplashWrapperProps) => {
  const [showingSplash, setShowingSplash] = useState(true);

  useEffect(() => {
    // Show splash for at least 2 seconds
    const timer = setTimeout(() => {
      setShowingSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showingSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen onDone={() => setShowingSplash(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content wrapper with a subtle fade-in after splash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showingSplash ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
};
