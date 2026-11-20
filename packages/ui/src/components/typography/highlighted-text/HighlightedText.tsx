import { splitHighlightedText } from '../../../lib/highlight-text';
import { cn } from '../../../lib/utils';

function HighlightedText({
  text,
  query,
  className,
  ...props
}: React.ComponentProps<'span'> & {
  text: string
  query: string
}): React.JSX.Element {
  const segments = splitHighlightedText(text, query);

  return (
    <span
      data-slot="highlighted-text"
      className={cn('highlighted-text', className)}
      {...props}
    >
      {segments.map((segment, index) => (
        <span
          key={`${segment.highlighted}-${index}`}
          data-slot={segment.highlighted ? 'highlighted-text-mark' : undefined}
          className={segment.highlighted ? 'highlighted-text-mark' : undefined}
        >
          {segment.text}
        </span>
      ))}
    </span>
  );
}

export { HighlightedText };
