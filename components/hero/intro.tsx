"use client";

import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

export function Intro() {
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
            打破常规。
          </Text>
          <Stack gap={{ base: 4, md: 5 }} fontSize={{ base: "md", md: "xl" }} color={bodyColor}>
            <Text lineHeight={1.6}>
              DailyNotes 天生就与众不同。手表行业首创手帐类编辑软件，实现类富文本第一人。强大的手帐编辑器人人都能快速上手，
              除此之外，还有丰富的个性化资源，
              <Text as="span" fontWeight="semibold" color={highlight}>
                完全免费使用
              </Text>
              。
            </Text>
            <Text lineHeight={1.6}>
              手帐内不仅支持导入
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}图片、视频、录音
              </Text>
              {" "}，还支持添加
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}自己喜爱的贴纸
              </Text>
                {" "}。DailyNotes 还是首个支持
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}全局内容检索
              </Text>
              {" "}和
              <Text as="span" fontWeight="semibold" color={highlight}>
                {" "}日历检索
              </Text>
              {" "}的记录类手表软件。
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

