import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '../../lib/utils';

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

/**
 * Renders a `span` by default. Pass `render` with `<p />`, `<h1 />`…`<h6 />`, `<label />` or `<code />`
 * when the meaning needs it.
 */
type TextProps = useRender.ComponentProps<'span'> & {
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
  className,
  variant,
  align,
  overflow,
  italic = false,
  numeric = false,
  render,
  ...props
}: TextProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({ className: cn('text', className) } as React.ComponentProps<'span'>, props),
    state: { slot: 'text', variant, align, overflow, italic, numeric },
    render,
  });
}

export { Text };
export type { TextAlign, TextOverflow, TextProps, TextRole };
