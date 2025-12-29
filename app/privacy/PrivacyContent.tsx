"use client";

import { useMemo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Badge,
  Box,
  Code,
  Container,
  Image,
  Link,
  List,
  Separator,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import {
  ClientOnly,
  useColorModeValue,
} from "../../components/ui/color-mode";
import { FileText, Info } from "lucide-react";

type PrivacyContentProps = {
  markdown: string;
};

export default function PrivacyContent({ markdown }: PrivacyContentProps) {
  // 与首页一致的配色方案
  const highlight = useColorModeValue("#0f172a", "#f8fafc");
  const bodyColor = useColorModeValue("#334155", "#cbd5f5");
  const subtleText = useColorModeValue("#64748b", "#94a3b8");
  const linkColor = useColorModeValue("#2563eb", "#60a5fa");
  const linkHoverColor = useColorModeValue("#1d4ed8", "#93c5fd");
  
  // 卡片和容器背景 - 与 comment.tsx 和 download.tsx 一致
  const cardBg = useColorModeValue("whiteAlpha.100", "blackAlpha.400");
  const cardBorder = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
  
  // 引用块配色
  const blockquoteBg = useColorModeValue(
    "rgba(59, 130, 246, 0.08)",
    "rgba(59, 130, 246, 0.12)"
  );
  const blockquoteBorder = useColorModeValue("#3b82f6", "#60a5fa");
  
  // 代码块配色
  const codeBg = useColorModeValue(
    "rgba(241, 245, 249, 0.9)",
    "rgba(30, 41, 59, 0.6)"
  );
  const codeBorder = useColorModeValue(
    "rgba(203, 213, 225, 0.6)",
    "rgba(51, 65, 85, 0.5)"
  );
  
  // 表格配色
  const tableBorder = useColorModeValue(
    "rgba(226, 232, 240, 0.8)",
    "rgba(51, 65, 85, 0.6)"
  );
  const tableHeaderBg = useColorModeValue(
    "rgba(248, 250, 252, 0.8)",
    "rgba(15, 23, 42, 0.6)"
  );
  
  // Badge 配色 - 与 network.tsx 一致
  const badgeText = useColorModeValue("blue.700", "blue.100");
  const badgeBg = useColorModeValue("blue.50", "rgba(37, 99, 235, 0.16)");

  const components = useMemo(
    () =>
      ({
        h1: ({ children, node: _node, ...rest }: any) => (
          <Text
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="black"
            lineHeight={1.2}
            color={highlight}
            letterSpacing="tight"
            mt={{ base: 2, md: 4 }}
            mb={{ base: 5, md: 7 }}
            {...rest}
          >
            {children}
          </Text>
        ),
        h2: ({ children, node: _node, ...rest }: any) => (
          <Text
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            lineHeight={1.3}
            color={highlight}
            letterSpacing="tight"
            mt={{ base: 10, md: 12 }}
            mb={{ base: 4, md: 5 }}
            {...rest}
          >
            {children}
          </Text>
        ),
        h3: ({ children, node: _node, ...rest }: any) => (
          <Text
            as="h3"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="semibold"
            lineHeight={1.4}
            color={highlight}
            mt={{ base: 8, md: 10 }}
            mb={{ base: 3, md: 4 }}
            {...rest}
          >
            {children}
          </Text>
        ),
        h4: ({ children, node: _node, ...rest }: any) => (
          <Text
            as="h4"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
            lineHeight={1.4}
            color={highlight}
            mt={{ base: 6, md: 8 }}
            mb={{ base: 2, md: 3 }}
            {...rest}
          >
            {children}
          </Text>
        ),
        p: ({ children, node: _node, ...rest }: any) => (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            lineHeight={1.8}
            color={bodyColor}
            mb={{ base: 4, md: 5 }}
            {...rest}
          >
            {children}
          </Text>
        ),
        strong: ({ children, node: _node, ...rest }: any) => (
          <Box
            as="strong"
            fontWeight="semibold"
            color={highlight}
            display="inline"
            {...rest}
          >
            {children}
          </Box>
        ),
        em: ({ children, node: _node, ...rest }: any) => (
          <Box
            as="em"
            fontStyle="italic"
            color={highlight}
            display="inline"
            {...rest}
          >
            {children}
          </Box>
        ),
        u: ({ children, node: _node, ...rest }: any) => (
          <Box
            as="u"
            textDecoration="underline"
            textUnderlineOffset="2px"
            display="inline"
            {...rest}
          >
            {children}
          </Box>
        ),
        blockquote: ({ children, node: _node, ...rest }: any) => (
          <Box
            bg={blockquoteBg}
            borderLeftWidth="4px"
            borderLeftColor={blockquoteBorder}
            rounded="xl"
            px={{ base: 5, md: 7 }}
            py={{ base: 4, md: 5 }}
            mb={{ base: 6, md: 8 }}
            {...rest}
          >
            <Stack gap={2}>{children}</Stack>
          </Box>
        ),
        ul: ({ children, node: _node, ...rest }: any) => (
          <List.Root
            as="ul"
            ps={{ base: 5, md: 6 }}
            gap={3}
            listStyleType="disc"
            mb={{ base: 5, md: 6 }}
            color={bodyColor}
            {...rest}
          >
            {children}
          </List.Root>
        ),
        ol: ({ children, node: _node, ...rest }: any) => (
          <List.Root
            as="ol"
            ps={{ base: 5, md: 6 }}
            gap={3}
            listStyleType="decimal"
            mb={{ base: 5, md: 6 }}
            color={bodyColor}
            {...rest}
          >
            {children}
          </List.Root>
        ),
        li: ({ children, node: _node, ...rest }: any) => (
          <List.Item
            fontSize={{ base: "md", md: "lg" }}
            lineHeight={1.8}
            color={bodyColor}
            {...rest}
          >
            {children}
          </List.Item>
        ),
        a: ({ href, children, node: _node, ...rest }: any) => {
          const isExternal = href?.startsWith("http");
          return (
            <Link
              href={href ?? "#"}
              color={linkColor}
              fontWeight="semibold"
              _hover={{ color: linkHoverColor, textDecoration: "underline" }}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              {...rest}
            >
              {children}
            </Link>
          );
        },
        hr: ({ node: _node, ...props }: any) => (
          <Separator
            borderColor={cardBorder}
            my={{ base: 8, md: 12 }}
            {...props}
          />
        ),
        table: ({ children, node: _node, ...rest }: any) => (
          <Table.ScrollArea
            borderWidth="1px"
            borderColor={tableBorder}
            rounded="xl"
            overflow="hidden"
            mb={{ base: 6, md: 8 }}
          >
            <Table.Root size="sm" variant="outline" {...rest}>
              {children}
            </Table.Root>
          </Table.ScrollArea>
        ),
        thead: ({ node: _node, ...props }: any) => (
          <Table.Header bg={tableHeaderBg} {...props} />
        ),
        tbody: ({ node: _node, ...props }: any) => <Table.Body {...props} />,
        tr: ({ node: _node, ...props }: any) => <Table.Row {...props} />,
        th: ({ children, node: _node, ...rest }: any) => (
          <Table.ColumnHeader
            fontWeight="semibold"
            color={highlight}
            fontSize={{ base: "sm", md: "md" }}
            {...rest}
          >
            {children}
          </Table.ColumnHeader>
        ),
        td: ({ children, node: _node, ...rest }: any) => (
          <Table.Cell
            fontSize={{ base: "sm", md: "md" }}
            color={bodyColor}
            {...rest}
          >
            {children}
          </Table.Cell>
        ),
        code: ({ inline, children, node: _node, ...rest }: any) => {
          if (inline) {
            return (
              <Code
                fontSize="sm"
                px={2}
                py={0.5}
                rounded="md"
                bg={codeBg}
                borderWidth="1px"
                borderColor={codeBorder}
                color={highlight}
                {...rest}
              >
                {children}
              </Code>
            );
          }

          return (
            <Box
              as="pre"
              bg={codeBg}
              borderWidth="1px"
              borderColor={codeBorder}
              rounded="xl"
              px={{ base: 5, md: 6 }}
              py={{ base: 4, md: 5 }}
              mb={{ base: 6, md: 8 }}
              overflowX="auto"
              fontSize="sm"
              lineHeight={1.7}
              {...rest}
            >
              <Code display="block" whiteSpace="pre" bg="transparent" color={bodyColor}>
                {children}
              </Code>
            </Box>
          );
        },
        img: ({ src, alt, node: _node, ...rest }: any) => (
          <Image
            src={typeof src === "string" ? src : ""}
            alt={typeof alt === "string" ? alt : ""}
            rounded="xl"
            borderWidth="1px"
            borderColor={cardBorder}
            shadow="lg"
            my={{ base: 6, md: 8 }}
            width="full"
            objectFit="cover"
            {...rest}
          />
        ),
      }) satisfies Components,
    [
      blockquoteBg,
      blockquoteBorder,
      cardBorder,
      codeBorder,
      codeBg,
      highlight,
      linkColor,
      linkHoverColor,
      tableBorder,
      tableHeaderBg,
      bodyColor,
    ]
  );

  const content = markdown?.trim()?.length ? markdown : "# 隐私政策\n\n文档内容为空。";

  return (
    <ClientOnly>
      <>
        <Header />
        <Box as="main" minH="100vh" pt={{ base: 20, md: 24 }}>
          <Container maxW="6xl" py={{ base: 12, md: 20 }}>
            <Stack gap={{ base: 8, md: 12 }}>
              {/* 页面标题区域 */}
              <Stack gap={{ base: 4, md: 6 }}>
                <Badge
                  alignSelf="flex-start"
                  fontWeight="semibold"
                  px={3}
                  py={1}
                  bg={badgeBg}
                  color={badgeText}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                >
                  <FileText size={14} />
                  法律文件
                </Badge>
                <Text
                  as="h1"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="black"
                  color={highlight}
                  letterSpacing="tight"
                  lineHeight={1.15}
                >
                  隐私政策
                </Text>
                <Text
                  fontSize={{ base: "md", md: "xl" }}
                  color={bodyColor}
                  maxW="3xl"
                  lineHeight={1.6}
                >
                  了解我们如何收集、使用和保护您的个人信息
                </Text>
              </Stack>

              {/* 语言说明提示 */}
              <Box
                bg={cardBg}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={cardBorder}
                backdropFilter="blur(10px)"
                boxShadow={{
                  base: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  _dark: "0 4px 8px rgba(0, 0, 0, 0.3)",
                }}
                px={{ base: 5, md: 6 }}
                py={{ base: 4, md: 5 }}
                display="flex"
                alignItems="flex-start"
                gap={4}
              >
                <Box
                  p={2}
                  bg={badgeBg}
                  borderRadius="lg"
                  color={badgeText}
                  flexShrink={0}
                >
                  <Info size={20} />
                </Box>
                <Stack gap={1}>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                    color={highlight}
                  >
                    语言说明
                  </Text>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color={subtleText}
                    lineHeight={1.6}
                  >
                    隐私政策仅提供简体中文版本
                  </Text>
                </Stack>
              </Box>

              {/* Markdown 内容区 */}
              <Box
                bg={cardBg}
                borderWidth="1px"
                borderColor={cardBorder}
                borderRadius="2xl"
                px={{ base: 6, md: 10, lg: 14 }}
                py={{ base: 8, md: 12 }}
                backdropFilter="blur(10px)"
                boxShadow={{
                  base: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  _dark: "0 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <ReactMarkdown 
                  components={components} 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {content}
                </ReactMarkdown>
              </Box>
            </Stack>
          </Container>

          <Footer />
        </Box>
      </>
    </ClientOnly>
  );
}