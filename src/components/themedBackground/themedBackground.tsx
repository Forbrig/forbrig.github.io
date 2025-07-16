"use client";

import { useContext } from "react";

import { themeContext } from "@/context/ThemeProvider";

import { MatrixBackground } from "@/components/matrixBackground";
import { StarsBackground } from "@/components/starsBackground";

export const ThemedBackground = () => {
  const { theme } = useContext(themeContext);

  return (
    <>
      {theme === "matrix" && <MatrixBackground />}
      {theme === "dark" && <StarsBackground />}
    </>
  );
};
