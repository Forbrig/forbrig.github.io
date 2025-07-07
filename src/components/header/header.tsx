"use client";

import Link from "next/link";
import { JSX, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Theme, themeContext } from "@/context/ThemeProvider";

import { FaCode, FaMoon, FaSun } from "react-icons/fa";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-main"]}>
        <button onClick={onMobileMenuClick} className={styles["nav-mobile"]}>
          {mobileMenuOpen ? (
            <FaBarsStaggered size={24} />
          ) : (
            <FaBars size={24} />
          )}
        </button>

        <Link href="/" className={styles.logo}>
          <span className={styles["logo-text"]}>forbrig</span>
          <span className={styles["logo-subtext"]}>.dev</span>
        </Link>

        <button
          className={styles["theme-toggle"]}
          onClick={() => {
            toggleTheme(themes[nextThemeIndex].name);
          }}
          title="Toggle theme"
        >
          {themes[currentThemeIndex]?.icon || <FaSun size={24} />}
        </button>
      </div>

      <nav className={styles.nav} data-mobile-open={mobileMenuOpen}>
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
        <Link
          href="/contact"
          className={styles.tab}
          data-active={pathname === "/contact"}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};
