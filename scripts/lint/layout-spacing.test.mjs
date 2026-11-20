import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import { expect, test } from 'vitest';

import rule from './layout-spacing.mjs';

function lint(code) {
  return new Linter().verify(code, [{
    files: ['**/*.tsx'],
    languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { layout: { rules: { spacing: rule } } },
    rules: { 'layout/spacing': ['error', { componentSlots: ['trigger'] }] },
  }], { filename: 'example.tsx' }).map((message) => message.messageId ?? message.message);
}

test.each([
  ['named layout spacing', `import { Stack } from '@chakra-ui/react'; <Stack p="layout.space.md" gap="layout.gap.sm" />`],
  ['responsive tokens', `import { Box } from '@chakra-ui/react'; <Box p={{base: 'layout.space.sm', md: 'layout.space.lg'}} />`],
  ['conditional tokens', `import { Box } from '@chakra-ui/react'; <Box p={dense ? 'layout.space.sm' : 'layout.space.lg'} />`],
  ['layout aliases', `import { Flex } from '@chakra-ui/react'; <Flex gap="appShell.gutter" />`],
  ['Chakra component APIs', `import { Button } from '@chakra-ui/react'; <Button size="sm" variant="ghost" />`],
  ['token definitions', `import { defineTokens } from '@chakra-ui/react'; defineTokens({spacing:{layout:{space:{sm:{value:'0.5rem'}}}}})`],
  ['unrelated domain values', `const point = {top: 12, left: 8};`],
  ['unrelated JSX props', `import { Box } from './domain'; <Box p={12} />`],
  ['shadowed imports', `import { Box } from '@chakra-ui/react'; function View(Box) { return <Box p={12} /> }`],
  ['component dimensions', `import { Input } from '@chakra-ui/react'; <Input h="full" />`],
  ['namespace primitives', `import * as Chakra from '@chakra-ui/react'; <Chakra.Stack gap="layout.gap.sm" />`],
  ['panel layout parts', `import { Panel } from '../components'; <Panel.Body p="layout.space.md" />`],
  ['public panel imports', `import { Panel } from '@workspace/ui'; <Panel.Root p="layout.space.md" />`],
  ['aliased panel imports', `import { Panel as Frame } from './components/panel'; <Frame.Header gap="layout.gap.sm" />`],
  ['negative layout tokens', `import { Box } from '@chakra-ui/react'; <Box ml="-layout.space.sm" />`],
  ['layout recipe values', `import { defineSlotRecipe } from '@chakra-ui/react'; defineSlotRecipe({base:{header:{px:'layout.space.lg'}}})`],
  ['positioning API offsets', `import { Tooltip } from '@chakra-ui/react'; <Tooltip.Root positioning={{offset:12}} />`],
  ['non-style spread props', `import { Tooltip } from '@chakra-ui/react'; const props={positioning:{offset:12}}; <Tooltip.Root {...props} />`],
])('allows %s', (_name, code) => {
  expect(lint(code)).toEqual([]);
});

test.each([
  ['numeric token strings', `import { Stack } from '@chakra-ui/react'; <Stack p="2" />`],
  ['numeric literals', `import { Box } from '@chakra-ui/react'; <Box p={8} />`],
  ['panel spacing', `import { Panel } from '../components'; <Panel.Body p={8} />`],
  ['public panel spacing', `import { Panel } from '@workspace/ui'; <Panel.Root p="2" />`],
  ['aliased panel spacing', `import { Panel as Frame } from './components/panel'; <Frame.Header gap="2" />`],
  ['raw CSS dimensions', `import { Box } from '@chakra-ui/react'; <Box p="8px" />`],
  ['responsive violations', `import { Box } from '@chakra-ui/react'; <Box p={{base:'layout.space.sm',md:'4'}} />`],
  ['array violations', `import { Box } from '@chakra-ui/react'; <Box p={['layout.space.sm','4']} />`],
  ['conditional violations', `import { Box } from '@chakra-ui/react'; <Box p={dense ? 'layout.space.sm' : '4'} />`],
  ['constant indirection', `import { Box } from '@chakra-ui/react'; const inset='2'; <Box p={inset} />`],
  ['constant object spreads', `import { Box } from '@chakra-ui/react'; const style={p:'2'}; <Box {...style} />`],
  ['nested css violations', `import { Box } from '@chakra-ui/react'; <Box css={{_hover:{paddingInline:'2'}}} />`],
  ['style object references', `import { Box } from '@chakra-ui/react'; const styles={body:{p:'2'}}; <Box css={styles.body} />`],
  ['opaque direct spacing', `import { Box } from '@chakra-ui/react'; <Box p={getInset()} />`],
  ['CSS-variable bypasses', `import { Box } from '@chakra-ui/react'; <Box p="var(--inset)" />`],
  ['aliased primitive imports', `import { Stack as Layout } from '@chakra-ui/react'; <Layout gap="4" />`],
  ['recipe spacing', `import { defineSlotRecipe } from '@chakra-ui/react'; defineSlotRecipe({base:{header:{px:'4'}}})`],
  ['computed literal keys', `import { Box } from '@chakra-ui/react'; <Box css={{['padding']:'8px'}} />`],
  ['namespace recipes', `import * as Chakra from '@chakra-ui/react'; Chakra.defineSlotRecipe({base:{header:{px:'4'}}})`],
  ['styles in JSX spreads', `import { Box } from '@chakra-ui/react'; const props={css:{_hover:{p:'2'}}}; <Box {...props} />`],
])('rejects %s', (_name, code) => {
  expect(lint(code)).toEqual(['named']);
});

test.each([
  ['component layout-token overrides', `import { Button } from '@chakra-ui/react'; <Button px="layout.space.md" />`],
  ['component raw-token overrides', `import { Button } from '@chakra-ui/react'; <Button px="2" />`],
  ['compound component overrides', `import { Drawer } from '@chakra-ui/react'; <Drawer.Body p="layout.space.none" />`],
  ['nested component overrides', `import { Link } from '@chakra-ui/react'; <Link css={{_hover:{px:'layout.space.md'}}} />`],
  ['component recipe slots', `import { defineSlotRecipe } from '@chakra-ui/react'; defineSlotRecipe({base:{trigger:{px:'layout.space.sm'}}})`],
  ['component recipes', `import { defineRecipe } from '@chakra-ui/react'; defineRecipe({base:{px:'layout.space.sm'}})`],
])('protects %s', (_name, code) => {
  expect(lint(code)).toEqual(['component']);
});

test('rejects token names in React inline spacing styles', () => {
  expect(lint(`import { Box } from '@chakra-ui/react'; <Box style={{padding:'layout.space.sm'}} />`)).toEqual(['inline']);
});
