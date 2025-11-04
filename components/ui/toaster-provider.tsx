"use client";

import { createToaster, Toast, Toaster } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const toaster = createToaster({
  placement: "top",
  duration: 5000,
});

const ToasterContext = createContext(toaster);

export function useToaster() {
  return useContext(ToasterContext);
}

export function ToasterProvider({ children }: PropsWithChildren) {
  return (
    <ToasterContext.Provider value={toaster}>
      {children}
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root maxW="480px">
            {toast.type === "loading" ? (
              <Toast.Indicator />
            ) : (
              <Toast.Indicator />
            )}
            <Toast.Title>{toast.title}</Toast.Title>
            {toast.description && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.meta?.closable !== false && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </Toaster>
    </ToasterContext.Provider>
  );
}
