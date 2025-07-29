"use client";

import { Button } from "@/components/button";
import { Experience } from "./components/experience";

import { FaDownload } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";

import styles from "./experiences.module.scss";

import experiences from "./experiences.json";
import { Card } from "@/components/card";

export default function ExperiencesPage() {
  return (
    <div className={styles.experiences}>
      <h1 className={styles.title}>Experiences</h1>

      <Card>
        <div className={styles.cv}>
          <div className={styles.content}>
            <div className={styles.info}>
              <FaFileArrowDown size={32} />
              <div>
                <h2 className={styles.title}>Download My CV</h2>
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
      </Card>

      <div className={styles.timeline}>
        {experiences.map((experience, index) => (
          <Card key={index}>
            <Experience key={index} experience={experience} />
          </Card>
        ))}
      </div>
    </div>
  );
}
