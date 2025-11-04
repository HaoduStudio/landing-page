"use client";

import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { Trans, useTranslation } from "react-i18next";

export function Intro() {
  const { t } = useTranslation("home");
  const bodyColor = useColorModeValue("#334155", "#cbd5f5");
  const highlight = useColorModeValue("#0f172a", "#f8fafc");

  return (
    <Box as="section" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      <Container maxW="6xl" position="relative" zIndex={1}>
        <Stack gap={{ base: 6, md: 8 }}>
          <Text
            as="h2"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="black"
            color={highlight}
            letterSpacing="tight"
          >
            {t("intro.title")}
          </Text>
          <Stack gap={{ base: 4, md: 5 }} fontSize={{ base: "md", md: "xl" }} color={bodyColor}>
            <Text lineHeight={1.6}>
              <Trans
                i18nKey="intro.paragraph1"
                t={t}
                components={{ highlight: <Text as="span" fontWeight="semibold" color={highlight} /> }}
              />
            </Text>
            <Text lineHeight={1.6}>
              <Trans
                i18nKey="intro.paragraph2"
                t={t}
                components={{ highlight: <Text as="span" fontWeight="semibold" color={highlight} /> }}
              />
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

