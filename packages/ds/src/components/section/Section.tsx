import * as React from 'react';

import { cn } from '../../lib/utils';
import { Header, HeaderAction, HeaderContent, HeaderDescription, HeaderMedia, HeaderTitle } from '../header/Header';
import type { MediaProps } from '../media/Media';

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
    <Header
      data-slot="section-header"
      className={cn('section-header', className)}
      {...props}
    />
  );
}

function SectionHeaderMedia({ className, ...props }: MediaProps): React.JSX.Element {
  return (
    <HeaderMedia
      data-slot="section-header-media"
      className={cn('section-header-media', className)}
      {...props}
    />
  );
}

function SectionHeaderContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <HeaderContent
      data-slot="section-header-content"
      className={cn('section-header-content', className)}
      {...props}
    />
  );
}

function SectionHeaderAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <HeaderAction
      data-slot="section-header-action"
      className={cn('section-header-action', className)}
      {...props}
    />
  );
}

function SectionTitle({ className, ...props }: React.ComponentProps<'h2'>): React.JSX.Element {
  return (
    <HeaderTitle
      render={<h2 />}
      data-slot="section-title"
      className={cn('section-title', className)}
      {...props}
    />
  );
}

function SectionDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <HeaderDescription
      render={<p />}
      data-slot="section-description"
      className={cn('section-description', className)}
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
      className={cn('stack section-content', className)}
      {...props}
    />
  );
}

export {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderContent,
  SectionHeaderMedia,
  SectionTitle,
};

export type { SectionContentProps, SectionContentWidth };
