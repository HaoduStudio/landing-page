"use client";

import { Badge, Box, Container, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { useColorModeValue } from "../ui/color-mode";
import { Trans, useTranslation } from "react-i18next";

export function Network() {
  const { t } = useTranslation("home");
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
            {t("network.badge")}
          </Badge>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
            color={highlight}
            letterSpacing="tight"
            lineHeight={1.15}
          >
            {t("network.heading")}
          </Heading>
          <Stack gap={{ base: 4, md: 5 }} fontSize={{ base: "md", md: "xl" }} color={bodyColor}>
            <Text lineHeight={1.6}>
              <Trans
                i18nKey="network.paragraph1"
                t={t}
                components={{
                  highlight: <Text as="span" fontWeight="semibold" color={highlight} />,
                  highlight1: <Text as="span" fontWeight="semibold" color={highlight} />,
                }}
              />
            </Text>
            <Text lineHeight={1.6}>
              <Trans
                i18nKey="network.paragraph2"
                t={t}
                components={{
                  highlight: <Text as="span" fontWeight="semibold" color={highlight} />,
                  link: (
                    <Link
                      href="https://github.com/HaoduStudio/DailyNotes-CE/releases"
                      color={linkColor}
                      target="_blank"
                      rel="noopener noreferrer"
                      textDecoration="none"
                      display="inline"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Github Releases
                      <Text as="span" display="inline-block" ml={1} verticalAlign="text-bottom">
                        <ExternalLink size={16} color={iconColor} style={{ display: 'inline-block' }} />
                      </Text>
                    </Link>
                  ),
                }}
              />
            </Text>
            <Text lineHeight={1.6}>
              <Trans
                i18nKey="network.paragraph3"
                t={t}
                components={{
                  highlight: <Text as="span" fontWeight="semibold" color={highlight} />,
                  highlight1: <Text as="span" fontWeight="semibold" color={highlight} />,
                }}
              />
            </Text>

          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
