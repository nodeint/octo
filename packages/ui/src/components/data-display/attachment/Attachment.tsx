import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';

import { withDefaultVariant } from '../../../lib/action-paint';
import { cn } from '../../../lib/utils';
import { Button } from '../../general/button/Button';

type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done'
type AttachmentSize = 'md' | 'sm' | 'xs'

/** The media step an attachment hands to its media: the size picks one step of the media scale. */
const ATTACHMENT_MEDIA_SIZE = { md: 'lg', sm: 'sm', xs: 'xs' } as const satisfies Record<AttachmentSize, string>;
type AttachmentOrientation = 'horizontal' | 'vertical'
type AttachmentMediaVariant = 'icon' | 'image'

type AttachmentProps = useRender.ComponentProps<'div'> & {
  state?: AttachmentState
  size?: AttachmentSize
  orientation?: AttachmentOrientation
}

function Attachment({
  className,
  state = 'done',
  size = 'md',
  orientation = 'horizontal',
  render,
  ...props
}: AttachmentProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('row row-focus-within row-hover-child attachment', className),
        'data-media-size': ATTACHMENT_MEDIA_SIZE[size],
        'data-row-size': size,
      } as React.ComponentProps<'div'>,
      props
    ),
    render,
    state: {
      slot: 'attachment',
      state,
      size,
      orientation,
      paint: 'base-surface',
      'row-invalid': state === 'error',
    },
  });
}

function AttachmentMedia({
  className,
  variant = 'icon',
  render,
  ...props
}: useRender.ComponentProps<'div'> & {
  variant?: AttachmentMediaVariant
}): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('media-frame attachment-media', className),
        'data-media-fit': variant === 'image' ? 'image' : undefined,
      } as React.ComponentProps<'div'>,
      props
    ),
    render,
    state: {
      slot: 'attachment-media',
      variant,
    },
  });
}

function createPart(
  tag: 'div' | 'span',
  slot: string,
  recipe: string,
): (props: useRender.ComponentProps<'div'>) => React.JSX.Element {
  return function AttachmentPart({ className, render, ...props }) {
    return useRender({
      defaultTagName: tag,
      props: mergeProps<'div'>({ className: cn(recipe, slot, className) }, props),
      render,
      state: { slot, 'row-type': recipe === 'row-content' ? 'compact' : undefined },
    });
  };
}

const AttachmentContent = createPart('div', 'attachment-content', 'row-content');
const AttachmentTitle = createPart('span', 'attachment-title', 'row-title row-title-text');
const AttachmentDescription = createPart('span', 'attachment-description', 'row-description');
const AttachmentActions = createPart('div', 'attachment-actions', 'row-actions');

function AttachmentAction({
  className,
  size = 'xs',
  shape = 'icon',
  variant = 'muted',
  ...props
}: React.ComponentProps<typeof Button>): React.JSX.Element {
  return (
    <Button
      data-slot="attachment-action"
      size={size}
      shape={shape}
      className={cn(className)}
      {...withDefaultVariant(props, variant)}
    />
  );
}

function resolveTriggerType(
  render: unknown,
  type: React.ComponentProps<'button'>['type'],
): React.ComponentProps<'button'>['type'] {
  if (render || type !== undefined) {
    return type;
  }
  return 'button';
}

function AttachmentTrigger({
  className,
  render,
  type,
  ...props
}: useRender.ComponentProps<'button'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: resolveTriggerType(render, type),
        className: cn('row-trigger row-trigger-cover attachment-trigger', className),
      },
      props
    ),
    render,
    state: {
      slot: 'attachment-trigger',
    },
  });
}

function AttachmentGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>({ className: cn('row-group attachment-group', className) }, props),
    render,
    state: { slot: 'attachment-group', orientation: 'horizontal' },
  });
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
};
export type {
  AttachmentMediaVariant,
  AttachmentOrientation,
  AttachmentProps,
  AttachmentSize,
  AttachmentState,
};
