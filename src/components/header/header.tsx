"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./header.module.scss";

export const Header = () => {
  const pathname = usePathname();

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
    </header>
  );
};
