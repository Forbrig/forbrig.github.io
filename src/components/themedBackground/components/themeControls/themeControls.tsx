"use client";

import { FC, useContext, useState } from "react";

import { themeContext, ThemeControl } from "@/context/ThemeProvider";

import { Button } from "@/components/button";

import { FaCog } from "react-icons/fa";

import styles from "./themeControls.module.scss";

export const ThemeControls: FC = () => {
  const { themeControls, theme } = useContext(themeContext);

  const [showControls, setShowControls] = useState(false);

  const renderOption = (prop: ThemeControl) => {
    switch (prop.type) {
      case "toggle":
      case "radio":
        if (!prop.options) {
          return null;
        }

        return (
          <>
            <label htmlFor={`${prop.title}-control`}>{prop.title}:</label>

            <div className={styles["radio-group"]}>
              {prop.options.map((option) => (
                <label key={option} className={styles["radio-label"]}>
                  <input
                    type="radio"
                    name={prop.title}
                    value={option}
                    checked={prop.value === option}
                    onChange={() => prop.onChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </>
        );
      case "slider":
        return (
          <>
            <label htmlFor={`${prop.title}-control`}>
              {prop.title}: {prop.value}
            </label>

            <input
              id={`${prop.title}-control`}
              type="range"
              min={prop.min}
              max={prop.max}
              step={prop.step}
              value={prop.value}
              onChange={(e) => prop.onChange(parseFloat(e.target.value))}
              className={styles["slider"]}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div data-hide={theme === "light"} className={styles["theme-controls"]}>
      <div className={styles["controls-toggle"]}>
        <Button
          onClick={() => setShowControls(!showControls)}
          aria-label="Toggle controls"
          rounded
          large
        >
          <FaCog />
        </Button>
      </div>

      {showControls && (
        <div className={styles["controls-panel"]}>
          <h3>Theme Controls</h3>

          {themeControls.map((prop, i) => {
            return (
              <div className={styles["control-group"]} key={i}>
                {renderOption(prop)}
              </div>
            );
          })}

          <div className={styles["reset-button"]}>
            <Button
              onClick={() => {
                themeControls.forEach((prop) =>
                  prop.onChange(prop.defaultValue)
                );
              }}
              large
              full
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
