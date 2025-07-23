import { FC } from "react";

import styles from "./slider.module.scss";

interface SliderProps {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  title,
  max,
  min,
  step,
  value,
  onChange,
}) => {
  return (
    <input
      id={`${title}-control`}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={styles["slider"]}
    />
  );
};
