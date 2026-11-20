import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';

import { cn } from '../../../lib/utils';

/**
 * Base UI Collapsible — Root · Trigger · Panel.
 *
 * Trigger: prefer `render={<Button … />}` (or ToolbarButton) for closed control skin (U2).
 * Panel is exported as `CollapsibleContent` (shadcn name) and `CollapsiblePanel` (Base UI name).
 *
 * @see https://base-ui.com/react/components/collapsible
 */
function Collapsible({
  className,
  ...props
}: CollapsiblePrimitive.Root.Props): React.JSX.Element {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn('collapsible', className)}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.JSX.Element {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        'collapsible-trigger',
        className,
      )}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.JSX.Element {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn('collapsible-content', className)}
      {...props}
    />
  );
}

/** Base UI anatomy alias — same as {@link CollapsibleContent}. */
const CollapsiblePanel = CollapsibleContent;

export {
  Collapsible,
  CollapsibleContent,
  CollapsiblePanel,
  CollapsibleTrigger,
};
