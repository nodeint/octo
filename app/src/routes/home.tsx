import { LinkButton } from '@atlaskit/button/new';
import Heading from '@atlaskit/heading';
import Lozenge from '@atlaskit/lozenge';
import { Box, Inline, Stack, Text } from '@atlaskit/primitives/compiled';
import Toggle from '@atlaskit/toggle';
import { token } from '@atlaskit/tokens';
import { useState } from 'react';

import type { Route } from './+types/home';

type Feature = {
  readonly title: string;
  readonly description: string;
  readonly tag: string;
};

const FEATURES: readonly Feature[] = [
  {
    title: 'Design tokens',
    tag: 'Tokens',
    description: 'Colors, spacing and typography come from tokens and follow light or dark mode.',
  },
  {
    title: 'Accessible components',
    tag: 'Components',
    description: 'Buttons and lozenges ship with keyboard and screen reader support.',
  },
  {
    title: 'Primitives',
    tag: 'Layout',
    description: 'Box, Stack and Inline build layouts without hand-written CSS.',
  },
];

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'Atlassian Design System demo' },
    { name: 'description', content: 'A small demo of atlassian.design in React Router.' },
  ];
}

function isDarkMode(): boolean {
  const { colorMode } = document.documentElement.dataset;
  if (colorMode === 'dark') return true;
  if (colorMode === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

async function applyTheme(isDarkNext: boolean): Promise<void> {
  // Dynamic import: the build loads route modules in Node, which cannot resolve this package.
  const { setGlobalTheme } = await import('@atlaskit/tokens/set-global-theme');
  await setGlobalTheme({ colorMode: isDarkNext ? 'dark' : 'light', light: 'light', dark: 'dark' });
}

function ThemeToggle(): React.ReactElement {
  const [isDark, setIsDark] = useState(isDarkMode);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const isDarkNext = event.target.checked;
    setIsDark(isDarkNext);
    void applyTheme(isDarkNext);
  }

  return (
    <Inline space="space.100" alignBlock="center">
      <label htmlFor="theme-toggle">
        <Text>Dark mode</Text>
      </label>
      <Toggle id="theme-toggle" isChecked={isDark} onChange={handleChange} />
    </Inline>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Box padding="space.400" as="main">
      <Stack space="space.400" alignInline="center">
        <Stack space="space.200" alignInline="center">
          <Lozenge appearance="new">Demo</Lozenge>
          <Heading size="xxlarge" as="h1">
            Atlassian Design System
          </Heading>
          <Text color="color.text.subtle">
            A light demo of tokens, primitives and components from atlassian.design.
          </Text>
          <Inline space="space.100">
            <LinkButton appearance="primary" href="https://atlassian.design">
              Visit atlassian.design
            </LinkButton>
            <LinkButton appearance="subtle" href="https://atlassian.design/components">
              Components
            </LinkButton>
          </Inline>
          <ThemeToggle />
        </Stack>
        <Inline space="space.200" shouldWrap alignBlock="stretch" spread="space-between">
          {FEATURES.map(({ title, description, tag }) => (
            <Box
              key={title}
              padding="space.300"
              backgroundColor="elevation.surface.raised"
              style={{
                width: 280,
                borderRadius: token('radius.large', '8px'),
                boxShadow: token('elevation.shadow.raised'),
              }}
            >
              <Stack space="space.150">
                <Lozenge>{tag}</Lozenge>
                <Heading size="small" as="h2">
                  {title}
                </Heading>
                <Text color="color.text.subtle">{description}</Text>
              </Stack>
            </Box>
          ))}
        </Inline>
      </Stack>
    </Box>
  );
}
