import { FC, useContext, useState } from "react";
import Image from "next/image";

import { themeContext } from "@/context/ThemeProvider";

import { FaExternalLinkAlt, FaGithub, FaCode, FaEye } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Tag } from "@/components/tag";
import { TechnologieIcon } from "@/components/technologieIcon";
import { Button } from "@/components/button";

import styles from "./projectCard.module.scss";

export interface Project {
  title: string;
  description: string;
  repository?: string;
  url?: string;
  technologies: string[];
  image?: string;
  status?: "completed" | "in-progress" | "archived";
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useContext(themeContext);
  const [imageError, setImageError] = useState(false);

  // Generate a placeholder image URL based on project title
  const getPlaceholderImage = (title: string) => {
    const colors = ['4f46e5', '059669', 'dc2626', 'ea580c', '7c3aed', 'db2777'];
    const colorIndex = title.length % colors.length;
    const color = colors[colorIndex];
    const encodedTitle = encodeURIComponent(title);
    return `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80`;
  };

  const displayImage = project.image || getPlaceholderImage(project.title);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "var(--success-color, #10b981)";
      case "in-progress":
        return "var(--warning-color, #f59e0b)";
      case "archived":
        return "var(--text-color-secondary)";
      default:
        return "var(--text-color)";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "archived":
        return "Archived";
      default:
        return "Project";
    }
  };

  return (
    <article className={styles.projectCard}>
      <div className={styles.card}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroImage}>
            {!imageError ? (
              <Image
                src={displayImage}
                alt={project.title}
                fill
                className={styles.heroImg}
                style={{ objectFit: 'cover' }}
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className={styles.placeholderImage}>
                <FaCode size={48} />
              </div>
            )}
            <div className={styles.heroOverlay} />
          </div>
          
          <div className={styles.heroContent}>
            <div className={styles.heroHeader}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>{project.title}</h2>
                {project.status && (
                  <div 
                    className={styles.statusBadge}
                    style={{ borderColor: getStatusColor(project.status) }}
                  >
                    <span 
                      className={styles.statusDot}
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    />
                    <span>{getStatusLabel(project.status)}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.actions}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionLink}
                    title="View Live Project"
                  >
                    <FaEye size={16} />
                  </a>
                )}
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionLink}
                    title="View Source Code"
                  >
                    <FaGithub size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.description}>
            <p>{project.description}</p>
          </div>

          <div className={styles.technologies}>
            <h3 className={styles.techTitle}>Technologies</h3>
            <div className={styles.techGrid}>
              {project.technologies.map((tech, index) => (
                <Tag key={index}>
                  {theme !== "matrix" && <TechnologieIcon technologie={tech} />}
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          <div className={styles.cardActions}>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button buttonStyle="primary" full>
                  <FaExternalLinkAlt size={16} />
                  View Project
                </Button>
              </a>
            )}
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button buttonStyle="secondary" full>
                  <FaGithub size={16} />
                  Source Code
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};