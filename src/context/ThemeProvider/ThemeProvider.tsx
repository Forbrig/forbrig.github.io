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

export interface ThemeContextProps {
  theme: "dark" | "light" | "matrix";
  toggleTheme: (theme: Theme) => void;
  themeControls: ThemeControl[];
  setThemeControls: (controls: ThemeControl[]) => void;
  focusBackground: boolean;
  setFocusBackground: (focus: boolean) => void;
}

const initialProps: ThemeContextProps = {
  theme: "dark",
  toggleTheme: () => {},
  themeControls: [],
  setThemeControls: () => {},
  focusBackground: false,
  setFocusBackground: () => {},
};

export const themeContext = createContext<ThemeContextProps>(initialProps);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("matrix");
  const [themeControls, setThemeControls] = useState<ThemeControl[]>([]);
  const [focusBackground, setFocusBackground] = useState<boolean>(false);

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
    focusBackground,
    setFocusBackground: (focus) => {
      setFocusBackground(focus);
    },
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};
