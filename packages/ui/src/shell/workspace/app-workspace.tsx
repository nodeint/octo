import { Splitter } from '@chakra-ui/react';

import { APP_RIGHT_SIDEBAR_DEFAULT_WIDTH, APP_SIDEBAR_DEFAULT_WIDTH } from '../constants';
import { readPanelSizes, savePanelSizes } from './panel-sizes';

const SIDEBAR_MIN_WIDTH = '200px';
const MAIN_MIN_WIDTH = '240px';
const FULL_PERCENT = 100;

type AppWorkspaceProps = {
  readonly hasRightSidebar: boolean;
  readonly renderLeft: () => React.ReactNode;
  readonly renderMain: () => React.ReactNode;
  readonly renderRight: () => React.ReactNode;
  readonly renderHandle: (id: `${string}:${string}`) => React.ReactNode;
};

/** Pixel defaults can't express "the rest", so main gets whatever percentage the sidebars leave over. */
function defaultSizes(hasRightSidebar: boolean): number[] {
  const width = Math.max(window.innerWidth, 1);
  const left = (APP_SIDEBAR_DEFAULT_WIDTH / width) * FULL_PERCENT;
  if (!hasRightSidebar) {
    return [left, FULL_PERCENT - left];
  }
  const right = (APP_RIGHT_SIDEBAR_DEFAULT_WIDTH / width) * FULL_PERCENT;
  return [left, FULL_PERCENT - left - right, right];
}

/** Left, main, and (when docked) right panels with resize handles between them. */
export function AppWorkspace({
  hasRightSidebar,
  renderLeft,
  renderMain,
  renderRight,
  renderHandle,
}: AppWorkspaceProps): React.ReactElement {
  const panelIds = hasRightSidebar ? ['left-sidebar', 'main', 'right-sidebar'] : ['left-sidebar', 'main'];
  const panels = [
    { id: 'left-sidebar', minSize: SIDEBAR_MIN_WIDTH, resizeBehavior: 'preserve-pixel-size' as const },
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
      defaultSize={readPanelSizes(panelIds) ?? defaultSizes(hasRightSidebar)}
      onResizeEnd={({ size }) => savePanelSizes(panelIds, size)}
      h="full"
    >
      <Splitter.Panel id="left-sidebar">{renderLeft()}</Splitter.Panel>
      {renderHandle('left-sidebar:main')}
      <Splitter.Panel id="main">{renderMain()}</Splitter.Panel>
      {hasRightSidebar && renderHandle('main:right-sidebar')}
      {hasRightSidebar && <Splitter.Panel id="right-sidebar">{renderRight()}</Splitter.Panel>}
    </Splitter.Root>
  );
}
