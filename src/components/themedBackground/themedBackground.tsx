"use client";

import { useTheme } from "@/hooks/useTheme";

import { MatrixBackground } from "./components/matrixBackground";
import { StarsBackground } from "./components/starsBackground";

import styles from "./themedBackground.module.scss";

export const ThemedBackground = () => {
  const { theme, focusBackground } = useTheme();

  return (
    <div className={styles["themed-background"]} data-focus={focusBackground}>
      {theme === "matrix" && <MatrixBackground />}
      {theme === "dark" && <StarsBackground />}
    </div>
  );
};
