"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useTheme } from "@/hooks/useTheme";

import { ThemeControl } from "@/context/ThemeProvider";
import { BACKGROUND_DRAW_INTERVAL } from "@/config/const";

type MatrixFontStyleType = "LATIN" | "HIRAGANA" | "SYMBOLS";

const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_STYLE: MatrixFontStyleType = "LATIN";
const LATIN_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const HIRAGANA_CHARACTERS = "あいうえおかきくけこさしすせそたちつてと";
// https://www.w3schools.com/charsets/ref_utf_symbols.asp
const SYMBOLS_CHARACTERS = "★☆♥♦♣♠•◘○";

export const MatrixBackground = () => {
  const { setThemeControls } = useTheme();

  const cavasRef = useRef<HTMLCanvasElement | null>(null);

  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [characters, setCharacters] = useState(LATIN_CHARACTERS);
  const [fontStyle, setFontStyle] = useState<MatrixFontStyleType>("LATIN");
  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  const handleFontSizeChange = useCallback((value: number) => {
    setFontSize(value);
  }, []);

  const handleFontStyleChange = useCallback((value: string) => {
    setFontStyle(value as MatrixFontStyleType);
  }, []);

  useEffect(() => {
    if (fontStyle === "LATIN") {
      setCharacters(LATIN_CHARACTERS);
    } else if (fontStyle === "HIRAGANA") {
      setCharacters(HIRAGANA_CHARACTERS);
    } else if (fontStyle === "SYMBOLS") {
      setCharacters(SYMBOLS_CHARACTERS);
    }
  }, [fontStyle]);

  const memoizedThemeControls: ThemeControl[] = useMemo(
    () => [
      {
        type: "slider",
        title: "Font Size",
        min: 10,
        max: 30,
        step: 1,
        value: fontSize,
        defaultValue: DEFAULT_FONT_SIZE,
        onChange: handleFontSizeChange as (value: number | string) => void,
      },
      {
        type: "radio",
        title: "Font Style",
        value: fontStyle,
        options: ["LATIN", "HIRAGANA", "SYMBOLS"],
        defaultValue: DEFAULT_FONT_STYLE,
        onChange: handleFontStyleChange as (value: number | string) => void,
      },
    ],
    [fontSize, fontStyle, handleFontSizeChange, handleFontStyleChange]
  );

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

    // const fontSize = 16;
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
  }, [currentWidth, currentHeight, fontSize, characters]);

  return <canvas ref={cavasRef} />;
};
