"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { themeContext } from "@/context/ThemeProvider";

import { BACKGROUND_DRAW_INTERVAL } from "@/config/const";

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

const DEFAULT_MAX_STARS = 1000;
const DEFAULT_HUE = 210;
const DEFAULT_SPEED = 10;
const DEFAULT_MAX_STAR_RADIUS = 12;

export const StarsBackground = () => {
  const { setThemeControls } = useContext(themeContext);
  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const [maxStars, setMaxStars] = useState(DEFAULT_MAX_STARS);
  const [hue, setHue] = useState(DEFAULT_HUE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [maxStartRadius, setMaxStartRadius] = useState(DEFAULT_MAX_STAR_RADIUS);

  const starsRef = useRef<Star[]>([]);

  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  // Memoize the onChange callbacks to prevent unnecessary re-renders
  const handleMaxStarsChange = useCallback(
    (value: number) => setMaxStars(value),
    []
  );
  const handleMaxStartRadiusChange = useCallback(
    (value: number) => setMaxStartRadius(value),
    []
  );
  const handleHueChange = useCallback((value: number) => setHue(value), []);
  const handleSpeedChange = useCallback((value: number) => setSpeed(value), []);

  // Memoize the theme controls array
  const memoizedThemeControls = useMemo(
    () => [
      {
        title: "Max Stars",
        min: 100,
        max: 5000,
        step: 100,
        value: maxStars,
        defaultValue: DEFAULT_MAX_STARS,
        onChange: handleMaxStarsChange,
      },
      {
        title: "Max Star Radius",
        min: 1,
        max: 18,
        step: 1,
        value: maxStartRadius,
        defaultValue: DEFAULT_MAX_STAR_RADIUS,
        onChange: handleMaxStartRadiusChange,
      },
      {
        title: "Hue",
        min: 0,
        max: 360,
        step: 1,
        value: hue,
        defaultValue: DEFAULT_HUE,
        onChange: handleHueChange,
      },
      {
        title: "Speed",
        min: -100,
        max: 100,
        step: 1,
        value: speed,
        defaultValue: DEFAULT_SPEED,
        onChange: handleSpeedChange,
      },
    ],
    [
      maxStars,
      maxStartRadius,
      hue,
      speed,
      handleMaxStarsChange,
      handleMaxStartRadiusChange,
      handleHueChange,
      handleSpeedChange,
    ]
  );

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

  // Separate useEffect for theme controls to prevent excessive re-renders
  useEffect(() => {
    setThemeControls(memoizedThemeControls);
  }, [memoizedThemeControls, setThemeControls]);

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
        radius: random(60, orbitRadius) / maxStartRadius,
        orbitX: currentWidth / 2,
        orbitY: currentHeight / 2,
        timePassed: random(0, maxStars),
        // speed: random(1, speed) / 10000,
        // speed: random(-speed, speed) / 10000,
        speed: speed / 10000,
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

    const interval = setInterval(draw, BACKGROUND_DRAW_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [currentWidth, currentHeight, maxStars, maxStartRadius, hue, speed]);

  return (
    <div className={styles["stars-background"]}>
      <canvas ref={cavasRef} />
    </div>
  );
};
