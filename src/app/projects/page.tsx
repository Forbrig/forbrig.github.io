"use client";

import { useGithubProjects } from "@/hooks/useGithubProjects";
import { getLanguageIcon } from "@/components/languageIcons";

import { FaGithub } from "react-icons/fa";
import { Tag } from "@/components/tag";

import styles from "./projects.module.scss";

export default function ProjectsPage() {
  const { projects, isLoading } = useGithubProjects();

  return (
    <div className={styles.projects}>
      <h2 className={styles.title}>Projects</h2>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <ul className={styles["projects-list"]}>
          {projects?.map((project) => (
            <li key={project.name} className={styles.project}>
              <div className={styles.header}>
                <h3 className={styles.name}>{project.name}</h3>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <FaGithub size={24} />
                </a>
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.technologies}>
                {project.topics.map((topic) => (
                  <Tag key={topic}>
                    {getLanguageIcon(topic)} {topic}
                  </Tag>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
