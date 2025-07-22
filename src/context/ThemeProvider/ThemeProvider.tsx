"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "matrix";
export const themes: Theme[] = ["light", "dark", "matrix"];

export interface ThemeControl<T = string | number> {
  type: "slider" | "toggle" | "radio";
  title: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  value: T;
  defaultValue: T;
  onChange: (value: T) => void;
}

interface ThemeContextProps {
  theme: "dark" | "light" | "matrix";
  toggleTheme: (theme: Theme) => void;
  themeControls: ThemeControl[];
  setThemeControls: (controls: ThemeControl[]) => void;
}

const initialProps: ThemeContextProps = {
  theme: "dark",
  toggleTheme: () => {},
  themeControls: [],
  setThemeControls: () => {},
};

export const themeContext = createContext<ThemeContextProps>(initialProps);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("matrix");
  const [themeControls, setThemeControls] = useState<ThemeControl[]>([]);

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
    themeControls,
    setThemeControls: (controls) => {
      setThemeControls(controls);
    },
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};
