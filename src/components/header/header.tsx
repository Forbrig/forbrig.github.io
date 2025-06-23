"use client";

import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { themeContext } from "@/context/ThemeProvider";

import { FaMoon, FaSun } from "react-icons/fa";

import styles from "./header.module.scss";

export const Header = () => {
  const pathname = usePathname();
  const { toggleTheme, theme } = useContext(themeContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.tab} data-active={pathname === "/"}>
          Home
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
        onClick={() => toggleTheme()}
        title="Toggle theme"
      >
        {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </header>
  );
};
