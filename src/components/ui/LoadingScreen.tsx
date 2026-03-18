'use client';


import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

// ── Easing ────────────────────────────────────────────────────────────────────
const SHARP   = [0.76, 0, 0.24, 1] as const;
const ELASTIC = [0.34, 1.56, 0.64, 1] as const;
const SMOOTH  = [0.22, 1, 0.36, 1] as const;

// ── Shared Constants ──────────────────────────────────────────────────────────
const PRIMARY_ORANGE = "#FFB24B";
const PRIMARY_PINK   = "#FF85B3";

// ── Variants ──────────────────────────────────────────────────────────────────
const overlayVariants: Variants = {
  visible: { y: "0%" },
  exit: {
    y: "-100%",
    transition: { duration: 0.9, ease: SHARP, delay: 0.15 },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.65, ease: ELASTIC, delay: 0.3 },
  },
  exit: {
    opacity: 0, scale: 1.1,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const progressContainerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: SMOOTH, delay: 0.6 },
  },
};

const barShimmerVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: SMOOTH, delay: 0.75 },
  },
};

const taglineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } },
};

const taglineWord: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.45, ease: SMOOTH },
  },
};

const bottomCurtainVariants: Variants = {
  visible: { scaleY: 1 },
  exit: {
    scaleY: 0,
    transition: { duration: 0.7, ease: SHARP, delay: 0.05 },
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * Particle system for a magical atmosphere
 * Particles are generated client-side only to avoid SSR hydration mismatches
 * caused by Math.random() producing different values on server vs. client.
 */
const ParticleSystem = () => {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 4,
        delay: Math.random() * -5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_white]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const t = useTranslations("loading");

  const tagline = t("tagline");
  const words = tagline.split(" ");

  return (
    <AnimatePresence onExitComplete={onDone}>
        <>
          {/* Top curtain panel */}
          <motion.div
            key="top"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            variants={overlayVariants}
            initial="visible"
            exit="exit"
            style={{
              background:
                "linear-gradient(135deg, #FFF9F5 0%, #FFFDF7 50%, #FFF3F9 100%)",
            }}
          >
            {/* Background Magic Particles */}
            <ParticleSystem />

            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, ${PRIMARY_ORANGE}44 0%, transparent 70%)` }}
            />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-15"
              style={{ background: `radial-gradient(circle, ${PRIMARY_PINK}44 0%, transparent 70%)` }}
            />

            <div className="flex flex-col items-center relative z-20">
              {/* Logo Area */}
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative mb-6"
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-[-20%] rounded-full blur-xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.4, 1.8] }}
                  transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
                  style={{ background: `radial-gradient(circle, ${PRIMARY_ORANGE}66 0%, transparent 70%)` }}
                />
                <Image
                  src="/images/logo.svg"
                  alt="Taleora"
                  width={150}
                  height={150}
                  priority
                  className="relative z-10 drop-shadow-2xl"
                />
              </motion.div>

              {/* Magical Progress Bar */}
              <motion.div 
                className="flex flex-col items-center gap-4"
                variants={progressContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative h-[4px] w-40 overflow-hidden rounded-full bg-[#F5E6D3]/50">
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{
                      width: "100%",
                      background: `linear-gradient(90deg, ${PRIMARY_ORANGE}, ${PRIMARY_PINK}, ${PRIMARY_ORANGE})`,
                      backgroundSize: "200% 100%",
                    }}
                    variants={barShimmerVariants}
                  >
                    {/* Glowing Tip */}
                    <motion.div 
                      className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 bg-white blur-sm rounded-full"
                      animate={{ x: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    {/* Animated Shimmer Trail */}
                    <motion.div
                      className="h-full w-1/2"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>

                {/* Tagline */}
                <motion.p
                  className="flex gap-[6px] flex-wrap justify-center text-base sm:text-lg font-bold text-[#D08B5B] tracking-wide"
                  style={{ fontFamily: "var(--font-seasons), serif" }}
                  variants={taglineContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {words.map((w, i) => (
                    <motion.span 
                      key={i} 
                      variants={taglineWord}
                      whileHover={{ scale: 1.1, color: PRIMARY_PINK }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom accent curtain */}
          <motion.div
            key="bottom-curtain"
            className="fixed bottom-0 left-0 right-0 z-[9998] origin-bottom"
            style={{
              height: "40vh",
              background: `linear-gradient(180deg, ${PRIMARY_ORANGE}08 0%, ${PRIMARY_PINK}15 100%)`,
            }}
            variants={bottomCurtainVariants}
            initial="visible"
            exit="exit"
          />
        </>
    </AnimatePresence>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useLoadingScreen() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("taleora_loaded");
  });

  const handleDone = () => {
    sessionStorage.setItem("taleora_loaded", "1");
    setLoading(false);
  };

  return { loading, handleDone };
}