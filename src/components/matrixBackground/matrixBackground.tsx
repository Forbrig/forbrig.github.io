"use client";

import { useContext, useEffect, useRef, useState } from "react";

import styles from "./matrixBackground.module.scss";
import { themeContext } from "@/context/ThemeProvider";

export const MatrixBackground = () => {
  const { theme } = useContext(themeContext);

  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

  useEffect(() => {
    const canvas = cavasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops: number[] = Array.from({ length: columns }, () => 1);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Semi-transparent black for fading effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Green color for the characters
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
      setCurrentHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [theme, currentWidth, currentHeight]);

  if (theme !== "matrix") {
    return null;
  }

  return (
    <div className={styles["matrix-background"]}>
      <canvas ref={cavasRef} />
    </div>
  );
};
