"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "../components/ui/color-mode";
import { system } from "../theme";
import { ToasterProvider } from "../components/ui/toaster-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <ToasterProvider>{children}</ToasterProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
