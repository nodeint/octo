import * as React from 'react';

import { cn } from '../../../lib/utils';

type TextRole =
  | 'display'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'subtitle'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'label'
  | 'action'
  | 'action-sm'
  | 'label-sm'
  | 'description'
  | 'caption'
  | 'code'
  | 'field';

type TextAlign = 'start' | 'center' | 'end';

type TextOverflow = 'truncate' | 'clamp-1' | 'clamp-2' | 'clamp-3' | 'break' | 'pre' | 'no-wrap';

type TextProps = React.ComponentProps<'span'> & {
  /** The element to render. Defaults to a `span`; use `p`, `h1`…`h6`, `label`, or `code` when the meaning needs it. */
  as?: React.ElementType;
  /** The text role: size, weight, leading, family, and color come from it. Left unset, the text inherits. */
  variant?: TextRole;
  align?: TextAlign;
  /** How long text behaves when it does not fit. */
  overflow?: TextOverflow;
  italic?: boolean;
  /** Tabular figures for columns of numbers. */
  numeric?: boolean;
};

function Text({
  as: Component = 'span',
  className,
  variant,
  align,
  overflow,
  italic = false,
  numeric = false,
  ...props
}: TextProps): React.JSX.Element {
  return (
    <Component
      data-slot="text"
      data-variant={variant}
      data-align={align}
      data-overflow={overflow}
      data-italic={italic ? '' : undefined}
      data-numeric={numeric ? '' : undefined}
      className={cn('text', className)}
      {...props}
    />
  );
}

export { Text };
export type { TextAlign, TextOverflow, TextProps, TextRole };
