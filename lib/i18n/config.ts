import i18next, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES, normalizeLanguage } from "./settings";

import zhCNCommon from "./locales/zh-CN/common.json";
import zhCNHeader from "./locales/zh-CN/header.json";
import zhCNHome from "./locales/zh-CN/home.json";
import zhCNFooter from "./locales/zh-CN/footer.json";
import zhCNDownload from "./locales/zh-CN/download.json";

import zhTWCommon from "./locales/zh-TW/common.json";
import zhTWHeader from "./locales/zh-TW/header.json";
import zhTWHome from "./locales/zh-TW/home.json";
import zhTWFooter from "./locales/zh-TW/footer.json";
import zhTWDownload from "./locales/zh-TW/download.json";

import enUSCommon from "./locales/en-US/common.json";
import enUSHeader from "./locales/en-US/header.json";
import enUSHome from "./locales/en-US/home.json";
import enUSFooter from "./locales/en-US/footer.json";
import enUSDownload from "./locales/en-US/download.json";

const resources: Resource = {
  "zh-CN": {
    common: zhCNCommon,
    header: zhCNHeader,
    home: zhCNHome,
    footer: zhCNFooter,
    download: zhCNDownload
  },
  "zh-TW": {
    common: zhTWCommon,
    header: zhTWHeader,
    home: zhTWHome,
    footer: zhTWFooter,
    download: zhTWDownload
  },
  "en-US": {
    common: enUSCommon,
    header: enUSHeader,
    home: enUSHome,
    footer: enUSFooter,
    download: enUSDownload
  }
};

if (!i18next.isInitialized) {
  if (typeof window !== "undefined") {
    i18next.use(LanguageDetector);
  }

  i18next.use(initReactI18next).init({
    resources,
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    defaultNS: "common",
    ns: ["common", "header", "home", "footer", "download"],
    interpolation: {
      escapeValue: false
    },
    returnNull: false,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      convertDetectedLanguage: normalizeLanguage
    },
    react: {
      useSuspense: false
    }
  });
}

export default i18next;
