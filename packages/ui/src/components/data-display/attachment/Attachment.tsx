import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';

import { withDefaultVariant } from '../../../lib/action-paint';
import { cn } from '../../../lib/utils';
import { Button } from '../../form/button/Button';

type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done'
type AttachmentSize = 'md' | 'sm' | 'xs'

/** The media step an attachment hands to its media: the size picks one step of the media scale. */
const ATTACHMENT_MEDIA_SIZE = { md: 'lg', sm: 'sm', xs: 'xs' } as const satisfies Record<AttachmentSize, string>;
type AttachmentOrientation = 'horizontal' | 'vertical'
type AttachmentMediaVariant = 'icon' | 'image'

type AttachmentProps = React.ComponentProps<'div'> & {
  state?: AttachmentState
  size?: AttachmentSize
  orientation?: AttachmentOrientation
}

function Attachment({
  className,
  state = 'done',
  size = 'md',
  orientation = 'horizontal',
  ...props
}: AttachmentProps): React.JSX.Element {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      data-media-size={ATTACHMENT_MEDIA_SIZE[size]}
      data-orientation={orientation}
      className={cn('attachment', className)}
      {...props}
    />
  );
}

function AttachmentMedia({
  className,
  variant = 'icon',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: AttachmentMediaVariant
}): React.JSX.Element {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      data-media-fit={variant === 'image' ? 'image' : undefined}
      className={cn('media-frame attachment-media', className)}
      {...props}
    />
  );
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="attachment-content"
      className={cn('attachment-content', className)}
      {...props}
    />
  );
}

function AttachmentTitle({
  className,
  ...props
}: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="attachment-title"
      className={cn('attachment-title', className)}
      {...props}
    />
  );
}

function AttachmentDescription({
  className,
  ...props
}: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="attachment-description"
      className={cn('attachment-description', className)}
      {...props}
    />
  );
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="attachment-actions"
      className={cn('attachment-actions', className)}
      {...props}
    />
  );
}

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
        className: cn('attachment-trigger', className),
      },
      props
    ),
    render,
    state: {
      slot: 'attachment-trigger',
    },
  });
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="attachment-group"
      className={cn('attachment-group', className)}
      {...props}
    />
  );
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
