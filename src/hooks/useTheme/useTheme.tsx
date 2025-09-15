import { themeContext, ThemeContextProps } from "@/context/ThemeProvider";
import { useContext } from "react";

export const useTheme = (): ThemeContextProps => {
  const theme = useContext(themeContext);

  return theme;
};
