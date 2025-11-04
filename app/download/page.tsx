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
import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import {
  ClientOnly,
  useColorModeValue,
} from "../../components/ui/color-mode";
import { useToaster } from "../../components/ui/toaster-provider";
import { ChevronRight, ShieldCheck, Watch, LockKeyhole, Info } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation("download");
  
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
    if (!config?.download.file_sha256) return null;
    return config.download.file_sha256.replace(/^sha256:/, "");
  };

  const handleCopyHash = useCallback(async () => {
    const hashValue = getSHA256Value();
    if (!hashValue) {
      toaster.create({
        title: t("toasts.hashPending.title"),
        description: t("toasts.hashPending.description"),
        type: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      // 优先尝试现代 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hashValue);
      } else {
        // 降级方案：使用传统的 execCommand 方法
        const textArea = document.createElement("textarea");
        textArea.value = hashValue;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error("execCommand failed");
        }
      }
      
      toaster.create({
        title: t("toasts.hashCopied.title"),
        description: t("toasts.hashCopied.description"),
        type: "success",
        duration: 4000,
      });
    } catch (error) {
      console.error("Copy failed:", error);
      toaster.create({
        title: t("toasts.hashCopyFailed.title"),
        description: t("toasts.hashCopyFailed.description"),
        type: "error",
        duration: 4000,
      });
    }
  }, [config, t, toaster]);

  const handleOpenDownloadDialog = useCallback(() => {
    if (!config?.download.allow) {
      toaster.create({
        title: t("toasts.downloadUnavailable.title"),
        description: t("toasts.downloadUnavailable.description"),
        type: "error",
        duration: 4000,
      });
      return;
    }
    setIsDialogOpen(true);
    setCanProceed(false);
    setTimeLeft(5);
  }, [config?.download.allow, t, toaster]);

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
      title: t("toasts.downloadStarted.title"),
      description: t("toasts.downloadStarted.description"),
      type: "success",
      duration: 4000,
    });
  }, [config, t, toaster]);

  const releaseDateDisplay = useMemo(() => {
    if (config?.date) {
      try {
        const formatter = new Intl.DateTimeFormat(i18n.language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formatter.format(new Date(config.date));
      } catch (error) {
        console.error("Failed to format release date:", error);
      }
    }
    return t("page.releaseDateFallback");
  }, [config?.date, i18n.language, t]);

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
                  {t("page.title")}
                </Text>
              </Stack>
              
              <Stack gap={4}>
                <Text
                  fontSize={{ base: "sm", md: "base" }}
                  color={secondaryText}
                  lineHeight={1.8}
                  maxW="3xl"
                >
                  {t("page.lead")}
                </Text>
                
                <Stack gap={2}>
                  <Text fontSize={{ base: "sm", md: "base" }} color={secondaryText}>
                    {t("page.latestVersion")}{" "}
                    <Text as="span" fontWeight="semibold" color={primaryText}>
                      {config?.version || "1.0.5"}
                    </Text>{" "}
                    <Text as="span" color={mutedText}>
                      {t("page.edition")}
                    </Text>
                  </Text>
                  <Text fontSize={{ base: "sm", md: "base" }} color={secondaryText}>
                    <Trans
                      i18nKey="page.releasedOn"
                      t={t}
                      values={{ date: releaseDateDisplay }}
                      components={{
                        highlight: (
                          <Text
                            key="release-date-highlight"
                            as="span"
                            fontWeight="normal"
                            color={primaryText}
                          />
                        ),
                      }}
                    />
                  </Text>
                </Stack>
              </Stack>
            </Stack>

            <Stack gap={{ base: 8, md: 12 }}>
              {!config?.download.allow && (
                <Alert.Root status="error" variant="subtle" colorPalette="red">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{t("page.alert.title")}</Alert.Title>
                    <Alert.Description>
                      {t("page.alert.description")}
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
                      {t("android.title")}
                    </Text>
                  </Stack>

                  <Text fontSize={{ base: "sm", md: "base" }} color={secondaryText} lineHeight={1.4}>
                    {t("android.requirement")}
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
                      {t("android.downloadButton")}
                    </Button>
                    <Flex align="center" gap={2}>
                      <Tooltip.Root
                        openDelay={200}
                        closeDelay={100}
                        positioning={{ placement: "top" }}
                      >
                        <Tooltip.Trigger asChild>
                          <IconButton
                            aria-label={t("tooltips.sha")}
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyHash}
                            color={shieldColor}
                            _hover={{ color: shieldHoverColor, bg: "transparent" }}
                            disabled={isLoading || !config?.download.file_sha256 || config.download.file_sha256 === SHA256_HASH}
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
                                {getSHA256Value() ?? t("tooltips.shaValueFallback")}
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
                      {t("security.title")}
                    </Text>
                  </Stack>
                  <Text
                    fontSize={{ base: "sm", md: "base" }}
                    color={secondaryText}
                    lineHeight={1.8}
                  >
                    <Trans
                      i18nKey="security.body"
                      t={t}
                      components={{
                        icon: (
                          <Icon
                            as={ShieldCheck}
                            display="inline"
                            boxSize={4}
                            verticalAlign="text-bottom"
                            color={secondaryText}
                          />
                        ),
                      }}
                    />
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
                  {t("dialog.title")}
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body px={{ base: 6, md: 8 }} py={0} pb={6}>
                <Stack gap={6}>
                  <Text fontSize={{ base: "sm", md: "base" }} color={dialogTextColor} lineHeight={1.4} whiteSpace="pre-wrap">
                    {t("dialog.body")}
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
                      {t("dialog.close")}
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
                    {canProceed
                      ? t("dialog.continue")
                      : t("dialog.countdown", { seconds: timeLeft })}
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
