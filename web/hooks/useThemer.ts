import { useTheme } from "emotion-theming";
import { ITheme } from "../lib/types";

export const useThemer = () => {
  const theme: ITheme = useTheme();
  return theme;
};
