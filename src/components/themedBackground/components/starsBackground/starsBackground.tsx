"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useTheme } from "@/hooks/useTheme";

import { ThemeControl } from "@/context/ThemeProvider";

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
const DEFAULT_WARP_SPEED = 0;

export const StarsBackground = () => {
  const { setThemeControls } = useTheme();
  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const [maxStars, setMaxStars] = useState(DEFAULT_MAX_STARS);
  const [hue, setHue] = useState(DEFAULT_HUE);
  const [rotationSpeed, setRotationSpeed] = useState(DEFAULT_ROTATION_SPEED);
  const [warpSpeed, setWarpSpeed] = useState(0);

  const starsRef = useRef<Star[]>([]);

  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  // Memoize the onChange callbacks to prevent unnecessary re-renders
  const handleMaxStarsChange = useCallback(
    (value: number) => setMaxStars(value),
    []
  );
  const handleHueChange = useCallback((value: number) => setHue(value), []);
  const handleSpeedChange = useCallback(
    (value: number) => setRotationSpeed(value),
    []
  );
  const handleWarpSpeedChange = useCallback(
    (value: number) => setWarpSpeed(value),
    []
  );

  // Memoize the theme controls array
  const memoizedThemeControls: ThemeControl[] = useMemo(
    () => [
      {
        type: "slider",
        title: "Max Stars",
        min: 100,
        max: 2000,
        step: 100,
        value: maxStars,
        defaultValue: DEFAULT_MAX_STARS,
        onChange: handleMaxStarsChange as (value: number | string) => void,
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
      {
        type: "slider",
        title: "Warp Speed",
        min: 0,
        max: 50,
        step: 1,
        value: warpSpeed,
        defaultValue: DEFAULT_WARP_SPEED,
        onChange: handleWarpSpeedChange as (value: number | string) => void,
      },
    ],
    [
      maxStars,
      hue,
      rotationSpeed,
      warpSpeed,
      handleMaxStarsChange,
      handleHueChange,
      handleSpeedChange,
      handleWarpSpeedChange,
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
      const orbitRadius = random(10, maxOrbit(currentWidth, currentHeight));

      const star = {
        orbitRadius: orbitRadius,
        radius: random(60, orbitRadius) / 10,
        x: (Math.random() - 0.5) * 2000, // Initial 3D position
        y: (Math.random() - 0.5) * 2000,
        z: random(500, 1500), // Start further back
        timePassed: random(0, maxStars),
        rotationSpeed: rotationSpeed / 10000,
        alpha: random(2, 10) / 10,
        draw: function () {
          this.timePassed += this.rotationSpeed;

          // Move star towards viewer during warp
          if (warpSpeed > 0) {
            this.z -= warpSpeed;
            if (this.z <= 1) {
              this.x = (Math.random() - 0.5) * 2000;
              this.y = (Math.random() - 0.5) * 2000;
              this.z = random(500, 1500);
            }
          }

          // Calculate final position (orbital or 3D based on warp speed)
          let finalX, finalY, starSize;

          if (warpSpeed > 0) {
            // 3D projection with rotation
            const rotatedX =
              this.x * Math.cos(this.timePassed) -
              this.y * Math.sin(this.timePassed);
            const rotatedY =
              this.x * Math.sin(this.timePassed) +
              this.y * Math.cos(this.timePassed);

            finalX = (rotatedX * 200) / this.z + currentWidth / 2;
            finalY = (rotatedY * 200) / this.z + currentHeight / 2;
            starSize = (this.radius * 200) / this.z;
          } else {
            // Original orbital animation
            finalX =
              Math.sin(this.timePassed) * this.orbitRadius + currentWidth / 2;
            finalY =
              Math.cos(this.timePassed) * this.orbitRadius + currentHeight / 2;

            starSize = this.radius;
          }

          // Skip rendering if star is outside viewport or too small
          if (starSize < 4) {
            return;
          }

          // Skip rendering if too transparent
          if (this.alpha < 0.01) return;

          // Twinkle effect
          const twinkle = random(0, 10);
          if (twinkle === 1 && this.alpha > 0) this.alpha -= 0.05;
          else if (twinkle === 2 && this.alpha < 1) this.alpha += 0.05;

          ctx.globalAlpha = this.alpha;

          // Draw star with gradient
          const gradient = ctx.createRadialGradient(
            finalX,
            finalY,
            0,
            finalX,
            finalY,
            starSize
          );
          gradient.addColorStop(0, "#fff");
          gradient.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
          gradient.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
          gradient.addColorStop(1, "transparent");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, starSize, 0, Math.PI * 2);
          ctx.fill();
        },
      };

      return star;
    };

    for (let i = 0; i < maxStars; i++) {
      starsRef.current.push(createStar());
    }

    const draw = () => {
      // Throttle to desired FPS (e.g., 60fps = 16.67ms)

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = "#00001b"; // Background
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Semi-transparent black for fading effect
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0, l = starsRef.current.length; i < l; i++) {
        starsRef.current[i]?.draw();
      }
    };

    let animationId: number;
    let lastTime = 0;

    // Use a frame-based approach to control the drawing frequency
    // This allows for smoother animations and better performance
    const drawFrame = (currentTime: number) => {
      if (currentTime - lastTime >= BACKGROUND_DRAW_INTERVAL) {
        draw();

        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(drawFrame);
    };

    animationId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentWidth, currentHeight, maxStars, hue, rotationSpeed, warpSpeed]);

  return <canvas ref={cavasRef} />;
};
