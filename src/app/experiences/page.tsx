"use client";

import { Timeline } from "@/components/timeline";

import styles from "./experiences.module.scss";

import experiences from "./experiences.json";

export default function ExperiencesPage() {
  return (
    <div className={styles.experiences}>
      <h2 className={styles.title}>Experiences</h2>

      <Timeline experiences={experiences} />
    </div>
  );
}
