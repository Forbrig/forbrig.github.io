"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { themeContext, ThemeControl } from "@/context/ThemeProvider";

import { BACKGROUND_DRAW_INTERVAL } from "@/config/const";

interface Star {
  orbitRadius: number;
  radius: number;
  x: number;
  y: number;
  z: number;
  timePassed: number;
  rotationSpeed: number;
  alpha: number;
  draw: () => void;
}

const DEFAULT_MAX_STARS = 1000;
const DEFAULT_HUE = 210;
const DEFAULT_ROTATION_SPEED = 10;
const DEFAULT_MAX_STAR_RADIUS = 12;

export const StarsBackground = () => {
  const { setThemeControls } = useContext(themeContext);
  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const [maxStars, setMaxStars] = useState(DEFAULT_MAX_STARS);
  const [hue, setHue] = useState(DEFAULT_HUE);
  const [rotationSpeed, setRotationSpeed] = useState(DEFAULT_ROTATION_SPEED);
  const [maxStartRadius, setMaxStartRadius] = useState(DEFAULT_MAX_STAR_RADIUS);
  // const [warpSpeed, setWarpSpeed] = useState(0.1);

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
  const handleSpeedChange = useCallback(
    (value: number) => setRotationSpeed(value),
    []
  );

  // Memoize the theme controls array
  const memoizedThemeControls: ThemeControl[] = useMemo(
    () => [
      {
        type: "slider",
        title: "Max Stars",
        min: 100,
        max: 5000,
        step: 100,
        value: maxStars,
        defaultValue: DEFAULT_MAX_STARS,
        onChange: handleMaxStarsChange as (value: number | string) => void,
      },
      {
        type: "slider",
        title: "Max Star Radius",
        min: 1,
        max: 18,
        step: 1,
        value: maxStartRadius,
        defaultValue: DEFAULT_MAX_STAR_RADIUS,
        onChange: handleMaxStartRadiusChange as (
          value: number | string
        ) => void,
      },
      {
        type: "slider",
        title: "Hue",
        min: 0,
        max: 360,
        step: 1,
        value: hue,
        defaultValue: DEFAULT_HUE,
        onChange: handleHueChange as (value: number | string) => void,
      },
      {
        type: "slider",
        title: "Rotation Speed",
        min: -100,
        max: 100,
        step: 1,
        value: rotationSpeed,
        defaultValue: DEFAULT_ROTATION_SPEED,
        onChange: handleSpeedChange as (value: number | string) => void,
      },
    ],
    [
      maxStars,
      maxStartRadius,
      hue,
      rotationSpeed,
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
        x: currentWidth / 2,
        y: currentHeight / 2,
        z: random(0, 1000), // Adding z for potential 3D effects
        timePassed: random(0, maxStars),
        // rotationSpeed: random(1, rotationSpeed) / 10000,
        // rotationSpeed: random(-rotationSpeed, rotationSpeed) / 10000,
        rotationSpeed: rotationSpeed / 10000,
        alpha: random(2, 10) / 10,
        draw: function () {
          // this.z -= warpSpeed * 20;

          // if (this.z <= 0) {
          //   this.x = (Math.random() - 0.5) * 2000;
          //   this.y = (Math.random() - 0.5) * 2000;
          //   this.z = 1000;
          // }

          const x = Math.sin(this.timePassed) * this.orbitRadius + this.x;
          const y = Math.cos(this.timePassed) * this.orbitRadius + this.y;

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

          this.timePassed += this.rotationSpeed;
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
  }, [
    currentWidth,
    currentHeight,
    maxStars,
    maxStartRadius,
    hue,
    rotationSpeed,
  ]);

  return <canvas ref={cavasRef} />;
};
