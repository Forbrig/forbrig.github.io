import { FC } from "react";

import styles from "./radioButton.module.scss";

interface RadioButtonProps {
  options: {
    label: string | number;
    value: string | number;
  }[];
  selectedValue?: string | number;
  onChange: (value: string | number) => void;
}

export const RadioButton: FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className={styles["radio-group"]}>
      {options.map((option, i) => (
        <label key={i} className={styles["radio-label"]}>
          <input
            type="radio"
            name={option.label.toString()}
            value={option.value}
            checked={option.value === selectedValue}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};
