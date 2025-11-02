"use client";

import {
  COLOR_MODE_ATTRIBUTE,
  COLOR_MODE_DARK_QUERY,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_COLOR_MODE,
  type ColorMode,
} from "../../lib/color-mode";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface ColorModeContextValue {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined,
);

function applyColorMode(mode: ColorMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute(COLOR_MODE_ATTRIBUTE, mode);
  root.style.colorScheme = mode;
}

function readStoredColorMode(): ColorMode {
  if (typeof window === "undefined") return DEFAULT_COLOR_MODE;

  try {
    const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    console.warn("Unable to read color mode from storage", error);
  }

  const media = window.matchMedia(COLOR_MODE_DARK_QUERY);
  return media.matches ? "dark" : DEFAULT_COLOR_MODE;
}

export function ColorModeProvider({ children }: PropsWithChildren) {
  const [colorMode, setColorModeState] = useState<ColorMode>(DEFAULT_COLOR_MODE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const actualMode = readStoredColorMode();
    setColorModeState(actualMode);
    applyColorMode(actualMode);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyColorMode(colorMode);
    try {
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
    } catch (error) {
      console.warn("Unable to persist color mode", error);
    }
  }, [colorMode, mounted]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(COLOR_MODE_DARK_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
      if (!stored) {
        setColorModeState(event.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorModeState((value: ColorMode) =>
      value === "light" ? "dark" : "light",
    );
  }, []);

  const value = useMemo<ColorModeContextValue>(
    () => ({ colorMode, setColorMode, toggleColorMode }),
    [colorMode, setColorMode, toggleColorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}

export function useColorModeValue<T>(lightValue: T, darkValue: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? lightValue : darkValue;
}

export function ClientOnly({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
