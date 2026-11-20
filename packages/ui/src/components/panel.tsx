import { createSlotRecipeContext, type HTMLChakraProps } from '@chakra-ui/react';

const { withProvider, withContext } = createSlotRecipeContext({ key: 'panel' });

const PanelRoot = withProvider<HTMLDivElement, HTMLChakraProps<'div'>>('div', 'root');
const PanelHeader = withContext<HTMLDivElement, HTMLChakraProps<'div'>>('div', 'header');
const PanelTitle = withContext<HTMLHeadingElement, HTMLChakraProps<'h2'>>('h2', 'title');
const PanelActions = withContext<HTMLDivElement, HTMLChakraProps<'div'>>('div', 'actions');
const PanelBody = withContext<HTMLDivElement, HTMLChakraProps<'div'>>('div', 'body');

export const Panel = {
  Root: PanelRoot,
  Header: PanelHeader,
  Title: PanelTitle,
  Actions: PanelActions,
  Body: PanelBody,
} as const;
