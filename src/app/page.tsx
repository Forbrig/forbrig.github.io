"use client";

import Image from "next/image";

import { FaLinkedin, FaGithub } from "react-icons/fa";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.content}>
          <p className={styles.greeting}>Hi, I&apos;m</p>
          <h1 className={styles.name}>Vitor Forbrig</h1>
          <p className={styles.bio}>
            A Senior Frontend Engineer with 6+ years of experience building
            fast, scalable web apps using JavaScript, TypeScript, ReactJS, and
            Next.js. I&apos;ve worked across startups, consultancies, and global
            companies, always focused on creating user-centric, high-performance
            solutions.
          </p>
        </div>

        <div className={styles["image-wrapper"]}>
          <Image
            src="/cartoon-profile.png"
            alt="Cartoon profile of Vitor Forbrig"
            width={400}
            height={400}
            priority
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Forbrig"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/forbrig/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={30} />
        </a>
      </footer>
    </div>
  );
}
