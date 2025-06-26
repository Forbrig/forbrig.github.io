import {
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaJava,
} from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { IconType } from "react-icons";

const language_icon_map: Record<string, IconType> = {
  javascript: FaJs,
  typescript: SiTypescript,
  python: FaPython,
  html: FaHtml5,
  css: FaCss3Alt,
  react: FaReact,
  nodejs: FaNodeJs,
  java: FaJava,
};

export const getLanguageIcon = (language: string) => {
  const Icon = language_icon_map[language] || FaGitAlt;
  return (
    <Icon
      key={language}
      title={language}
      size={24}
      style={{ marginRight: 4, verticalAlign: "middle" }}
    />
  );
};
