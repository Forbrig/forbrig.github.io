"use client";

import { FC, useContext, useEffect, useState } from "react";

import { themeContext, ThemeControl } from "@/context/ThemeProvider";

import { Button } from "@/components/button";
import { RadioButton } from "@/components/radio";
import { Slider } from "@/components/slider";

import { FaCog } from "react-icons/fa";

import styles from "./themeControls.module.scss";

const HIDE_CONTROLS_DELAY = 5000; // 5 seconds

export const ThemeControls: FC = () => {
  const { themeControls, theme, focusBackground, setFocusBackground } =
    useContext(themeContext);

  const [showControls, setShowControls] = useState(true);
  const [showControlsPannel, setShowControlsPannel] = useState(false);

  const handleToggleControls = () => {
    setShowControlsPannel(!showControlsPannel);
  };

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const resetHideTimer = () => {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setShowControls(false);
        setShowControlsPannel(false);
      }, HIDE_CONTROLS_DELAY);
    };

    const handleMouseMove = () => {
      if (!showControls) {
        setShowControls(true);
      }
      resetHideTimer();
    };

    // Start the initial timer
    resetHideTimer();

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimeout);
    };
  }, [showControls]);

  const renderOption = (prop: ThemeControl) => {
    switch (prop.type) {
      case "toggle":
      case "radio":
        if (!prop.options) {
          return null;
        }

        return (
          <>
            <label className={styles.title} htmlFor={`${prop.title}-control`}>
              {prop.title}:
            </label>

            <RadioButton
              options={prop.options.map((option) => ({
                label: option,
                value: option,
              }))}
              selectedValue={prop.value}
              onChange={prop.onChange}
            />
          </>
        );
      case "slider":
        if (prop.min == null || prop.max == null || prop.step == null) {
          return null;
        }

        return (
          <>
            <label className={styles.title} htmlFor={`${prop.title}-control`}>
              {prop.title}: {prop.value}
            </label>

            <Slider
              title={prop.title}
              min={prop.min}
              max={prop.max}
              step={prop.step}
              value={prop.value as number}
              onChange={prop.onChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-hide={theme === "light" || !showControls}
      className={styles["theme-controls"]}
    >
      <div className={styles["controls-toggle"]}>
        <Button
          onClick={handleToggleControls}
          aria-label="Toggle controls"
          rounded
          large
        >
          <FaCog />
        </Button>
      </div>

      <div className={styles["controls-panel"]} data-hide={!showControlsPannel}>
        <h3>Theme Controls</h3>

        {themeControls.map((prop, i) => {
          return (
            <div className={styles["control-group"]} key={i}>
              {renderOption(prop)}
            </div>
          );
        })}

        <div className={styles.actions}>
          <Button
            onClick={() => {
              themeControls.forEach((prop) => prop.onChange(prop.defaultValue));
            }}
            large
            full
          >
            Reset to Defaults
          </Button>
          <Button
            onClick={() => setFocusBackground(!focusBackground)}
            large
            full
          >
            Focus Background
          </Button>
        </div>
      </div>
    </div>
  );
};
