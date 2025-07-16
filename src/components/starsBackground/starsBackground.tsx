"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./starsBackground.module.scss";

interface Star {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;
  draw: () => void;
}

export const StarsBackground = () => {
  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const maxStars = 1000;
  const hue = 210;
  const speed = 0.0001;

  const starsRef = useRef<Star[]>([]);

  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  const maxOrbit = (width: number, height: number) => {
    const max = Math.max(width, height),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  };

  const random = (min: number, max: number) => {
    if (min > max) {
      const hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

    // Clear previous stars
    starsRef.current = [];

    const createStar = (): Star => {
      const orbitRadius = random(0, maxOrbit(currentWidth, currentHeight));

      const star = {
        orbitRadius: orbitRadius,
        radius: random(60, orbitRadius) / 12,
        orbitX: currentWidth / 2,
        orbitY: currentHeight / 2,
        timePassed: random(0, maxStars),
        speed: speed,
        alpha: random(2, 10) / 10,
        draw: function () {
          const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
          const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
          const twinkle = random(0, 10);

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
          }

          if (!ctx) return;

          ctx.globalAlpha = this.alpha;

          // Create a radial gradient for the star
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
          gradient.addColorStop(0, "#fff");
          gradient.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
          gradient.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
          gradient.addColorStop(1, "transparent");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, this.radius, 0, Math.PI * 2);
          ctx.fill();

          this.timePassed += this.speed;
        },
      };

      return star;
    };

    for (let i = 0; i < maxStars; i++) {
      starsRef.current.push(createStar());
    }

    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "#00001bff"; // Background
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Semi-transparent black for fading effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0, l = starsRef.current.length; i < l; i++) {
        starsRef.current[i]?.draw();
      }
    };

    console.log("Stars background initialized");

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
    };
  }, [currentWidth, currentHeight]);

  return (
    <div className={styles["stars-background"]}>
      <canvas ref={cavasRef} />
    </div>
  );
};
