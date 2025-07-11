"use client";

import { Timeline } from "@/components/timeline";

import styles from "./experiences.module.scss";

import experiences from "./experiences.json";
import { Button } from "@/components/button";
import { FaDownload, FaFileText } from "react-icons/fa";

export default function ExperiencesPage() {
  return (
    <div className={styles.experiences}>
      <h2 className={styles.title}>Experiences</h2>

      <div className={styles.cvSection}>
        <div className={styles.cvContent}>
          <div className={styles.cvInfo}>
            <FaFileText size={32} />
            <div>
              <h3>Download My CV</h3>
              <p>Get a comprehensive overview of my professional experience and skills</p>
            </div>
          </div>
          <a href="/cv/vitor-forbrig-cv.pdf" download="Vitor-Forbrig-CV.pdf">
            <Button buttonStyle="primary" large>
              <FaDownload size={20} />
              Download CV
            </Button>
          </a>
        </div>
      </div>
      <Timeline experiences={experiences} />
    </div>
  );
}
