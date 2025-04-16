"use client";

// import merge from 'lodash/merge';
import { useMemo } from "react";
// @mui
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
// system
import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { customShadows } from "./custom-shadows";
import { componentsOverrides } from "./overrides";
// options
import RTL from "./options/right-to-left";
//
import NextAppDirEmotionCacheProvider from "./next-emotion-cache";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const baseOption = useMemo(
    () => ({
      palette: palette("light"),
      shadows: shadows("light"),
      customShadows: customShadows("light"),
      typography,
      shape: { borderRadius: 8 },
    }),
    [],
  );

  const memoizedValue = useMemo(() => baseOption, [baseOption]);

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = componentsOverrides(theme);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={"ltr"}>
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
