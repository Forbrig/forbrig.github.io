import { FC } from "react";

import styles from "./tag.module.scss";

import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export const Tag: FC<TagProps> = ({ children }) => {
  return <span className={styles.tag}>{children}</span>;
};
