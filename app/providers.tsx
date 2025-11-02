"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { ColorModeProvider } from "../components/ui/color-mode";
import { system } from "../theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
