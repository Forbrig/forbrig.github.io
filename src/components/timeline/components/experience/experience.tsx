import { FC, useState } from "react";
import Image from "next/image";

import { FaCalendar, FaExternalLinkAlt } from "react-icons/fa";
import { Tag } from "@/components/tag";
import { TechnologieIcon } from "@/components/technologieIcon";

import { FaAnglesDown, FaAnglesUp, FaBriefcase } from "react-icons/fa6";

import styles from "./experience.module.scss";

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
  images?: {
    src: string;
    alt?: string;
    description?: string;
  }[];
}

interface ExperienceProps {
  experience: Experience;
}

export const Experience: FC<ExperienceProps> = ({ experience }) => {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className={styles.experience}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles["main-info"]}>
            <div className={styles["title-and-date"]}>
              <h3 className={styles.title}>{experience.title}</h3>
              <p className={styles.date}>
                <FaCalendar /> {experience.date}
              </p>
            </div>

            <a
              className={styles.company}
              href={experience.links?.[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaBriefcase size={14} /> {experience.company}
              {experience.links?.[0]?.url && <FaExternalLinkAlt size={14} />}
            </a>
          </div>

          <div className={styles.technologies}>
            {experience.technologies.map((tech, index) => (
              <Tag key={index}>
                <TechnologieIcon technologie={tech} />
                {tech}
              </Tag>
            ))}
          </div>
        </div>

        <div className={styles.description}>
          {experience.description}

          <div className={styles.footer}>
            {experience.images && (
              <button
                className={styles["toggle-gallery"]}
                onClick={() => setShowImages((prev) => !prev)}
                type="button"
              >
                {showImages ? (
                  <>
                    Hide Gallery <FaAnglesUp />
                  </>
                ) : (
                  <>
                    Show Gallery <FaAnglesDown />
                  </>
                )}
              </button>
            )}
          </div>

          {experience.images && showImages && (
            <div className={styles.gallery}>
              <div className={styles.images}>
                {experience.images.map((image, i) => (
                  <div key={i} className={styles.imageContainer}>
                    <Image
                      key={i}
                      loading="lazy"
                      width={600}
                      height={200}
                      src={image.src}
                      alt={image.alt ?? experience.title}
                      className={styles.image}
                    />

                    {image.description && (
                      <p className={styles.description}>{image.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
