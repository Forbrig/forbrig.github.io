import { FC } from "react";

import styles from "./button.module.scss";

export type ButtonStyles = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonStyle?: ButtonStyles;
  full?: boolean;
  large?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  buttonStyle = "primary",
  full = false,
  large = false,
  ...props
}) => {
  return (
    <button
      className={styles.button}
      type="button"
      data-style={buttonStyle}
      data-full={full}
      data-large={large}
      {...props}
    >
      {children}
    </button>
  );
};
