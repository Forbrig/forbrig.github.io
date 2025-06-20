import { FaGithub, FaLinkedin } from "react-icons/fa";

import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/Forbrig"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <FaGithub size={30} />
      </a>
      <a
        href="https://www.linkedin.com/in/forbrig/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={30} />
      </a>
    </footer>
  );
};
