import { gamingTheme } from "./gaming";
import { foodsTheme } from "./foods";
import { codeTheme } from "./code";
import { daTheme } from "./da";

export const themes = {
  gaming: gamingTheme,
  foods: foodsTheme,
  code: codeTheme,
  da: daTheme,
};

export type ThemeName = keyof typeof themes;
