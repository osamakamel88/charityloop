"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  EGP: { code: "EGP", name: "الجنيه المصري (EGP)", symbol: "ج.م", locale: "ar-EG" },
  SAR: { code: "SAR", name: "الريال السعودي (SAR)", symbol: "ر.س", locale: "ar-SA" },
  AED: { code: "AED", name: "الدرهم الإماراتي (AED)", symbol: "د.إ", locale: "ar-AE" },
  KWD: { code: "KWD", name: "الدينار الكويتي (KWD)", symbol: "د.ك", locale: "ar-KW" },
  QAR: { code: "QAR", name: "الريال القطري (QAR)", symbol: "ر.ق", locale: "ar-QA" },
  USD: { code: "USD", name: "الدولار الأمريكي (USD)", symbol: "$", locale: "en-US" },
  EUR: { code: "EUR", name: "اليورو الأوروبي (EUR)", symbol: "€", locale: "en-IE" },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrencyCode: (code: string) => void;
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: SUPPORTED_CURRENCIES.EGP,
  setCurrencyCode: () => {},
  formatAmount: (amount: number) => `${amount} ج.م`,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<string>("EGP");

  useEffect(() => {
    const saved = localStorage.getItem("charityloop_currency");
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      setCurrencyCodeState(saved);
    }
  }, []);

  const setCurrencyCode = (code: string) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyCodeState(code);
      localStorage.setItem("charityloop_currency", code);
    }
  };

  const currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.EGP;

  const formatAmount = (amount: number) => {
    try {
      return new Intl.NumberFormat(currency.locale, {
        style: "currency",
        currency: currency.code,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${new Intl.NumberFormat("ar-EG").format(amount)} ${currency.symbol}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
