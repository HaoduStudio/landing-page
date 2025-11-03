"use client";

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
import { useState } from "react";
import {
  useColorMode,
  useColorModeValue,
} from "../ui/color-mode";
import { Atom, Check, Download, HelpCircle, Languages, Menu as MenuIcon, Moon, Sun } from "lucide-react";

interface LanguageOption {
  code: string;
  label: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "zh-CN", label: "简体中文（中国）" },
  { code: "zh-HK", label: "繁体中文（中國香港、澳門特別行政區）" },
  { code: "en-US", label: "English (United States)" }
];

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
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
  <Stack gap={2} width="full">
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
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Flex align="center" justify="space-between" gap={6}>
          <HStack gap={{ base: 2, md: 3 }}>
            <Text 
              fontSize={{ base: "md", sm: "lg", md: "xl" }} 
              fontWeight="extrabold"
              flexShrink={0}
            >
              DailyNotes
            </Text>
            <HStack
              gap={1}
              fontSize={{ base: "xs", md: "sm" }}
              display={{ base: "none", sm: "flex" }}
              color={useColorModeValue("#475569", "#94a3b8")}
              flexShrink={0}
            >
              <Icon as={Atom} boxSize={{ base: 3.5, md: 4 }} />
              <Text display={{ base: "none", md: "inline" }}>Community Edition</Text>
              <Text display={{ base: "inline", md: "none" }}>CE</Text>
            </HStack>
          </HStack>

          <Flex align="center" gap={{ base: 1.5, md: 3 }}>
            {/* 手机端汉堡菜单 */}
            <MobileMenu 
              textColor={textColor}
              buttonHoverBg={buttonHoverBg}
              buttonActiveBg={buttonActiveBg}
            />
            
            {/* 桌面端按钮 */}
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
              下载
            </Button>
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
              帮助中心
            </Button>
            
            <IconButton
              aria-label="切换主题"
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
      <HeaderAlerts />
    </Stack>
  );
}

interface MobileMenuProps {
  textColor: string;
  buttonHoverBg: string;
  buttonActiveBg: string;
}

function MobileMenu({ textColor, buttonHoverBg, buttonActiveBg }: MobileMenuProps) {
  const menuBg = useColorModeValue("#ffffff", "#1a2332");
  const menuBorder = useColorModeValue("#cbd5e0", "#334155");
  const menuTextColor = useColorModeValue("#1e293b", "#e2e8f0");
  const hoverBg = useColorModeValue("#f1f5f9", "rgba(71, 85, 105, 0.3)");

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="菜单"
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
              <Text fontSize="sm" color={menuTextColor}>下载</Text>
            </Menu.Item>
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
              <Text fontSize="sm" color={menuTextColor}>帮助中心</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function LanguageMenu() {
  const [language, setLanguage] = useState<LanguageOption>(LANGUAGES[0]);
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

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="选择语言"
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
            {LANGUAGES.map((option) => (
              <Menu.Item
                key={option.code}
                value={option.code}
                onClick={() => setLanguage(option)}
                justifyContent="space-between"
                gap="2"
                rounded="md"
                px={{ base: 2, md: 3 }}
                py={{ base: 1.5, md: 2 }}
                bg={language.code === option.code ? activeBg : "transparent"}
                color={language.code === option.code ? activeColor : menuTextColor}
                _hover={{ bg: hoverBg }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <Text 
                  fontSize={{ base: "xs", md: "sm" }} 
                  flex="1" 
                  fontWeight={language.code === option.code ? "semibold" : "normal"}
                  truncate
                >
                  {option.label}
                </Text>
                {language.code === option.code ? (
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

  const infoText = "DailyNotes CE 是由 HaoduStudio 独立开发和运营的分支软件版本，与 小天才 或他们位于世界各地的分公司之间并无任何从属或关联。";
  const warningText = "DailyNotes CE 可能不兼容 每日手帐 现开发商 小天才 在中国大陆运营的V3版本的数据格式。DailyNotes CE 软件不为该V3版本提供任何功能。";

  return (
    <Stack gap={2} px={{ base: 4, md: 8 }}>
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
              {infoText}
            </Alert.Description>
          </Alert.Content>
          <CloseButton
            variant="ghost"
            size={{ base: "xs", md: "sm" }}
            onClick={() => setPromoVisible(false)}
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
              {warningText}
            </Alert.Description>
          </Alert.Content>
          <CloseButton
            variant="ghost"
            size={{ base: "xs", md: "sm" }}
            onClick={() => setNoticeVisible(false)}
            flexShrink={0}
            mt={{ base: -1, md: 0 }}
            ml={{ base: 0, md: 2 }}
          />
        </Alert.Root>
      ) : null}
    </Stack>
  );
}
