"use client";

import { getLanguageIcon } from "@/components/languageIcons";

import { FaGithub, FaLink } from "react-icons/fa6";
import { Tag } from "@/components/tag";

import projects from "./projects.json";

import styles from "./projects.module.scss";

export default function ProjectsPage() {
  return (
    <div className={styles.projects}>
      <h2 className={styles.title}>Projects</h2>

      <ul className={styles["projects-list"]}>
        {projects?.map((project) => (
          <li key={project.title} className={styles.project}>
            <div className={styles.header}>
              <h3 className={styles.name}>{project.title}</h3>
              <div className={styles.links}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <FaLink size={24} />
                  </a>
                )}
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <FaGithub size={24} />
                  </a>
                )}
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.technologies}>
              {project.technologies.map((tech) => (
                <Tag key={tech}>
                  {getLanguageIcon(tech.toLowerCase())}
                  {tech}
                </Tag>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
