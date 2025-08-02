import { FC, useContext, useState } from "react";
import Image from "next/image";

import { themeContext } from "@/context/ThemeProvider";

import { FaCalendar, FaExternalLinkAlt } from "react-icons/fa";
import { Tag } from "@/components/tag";
import { TechnologieIcon } from "@/components/technologieIcon";
import { Button } from "@/components/button";

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
  const { theme } = useContext(themeContext);

  const [showImages, setShowImages] = useState(false);

  return (
    <div className={styles.experience}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles["title-and-date"]}>
            <h2 className={styles.title}>{experience.title}</h2>
            <p className={styles.date}>
              <FaCalendar /> {experience.date}
            </p>
          </div>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={experience.links?.[0]?.url}
          >
            <Button
              buttonStyle={"ghost"}
              disabled={!experience.links?.[0]?.url}
            >
              <FaBriefcase size={14} /> {experience.company}
              {experience.links?.[0]?.url && <FaExternalLinkAlt size={14} />}
            </Button>
          </a>

          <div className={styles.technologies}>
            {experience.technologies.map((tech, index) => (
              <Tag key={index}>
                {theme !== "matrix" && <TechnologieIcon technologie={tech} />}
                {tech}
              </Tag>
            ))}
          </div>
        </div>

        <div className={styles.description}>
          {experience.description}

          <div className={styles.footer}>
            {experience.images && (
              <Button
                onClick={() => setShowImages((prev) => !prev)}
                type="button"
                buttonStyle="secondary"
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
              </Button>
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
