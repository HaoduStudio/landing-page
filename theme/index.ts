import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  disableLayers: true,
  globalCss: {},
});

export const system = createSystem(defaultConfig, config);
