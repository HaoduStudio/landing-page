"use client";

import { useEffect, useState, useMemo } from "react";
import { Box, Container, Stack, Text, HStack, Avatar } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import { Highlight } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface CommentItem {
  text: string;
  highlights: string[];
  author: {
    name: string;
    title: string;
  };
}

export function Comment() {
  const { t } = useTranslation("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const bgColor = useColorModeValue("whiteAlpha.100", "blackAlpha.400");
  const borderColor = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  const quoteColor = useColorModeValue("gray.400", "gray.600");
  const textColor = useColorModeValue("#334155", "#cbd5f5");
  const nameColor = useColorModeValue("#0f172a", "#f8fafc");
  const titleColor = useColorModeValue("gray.600", "gray.400");
  const highlightBg = useColorModeValue("blue.100", "blue.900");
  const highlightColor = useColorModeValue("#0f172a", "#f8fafc");

  const comments: CommentItem[] = useMemo(() => {
    const rawComments = t("comments.items", { returnObjects: true });
    return Array.isArray(rawComments) ? rawComments : [];
  }, [t]);

  const avatars = [
    "https://img-cn.static.isla.fan/2025/10/19/68f4824b7c228.png",
    "https://moegirl.uk/images/3/36/Kanade_btn.png",
    "https://img-cn.static.isla.fan/2025/11/05/690a2992944b6.png",
  ];

  useEffect(() => {
    if (comments.length === 0) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % comments.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [comments.length]);

  if (comments.length === 0) {
    return null;
  }

  const currentComment = comments[currentIndex];

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <Box as="section" py={{ base: 16, md: 24 }} position="relative" overflow="hidden">
      <Container maxW="6xl" position="relative" zIndex={1}>
        <Box
          p={{ base: 8, md: 12 }}
          borderRadius="2xl"
          bg={bgColor}
          backdropFilter="blur(10px)"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow={{
            base: "0 4px 8px rgba(0, 0, 0, 0.1)",
            _dark: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
          position="relative"
          minH={{ base: "300px", md: "350px" }}
        >
          <Box
            position="absolute"
            top={{ base: 4, md: 6 }}
            left={{ base: 4, md: 8 }}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color={quoteColor}
            lineHeight="1"
            opacity={0.3}
          >
            &ldquo;
          </Box>

          <Stack gap={{ base: 6, md: 8 }} pt={{ base: 8, md: 10 }}>
            <Text
              fontSize={{ base: "lg", md: "2xl" }}
              lineHeight={{ base: 1.8, md: 2 }}
              color={textColor}
              px={{ base: 4, md: 8 }}
              opacity={isTransitioning ? 0 : 1}
              transition="opacity 0.3s ease-in-out"
            >
              <Highlight
                query={currentComment.highlights}
                styles={{
                  px: "1",
                  py: "0.5",
                  bg: highlightBg,
                  color: highlightColor,
                  fontWeight: "semibold",
                  borderRadius: "sm",
                }}
              >
                {currentComment.text}
              </Highlight>
            </Text>

            <HStack 
              gap={4} 
              px={{ base: 4, md: 8 }}
              opacity={isTransitioning ? 0 : 1}
              transition="opacity 0.3s ease-in-out"
            >
              <Avatar.Root size={{ base: "md", md: "lg" }}>
                <Avatar.Fallback name={currentComment.author.name} />
                <Avatar.Image src={avatars[currentIndex % avatars.length]} />
              </Avatar.Root>
              <Stack gap={0}>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  color={nameColor}
                >
                  {currentComment.author.name}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color={titleColor}>
                  {currentComment.author.title}
                </Text>
              </Stack>
            </HStack>

            <HStack justify="center" gap={2} pt={2}>
              {comments.map((_, index) => (
                <Box
                  key={index}
                  w={{ base: 2, md: 2.5 }}
                  h={{ base: 2, md: 2.5 }}
                  borderRadius="full"
                  bg={index === currentIndex ? nameColor : quoteColor}
                  opacity={index === currentIndex ? 1 : 0.4}
                  cursor="pointer"
                  onClick={() => handleDotClick(index)}
                  transition="all 0.3s"
                  _hover={{
                    opacity: 1,
                    transform: "scale(1.2)",
                  }}
                />
              ))}
            </HStack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
