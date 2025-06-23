import { FC } from "react";

import { Tag } from "../tag";
import { FaCalendar, FaExternalLinkAlt } from "react-icons/fa";

import styles from "./timeline.module.scss";

export interface Experience {
  id: string;
  title: string;
  company?: string;
  date: string;
  technologies: string[];
  links?: {
    label: string;
    url: string;
  }[];
  description?: string;
}

interface TimelineProps {
  experiences: Experience[];
}

export const Timeline: FC<TimelineProps> = ({ experiences }) => {
  return (
    <div className={styles.timeline}>
      {experiences.map((experience, index) => (
        <div key={index} className={styles.experience}>
          {/* <div className={styles.marker}>
            <div className={styles.circle} />
          </div> */}

          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles["title-and-company"]}>
                <h3 className={styles.title}>{experience.title}</h3>
                <a
                  className={styles.company}
                  href={experience.links?.[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {experience.company}{" "}
                  {experience.links?.[0]?.url && (
                    <FaExternalLinkAlt size={12} />
                  )}
                </a>
              </div>
              <p className={styles.date}>
                <FaCalendar /> {experience.date}
              </p>
            </div>
            <p className={styles.description}>{experience.description}</p>

            <div className={styles.technologies}>
              {experience.technologies.map((tech, index) => (
                <Tag key={index}>{tech}</Tag>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
