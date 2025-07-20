import { FC } from "react";

import styles from "./tag.module.scss";

import { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export const Tag: FC<TagProps> = ({ children }) => {
  return <div className={styles.tag}>{children}</div>;
};
