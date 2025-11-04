"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../lib/i18n/config";
import { normalizeLanguage } from "../lib/i18n/settings";
import { ColorModeProvider } from "../components/ui/color-mode";
import { system } from "../theme";
import { ToasterProvider } from "../components/ui/toaster-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageAttributeSync />
      <ChakraProvider value={system}>
        <ColorModeProvider>
          <ToasterProvider>{children}</ToasterProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}

function LanguageAttributeSync() {
  const { i18n: i18nextInstance } = useTranslation();

  useEffect(() => {
    const applyLanguage = (value: string) => {
      const normalized = normalizeLanguage(value);
      document.documentElement.setAttribute("lang", normalized);
    };

    applyLanguage(i18nextInstance.resolvedLanguage ?? i18nextInstance.language);

    const handleLanguageChanged = (lng: string) => {
      applyLanguage(lng);
    };

    i18nextInstance.on("languageChanged", handleLanguageChanged);

    return () => {
      i18nextInstance.off("languageChanged", handleLanguageChanged);
    };
  }, [i18nextInstance]);

  return null;
}
