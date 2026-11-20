import { Splitter } from '@chakra-ui/react';

import { readPanelSizes, savePanelSizes } from './panel-sizes';

const LEFT_SIDEBAR_DEFAULT_WIDTH = 300;
const RIGHT_SIDEBAR_DEFAULT_WIDTH = 320;
const SIDEBAR_MIN_WIDTH = '200px';
const MAIN_MIN_WIDTH = '240px';
const FULL_PERCENT = 100;

type AppWorkspaceProps = {
  /** `false` while the left sidebar is collapsed to the activity bar. */
  readonly hasLeftSidebar: boolean;
  readonly hasRightSidebar: boolean;
  readonly renderLeft: () => React.ReactNode;
  readonly renderMain: () => React.ReactNode;
  readonly renderRight: () => React.ReactNode;
  readonly renderHandle: (id: `${string}:${string}`) => React.ReactNode;
};

/** Pixel defaults can't express "the rest", so main gets whatever percentage the sidebars leave over. */
function defaultSizes(hasLeftSidebar: boolean, hasRightSidebar: boolean): number[] {
  const width = Math.max(window.innerWidth, 1);
  const left = hasLeftSidebar ? (LEFT_SIDEBAR_DEFAULT_WIDTH / width) * FULL_PERCENT : 0;
  const right = hasRightSidebar ? (RIGHT_SIDEBAR_DEFAULT_WIDTH / width) * FULL_PERCENT : 0;
  return [
    ...(hasLeftSidebar ? [left] : []),
    FULL_PERCENT - left - right,
    ...(hasRightSidebar ? [right] : []),
  ];
}

/** Left (when open), main, and (when docked) right panels with resize handles between them. */
export function AppWorkspace({
  hasLeftSidebar,
  hasRightSidebar,
  renderLeft,
  renderMain,
  renderRight,
  renderHandle,
}: AppWorkspaceProps): React.ReactElement {
  const panelIds = [
    ...(hasLeftSidebar ? ['left-sidebar'] : []),
    'main',
    ...(hasRightSidebar ? ['right-sidebar'] : []),
  ];
  const panels = [
    ...(hasLeftSidebar
      ? [{ id: 'left-sidebar', minSize: SIDEBAR_MIN_WIDTH, resizeBehavior: 'preserve-pixel-size' as const }]
      : []),
    { id: 'main', minSize: MAIN_MIN_WIDTH },
    ...(hasRightSidebar
      ? [{ id: 'right-sidebar', minSize: SIDEBAR_MIN_WIDTH, resizeBehavior: 'preserve-pixel-size' as const }]
      : []),
  ];

  return (
    // Remount when the panel set changes: the splitter reads its panels once per layout.
    <Splitter.Root
      key={panelIds.join(',')}
      panels={panels}
      defaultSize={readPanelSizes(panelIds) ?? defaultSizes(hasLeftSidebar, hasRightSidebar)}
      onResizeEnd={({ size }) => savePanelSizes(panelIds, size)}
      h="full"
      flex="1"
      minW="0"
    >
      {hasLeftSidebar && <Splitter.Panel id="left-sidebar">{renderLeft()}</Splitter.Panel>}
      {hasLeftSidebar && renderHandle('left-sidebar:main')}
      <Splitter.Panel id="main">{renderMain()}</Splitter.Panel>
      {hasRightSidebar && renderHandle('main:right-sidebar')}
      {hasRightSidebar && <Splitter.Panel id="right-sidebar">{renderRight()}</Splitter.Panel>}
    </Splitter.Root>
  );
}
