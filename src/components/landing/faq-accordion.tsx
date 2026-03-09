// components/faq-accordion.tsx  ← NEW client component
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <div ref={sectionRef} className="mt-8 space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
            className={`border-b border-b-[#D9D9D9] p-5 transition-shadow duration-300 ${
              isOpen
                ? "backdrop-blur-[20.875px] shadow-[0px_0.8px_0px_0px_#FFFFFF_inset]"
                : ""
            }`}
          >
            {/* Question row */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between text-start"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-[#83003D] pr-4">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="shrink-0 text-[#83003D]"
              >
                <IoIosArrowDown size={20} />
              </motion.span>
            </button>

            {/* Answer — AnimatePresence for smooth open/close */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-sm text-stone-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}