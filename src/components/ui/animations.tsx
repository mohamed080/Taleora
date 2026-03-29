"use client";

import React from "react";
import { motion, HTMLMotionProps, useInView, type Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
};

export const colVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const priceVariants: Variants = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};
interface BaseAnimationProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: any;
  className?: string;
  as?: any;
}

/**
 * FadeIn Component
 * simple opacity animation
 */
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  margin = "-50px",
  className,
  as: Component = "div",
  scale = 1,
  ...props
}: BaseAnimationProps & { scale?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin });

  const MotionComponent = motion.create(Component);

  const variants: Variants = {
    hidden: { opacity: 0, scale },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease: "easeOut" },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * SlideUp Component
 * Opacity and Y-axis translation
 */
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
  margin = "-50px",
  className,
  as: Component = "div",
  ...props
}: BaseAnimationProps & { y?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin });

  const MotionComponent = motion.create(Component);

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: EASE_OUT },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * StaggerContainer Component
 * Manages staggered children animations
 */
export const StaggerContainer = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  margin = "-50px",
  className,
  as: Component = "div",
  ...props
}: BaseAnimationProps & { staggerChildren?: number; delayChildren?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin });

  const MotionComponent = motion.create(Component);

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * StaggerItem Component
 * To be used as a child of StaggerContainer
 */
export const StaggerItem = ({
  children,
  className,
  as: Component = "div",
  ...props
}: HTMLMotionProps<"div"> & { as?: any }) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT },
    },
  };

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent variants={variants} className={className} {...props}>
      {children}
    </MotionComponent>
  );
};
