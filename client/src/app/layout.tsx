// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';
import "react-datepicker/dist/react-datepicker.css";

// ----------------------------------------------------------------------

// theme
import ThemeProvider from '@/theme';
import { primaryFont } from '@/theme/typography';
// components
import ProgressBar from '@/components/progress-bar';
import MotionLazy from '@/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from '@/components/settings';
// auth
import { AuthProvider, AuthConsumer } from '@/auth/context/jwt';
import { Providers } from '@/components/providers';
import { ReduxProvider } from '@/redux/provider';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'YOUR PASS',
  description: 'YOUR PASS - Your secure password and identity management solution',
  keywords: 'password,security,identity,management,authentication',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
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
      </head>
      <body>
        <ReduxProvider>
          <Providers>
              <AuthProvider>
                  <SettingsProvider
                    defaultSettings={{
                      themeMode: 'light', // 'light' | 'dark'
                      themeDirection: 'ltr', //  'rtl' | 'ltr'
                      themeContrast: 'default', // 'default' | 'bold'
                      themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                      themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
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
              </AuthProvider>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
