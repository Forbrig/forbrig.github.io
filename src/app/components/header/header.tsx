"use client";

import { useState } from "react";

import styles from "./header.module.scss";

export const Header = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a
          href="#home"
          className={styles.tab}
          data-active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        >
          Home
        </a>
        <a
          href="#projects"
          className={styles.tab}
          data-active={activeTab === "projects"}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </a>
      </nav>
    </header>
  );
};
