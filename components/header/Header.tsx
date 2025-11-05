"use client";

import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import {
  Alert,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useColorMode,
  useColorModeValue,
} from "../ui/color-mode";
import { Atom, Check, Download, HelpCircle, Languages, Menu as MenuIcon, Moon, Sun } from "lucide-react";
import { shouldShowAlert, dismissAlert } from "../../lib/alert-visibility";
import { useToaster } from "../ui/toaster-provider";
import {
  normalizeLanguage,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../../lib/i18n/settings";

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
}

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation("common");
  const baseBg = useColorModeValue(
    "rgba(248, 250, 252, 0.96)",
    "rgba(11, 17, 32, 0.95)",
  );
  const hoverBg = useColorModeValue(
    "rgba(248, 250, 252, 0.75)",
    "rgba(15, 23, 42, 0.75)",
  );
  const borderColor = useColorModeValue("#cbd5f5", "#1f2a44");
  const textColor = useColorModeValue("#0f172a", "#e2e8f0");
  const buttonHoverBg = useColorModeValue(
    "rgba(148, 163, 184, 0.15)",
    "rgba(148, 163, 184, 0.2)",
  );
  const buttonActiveBg = useColorModeValue(
    "rgba(59, 130, 246, 0.15)",
    "rgba(56, 189, 248, 0.2)",
  );

  return (
    <Box
      as="header"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={isHovered ? hoverBg : baseBg}
      color={textColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      transition="background 0.3s ease, backdrop-filter 0.3s ease"
      backdropFilter={isHovered ? "blur(16px)" : "none"}
      boxShadow={isHovered ? "sm" : "xs"}
      px={{ base: 4, md: 8 }}
      py={{ base: 3, md: 4 }}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      width="full"
    >
      <Flex align="center" justify="space-between" gap={6}>
        <HStack gap={{ base: 2, md: 3 }}>
          <Link href="/">
            <Flex align="center" gap={{ base: 1.5, md: 2 }} _hover={{ opacity: 0.8 }} transition="opacity 0.2s" cursor="pointer">
              <Image
                src="/images/LOGO.png"
                alt="DailyNotes Logo"
                width={32}
                height={32}
                priority
                style={{ 
                  height: "auto",
                  width: "auto",
                  maxWidth: "2rem"
                }}
              />
              <Text 
                fontSize={{ base: "md", sm: "lg", md: "xl" }} 
                fontWeight="extrabold"
                flexShrink={0}
              >
                {tCommon("brand")}
              </Text>
            </Flex>
          </Link>
          <HStack
            gap={1}
            fontSize={{ base: "xs", md: "sm" }}
            display={{ base: "none", sm: "flex" }}
            color={useColorModeValue("#475569", "#94a3b8")}
            flexShrink={0}
          >
            <Icon as={Atom} boxSize={{ base: 3.5, md: 4 }} />
            <Text display={{ base: "none", md: "inline" }}>{tCommon("communityEdition.long")}</Text>
            <Text display={{ base: "inline", md: "none" }}>{tCommon("communityEdition.short")}</Text>
          </HStack>
        </HStack>
        {/* 使用 Next.js 的 Script 以确保服务端/客户端注入一致，避免 hydration mismatch */}
        <Script
          src="https://analytics.nexaorion.tech/script.js"
          strategy="afterInteractive"
          data-website-id="9c9b6236-2e4f-495c-9a8b-200c0216fece"
        />

        <Flex align="center" gap={{ base: 1.5, md: 3 }}>
          {/* 手机端汉堡菜单 */}
          <MobileMenu 
            textColor={textColor}
            buttonHoverBg={buttonHoverBg}
            buttonActiveBg={buttonActiveBg}
          />
          
          {/* 桌面端按钮 */}
          <Link href="/download">
            <Button
              variant="ghost"
              size="sm"
              color={textColor}
              gap={2}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
              display={{ base: "none", sm: "flex" }}
            >
              <Download size={16} />
              {t("nav.download")}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            color={textColor}
            gap={2}
            _hover={{ bg: buttonHoverBg }}
            _active={{ bg: buttonActiveBg }}
            display={{ base: "none", md: "flex" }}
          >
            <HelpCircle size={16} />
            {t("nav.helpCenter")}
          </Button>
          
          <IconButton
            aria-label={t("nav.themeToggle")}
            variant="ghost"
            size={{ base: "xs", md: "sm" }}
            color={textColor}
            onClick={toggleColorMode}
            _hover={{ bg: buttonHoverBg, color: textColor }}
            _active={{ bg: buttonActiveBg, color: textColor }}
          >
            {colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </IconButton>
          <LanguageMenu />
        </Flex>
      </Flex>
    </Box>
  );
}

interface MobileMenuProps {
  textColor: string;
  buttonHoverBg: string;
  buttonActiveBg: string;
}

function MobileMenu({ textColor, buttonHoverBg, buttonActiveBg }: MobileMenuProps) {
  const { t } = useTranslation("header");
  const menuBg = useColorModeValue("#ffffff", "#1a2332");
  const menuBorder = useColorModeValue("#cbd5e0", "#334155");
  const menuTextColor = useColorModeValue("#1e293b", "#e2e8f0");
  const hoverBg = useColorModeValue("#f1f5f9", "rgba(71, 85, 105, 0.3)");

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          aria-label={t("nav.menuAria")}
          variant="ghost"
          size="xs"
          color={textColor}
          display={{ base: "flex", sm: "none" }}
          _hover={{ bg: buttonHoverBg, color: textColor }}
          _active={{ bg: buttonActiveBg, color: textColor }}
          css={{
            "& svg": {
              color: textColor,
            },
            "&:hover svg": {
              color: textColor,
            },
            "&:active svg": {
              color: textColor,
            },
            "&[data-state='open']": {
              background: buttonActiveBg,
              color: textColor,
            },
            "&[data-state='open'] svg": {
              color: textColor,
            },
          }}
        >
          <MenuIcon size={18} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg={menuBg}
            borderWidth="2px"
            borderColor={menuBorder}
            minW="11rem"
            maxW="calc(100vw - 32px)"
            boxShadow="lg"
            p="2"
            rounded="lg"
            color={menuTextColor}
          >
            <Link href="/download">
              <Menu.Item
                value="download"
                gap="2"
                rounded="md"
                px={3}
                py={2}
                color={menuTextColor}
                _hover={{ bg: hoverBg }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <Icon as={Download} boxSize={4} color={menuTextColor} />
                <Text fontSize="sm" color={menuTextColor}>{t("nav.download")}</Text>
              </Menu.Item>
            </Link>
            <Menu.Item
              value="help"
              gap="2"
              rounded="md"
              px={3}
              py={2}
              color={menuTextColor}
              _hover={{ bg: hoverBg }}
              cursor="pointer"
              transition="all 0.2s"
            >
              <Icon as={HelpCircle} boxSize={4} color={menuTextColor} />
              <Text fontSize="sm" color={menuTextColor}>{t("nav.helpCenter")}</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function LanguageMenu() {
  const { t, i18n } = useTranslation("header");
  const [activeLanguage, setActiveLanguage] = useState<SupportedLanguage>(() =>
    normalizeLanguage(i18n.resolvedLanguage ?? i18n.language),
  );
  const options: LanguageOption[] = useMemo(
    () =>
      SUPPORTED_LANGUAGES.map((code) => ({
        code,
        label: t(`language.options.${code}`),
      })),
    [t],
  );
  const menuBg = useColorModeValue("#ffffff", "#1a2332");
  const menuBorder = useColorModeValue("#cbd5e0", "#334155");
  const menuTextColor = useColorModeValue("#1e293b", "#e2e8f0");
  const iconColor = useColorModeValue("#0f172a", "#e2e8f0");
  const hoverBg = useColorModeValue("#f1f5f9", "rgba(71, 85, 105, 0.3)");
  const activeBg = useColorModeValue("rgba(59, 130, 246, 0.12)", "rgba(56, 189, 248, 0.25)");
  const activeColor = useColorModeValue("#1d4ed8", "#38bdf8");
  const buttonHoverBg = useColorModeValue(
    "rgba(148, 163, 184, 0.15)",
    "rgba(148, 163, 184, 0.2)",
  );
  const buttonActiveBg = useColorModeValue(
    "rgba(59, 130, 246, 0.15)",
    "rgba(56, 189, 248, 0.2)",
  );

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setActiveLanguage(normalizeLanguage(lng));
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const handleSelect = useCallback(
    (code: SupportedLanguage) => {
      setActiveLanguage(code);
      void i18n.changeLanguage(code);
    },
    [i18n],
  );

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          aria-label={t("language.aria")}
          variant="ghost"
          size={{ base: "xs", md: "sm" }}
          color={iconColor}
          _hover={{ bg: buttonHoverBg, color: iconColor }}
          _active={{ bg: buttonActiveBg, color: iconColor }}
          css={{
            "& svg": {
              color: iconColor,
            },
            "&:hover svg": {
              color: iconColor,
            },
            "&:active svg": {
              color: iconColor,
            },
            "&[data-state='open']": {
              background: buttonActiveBg,
              color: iconColor,
            },
            "&[data-state='open'] svg": {
              color: iconColor,
            },
          }}
        >
          <Languages size={16} />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg={menuBg}
            borderWidth="2px"
            borderColor={menuBorder}
            minW={{ base: "13rem", md: "15rem" }}
            maxW={{ base: "calc(100vw - 32px)", md: "none" }}
            boxShadow="lg"
            p="2"
            rounded="lg"
            color={menuTextColor}
          >
              {options.map((option) => (
              <Menu.Item
                key={option.code}
                value={option.code}
                  onClick={() => handleSelect(option.code)}
                justifyContent="space-between"
                gap="2"
                rounded="md"
                px={{ base: 2, md: 3 }}
                py={{ base: 1.5, md: 2 }}
                  bg={activeLanguage === option.code ? activeBg : "transparent"}
                  color={activeLanguage === option.code ? activeColor : menuTextColor}
                _hover={{ bg: hoverBg }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <Text 
                  fontSize={{ base: "xs", md: "sm" }} 
                  flex="1" 
                    fontWeight={activeLanguage === option.code ? "semibold" : "normal"}
                  truncate
                >
                  {option.label}
                </Text>
                  {activeLanguage === option.code ? (
                  <Icon as={Check} boxSize={{ base: 3.5, md: 4 }} color={activeColor} flexShrink={0} />
                ) : null}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function HeaderAlerts() {
  const [promoVisible, setPromoVisible] = useState(true);
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const toaster = useToaster();
  const { t } = useTranslation("header");

  // 初始化：检查是否应该显示 Alert
  useEffect(() => {
    setIsHydrated(true);
    setPromoVisible(shouldShowAlert("alert-promo"));
    setNoticeVisible(shouldShowAlert("alert-notice"));
  }, []);

  // 处理关闭 Promo Alert
  const handleClosePromo = () => {
    setPromoVisible(false);
    dismissAlert("alert-promo");
    toaster.create({
      title: t("alerts.promoDismissed.title"),
      description: t("alerts.promoDismissed.description"),
      type: "success",
      duration: 5000,
    });
  };

  // 处理关闭 Notice Alert
  const handleCloseNotice = () => {
    setNoticeVisible(false);
    dismissAlert("alert-notice");
    toaster.create({
      title: t("alerts.noticeDismissed.title"),
      description: t("alerts.noticeDismissed.description"),
      type: "success",
      duration: 5000,
    });
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Stack 
        gap={2} 
        px={{ base: 4, md: 8 }}
        pt={{ base: 16, md: 20 }}
      >
        {promoVisible ? (
          <Alert.Root
            status="info"
            variant="solid"
            colorPalette="blue"
            alignItems={{ base: "flex-start", md: "center" }}
            py={2}
            px={{ base: 3, md: 4 }}
          >
            <Alert.Indicator mt={{ base: 0.5, md: 0 }} flexShrink={0} />
            <Alert.Content flex="1" minW={0}>
              <Alert.Description 
                fontSize={{ base: "xs", sm: "sm", md: "md" }}
                lineHeight={{ base: 1.5, md: 1.6 }}
              >
                {t("alerts.info")}
              </Alert.Description>
            </Alert.Content>
            <CloseButton
              variant="ghost"
              size={{ base: "xs", md: "sm" }}
              onClick={handleClosePromo}
              flexShrink={0}
              mt={{ base: -1, md: 0 }}
              ml={{ base: 0, md: 2 }}
            />
          </Alert.Root>
        ) : null}
        {noticeVisible ? (
          <Alert.Root
            status="warning"
            variant="solid"
            colorPalette="pink"
            alignItems={{ base: "flex-start", md: "center" }}
            py={2}
            px={{ base: 3, md: 4 }}
          >
            <Alert.Indicator mt={{ base: 0.5, md: 0 }} flexShrink={0} />
            <Alert.Content flex="1" minW={0}>
              <Alert.Description 
                fontSize={{ base: "xs", sm: "sm", md: "md" }}
                lineHeight={{ base: 1.5, md: 1.6 }}
              >
                {t("alerts.warning")}
              </Alert.Description>
            </Alert.Content>
            <CloseButton
              variant="ghost"
              size={{ base: "xs", md: "sm" }}
              onClick={handleCloseNotice}
              flexShrink={0}
              mt={{ base: -1, md: 0 }}
              ml={{ base: 0, md: 2 }}
            />
          </Alert.Root>
        ) : null}
      </Stack>
    </>
  );
}

export { HeaderAlerts };
