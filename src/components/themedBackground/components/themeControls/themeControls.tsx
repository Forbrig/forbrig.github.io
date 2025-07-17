import { FC, useState } from "react";

import { Button } from "@/components/button";

import { FaCog } from "react-icons/fa";

import styles from "./themeControls.module.scss";

interface ThemeControlsProps {
  props: {
    title: string;
    min: number;
    max: number;
    step: number;
    value: number;
    defaultValue: number;
    onChange: (value: number) => void;
  }[];
}

export const ThemeControls: FC<ThemeControlsProps> = ({ props }) => {
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="theme-controls">
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

          {props.map((prop, i) => (
            <div className={styles["control-group"]} key={i}>
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
            </div>
          ))}

          <div className={styles["reset-button"]}>
            <Button
              onClick={() => {
                props.forEach((prop) => prop.onChange(prop.defaultValue));
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
