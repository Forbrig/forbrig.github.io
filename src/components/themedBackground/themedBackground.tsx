"use client";

import { useContext } from "react";

import { themeContext } from "@/context/ThemeProvider";

import { MatrixBackground } from "./components/matrixBackground";
import { StarsBackground } from "./components/starsBackground";

import styles from "./themedBackground.module.scss";

export const ThemedBackground = () => {
  const { theme, focusBackground } = useContext(themeContext);

  return (
    <div className={styles["themed-background"]} data-focus={focusBackground}>
      {theme === "matrix" && <MatrixBackground />}
      {theme === "dark" && <StarsBackground />}
    </div>
  );
};
