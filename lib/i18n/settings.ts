export const SUPPORTED_LANGUAGES = ["zh-CN", "zh-TW", "en-US"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const FALLBACK_LANGUAGE: SupportedLanguage = "zh-CN";

export function normalizeLanguage(language?: string | null): SupportedLanguage {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  const normalizedInput = language.trim();
  const lowerInput = normalizedInput.toLowerCase();
  const directMatch = SUPPORTED_LANGUAGES.find(
    (item) => item.toLowerCase() === lowerInput,
  );
  if (directMatch) {
    return directMatch;
  }

  const base = normalizedInput.split(/[._-]/)[0]?.toLowerCase();

  if (base === "zh") {
    if (lowerInput.includes("tw") || lowerInput.includes("hk") || lowerInput.includes("mo")) {
      return SUPPORTED_LANGUAGES.includes("zh-TW") ? "zh-TW" : FALLBACK_LANGUAGE;
    }
    return SUPPORTED_LANGUAGES.includes("zh-CN") ? "zh-CN" : FALLBACK_LANGUAGE;
  }

  if (base === "en") {
    return SUPPORTED_LANGUAGES.includes("en-US") ? "en-US" : FALLBACK_LANGUAGE;
  }

  return FALLBACK_LANGUAGE;
}
