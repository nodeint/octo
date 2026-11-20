import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

export type ColorModeProviderProps = {
  readonly children: React.ReactNode;
};

// Disable the browser's default cross-fade so the circular reveal in ColorModeButton is the only animation.
const system = createSystem(
  defaultConfig,
  defineConfig({
    globalCss: {
      '::view-transition-old(root), ::view-transition-new(root)': {
        animation: 'none',
        mixBlendMode: 'normal',
      },
    },
  }),
);

export function ColorModeProvider({ children }: ColorModeProviderProps): React.ReactElement {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
