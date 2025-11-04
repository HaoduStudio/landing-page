import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import {
  COLOR_MODE_ATTRIBUTE,
  COLOR_MODE_DARK_QUERY,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_COLOR_MODE,
} from "../lib/color-mode";
import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from "../lib/i18n/settings";

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

const languageInitializer = `(function () {
  var root = document.documentElement;
  var storageKey = "i18nextLng";
  var fallback = ${JSON.stringify(FALLBACK_LANGUAGE)};
  var supported = ${JSON.stringify([...SUPPORTED_LANGUAGES])};

  function normalize(code) {
    if (!code) {
      return fallback;
    }

    var trimmed = String(code).trim();
    var lower = trimmed.toLowerCase();

    for (var i = 0; i < supported.length; i++) {
      if (supported[i].toLowerCase() === lower) {
        return supported[i];
      }
    }

    var base = lower.split(/[_-]/)[0];

    if (base === "zh") {
      if (lower.includes("tw") || lower.includes("hk") || lower.includes("mo")) {
        return supported.indexOf("zh-TW") !== -1 ? "zh-TW" : fallback;
      }
      return supported.indexOf("zh-CN") !== -1 ? "zh-CN" : fallback;
    }

    if (base === "en") {
      return supported.indexOf("en-US") !== -1 ? "en-US" : fallback;
    }

    return fallback;
  }

  try {
    var stored = null;
    if (typeof window !== "undefined" && window.localStorage) {
      stored = window.localStorage.getItem(storageKey);
    }

    var candidate = stored && stored.trim() ? stored : null;

    if (!candidate && typeof navigator !== "undefined") {
      var navList = Array.isArray(navigator.languages)
        ? navigator.languages
        : (navigator.language ? [navigator.language] : []);
      if (navList.length > 0) {
        candidate = navList[0];
      }
    }

    var resolved = normalize(candidate);
    root.setAttribute("lang", resolved);
  } catch (error) {
    root.setAttribute("lang", fallback);
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
    <html lang={FALLBACK_LANGUAGE} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: languageInitializer }}
        />
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
