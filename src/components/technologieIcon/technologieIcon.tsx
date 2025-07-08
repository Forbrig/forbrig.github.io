import Image from "next/image";
import { FC, useContext } from "react";

import { themeContext } from "@/context/ThemeProvider";

const technologie_icon_map: Record<string, string> = {
  javascript: "/icons/javascript.svg",
  typescript: "/icons/typescript.svg",
  python: "/icons/python.svg",
  html: "/icons/html.svg",
  css: "/icons/css.svg",
  react: "/icons/react.svg",
  nodejs: "/icons/nodejs.svg",
  java: "/icons/java.svg",
  scss: "/icons/scss.svg",
  flask: "/icons/flask.svg",
  c: "/icons/c.svg",
  cpp: "/icons/cpp.svg",
  threejs: "/icons/threejs.svg",
  nextjs: "/icons/nextjs.svg",
  arduino: "/icons/arduino.svg",
  haxe: "/icons/haxe.svg",
  haxeflixel: "/icons/haxeflixel.svg",
  jest: "/icons/jest.svg",
  graphql: "/icons/graphql.svg",
  vuejs: "/icons/vuejs.svg",
  jquery: "/icons/jquery.svg",
  mongodb: "/icons/mongodb.svg",
  aws: "/icons/aws.svg",
  php: "/icons/php.svg",
  postgresql: "/icons/postgresql.svg",
  ros: "/icons/ros.svg",
};

export const TechnologieIcon: FC<{ technologie: string }> = ({
  technologie,
}) => {
  const { theme } = useContext(themeContext);

  const iconPath = technologie_icon_map[technologie.toLowerCase()];

  return (
    iconPath &&
    theme !== "matrix" && (
      <Image
        key={technologie}
        src={iconPath}
        alt={technologie}
        title={technologie}
        width={24}
        height={24}
      />
    )
  );
};
