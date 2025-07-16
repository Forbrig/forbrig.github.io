"use client";

import { ImageThemeToggle } from "@/components/imageThemeToggle";
// import {
//   technologie_icon_map,
//   TechnologieIcon,
// } from "@/components/technologieIcon";
// import { InfiniteCarousel } from "@/components/infiniteCarousel";

import styles from "./page.module.scss";

export default function HomePage() {
  // const techs = Object.keys(technologie_icon_map);

  return (
    <div className={styles.home}>
      <div className={styles.personal}>
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
          <ImageThemeToggle />
        </div>
      </div>

      {/* <div className={styles.technologies}>
        <InfiniteCarousel
          items={techs.map((tech, i) => (
            <TechnologieIcon key={i} technologie={tech} size={40} />
          ))}
        />
      </div> */}
    </div>
  );
}
