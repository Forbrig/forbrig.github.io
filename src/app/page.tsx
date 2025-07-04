import Image from "next/image";

import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <p className={styles.greeting}>Hi, I&apos;m</p>
        <h1 className={styles.name}>Vitor Forbrig</h1>
        <p className={styles.bio}>
          A Senior Frontend Engineer with 6+ years of experience building fast,
          scalable web apps using JavaScript, TypeScript, ReactJS, and Next.js.
          I&apos;ve worked across startups, consultancies, and global companies,
          always focused on creating user-centric, high-performance solutions.
        </p>
      </div>

      <div className={styles["image-wrapper"]}>
        <Image
          src="/cartoon-profile.png"
          alt="Cartoon profile of Vitor Forbrig"
          width={400}
          height={400}
          layout="responsive"
          priority
        />
      </div>
    </div>
  );
}
