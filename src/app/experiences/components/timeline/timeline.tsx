import { FC } from "react";

import { Experience } from "./components/experience";

import styles from "./timeline.module.scss";

interface TimelineProps {
  experiences: Experience[];
}

export const Timeline: FC<TimelineProps> = ({ experiences }) => {
  return (
    <div className={styles.timeline}>
      {experiences.map((experience, index) => (
        <Experience key={index} experience={experience} />
      ))}
    </div>
  );
};
