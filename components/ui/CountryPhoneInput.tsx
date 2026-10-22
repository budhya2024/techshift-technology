"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { COUNTRIES, Country, DEFAULT_COUNTRY } from "@/lib/countries";
import { FiChevronDown, FiSearch, FiCheck } from "react-icons/fi";

interface CountryPhoneInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange?: (e: any) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  fieldClassName?: string;
  defaultCountryIso?: string;
  icon?: React.ReactNode;
}

export default function CountryPhoneInput({
  id = "phone",
  name = "phone",
  value,
  onChange,
  required = false,
  placeholder,
  className = "",
  fieldClassName,
  defaultCountryIso = "IN",
  icon,
}: CountryPhoneInputProps) {
  // Find initial country based on defaultCountryIso or parse from existing value
  const initialCountry = useMemo(() => {
    if (value && value.startsWith("+")) {
      // Find matching country by dialing code prefix (longest match first)
      const sorted = [...COUNTRIES].sort((a, b) => b.code.length - a.code.length);
      const matched = sorted.find((c) => value.startsWith(c.code));
      if (matched) return matched;
    }
    const found = COUNTRIES.find((c) => c.iso.toUpperCase() === defaultCountryIso.toUpperCase());
    return found || DEFAULT_COUNTRY;
  }, [defaultCountryIso]);

  const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Extract phone number without the country code
  const getRawNumber = (val: string, country: Country) => {
    if (!val) return "";
    if (val.startsWith(country.code)) {
      return val.slice(country.code.length).trimStart();
    }
    // Also remove any leading "+" if user typed it
    return val.replace(/^\+\d+\s*/, "");
  };

  const rawNumber = getRawNumber(value, selectedCountry);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // When country changes
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");

    // Update parent value with new country code + current raw number
    if (rawNumber.trim()) {
      onChange?.({
        target: {
          name,
          value: `${country.code} ${rawNumber.trim()}`,
        },
      });
    }
  };

  // When number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    const fullVal = newNumber.trim() ? `${selectedCountry.code} ${newNumber}` : "";
    onChange?.({
      target: {
        name,
        value: fullVal,
      },
    });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center transition-all duration-200 overflow-visible ${
          fieldClassName ||
          "rounded-xl bg-background border border-border/80 focus-within:border-red-500 shadow-sm"
        }`}
      >
        {/* Country Code Selector Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="flex items-center gap-1.5 px-3 py-3 bg-muted/40 hover:bg-muted/70 text-foreground border-r border-border/80 transition-colors cursor-pointer select-none shrink-0 rounded-l-[inherit] focus:outline-none"
          title={`${selectedCountry.name} (${selectedCountry.code})`}
        >
          {icon && <span className="text-muted-foreground mr-1">{icon}</span>}
          <span className="text-lg leading-none">{selectedCountry.flag}</span>
          <span className="text-xs font-semibold text-foreground tracking-tight">
            {selectedCountry.code}
          </span>
          <FiChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180 text-red-500" : ""
            }`}
          />
        </button>

        {/* Phone Number Input */}
        <input
          id={id}
          type="tel"
          name={name}
          required={required}
          value={rawNumber}
          onChange={handleNumberChange}
          placeholder={placeholder || selectedCountry.placeholder}
          className="flex-1 bg-transparent px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
        />
      </div>

      {/* Country Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-72 sm:w-80 max-w-[90vw] bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="p-2.5 border-b border-border bg-muted/20">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-3 text-muted-foreground w-4 h-4 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full bg-background border border-border/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin divide-y divide-border/20">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.iso === selectedCountry.iso && country.code === selectedCountry.code;
                return (
                  <button
                    key={`${country.iso}-${country.code}`}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-red-500/10 text-red-600 font-semibold dark:bg-red-500/20"
                        : "text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-base leading-none shrink-0">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-muted-foreground font-medium">
                        {country.code}
                      </span>
                      {isSelected && <FiCheck className="w-3.5 h-3.5 text-red-600" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
