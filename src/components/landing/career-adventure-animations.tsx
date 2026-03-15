// components/career-adventure-animations.tsx  ← NEW client component
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SlideUp, EASE_OUT } from "../ui/animations";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12 + 0.3, duration: 0.5, ease: EASE_OUT },
  }),
};

const arrowFade = {
  hidden: { opacity: 0, y: -10 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2, duration: 0.4, ease: "easeOut" as const },
  }),
};

type Career = {
  key: string;
  image: string;
  arrowSrc: string;
  label: string;
};

export function CareerAdventureDesktop({ careers }: { careers: Career[] }) {
  return (
    <div className="hidden sm:flex flex-col items-center gap-0">
      {/* Child avatar */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        custom={0}
        className="rounded-full border-[7px] border-[#FFB24B] bg-white"
      >
        <Image
          src="/images/kid-1.png"
          alt="Child"
          width={185}
          height={185}
          className="rounded-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Arrows row */}
      <div className="flex w-full justify-around px-40 -mb-10">
        {careers.map((career, i) => (
          <motion.div
            key={career.key}
            variants={arrowFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={i}
          >
            <Image
              src={career.arrowSrc}
              alt="arrow"
              width={100}
              height={90}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Careers row */}
      <div className="flex w-full justify-around items-start px-4 relative">
        {careers.map((career, i) => (
          <SlideUp
            key={career.key}
            delay={i * 0.15}
            margin="-80px"
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className={`flex flex-col items-center gap-2 ${
              i === 1 || i === 2 ? "mt-20" : ""
            }`}
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="rounded-full border-[7px] border-[#FFB24B] bg-white"
            >
              <Image
                src={career.image}
                alt={career.key}
                width={140}
                height={140}
                className="rounded-full object-cover"
                draggable={false}
              />
            </motion.div>
            <p className="text-center text-xl font-bold text-black">
              {career.label}
            </p>
          </SlideUp>
        ))}
      </div>
    </div>
  );
}

export function CareerAdventureMobile({ careers }: { careers: Career[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:hidden">
      {/* Child avatar */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        custom={0}
        className="col-span-2 flex justify-center"
      >
        <div className="rounded-full border-[7px] border-[#FFB24B] bg-white">
          <Image
            src="/images/kid-1.png"
            alt="Child"
            width={140}
            height={140}
            className="rounded-full object-cover"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Career cards */}
      {careers.map((career, i) => (
        <SlideUp
          key={career.key}
          delay={i * 0.15}
          margin="-60px"
          className="flex flex-col items-center gap-2"
        >
          <div className="rounded-full border-[6px] border-[#FFB24B] bg-white">
            <Image
              src={career.image}
              alt={career.key}
              width={100}
              height={100}
              className="rounded-full object-cover"
              draggable={false}
            />
          </div>
          <p className="text-center text-lg font-bold text-black">
            {career.label}
          </p>
        </SlideUp>
      ))}
    </div>
  );
}
