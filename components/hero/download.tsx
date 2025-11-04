"use client";

import React, { useId, useEffect, useState } from "react";
import { Box, Button, Text, HStack, VStack, Link, Icon } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Download = () => {
  const id = useId();
  const { t } = useTranslation("home");

  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const subtitleColor = useColorModeValue("blue.600", "blue.300");
  const mutedColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const linkColor = useColorModeValue("gray.600", "whiteAlpha.700");

  // typewriter effect for subtitle: complete within 1 second
  const subtitleFull = t("downloadHero.subtitle");
  const [subtitleShown, setSubtitleShown] = useState("");
  useEffect(() => {
    setSubtitleShown("");
    let rafId: number | null = null;
    const start = performance.now();
    const duration = 1000; // ms
    const len = subtitleFull.length;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const chars = Math.floor(t * len);
      setSubtitleShown(subtitleFull.slice(0, chars));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // ensure full text
        setSubtitleShown(subtitleFull);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [subtitleFull]);

  return (
    <Box as="section" py={{ base: 16, md: 24 }} px={{ base: 4, md: 8 }} bg="transparent">
      <VStack
        maxW="6xl"
        mt={{ base: 8, md: 12 }}
        mx="auto"
        gap={1}
        p={{ base: 8, md: 12 }}
        borderRadius="2xl"
        bg={{
          base: "whiteAlpha.100",
          _dark: "blackAlpha.400",
        }}
        backdropFilter="blur(10px)"
        borderWidth="1px"
        borderColor={{
          base: "whiteAlpha.200",
          _dark: "whiteAlpha.200",
        }}
        boxShadow={{
          base: "0 4px 8px rgba(0, 0, 0, 0.1)",
          _dark: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <VStack gap={4} textAlign="center">
          <Text
            id={`${id}-download-title`}
            as="span"
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
            fontWeight="extrabold"
            color={titleColor}
            lineHeight="0.75"
          >
            {t("downloadHero.title")}
          </Text>

          <Text fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }} fontWeight="bold" color={subtitleColor} letterSpacing="tight">
            {subtitleShown}
          </Text>
        </VStack>
        <VStack gap={2} textAlign="center" maxW="2xl">
          <Text fontSize={{ base: "sm", md: "md" }} color={mutedColor} lineHeight="relaxed">
            {t("downloadHero.body1")}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }} color={mutedColor} lineHeight="relaxed">
            {t("downloadHero.body2")}
          </Text>
        </VStack>
        <HStack gap={8} justify="center" flexWrap="wrap" pt={4} fontSize={{ base: "sm", md: "md" }}>
          <Link href="/download" color={linkColor} _hover={{ color: titleColor, textDecoration: "none" }} display="flex" alignItems="center" gap={1}>
            {t("downloadHero.ctaDownload")}
            <Icon as={ChevronRight} boxSize={4} />
          </Link>

          <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=C1gK62vGLnhIAVuLNvD2uBMdMXNvyGmi&jump_from=webapi&authKey=qraIKYnhKTMzdhM7A8mmScS98NnGPkPMDy1gOtmcThcV8e5nwWTw26dbdY26+D6X" color={linkColor} _hover={{ color: titleColor, textDecoration: "none" }} display="flex" alignItems="center" gap={1}>
            {t("downloadHero.ctaCommunity")}
            <Icon as={ChevronRight} boxSize={4} />
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};
