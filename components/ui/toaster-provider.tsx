"use client";

import { createToaster } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const toaster = createToaster({
  placement: "top",
});

const ToasterContext = createContext(toaster);

export function useToaster() {
  return useContext(ToasterContext);
}

export function ToasterProvider({ children }: PropsWithChildren) {
  return (
    <ToasterContext.Provider value={toaster}>
      {children}
    </ToasterContext.Provider>
  );
}
