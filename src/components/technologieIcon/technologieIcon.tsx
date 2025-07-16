import { FC } from "react";
import Image from "next/image";

export const technologie_icon_map: Record<string, string> = {
  javascript: "/icons/javascript.svg",
  typescript: "/icons/typescript.svg",
  html: "/icons/html.svg",
  css: "/icons/css.svg",
  scss: "/icons/scss.svg",
  vuejs: "/icons/vuejs.svg",
  react: "/icons/react.svg",
  nextjs: "/icons/nextjs.svg",
  nodejs: "/icons/nodejs.svg",
  threejs: "/icons/threejs.svg",
  jquery: "/icons/jquery.svg",
  jest: "/icons/jest.svg",
  java: "/icons/java.svg",
  python: "/icons/python.svg",
  flask: "/icons/flask.svg",
  c: "/icons/c.svg",
  cpp: "/icons/cpp.svg",
  arduino: "/icons/arduino.svg",
  haxe: "/icons/haxe.svg",
  haxeflixel: "/icons/haxeflixel.svg",
  graphql: "/icons/graphql.svg",
  mongodb: "/icons/mongodb.svg",
  aws: "/icons/aws.svg",
  php: "/icons/php.svg",
  postgresql: "/icons/postgresql.svg",
  ros: "/icons/ros.svg",
  django: "/icons/django.svg",
  mysql: "/icons/mysql.svg",
  pygame: "/icons/pygame.svg",
  storybook: "/icons/storybook.svg",
  vercel: "/icons/vercel.svg",
};

interface TechnologieIconProps {
  technologie: string;
  size?: number;
}

export const TechnologieIcon: FC<TechnologieIconProps> = ({
  technologie,
  size = 24,
}) => {
  const iconPath = technologie_icon_map[technologie.toLowerCase()];

  if (!iconPath) {
    return null;
  }

  return (
    <Image
      src={iconPath}
      alt={`${technologie} icon`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
};
