"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
type InputVariant = "default" | "pink" | "success" | "error";
type InputSize = "sm" | "md" | "lg";

interface FloatingLabelInputProps extends Omit<
  React.ComponentProps<"input">,
  "size"
> {
  label: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ── Variant styles ────────────────────────────────────────────────────────────
const variantStyles: Record<
  InputVariant,
  {
    border: string;
    focusBorder: string;
    focusRing: string;
    labelColor: string;
    labelFocusColor: string;
  }
> = {
  default: {
    border: "border-gray-200",
    focusBorder: "group-focus-within:border-gray-400",
    focusRing: "group-focus-within:ring-gray-400/20",
    labelColor: "text-gray-400",
    labelFocusColor: "group-focus-within:text-gray-600",
  },
  pink: {
    border: "border-gray-200",
    focusBorder: "group-focus-within:border-primary",
    focusRing: "group-focus-within:ring-primary/20",
    labelColor: "text-primary",
    labelFocusColor: "group-focus-within:text-primary",
  },
  success: {
    border: "border-green-400",
    focusBorder: "group-focus-within:border-green-500",
    focusRing: "group-focus-within:ring-green-500/20",
    labelColor: "text-green-500",
    labelFocusColor: "group-focus-within:text-green-600",
  },
  error: {
    border: "border-red-400",
    focusBorder: "group-focus-within:border-red-500",
    focusRing: "group-focus-within:ring-red-500/20",
    labelColor: "text-red-400",
    labelFocusColor: "group-focus-within:text-red-500",
  },
};

// ── Size styles ───────────────────────────────────────────────────────────────
const sizeStyles: Record<
  InputSize,
  {
    wrapper: string;
    input: string;
    label: string;
    iconSize: string;
  }
> = {
  sm: {
    wrapper: "h-10",
    input: "text-sm px-3",
    label: "text-xs px-1",
    iconSize: "h-3.5 w-3.5",
  },
  md: {
    wrapper: "h-12",
    input: "text-sm px-3.5",
    label: "text-xs px-1",
    iconSize: "h-4 w-4",
  },
  lg: {
    wrapper: "h-12 sm:h-13",
    input: "text-sm sm:text-base px-4",
    label: "text-sm px-1.5",
    iconSize: "h-5 w-5",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      variant = "pink",
      inputSize = "md",
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    // Use error variant automatically when error prop is passed
    const resolvedVariant: InputVariant = error ? "error" : variant;
    const v = variantStyles[resolvedVariant];
    const s = sizeStyles[inputSize];

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Wrapper — `group` enables focus-within targeting for label color */}
        <div className={cn("relative group", s.wrapper)}>
          {/* ── Border container (the actual visible box) ─────────────────── */}
          <div
            className={cn(
              "absolute inset-0 rounded-xl border-2 transition-all duration-200",
              "focus-within:ring-3",
              v.border,
              v.focusBorder,
              v.focusRing,
            )}
          />

          {/* ── Floating label — sits ON the top border ───────────────────── */}
          {/*
            Trick: position the label at top-0, translate it -50% so it
            straddles the border. A white bg patch behind it "cuts" the border.
        */}
          <label
            htmlFor={inputId}
            className={cn(
              "absolute inset-s-3 -top-px z-20 -translate-y-1/2",
              "bg-white leading-none font-semibold select-none ",
              "transition-colors duration-200 ",
              s.label,
              v.labelColor,
              v.labelFocusColor,
            )}
          >
            {label}
          </label>

          {/* ── Left icon ─────────────────────────────────────────────────── */}
          {leftIcon && (
            <span
              className={cn(
                "absolute inset-s-3.5 top-1/2 -translate-y-1/2 z-20",
                "text-primary group-focus-within:text-current transition-colors",
                s.iconSize,
              )}
            >
              {leftIcon}
            </span>
          )}

          {/* ── Input ─────────────────────────────────────────────────────── */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "relative z-10 h-full w-full rounded-xl bg-transparent outline-none",
              "placeholder:text-[#A9A9A9]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              s.input,
              leftIcon && "ps-9",
              leftIcon && inputSize === "lg" && "ps-11",
              rightIcon && "pe-9",
              rightIcon && inputSize === "lg" && "pe-11",
              className,
            )}
            {...props}
          />

          {/* ── Right icon ────────────────────────────────────────────────── */}
          {rightIcon && (
            <span
              className={cn(
                "absolute inset-e-3.5 top-1/2 -translate-y-1/2 z-10",
                "text-primary transition-colors",
                s.iconSize,
              )}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error or hint text */}
        {error && <p className="text-xs text-red-500 ps-1">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400 ps-1">{hint}</p>}
      </div>
    );
  },
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
export type { FloatingLabelInputProps, InputVariant, InputSize };
