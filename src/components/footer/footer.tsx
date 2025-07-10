import { Button } from "../button";

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
        <Button buttonStyle="ghost">
          <FaGithub size={30} />
        </Button>
      </a>
      <a
        href="https://www.linkedin.com/in/forbrig/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Button buttonStyle="ghost">
          <FaLinkedin size={30} />
        </Button>
      </a>
    </footer>
  );
};
