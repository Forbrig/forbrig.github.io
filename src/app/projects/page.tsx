"use client";

import { ProjectCard } from "./components/projectCard";

import projects from "./projects.json";

import styles from "./projects.module.scss";

export default function ProjectsPage() {
  return (
    <div className={styles.projects}>
      <h1 className={styles.title}>Projects</h1>

      <div className={styles["projects-grid"]}>
        {projects?.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
