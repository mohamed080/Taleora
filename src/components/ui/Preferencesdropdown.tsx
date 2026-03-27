"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import { type Country } from "react-phone-number-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Data ──────────────────────────────────────────────────────────────────────
const COUNTRIES: { code: Country; label: string }[] = [
  { code: "US", label: "United States" },
  { code: "SA", label: "Saudi Arabia"  },
  { code: "EG", label: "Egypt"         },
  { code: "LY", label: "Libya"         },
  { code: "SY", label: "Syria"         },
];

const CURRENCIES = [
  { code: "EGP", symbol: "£",   label: "Egyptian Pound" },
  { code: "USD", symbol: "$",   label: "US Dollar"      },
  { code: "EUR", symbol: "€",   label: "Euro"           },
  { code: "GBP", symbol: "£",   label: "British Pound"  },
  { code: "SAR", symbol: "﷼",  label: "Saudi Riyal"    },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham"     },
];

const COUNTRY_CURRENCY: Partial<Record<string, string>> = {
  EG: "EGP", US: "USD", SA: "SAR", LY: "LYD", SY: "SYP",
};

// ── Flag image — flagcdn.com works on all platforms including Windows ─────────
function FlagImg({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={code}
      width={24}
      height={16}
      className="rounded-[2px] object-cover shrink-0 w-6 h-4"
    />
  );
}

// ── Inline sub-dropdown ───────────────────────────────────────────────────────
function InlineSelect<T extends string>({
  value,
  options,
  renderOption,
  renderSelected,
  onChange,
}: {
  value: T;
  options: T[];
  renderOption: (item: T, isSelected: boolean) => React.ReactNode;
  renderSelected: (item: T) => React.ReactNode;
  onChange: (item: T) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full items-center justify-between rounded-xl border-2 border-[#B8BBC2] px-4 text-sm font-semibold outline-none transition-colors hover:border-primary/40 bg-white"
      >
        <div className="flex items-center gap-2">{renderSelected(value)}</div>
        <IoIosArrowDown
          className={cn(
            "h-4 w-4 text-primary transition-transform duration-200 shrink-0",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-1 max-h-44 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-md">
              {options.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-orange-50",
                      isSelected && "bg-primary/5 font-semibold",
                    )}
                  >
                    {renderOption(opt, isSelected)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── PreferencesDropdown ───────────────────────────────────────────────────────
interface PreferencesDropdownProps {
  size?: "sm" | "md";
  onCurrencyChange?: (currency: string) => void;
  onCountryChange?: (country: string) => void;
}

export function PreferencesDropdown({
  size = "md",
  onCurrencyChange,
  onCountryChange,
}: PreferencesDropdownProps) {
  const [country, setCountry] = React.useState<Country>("EG");
  const [currency, setCurrency] = React.useState("EGP");

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  const handleCountryChange = (c: Country) => {
    setCountry(c);
    onCountryChange?.(c);
    const def = COUNTRY_CURRENCY[c];
    if (def) { setCurrency(def); onCurrencyChange?.(def); }
  };

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    onCurrencyChange?.(code);
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center rounded-[6px] bg-primary text-white outline-none",
            "transition-colors hover:bg-primary/90 focus:outline-none",
            size === "md" ? "h-9 px-3 gap-2" : "h-8 px-2.5 gap-1.5",
          )}
        >
          <FlagImg code={country} />
          <span className={cn("font-semibold", size === "md" ? "text-sm" : "text-xs")}>
            {selectedCurrency.code}
          </span>
          <IoIosArrowDown className={cn(size === "md" ? "h-4 w-4" : "h-3.5 w-3.5")} />
        </button>
      </DropdownMenuTrigger>

      {/* Panel */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          "rounded-[8px] border border-[#F6F6F6] p-4",
          "shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]",
          size === "md" ? "w-52" : "w-48",
        )}
      >
        <p className="mb-3 text-sm font-bold text-primary">Preferences</p>

        <div className="flex flex-col gap-3">
          {/* Country */}
          <InlineSelect<Country>
            value={country}
            options={COUNTRIES.map((c) => c.code)}
            onChange={handleCountryChange}
            renderSelected={(c) => {
              const found = COUNTRIES.find((x) => x.code === c);
              return (
                <>
                  <FlagImg code={c} />
                  <span className="bg-[linear-gradient(132.78deg,#FF6DCA_37.86%,#FFB24B_86.43%)] bg-clip-text text-transparent font-semibold">
                    {found?.label ?? c}
                  </span>
                </>
              );
            }}
            renderOption={(c, isSelected) => {
              const found = COUNTRIES.find((x) => x.code === c);
              return (
                <>
                  <FlagImg code={c} />
                  <span className={cn("flex-1 text-left text-gray-700 truncate", isSelected && "text-primary")}>
                    {found?.label ?? c}
                  </span>
                </>
              );
            }}
          />

          {/* Currency */}
          <InlineSelect<string>
            value={currency}
            options={CURRENCIES.map((c) => c.code)}
            onChange={handleCurrencyChange}
            renderSelected={(code) => {
              const cur = CURRENCIES.find((c) => c.code === code)!;
              return (
                <>
                  <span className="font-bold text-primary w-5 text-center">{cur.symbol}</span>
                  <span className="bg-[linear-gradient(132.78deg,#FF6DCA_37.86%,#FFB24B_86.43%)] bg-clip-text text-transparent font-semibold">
                    {cur.code}
                  </span>
                </>
              );
            }}
            renderOption={(code, isSelected) => {
              const cur = CURRENCIES.find((c) => c.code === code)!;
              return (
                <>
                  <span className="w-6 text-center font-bold text-primary shrink-0">{cur.symbol}</span>
                  <span className={cn("font-semibold text-gray-700", isSelected && "text-primary")}>
                    {cur.code}
                  </span>
                  <span className="ms-auto text-xs text-gray-400 shrink-0">{cur.label}</span>
                </>
              );
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}