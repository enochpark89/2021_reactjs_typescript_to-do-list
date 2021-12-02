import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    cardBgColor: string;
    
    }
}

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "white",
  accentColor: "#9c88ff",
  cardBgColor: "transparent",
};

