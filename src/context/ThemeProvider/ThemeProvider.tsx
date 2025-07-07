"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "matrix";
export const themes: Theme[] = ["light", "dark", "matrix"];

interface ThemeContextProps {
  theme: "dark" | "light" | "matrix";
  toggleTheme: (theme: Theme) => void;
}

export const themeContext = createContext<ThemeContextProps>({
  theme: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("matrix");

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("theme-dark", theme === "dark");
    root.classList.toggle("theme-light", theme === "light");
    root.classList.toggle("theme-matrix", theme === "matrix");
  }, [theme]);

  const value: ThemeContextProps = {
    theme,
    toggleTheme: (_theme) => {
      setTheme(_theme);
    },
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};
