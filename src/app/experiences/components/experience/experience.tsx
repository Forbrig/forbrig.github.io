import { FC, useContext, useState } from "react";
import Image from "next/image";

import { themeContext } from "@/context/ThemeProvider";

import { FaCalendar, FaExternalLinkAlt } from "react-icons/fa";
import { Tag } from "@/components/tag";
import { TechnologieIcon } from "@/components/technologieIcon";
import { Button } from "@/components/button";

import { FaAnglesDown, FaAnglesUp, FaBriefcase, FaImages } from "react-icons/fa6";

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
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerTop}>
            <div className={styles.titleSection}>
              <h2 className={styles.title}>{experience.title}</h2>
              <div className={styles.companyInfo}>
                <FaBriefcase size={16} />
                <span className={styles.company}>{experience.company}</span>
                {experience.links?.[0]?.url && (
                  <a
                    href={experience.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.companyLink}
                  >
                    <FaExternalLinkAlt size={12} />
                  </a>
                )}
              </div>
            </div>
            <div className={styles.dateSection}>
              <FaCalendar size={14} />
              <span className={styles.date}>{experience.date}</span>
            </div>
          </div>
          
          <div className={styles.technologies}>
            {experience.technologies.map((tech, index) => (
              <Tag key={index}>
                {theme !== "matrix" && <TechnologieIcon technologie={tech} />}
                {tech}
              </Tag>
            ))}
          </div>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.mainContent}>
            <p className={styles.description}>{experience.description}</p>
            
            {experience.images && experience.images.length > 0 && (
              <div className={styles.imagePreview}>
                <div className={styles.previewImages}>
                  {experience.images.slice(0, 2).map((image, i) => (
                    <div key={i} className={styles.previewImageContainer}>
                      <Image
                        src={image.src}
                        alt={image.alt ?? experience.title}
                        width={120}
                        height={80}
                        className={styles.previewImage}
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {experience.images.length > 2 && (
                    <div className={styles.moreImages}>
                      <FaImages size={20} />
                      <span>+{experience.images.length - 2}</span>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => setShowImages((prev) => !prev)}
                  type="button"
                  buttonStyle="secondary"
                  className={styles.galleryButton}
                >
                  <FaImages size={16} />
                  {showImages ? "Hide Gallery" : "View Gallery"}
                  {showImages ? <FaAnglesUp size={14} /> : <FaAnglesDown size={14} />}
                </Button>
              </div>
            )}
          </div>
        </div>

        {experience.images && showImages && (
          <div className={styles.gallery}>
            <div className={styles.galleryHeader}>
              <h3>Project Gallery</h3>
              <Button
                onClick={() => setShowImages(false)}
                buttonStyle="ghost"
                className={styles.closeGallery}
              >
                <FaAnglesUp size={16} />
              </Button>
            </div>
            <div className={styles.galleryGrid}>
              {experience.images.map((image, i) => (
                <div key={i} className={styles.galleryItem}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={image.src}
                      alt={image.alt ?? experience.title}
                      width={400}
                      height={250}
                      className={styles.galleryImage}
                      loading="lazy"
                    />
                  </div>
                  {image.description && (
                    <p className={styles.imageDescription}>{image.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
