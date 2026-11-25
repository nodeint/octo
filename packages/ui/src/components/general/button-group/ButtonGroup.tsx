import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { type GroupVariant, resolveGroupPaint } from '../../../lib/group-paint';
import { cn } from '../../../lib/utils';
import { Separator } from '../../layout/separator/Separator';

type ButtonGroupOrientation = 'horizontal' | 'vertical'
type ButtonGroupVariant = GroupVariant
type ButtonGroupSize = 'xs' | 'sm' | 'md' | 'lg'

function ButtonGroup({
  className,
  orientation = 'horizontal',
  variant = 'outline',
  size,
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: ButtonGroupOrientation
  /**
   * Sets the identity colors (fill, text, border) of the fields and actions inside, over their own variant.
   * Focus, invalid and disabled text paint stay with the child. Defaults to outline.
   */
  variant?: ButtonGroupVariant
  /**
   * One step of the control scale. The buttons and fields inside take it and cannot override it.
   * Without it each child keeps its own.
   */
  size?: ButtonGroupSize
}): React.JSX.Element {
  const paint = resolveGroupPaint(variant);
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-group-variant={variant}
      data-paint={paint}
      data-group-size={size}
      className={cn('group button-group', className)}
      {...props}
    />
  );
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('button-group-text', className),
      },
      props
    ),
    render,
    state: {
      slot: 'button-group-text',
    },
    });
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>): React.JSX.Element {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn('button-group-separator', className)}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
};
export type { ButtonGroupOrientation, ButtonGroupSize, ButtonGroupVariant };
