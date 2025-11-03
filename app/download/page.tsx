"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  Flex,
  Icon,
  IconButton,
  Portal,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import {
  ClientOnly,
  useColorModeValue,
} from "../../components/ui/color-mode";
import { useToaster } from "../../components/ui/toaster-provider";
import { ChevronRight, ShieldCheck, Watch, LockKeyhole, Info } from "lucide-react";

const SHA256_HASH = "loading";

interface DownloadConfig {
  version: string;
  date: string;
  download: {
    allow: boolean;
    global: boolean;
    endpoint: string;
    file_name: string;
    file_sha256: string;
  };
}

export default function DownloadPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [config, setConfig] = useState<DownloadConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const toaster = useToaster();
  const pageBg = useColorModeValue(
    "linear-gradient(180deg, rgba(248, 250, 252, 0.98) 0%, rgba(226, 232, 240, 0.96) 40%, rgba(219, 234, 254, 0.95) 100%)",
    "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
  );
  const primaryText = useColorModeValue("#0f172a", "#f8fafc");
  const secondaryText = useColorModeValue("#475569", "#cbd5e1");
  const mutedText = useColorModeValue("#64748b", "#94a3b8");
  const sectionBg = useColorModeValue(
    "rgba(255, 255, 255, 0.85)",
    "rgba(15, 23, 42, 0.65)"
  );
  const sectionBorder = useColorModeValue(
    "rgba(226, 232, 240, 0.8)",
    "transparent"
  );
  const downloadButtonBg = useColorModeValue(
    "rgba(241, 245, 249, 0.95)",
    "rgba(30, 41, 59, 0.72)"
  );
  const downloadButtonHoverBg = useColorModeValue(
    "rgba(226, 232, 240, 0.95)",
    "rgba(30, 41, 59, 0.85)"
  );
  const shieldColor = useColorModeValue("#64748b", "#94a3b8");
  const shieldHoverColor = useColorModeValue("#0f172a", "#f8fafc");
  const dialogBg = useColorModeValue("#ffffff", "#0f172a");
  const dialogBorder = useColorModeValue("rgba(226, 232, 240, 0.8)", "rgba(30, 41, 59, 0.4)");
  const dialogTitleColor = useColorModeValue("#0f172a", "#f8fafc");
  const dialogTextColor = useColorModeValue("#475569", "#cbd5e1");
  const dialogOverlayBg = useColorModeValue("rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.6)");
  const continueButtonBg = useColorModeValue("#1d4ed8", "#2563eb");
  const continueButtonHoverBg = useColorModeValue("#1e40af", "#1d4ed8");
  const continueButtonDisabledBg = useColorModeValue("rgba(148, 163, 184, 0.3)", "rgba(148, 163, 184, 0.2)");
  const cancelButtonBg = useColorModeValue("rgba(226, 232, 240, 0.95)", "rgba(30, 41, 59, 0.5)");
  const cancelButtonHoverBg = useColorModeValue("rgba(218, 218, 218, 0.95)", "rgba(51, 65, 85, 0.7)");
  const cancelButtonTextColor = useColorModeValue("#0f172a", "#e2e8f0");

  // 获取配置信息
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://cdn.lightxi.com/cloudreve/uploads/2025/11/04/Bp1TtPUi_download.json");
        if (!response.ok) throw new Error("Failed to fetch config");
        const data: DownloadConfig = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load download config:", err);
        setError("Failed to load download configuration");
        setConfig({
          version: "LOADING",
          date: "2077-08-10",
          download: {
            allow: true,
            global: true,
            endpoint: "",
            file_name: "",
            file_sha256: SHA256_HASH,
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // 提取 SHA256 值
  const getSHA256Value = () => {
    if (!config?.download.file_sha256) return SHA256_HASH;
    return config.download.file_sha256.replace(/^sha256:/, "");
  };

  const handleCopyHash = useCallback(async () => {
    try {
      const hashValue = getSHA256Value();
      await navigator.clipboard.writeText(hashValue);
      toaster.create({
        title: "校验值已复制",
        description: "SHA256 校验值已复制到剪贴板。",
        type: "success",
        duration: 4000,
      });
    } catch (error) {
      toaster.create({
        title: "复制失败",
        description: "请稍后再试，或手动复制校验值。",
        type: "error",
        duration: 4000,
      });
    }
  }, [toaster]);

  const handleOpenDownloadDialog = useCallback(() => {
    if (!config?.download.allow) {
      toaster.create({
        title: "下载不可用",
        description: "由于不可抗力原因，暂时无法提供下载选项",
        type: "error",
        duration: 4000,
      });
      return;
    }
    setIsDialogOpen(true);
    setCanProceed(false);
    setTimeLeft(5);
  }, [config?.download.allow, toaster]);

  // 倒计时逻辑
  useEffect(() => {
    if (!isDialogOpen || canProceed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanProceed(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDialogOpen, canProceed]);

  const handleProceedDownload = useCallback(() => {
    if (!config) return;
    
    const downloadUrl = `${config.download.endpoint}${config.download.file_name}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = config.download.file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDialogOpen(false);
    toaster.create({
      title: "下载已开始",
      description: "文件将在后台下载，请在通知中心查看进度。",
      type: "success",
      duration: 4000,
    });
  }, [config, toaster]);

  return (
    <ClientOnly>
      <>
        <Header />
        <Box as="main" bg={pageBg} minH="100vh" pt={{ base: 20, md: 24 }} pb={0}>
        <Container maxW="6xl">
          <Stack gap={{ base: 12, md: 20 }} pb={{ base: 16, md: 24 }}>
            <Stack gap={{ base: 8, md: 10 }} color={primaryText} pt={{ base: 8, md: 12 }}>
              <Stack direction="row" gap={3} align="flex-start">
                <Text
                  as="h1"
                  fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                  fontWeight="normal"
                  lineHeight={1.2}
                >
                  下载 DailyNotes
                </Text>
              </Stack>
              
              <Stack gap={4}>
                <Text
                  fontSize={{ base: "sm", md: "base" }}
                  color={secondaryText}
                  lineHeight={1.8}
                  maxW="3xl"
                >
                  现在就为您的手表下载 DailyNotes，体验最新最全的手帐功能和最棒的使用体验。
                </Text>
                
                <Stack gap={2}>
                  <Text fontSize={{ base: "sm", md: "base" }} color={secondaryText}>
                    最新版本{" "}
                    <Text as="span" fontWeight="semibold" color={primaryText}>
                      {config?.version || "1.0.5"}
                    </Text>{" "}
                    <Text as="span" color={mutedText}>
                      (Community Edition)
                    </Text>
                  </Text>
                  <Text fontSize={{ base: "sm", md: "base" }} color={secondaryText}>
                    发布于{" "}
                    <Text as="span" fontWeight="normal" color={primaryText}>
                      {config?.date 
                        ? new Date(config.date).toLocaleDateString("zh-CN", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "2025 年 11 月 2 日"}
                    </Text>
                    。
                  </Text>
                </Stack>
              </Stack>
            </Stack>

            <Stack gap={{ base: 8, md: 12 }}>
              {!config?.download.allow && (
                <Alert.Root status="error" variant="subtle" colorPalette="red">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>下载暂时不可用</Alert.Title>
                    <Alert.Description>
                      由于不可抗力原因，暂时无法提供下载选项
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              )}
              
              {config?.download.allow && (
                <Box
                  bg={sectionBg}
                  borderWidth="1px"
                  borderColor={sectionBorder}
                  rounded={{ base: "xl", md: "2xl" }}
                  px={{ base: 6, md: 10 }}
                  py={{ base: 8, md: 12 }}
                  backdropFilter="blur(24px)"
                  shadow="sm"
                >
                <Stack gap={{ base: 6, md: 8 }}>
                  <Stack direction="row" gap={3} align="center">
                    <Icon as={Watch} boxSize={{ base: 6, md: 7 }} color={primaryText} />
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="semibold"
                      color={primaryText}
                    >
                      Android 下载
                    </Text>
                  </Stack>

                  <Text fontSize={{ base: "sm", md: "base" }} color={secondaryText} lineHeight={1.4}>
                    适用于 Android 5.1（推荐 7.1.1）及以上版本。
                  </Text>

                  <Flex
                    bg={downloadButtonBg}
                    _hover={{ bg: downloadButtonHoverBg }}
                    transition="all 0.2s"
                    rounded="lg"
                    px={{ base: 5, md: 6 }}
                    py={{ base: 4, md: 5 }}
                    align="center"
                    justify="space-between"
                    w="full"
                  >
                    <Button
                      variant="ghost"
                      flex="1"
                      justifyContent="flex-start"
                      fontSize={{ base: "sm", md: "base" }}
                      color={primaryText}
                      fontWeight="medium"
                      h="auto"
                      px={0}
                      _hover={{ bg: "transparent" }}
                      onClick={handleOpenDownloadDialog}
                    >
                      下载 APK 安装包
                    </Button>
                    <Flex align="center" gap={2}>
                      <Tooltip.Root
                        openDelay={200}
                        closeDelay={100}
                        positioning={{ placement: "top" }}
                      >
                        <Tooltip.Trigger asChild>
                          <IconButton
                            aria-label="查看 SHA256 校验值"
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyHash}
                            color={shieldColor}
                            _hover={{ color: shieldHoverColor, bg: "transparent" }}
                          >
                            <ShieldCheck size={20} />
                          </IconButton>
                        </Tooltip.Trigger>
                        <Portal>
                          <Tooltip.Positioner>
                            <Tooltip.Content
                              layerStyle="fill.solid"
                              px={3}
                              py={2}
                              rounded="md"
                              shadow="lg"
                              maxW="300px"
                            >
                              <Text fontSize="xs" fontFamily="mono" wordBreak="break-all">
                                {getSHA256Value()}
                              </Text>
                              <Tooltip.Arrow>
                                <Tooltip.ArrowTip />
                              </Tooltip.Arrow>
                            </Tooltip.Content>
                          </Tooltip.Positioner>
                        </Portal>
                      </Tooltip.Root>
                      <Icon as={ChevronRight} boxSize={5} color={mutedText} />
                    </Flex>
                  </Flex>
                </Stack>
                </Box>
              )}

              <Box
                bg={sectionBg}
                borderWidth="1px"
                borderColor={sectionBorder}
                rounded={{ base: "xl", md: "2xl" }}
                px={{ base: 6, md: 10 }}
                py={{ base: 6, md: 8 }}
                backdropFilter="blur(24px)"
                shadow="sm"
              >
                <Stack gap={4}>
                  <Stack direction="row" gap={3} align="center">
                    <Icon as={LockKeyhole} boxSize={{ base: 5, md: 6 }} color={primaryText} />
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="semibold"
                      color={primaryText}
                    >
                      验证和安全下载
                    </Text>
                  </Stack>
                  <Text
                    fontSize={{ base: "sm", md: "base" }}
                    color={secondaryText}
                    lineHeight={1.8}
                  >
                    我们建议您无论如何都只从我们的官方网站进行下载。如果您的下载内容似乎已损坏或被防病毒软件标记，请向我们报告。您可以点击{" "}
                    <Icon
                      as={ShieldCheck}
                      display="inline"
                      boxSize={4}
                      verticalAlign="text-bottom"
                      color={secondaryText}
                    />{" "}
                    来复制 SHA256 以进行校验。
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Container>

        <Footer />
      </Box>

      <Dialog.Root open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)} lazyMount>
        <Portal>
          <Dialog.Backdrop
            position="fixed"
            inset={0}
            zIndex={10000}
            bg={dialogOverlayBg}
            backdropFilter="blur(4px)"
          />
          <Dialog.Positioner
            position="fixed"
            inset={0}
            zIndex={10001}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 4, md: 0 }}
          >
            <Dialog.Content
              maxW={{ base: "calc(100vw - 32px)", md: "580px" }}
              bg={dialogBg}
              color={dialogTextColor}
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
                  下载提示
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body px={{ base: 6, md: 8 }} py={0} pb={6}>
                <Stack gap={6}>
                  <Text fontSize={{ base: "sm", md: "base" }} color={dialogTextColor} lineHeight={1.4} whiteSpace="pre-wrap">
                    由于网站正处于备案期间，根据相关政策要求，暂时无法提供境内下载方式。{"\n\n"}因此我们提供了境外下载方式（存储在新加坡地区），若您同意下载，请继续；若不同意，请关闭弹窗。
                  </Text>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer p={{ base: 6, md: 8 }} pt={6}>
                <Flex w="full" gap={3} justify="center" align="center">
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="ghost"
                      size="md"
                      color={cancelButtonTextColor}
                      bg={cancelButtonBg}
                      borderColor="transparent"
                      _hover={{ bg: cancelButtonHoverBg }}
                      _active={{ bg: cancelButtonHoverBg }}
                      px={{ base: 6, md: 8 }}
                      fontWeight="semibold"
                      flex="1"
                      minW={0}
                    >
                      关闭
                    </Button>
                  </Dialog.ActionTrigger>

                  <Button
                    size="md"
                    colorPalette="blue"
                    bg={continueButtonBg}
                    color="white"
                    _hover={{ bg: continueButtonHoverBg }}
                    _active={{ bg: continueButtonHoverBg }}
                    _disabled={{
                      bg: continueButtonDisabledBg,
                      color: useColorModeValue("#94a3b8", "#64748b"),
                      cursor: "not-allowed",
                      opacity: 0.6,
                    }}
                    disabled={!canProceed}
                    onClick={handleProceedDownload}
                    px={{ base: 6, md: 8 }}
                    fontWeight="semibold"
                    flex="1"
                    minW={0}
                  >
                    继续{!canProceed && `（${timeLeft}s）`}
                  </Button>
                </Flex>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      </>
    </ClientOnly>
  );
}
