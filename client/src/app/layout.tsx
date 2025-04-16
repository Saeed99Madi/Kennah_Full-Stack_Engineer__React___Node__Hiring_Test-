// scrollbar
import "simplebar-react/dist/simplebar.min.css";

// image
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-datepicker/dist/react-datepicker.css";

// ----------------------------------------------------------------------

// theme
import ThemeProvider from "@/theme";
import { primaryFont } from "@/theme/typography";
// components
import ProgressBar from "@/components/progress-bar";
import MotionLazy from "@/components/animate/motion-lazy";
import { SettingsProvider, SettingsDrawer } from "@/components/settings";
// auth
import { AuthProvider, AuthConsumer } from "@/auth/context/jwt";
import { Providers } from "@/components/providers";
import { ReduxProvider } from "@/redux/provider";

// locales
import { LocalizationProvider } from "src/locales";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Kennah - Test",
  description: "Kennah - Test",
  keywords: "ptoDo,Tasks,today,app,react,typescript",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ReduxProvider>
          <Providers>
            <AuthProvider>
              <LocalizationProvider>
                <SettingsProvider
                  defaultSettings={{
                    themeMode: "light",
                    themeDirection: "ltr",
                    themeContrast: "default",
                    themeLayout: "vertical",
                    themeColorPresets: "default",
                    themeStretch: false,
                  }}
                >
                  <ThemeProvider>
                    <MotionLazy>
                      <SettingsDrawer />
                      <ProgressBar />
                      <AuthConsumer>{children}</AuthConsumer>
                    </MotionLazy>
                  </ThemeProvider>
                </SettingsProvider>
              </LocalizationProvider>
            </AuthProvider>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
