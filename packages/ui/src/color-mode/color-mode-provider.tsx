import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

export type ColorModeProviderProps = {
  readonly children: React.ReactNode;
};

export function ColorModeProvider({ children }: ColorModeProviderProps): React.ReactElement {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
