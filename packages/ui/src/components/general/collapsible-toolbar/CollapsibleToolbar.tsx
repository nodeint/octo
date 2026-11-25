import { createContext, useContext, useRef } from 'react';

import { useCollapsibleToolbar } from '../../../hooks/use-collapsible-toolbar';
import type { OmitFromUnion } from '../../../lib/action-paint';
import { cn } from '../../../lib/utils';
import { Collapsible, CollapsibleContent } from '../../layout/collapsible/Collapsible';
import { Icon } from '../../typography/icon/Icon';
import { Toolbar, ToolbarToggle } from '../toolbar/Toolbar';

type CollapsibleToolbarOrientation = 'horizontal' | 'vertical'

interface CollapsibleToolbarContextValue {
  orientation: CollapsibleToolbarOrientation
  isOpen: boolean
  isPinned: boolean
  toggle: () => void
  contentRef: React.RefObject<HTMLDivElement | null>
}

const CollapsibleToolbarContext = createContext<CollapsibleToolbarContextValue | null>(null);

function useCollapsibleToolbarContext(): CollapsibleToolbarContextValue {
  const context = useContext(CollapsibleToolbarContext);
  if (context === null) {
    throw new Error('CollapsibleToolbar parts must be rendered inside CollapsibleToolbar.');
  }
  return context;
}

/** Arrow toward where the content will open, then away from it once open. */
const TRIGGER_ICON = {
  vertical: { closed: 'chevron-up', open: 'chevron-down' },
  horizontal: { closed: 'chevron-left', open: 'chevron-right' },
} as const;

type CollapsibleToolbarProps = Omit<React.ComponentProps<typeof Toolbar>, 'ref'>

/**
 * A toolbar that rests as its trigger and opens its items on hover or click.
 * Compose it from `CollapsibleToolbarContent` and `CollapsibleToolbarTrigger`.
 * Put the trigger last, so the content grows toward the start of the bar.
 * Hover is for a mouse. A click or a tap pins the bar open until the trigger is toggled off.
 */
function CollapsibleToolbar({
  className,
  orientation = 'horizontal',
  ...props
}: CollapsibleToolbarProps): React.JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, isPinned, toggle, railProps } = useCollapsibleToolbar(contentRef);

  return (
    <CollapsibleToolbarContext value={{ orientation, isOpen, isPinned, toggle, contentRef }}>
      <Collapsible open={isOpen} className="collapsible-toolbar-root">
        <Toolbar
          data-slot="collapsible-toolbar"
          orientation={orientation}
          className={cn('collapsible-toolbar', className)}
          {...railProps}
          {...props}
        />
      </Collapsible>
    </CollapsibleToolbarContext>
  );
}

/** The items that open and close. They stay mounted while closed, so an item keeps its own state. */
function CollapsibleToolbarContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleContent>, 'ref' | 'keepMounted'>): React.JSX.Element {
  const { contentRef } = useCollapsibleToolbarContext();

  return (
    <CollapsibleContent
      ref={contentRef}
      keepMounted
      data-slot="collapsible-toolbar-content"
      className={cn('collapsible-toolbar-content', className)}
      {...props}
    />
  );
}

/**
 * The pin toggle. Hover opens the bar and leaves it unpressed, so a hover open and a pinned open differ.
 * It paints an arrow toward the open direction unless given children.
 */
function CollapsibleToolbarTrigger({
  children,
  ...props
}: OmitFromUnion<React.ComponentProps<typeof ToolbarToggle>, 'pressed' | 'onClick'>): React.JSX.Element {
  const { orientation, isOpen, isPinned, toggle } = useCollapsibleToolbarContext();
  const icons = TRIGGER_ICON[orientation];

  return (
    <ToolbarToggle
      data-slot="collapsible-toolbar-trigger"
      pressed={isPinned}
      onClick={toggle}
      {...props}
    >
      {children ?? <Icon name={isOpen ? icons.open : icons.closed} />}
    </ToolbarToggle>
  );
}

export { CollapsibleToolbar, CollapsibleToolbarContent, CollapsibleToolbarTrigger };
export type { CollapsibleToolbarProps };
