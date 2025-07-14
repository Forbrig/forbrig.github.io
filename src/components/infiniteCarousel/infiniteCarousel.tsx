import { FC } from "react";

import styles from "./infiniteCarousel.module.scss";

interface InfiniteCarouselProps {
  items: React.ReactNode[];
}

export const InfiniteCarousel: FC<InfiniteCarouselProps> = ({ items }) => {
  return (
    <div className={styles.carousel}>
      <div className={styles["carousel-track"]}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className={styles.card}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
