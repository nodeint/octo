import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

import { system } from '../theme';

export type AppProviderProps = {
  readonly children: React.ReactNode;
};

/** Provides the Chakra theme system (including the app shell recipe) and class-based color mode. */
export function AppProvider({ children }: AppProviderProps): React.ReactElement {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
