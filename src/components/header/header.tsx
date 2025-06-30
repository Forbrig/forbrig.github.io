"use client";

import Link from "next/link";
import { JSX, useContext } from "react";
import { usePathname } from "next/navigation";
import { Theme, themeContext } from "@/context/ThemeProvider";

import { FaCode, FaMoon, FaSun } from "react-icons/fa";

import styles from "./header.module.scss";

const themes: { name: Theme; icon: JSX.Element }[] = [
  { name: "light", icon: <FaSun size={24} /> },
  { name: "dark", icon: <FaMoon size={24} /> },
  { name: "matrix", icon: <FaCode size={24} /> },
];

export const Header = () => {
  const pathname = usePathname();
  const { toggleTheme, theme } = useContext(themeContext);
  const currentThemeIndex = themes.findIndex((t) => t.name === theme);
  const nextThemeIndex =
    currentThemeIndex + 1 >= themes.length ? 0 : currentThemeIndex + 1;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.tab} data-active={pathname === "/"}>
          Home
        </Link>
        <Link
          href="/experiences"
          className={styles.tab}
          data-active={pathname === "/experiences"}
        >
          Experiences
        </Link>
        <Link
          href="/projects"
          className={styles.tab}
          data-active={pathname === "/projects"}
        >
          Projects
        </Link>
      </nav>

      <button
        className={styles["theme-toggle"]}
        onClick={() => {
          toggleTheme(themes[nextThemeIndex].name);
        }}
        title="Toggle theme"
      >
        {themes[nextThemeIndex]?.icon || <FaSun size={24} />}
      </button>
    </header>
  );
};
