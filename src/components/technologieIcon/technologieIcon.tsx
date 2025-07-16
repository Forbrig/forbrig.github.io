import { FC, SVGProps } from "react";

import JavascriptIcon from "@/icons/javascript.svg";
import TypescriptIcon from "@/icons/typescript.svg";
import PythonIcon from "@/icons/python.svg";
import HtmlIcon from "@/icons/html.svg";
import CssIcon from "@/icons/css.svg";
import ReactIcon from "@/icons/react.svg";
import NodejsIcon from "@/icons/nodejs.svg";
import JavaIcon from "@/icons/java.svg";
import ScssIcon from "@/icons/scss.svg";
import FlaskIcon from "@/icons/flask.svg";
import CIcon from "@/icons/c.svg";
import CppIcon from "@/icons/cpp.svg";
import ThreejsIcon from "@/icons/threejs.svg";
import NextjsIcon from "@/icons/nextjs.svg";
import ArduinoIcon from "@/icons/arduino.svg";
import HaxeIcon from "@/icons/haxe.svg";
import HaxeflixelIcon from "@/icons/haxeflixel.svg";
import JestIcon from "@/icons/jest.svg";
import GraphqlIcon from "@/icons/graphql.svg";
import VuejsIcon from "@/icons/vuejs.svg";
import JqueryIcon from "@/icons/jquery.svg";
import MongodbIcon from "@/icons/mongodb.svg";
import AwsIcon from "@/icons/aws.svg";
import PhpIcon from "@/icons/php.svg";
import PostgresqlIcon from "@/icons/postgresql.svg";
import RosIcon from "@/icons/ros.svg";

export const technologie_icon_map: Record<
  string,
  FC<SVGProps<SVGSVGElement>>
> = {
  javascript: JavascriptIcon,
  typescript: TypescriptIcon,
  html: HtmlIcon,
  css: CssIcon,
  scss: ScssIcon,
  vuejs: VuejsIcon,
  react: ReactIcon,
  nextjs: NextjsIcon,
  nodejs: NodejsIcon,
  threejs: ThreejsIcon,
  jquery: JqueryIcon,
  jest: JestIcon,
  java: JavaIcon,
  python: PythonIcon,
  flask: FlaskIcon,
  c: CIcon,
  cpp: CppIcon,
  haxe: HaxeIcon,
  haxeflixel: HaxeflixelIcon,
  graphql: GraphqlIcon,
  mongodb: MongodbIcon,
  postgresql: PostgresqlIcon,
  aws: AwsIcon,
  php: PhpIcon,
  arduino: ArduinoIcon,
  ros: RosIcon,
};

interface TechnologieIconProps {
  technologie: string;
  size?: number;
}

export const TechnologieIcon: FC<TechnologieIconProps> = ({
  technologie,
  size = 24,
}) => {
  const IconComponent = technologie_icon_map[technologie.toLowerCase()];

  return IconComponent ? <IconComponent width={size} height={size} /> : null;
};
