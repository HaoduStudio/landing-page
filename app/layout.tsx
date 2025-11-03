import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import {
  COLOR_MODE_ATTRIBUTE,
  COLOR_MODE_DARK_QUERY,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_COLOR_MODE,
} from "../lib/color-mode";

const colorModeInitializer = `(function () {
  const root = document.documentElement;
  const storageKey = ${JSON.stringify(COLOR_MODE_STORAGE_KEY)};
  const attribute = ${JSON.stringify(COLOR_MODE_ATTRIBUTE)};
  const defaultMode = ${JSON.stringify(DEFAULT_COLOR_MODE)};
  try {
    const stored = window.localStorage.getItem(storageKey);
    let mode = stored === "light" || stored === "dark" ? stored : null;
    if (!mode) {
      const mql = window.matchMedia(${JSON.stringify(COLOR_MODE_DARK_QUERY)});
      mode = mql.matches ? "dark" : defaultMode;
    }
    root.setAttribute(attribute, mode);
    root.style.colorScheme = mode;
  } catch (error) {
    root.setAttribute(attribute, defaultMode);
    root.style.colorScheme = defaultMode;
  }
})();`;

export const metadata: Metadata = {
  title: "DailyNotes",
  description: "The new generation note-taking application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: colorModeInitializer }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
