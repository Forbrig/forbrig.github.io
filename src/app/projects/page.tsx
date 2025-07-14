"use client";

import { useContext } from "react";

import { TechnologieIcon } from "@/components/technologieIcon";

import { themeContext } from "@/context/ThemeProvider";

import { Tag } from "@/components/tag";
import { Button } from "@/components/button";

import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import projects from "./projects.json";

import styles from "./projects.module.scss";

export default function ProjectsPage() {
  const { theme } = useContext(themeContext);

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
                  >
                    <Button>
                      <FaExternalLinkAlt size={18} />
                    </Button>
                  </a>
                )}
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <FaGithub size={18} />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.technologies}>
              {project.technologies.map((tech) => (
                <Tag key={tech}>
                  {theme !== "matrix" && <TechnologieIcon technologie={tech} />}
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
