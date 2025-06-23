"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("theme-dark", theme === "dark");
    root.classList.toggle("theme-light", theme === "light");
  }, [theme]);

  const value: ThemeContextProps = {
    theme,
    toggleTheme: () => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    },
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};
