import { FC, useContext, useState } from "react";
import Image from "next/image";

import { themeContext } from "@/context/ThemeProvider";

import { FaCalendar, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Tag } from "@/components/tag";
import { TechnologieIcon } from "@/components/technologieIcon";
import { Button } from "@/components/button";

import { FaBriefcase, FaImages, FaArrowUpRightFromSquare } from "react-icons/fa6";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const hasImages = experience.images && experience.images.length > 0;
  const primaryImage = hasImages ? experience.images[0] : null;

  return (
    <article className={styles.experience}>
      <div className={styles.card}>
        {/* Hero Section */}
        <div className={styles.hero}>
          {primaryImage && (
            <div className={styles.heroImage}>
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt || experience.title}
                fill
                className={styles.heroImg}
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className={styles.heroOverlay} />
            </div>
          )}
          
          <div className={styles.heroContent}>
            <div className={styles.heroHeader}>
              <div className={styles.titleGroup}>
                <h2 className={styles.title}>{experience.title}</h2>
                <div className={styles.companyRow}>
                  <div className={styles.companyInfo}>
                    <FaBriefcase size={14} />
                    <span className={styles.company}>{experience.company}</span>
                  </div>
                  {experience.links?.[0]?.url && (
                    <a
                      href={experience.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                      title={`Visit ${experience.company}`}
                    >
                      <FaArrowUpRightFromSquare size={14} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className={styles.dateBadge}>
                <FaCalendar size={12} />
                <span>{experience.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.description}>
            <p>{experience.description}</p>
          </div>

          <div className={styles.technologies}>
            <h3 className={styles.techTitle}>Technologies</h3>
            <div className={styles.techGrid}>
              {experience.technologies.map((tech, index) => (
                <Tag key={index}>
                  {theme !== "matrix" && <TechnologieIcon technologie={tech} />}
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {/* Image Gallery Preview */}
          {hasImages && experience.images!.length > 1 && (
            <div className={styles.galleryPreview}>
              <div className={styles.previewHeader}>
                <div className={styles.previewTitle}>
                  <FaImages size={16} />
                  <span>Project Gallery ({experience.images!.length} images)</span>
                </div>
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  buttonStyle="secondary"
                  className={styles.expandButton}
                >
                  {isExpanded ? (
                    <>
                      Hide Gallery <FaChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      View All <FaChevronDown size={14} />
                    </>
                  )}
                </Button>
              </div>
              
              <div className={styles.previewGrid}>
                {experience.images!.slice(1, 4).map((image, index) => (
                  <div
                    key={index}
                    className={styles.previewItem}
                    onClick={() => setSelectedImage(index + 1)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || `${experience.title} - Image ${index + 2}`}
                      fill
                      className={styles.previewImg}
                      style={{ objectFit: 'cover' }}
                    />
                    {index === 2 && experience.images!.length > 4 && (
                      <div className={styles.moreOverlay}>
                        <span>+{experience.images!.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Expanded Gallery */}
        {isExpanded && hasImages && (
          <div className={styles.expandedGallery}>
            <div className={styles.galleryGrid}>
              {experience.images!.map((image, index) => (
                <div
                  key={index}
                  className={styles.galleryItem}
                  onClick={() => setSelectedImage(selectedImage === index ? null : index)}
                >
                  <div className={styles.galleryImageWrapper}>
                    <Image
                      src={image.src}
                      alt={image.alt || `${experience.title} - Image ${index + 1}`}
                      fill
                      className={styles.galleryImg}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {image.description && (
                    <div className={styles.imageCaption}>
                      <p>{image.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage !== null && hasImages && (
          <div className={styles.modal} onClick={() => setSelectedImage(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.modalClose}
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
              >
                ×
              </button>
              <div className={styles.modalImage}>
                <Image
                  src={experience.images![selectedImage].src}
                  alt={experience.images![selectedImage].alt || experience.title}
                  fill
                  className={styles.modalImg}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {experience.images![selectedImage].description && (
                <div className={styles.modalCaption}>
                  <p>{experience.images![selectedImage].description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};