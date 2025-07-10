"use client";

import { Button } from "@/components/button";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { FaRegComments } from "react-icons/fa";

import styles from "./contact.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.contact}>
      <div className={styles.header}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          Have a project in mind or want to collaborate? I&apos;d love to hear
          from you!
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h2>Let&apos;s Connect</h2>
          <p>
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just having a chat about technology and development.
          </p>

          <div className={styles.availability}>
            <h3>Availability</h3>
            <p>
              Currently open to freelance projects and full-time opportunities.
            </p>
          </div>
        </div>

        <div className={styles.contacts}>
          <h2>
            <FaRegComments /> Medias
          </h2>

          <div className={styles.contactMethods}>
            <a href="mailto:vitorforbrig@gmail.com">
              <Button buttonStyle="secondary" full large>
                <FaEnvelope size={24} /> vitorforbrig@gmail.com
              </Button>
            </a>

            <a href="https://www.linkedin.com/in/forbrig/" target="_blank">
              <Button buttonStyle="secondary" full large>
                <FaLinkedin size={24} /> linkedin.com/in/forbrig
              </Button>
            </a>

            <a href="https://github.com/forbrig" target="_blank">
              <Button buttonStyle="secondary" full large>
                <FaGithub size={24} /> github.com/forbrig
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
