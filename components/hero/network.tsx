"use client";

import { Badge, Box, Container, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { ExternalLink } from 'lucide-react';
import { useColorModeValue } from "../ui/color-mode";

export function Network() {
  const bodyColor = useColorModeValue("#334155", "#cbd5f5");
  const highlight = useColorModeValue("#0f172a", "#f8fafc");
  const badgeText = useColorModeValue("blue.700", "blue.100");
  const badgeBg = useColorModeValue("blue.50", "rgba(37, 99, 235, 0.16)");
  const linkColor = useColorModeValue("blue.600", "blue.200");
  const iconColor = useColorModeValue("#1e40af", "#bfdbfe");

  return (
    <Box as="section" py={{ base: 10, md: 16 }} position="relative" overflow="hidden">
      <Container maxW="6xl" position="relative" zIndex={1}>
        <Stack gap={{ base: 6, md: 8 }}>
          <Badge
            alignSelf="flex-start"
            fontWeight="semibold"
            px={3}
            py={1}
            bg={badgeBg}
            color={badgeText}
            borderRadius="full"
          >
            CE Version Only
          </Badge>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
            color={highlight}
            letterSpacing="tight"
            lineHeight={1.15}
          >
            让我们认识一下新朋友！
          </Heading>
          <Stack gap={{ base: 4, md: 5 }} fontSize={{ base: "md", md: "xl" }} color={bodyColor}>
            <Text lineHeight={1.6}>
              成为
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}DailyNotes CE 用户
              </Text>
              {" "}即可体验
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}最新最热的 Dailys Network 功能
              </Text>
              {" "}。
            </Text>
            <Text lineHeight={1.6}>
              仅需在{" "}
              <Link
                href="https://github.com/HaoduStudio/DailyNotes-CE/releases"
                color={linkColor}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                _hover={{ textDecoration: "underline" }}
              >
                Github Releases
                <ExternalLink size={16} color={iconColor} />
              </Link>
                {" "}页面下载最新版本的 DailyNotes CE，即可第一时间体验 Dailys Network 带来的
                <Text as="span" fontWeight="semibold" color={highlight}>
                    {" "}完全不同的体验
                </Text>
              {" "}。
            </Text>
            <Text lineHeight={1.6}>
              <Text as="span" fontWeight="semibold" color={highlight}>
                更加丰富多彩的手帐美化资源
              </Text>
              {" "}，这些在 Dailys Network 中
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}应有尽有
              </Text>
                {" "}，让你的手帐焕然一新，充满个性与活力。
            </Text>

          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
