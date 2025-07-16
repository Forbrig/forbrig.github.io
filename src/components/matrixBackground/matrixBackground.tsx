"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./matrixBackground.module.scss";

export const MatrixBackground = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentWidth(window.innerWidth);
      setCurrentHeight(window.innerHeight);
    }

    const handleResize = () => {
      if (typeof window === "undefined") return;

      setCurrentWidth(window.innerWidth);
      setCurrentHeight(window.innerHeight);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = cavasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!currentWidth || !currentHeight) return;

    canvas.width = currentWidth;
    canvas.height = currentHeight;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops: number[] = Array.from({ length: columns }, () => 1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Semi-transparent black for fading effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00"; // Green color for the characters
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

    console.log("Matrix background initialized");

    return () => {
      clearInterval(interval);
    };
  }, [currentWidth, currentHeight]);

  return (
    <div className={styles["matrix-background"]}>
      <canvas ref={cavasRef} />
    </div>
  );
};
