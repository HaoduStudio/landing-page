"use client";

import {
  Box,
  Button,
  Dialog,
  Flex,
  Icon,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ExternalLink, Info } from "lucide-react";
import { useColorModeValue } from "../ui/color-mode";
import { useState } from "react";
import { BUILD_ID } from "../../lib/build-info";

interface NavLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "隐私政策", href: "/privacy" },
  { label: "本地化平台", href: "https://translate.nexaorion.cn", isExternal: true },
  { label: "Github", href: "https://github.com/HaoduStudio/DailyNotes-CE", isExternal: true }
];

export function Footer() {
  const footerBg = useColorModeValue(
    "linear-gradient(180deg, rgba(248, 250, 252, 0.72) 0%, rgba(241, 245, 249, 0.88) 100%)",
    "linear-gradient(180deg, rgba(15, 23, 42, 0.78) 0%, rgba(7, 12, 28, 0.94) 100%)"
  );
  const borderColor = useColorModeValue("rgba(203, 213, 225, 0.6)", "rgba(30, 41, 59, 0.75)");
  const textPrimary = useColorModeValue("#0f172a", "#f1f5f9");
  const textSecondary = useColorModeValue("#475569", "#cbd5e1");
  const textTertiary = useColorModeValue("#64748b", "#94a3b8");
  const linkColor = useColorModeValue("#1e40af", "#93c5fd");
  const linkHoverBg = useColorModeValue("rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.18)");

  const [isHovered, setIsHovered] = useState(false);

  return (
  <Box
      as="footer"
      position="relative"
      zIndex={1}
      borderTopWidth="1px"
      borderColor={borderColor}
      mt={{ base: 12, md: 16 }}
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(false)}
    >
      <Box
        className="footer-overlay"
        position="absolute"
        inset={0}
        bg={useColorModeValue(
          "rgba(248, 250, 252, 0.65)",
          "rgba(15, 23, 42, 0.7)"
        )}
        backdropFilter="blur(32px) saturate(180%)"
        css={{
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          filter: isHovered ? "brightness(1.12) saturate(1.06)" : "brightness(1) saturate(1)",
          opacity: isHovered ? 1 : 0.98,
          transition: "filter 220ms ease, opacity 220ms ease",
          '@media (hover: none)': {
            filter: 'brightness(1) saturate(1) !important',
            opacity: 0.98,
          }
        }}
      />
      
      <Box position="relative" zIndex={1} px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }}>
        <Stack gap={{ base: 8, md: 10 }}>
          {/* 导航链接 */}
          <Flex
            gap={{ base: 3, md: 4 }}
            wrap="wrap"
            align="center"
            fontSize={{ base: "sm", md: "md" }}
          >
            {NAV_LINKS.map((link) => (
              <Button
                key={link.label}
                asChild
                variant="ghost"
                height="auto"
                px={2}
                py={1}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="medium"
                display="inline-flex"
                alignItems="center"
                gap={1.5}
                color={textPrimary}
                rounded="md"
                textDecoration="none"
                _hover={{ bg: linkHoverBg }}
                _active={{ bg: linkHoverBg }}
              >
                <a
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                >
                  <Text>{link.label}</Text>
                  {link.isExternal && (
                    <Icon as={ExternalLink} boxSize={3.5} opacity={0.7} />
                  )}
                </a>
              </Button>
            ))}
            
            <CrossBorderDialogLink textColor={textPrimary} linkHoverBg={linkHoverBg} />
          </Flex>

          {/* 主要内容区域 */}
          <Stack gap={8}>
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={{ base: 8, lg: 16 }}
              align="flex-start"
            >
              <Stack gap={2.5} flex={1}>
                <Flex align="center" gap={3}>
                  <Stack gap={0.5}>
                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="black" color={textPrimary} lineHeight={1.2}>
                      DailyNotes
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color={textSecondary} fontWeight="medium">
                      5 Years of Experience. Since 2021.
                    </Text>
                  </Stack>
                </Flex>
              </Stack>

              {/* 版权声明 */}
              <Stack gap={2} flex={1} maxW={{ lg: "lg" }} align={{ base: "flex-start", lg: "flex-end" }}>
                <Text color={textSecondary} fontSize={{ base: "xs", md: "sm" }} lineHeight={1.4} textAlign={{ base: "left", lg: "right" }}>
                  “小天才” 为广东小天才科技有限公司旗下的注册商标。
                </Text>
                <Text color={textSecondary} fontSize={{ base: "xs", md: "sm" }} lineHeight={1.4} textAlign={{ base: "left", lg: "right" }}>
                  DailyNotes 和本网站与广东小天才科技有限公司之间可能有从属或关联关系。
                </Text>
              </Stack>
            </Flex>

            {/* 底部信息栏 */}
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "flex-end" }}
              gap={{ base: 4, md: 6 }}
              pt={6}
              borderTopWidth="1px"
              borderColor={borderColor}
            >
              <Text color={textSecondary} fontSize={{ base: "xs", md: "sm" }}>
                © 2021-2025 DailyNotes 保留所有权利。
              </Text>
              
              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={{ base: 1.5, sm: 2.5 }}
                align={{ base: "flex-start", sm: "center" }}
                fontSize={{ base: "xs", md: "sm" }}
                color={textTertiary}
                flexWrap="wrap"
              >
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  滇ICP备2025059072号-3
                </a>
                <Text display={{ base: "none", sm: "inline" }}>|</Text>
                <Text>Build: {BUILD_ID}</Text>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );

}

interface CrossBorderDialogLinkProps {
  textColor: string;
  linkHoverBg: string;
}

function CrossBorderDialogLink({ textColor, linkHoverBg }: CrossBorderDialogLinkProps) {
  const dialogBg = useColorModeValue("#ffffff", "#0f172a");
  const dialogBorder = useColorModeValue("rgba(203, 213, 225, 0.6)", "rgba(51, 65, 85, 0.7)");
  const dialogTitleColor = useColorModeValue("#0f172a", "#f1f5f9");
  const dialogText = useColorModeValue("#334155", "#cbd5e1");

  return (
    <Dialog.Root lazyMount>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          height="auto"
          px={2}
          py={1}
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="medium"
          display="inline-flex"
          alignItems="center"
          gap={1.5}
          color={textColor}
          rounded="md"
          textDecoration="none"
          _hover={{ bg: linkHoverBg }}
          _active={{ bg: linkHoverBg }}
          css={{
            '&[data-state="open"]': {
              background: linkHoverBg,
              color: textColor,
            }
          }}
        >
          <Icon as={Info} boxSize={3.5} opacity={0.7} />
          <Text>如果您不居住在中国大陆…</Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop 
          position="fixed"
          inset={0}
          zIndex={10000}
          bg="blackAlpha.600"
        />
        <Dialog.Positioner position="fixed" inset={0} zIndex={10001} display="flex" alignItems="center" justifyContent="center" p={{ base: 4, md: 0 }}>
          <Dialog.Content
            maxW={{ base: "calc(100vw - 32px)", md: "580px" }}
            bg={dialogBg}
            color={dialogText}
            borderWidth="1px"
            borderColor={dialogBorder}
            rounded="xl"
            shadow="2xl"
            p={0}
            overflow="hidden"
            maxH={{ base: "calc(100vh - 32px)", md: "90vh" }}
            overflowY="auto"
          >
            <Dialog.Header pb={4} px={{ base: 6, md: 8 }} pt={{ base: 8, md: 10 }}>
              <Dialog.Title 
                fontSize={{ base: "lg", md: "xl" }} 
                fontWeight="bold" 
                color={dialogTitleColor}
                textAlign="left"
                lineHeight={1.4}
              >
                数据跨境传输须知
              </Dialog.Title>
            </Dialog.Header>
            
            <Dialog.Body px={{ base: 6, md: 8 }} py={0} pb={6}>
              <Stack gap={4} fontSize={{ base: "sm", md: "15px" }} lineHeight={1.7}>
                <Text color={dialogText}>
                  当您使用 Dailys Network 在线即服务时，DailyNotes 可能会将一些对于向您提供和运行这些服务必要的个人数据传输至中国大陆或其他国家（或地区）的服务器进行处理。
                </Text>
                <Text color={dialogText}>
                  对于传输的数据，DailyNotes 将采取符合业界标准的加密措施保护您的数据安全。存储在您设备本地的数据将不会被传输，除非您采取主动操作作进行跨境传输，例如主动将您的 位置 等信息存储至中国大陆或其他国家（或地区）的云服务提供商。
                </Text>
                <Text color={dialogText}>
                  如果您不同意 DailyNotes 将这些必要数据传输至中国大陆或其他国家（或地区）的服务器上进行处理，您可以在不主动连接至 Dailys Network 的情况下使用 DailyNotes ，部分功能如 在线资源、天气背景、一言 等功能将无法使用。
                </Text>
                <Text color={dialogText} fontSize={"14px"}>
                  若要了解哪些个人数据将会被传输，请参阅我们的隐私政策。
                </Text>
              </Stack>
            </Dialog.Body>
            
            <Dialog.Footer justifyContent="stretch" p={{ base: 6, md: 8 }} pt={6}>
              <Dialog.ActionTrigger asChild>
                <Button 
                  colorPalette="blue" 
                  size="lg"
                  w="full"
                  h="48px"
                  fontSize="md"
                  fontWeight="semibold"
                  rounded="lg"
                >
                  好
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
