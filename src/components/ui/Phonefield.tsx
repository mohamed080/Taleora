"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  getCountries,
  getCountryCallingCode,
  type Country,
} from "react-phone-number-input";
import { Controller, type Control } from "react-hook-form";
import { type InputVariant, type InputSize } from "./Floatinglabelinput";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PhoneFieldProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  defaultCountry?: Country;
  variant?: InputVariant;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
}

// ── Size map ──────────────────────────────────────────────────────────────────
const sizeHeight: Record<InputSize, string> = {
  sm: "h-10",
  md: "h-12",
  lg: "h-12 sm:h-13",
};

const sizePadding: Record<InputSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-sm sm:text-base",
};

const sizeLabel: Record<InputSize, string> = {
  sm: "text-xs px-1",
  md: "text-xs px-1",
  lg: "text-sm px-1.5",
};

// ── PhoneField ────────────────────────────────────────────────────────────────
export function PhoneField({
  name,
  control,
  label,
  error,
  hint,
  placeholder = "Enter your phone number",
  defaultCountry = "EG",
  variant = "pink",
  inputSize = "md",
  leftIcon,
  disabled,
}: PhoneFieldProps) {
  const [country, setCountry] = React.useState<Country>(defaultCountry);
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const resolvedVariant: InputVariant = error ? "error" : variant;

  // Border styles per variant
  const borderStyles: Record<
    InputVariant,
    { base: string; focus: string; ring: string; label: string }
  > = {
    pink: {
      base: "border-gray-200",
      focus: "group-focus-within:border-primary",
      ring: "group-focus-within:ring-primary/0",
      label: "text-primary",
    },
    default: {
      base: "border-gray-200",
      focus: "group-focus-within:border-gray-400",
      ring: "group-focus-within:ring-gray-400/20",
      label: "text-gray-400",
    },
    success: {
      base: "border-green-400",
      focus: "group-focus-within:border-green-500",
      ring: "group-focus-within:ring-green-500/20",
      label: "text-green-500",
    },
    error: {
      base: "border-red-400",
      focus: "group-focus-within:border-red-500",
      ring: "group-focus-within:ring-red-500/20",
      label: "text-red-400",
    },
  };
  const b = borderStyles[resolvedVariant];

  const dialCode = `+${getCountryCallingCode(country)}`;

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5 w-full">
          <div
            className={cn(
              "relative group",
              sizeHeight[inputSize],
              disabled && "opacity-50",
            )}
          >
            {/* Border */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl border-2 transition-all duration-200",
                "group-focus-within:ring-3",
                b.base,
                b.focus,
                b.ring,
              )}
            />

            {/* Label on border */}
            <span
              className={cn(
                "absolute start-3 -top-px z-10 -translate-y-1/2 bg-white",
                "leading-none font-semibold select-none pointer-events-none",
                "transition-colors duration-200",
                sizeLabel[inputSize],
                b.label,
              )}
            >
              {label}
            </span>

            {/* Row */}
            <div className="relative z-10 flex h-full items-center">
              {/* Left icon */}
              {leftIcon && (
                <span className={cn("ps-3.5 pe-1 shrink-0", b.label)}>
                  {leftIcon}
                </span>
              )}

              {/* Dial code + dropdown */}
              <div
                ref={dropdownRef}
                className="relative flex items-center h-full shrink-0"
              >
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-0.5 ps-1 pe-1 font-semibold",
                    "hover:opacity-75 focus:outline-none transition-opacity",
                    "text-sm disabled:cursor-not-allowed",
                    b.label,
                  )}
                >
                  {dialCode}
                  <svg
                    className={cn(
                      "h-2.5 w-2.5 transition-transform",
                      open && "rotate-180",
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute start-0 top-full z-50 mt-1.5 max-h-60 w-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                    {getCountries().map((c) => {
                      const flag = String.fromCodePoint(
                        ...[...c.toUpperCase()].map(
                          (ch) => 0x1f1e0 + ch.charCodeAt(0) - 65,
                        ),
                      );
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCountry(c);
                            field.onChange("");
                            setOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors",
                            c === country &&
                              "bg-primary/5 text-primary font-medium",
                          )}
                        >
                          <span className="text-base leading-none">{flag}</span>
                          <span className="flex-1 truncate text-gray-700">
                            {c}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">
                            +{getCountryCallingCode(c)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Divider */}
              <span className="h-5 w-px bg-gray-300 mx-1 shrink-0" />

              {/* Number input */}
              <input
                type="tel"
                value={
                  field.value?.startsWith(dialCode)
                    ? field.value.slice(dialCode.length)
                    : (field.value ?? "")
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, ""); // only digits
                  field.onChange(raw ? `${dialCode}${raw}` : "");
                }}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "flex-1 h-full bg-transparent outline-none pe-4",
                  "placeholder:text-[#A9A9A9]",
                  "disabled:cursor-not-allowed",
                  sizePadding[inputSize],
                  leftIcon ? "ps-2" : "ps-3",
                )}
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-500 ps-1">{error}</p>}
          {!error && hint && (
            <p className="text-xs text-gray-400 ps-1">{hint}</p>
          )}
        </div>
      )}
    />
  );
}
