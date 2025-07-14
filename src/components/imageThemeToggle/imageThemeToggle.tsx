"use client";

import { FC, useContext } from "react";
import Image from "next/image";

import { themeContext, themes } from "@/context/ThemeProvider";

import styles from "./imageThemeToggle.module.scss";

export const ImageThemeToggle: FC = () => {
  const { theme, toggleTheme } = useContext(themeContext);

  const currentThemeIndex = themes.findIndex((t) => t === theme);

  const clickLeft = () => {
    toggleTheme(
      themes[(currentThemeIndex - 1 + themes.length) % themes.length]
    );
  };

  const clickRight = () => {
    toggleTheme(themes[(currentThemeIndex + 1) % themes.length]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.clickZones}>
        <div
          onClick={clickLeft}
          className={`${styles.clickZone} ${styles.leftZone}`}
        />
        <div
          onClick={clickRight}
          className={`${styles.clickZone} ${styles.rightZone}`}
        />
      </div>

      <Image
        src="/cartoon-profile.png"
        alt="Cartoon profile of Vitor Forbrig"
        width={400}
        height={400}
        priority
      />
    </div>
  );
};
