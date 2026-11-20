import { cn } from '../../../lib/utils';

function Section({ className, ...props }: React.ComponentProps<'section'>): React.JSX.Element {
  return (
    <section
      data-slot="section"
      className={cn('section', className)}
      {...props}
    />
  );
}

function SectionHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="section-header"
      className={cn('section-header', className)}
      {...props}
    />
  );
}

function SectionTitle({ className, ...props }: React.ComponentProps<'h2'>): React.JSX.Element {
  return (
    <h2
      data-slot="section-title"
      className={cn('section-title', className)}
      {...props}
    />
  );
}

function SectionDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="section-description"
      className={cn('section-description', className)}
      {...props}
    />
  );
}

function SectionAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="section-action"
      className={cn('section-action', className)}
      {...props}
    />
  );
}

type SectionContentWidth = 'content' | 'full';

type SectionContentProps = React.ComponentProps<'div'> & {
  /** `content` stops at the content width (forms, alerts); `full` fills the section (lists, tables). */
  width?: SectionContentWidth;
};

function SectionContent({ className, width = 'content', ...props }: SectionContentProps): React.JSX.Element {
  return (
    <div
      data-slot="section-content"
      data-width={width}
      className={cn('section-content', className)}
      {...props}
    />
  );
}

export {
  Section,
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
};

export type { SectionContentProps, SectionContentWidth };
