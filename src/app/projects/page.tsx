"use client";

import { useTheme } from "@/hooks/useTheme";

import { TechnologieIcon } from "@/components/technologieIcon";
import { Tag } from "@/components/tag";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import projects from "./projects.json";

import styles from "./projects.module.scss";

export default function ProjectsPage() {
  const { theme } = useTheme();

  return (
    <div className={styles.projects}>
      <h1 className={styles.title}>Projects</h1>

      <div className={styles["projects-list"]}>
        {projects?.map((project) => (
          <Card key={project.title}>
            <div className={styles.project}>
              <div className={styles.header}>
                <h2>{project.title}</h2>
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
                    {theme !== "matrix" && (
                      <TechnologieIcon technologie={tech} />
                    )}
                    {tech}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
