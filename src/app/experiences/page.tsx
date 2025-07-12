"use client";

import { Timeline } from "./components/timeline";
import { Button } from "@/components/button";

import { FaDownload } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";

import styles from "./experiences.module.scss";

import experiences from "./experiences.json";

export default function ExperiencesPage() {
  return (
    <div className={styles.experiences}>
      <h2 className={styles.title}>Experiences</h2>

      <div className={styles.cv}>
        <div className={styles.content}>
          <div className={styles.info}>
            <FaFileArrowDown size={32} />
            <div>
              <h3>Download My CV</h3>
              <p>
                Get a comprehensive overview of my professional experience and
                skills
              </p>
            </div>
          </div>
          <a href="/cv/vitor-forbrig-cv.pdf" download="Vitor-Forbrig-CV.pdf">
            <Button buttonStyle="secondary" large full>
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
