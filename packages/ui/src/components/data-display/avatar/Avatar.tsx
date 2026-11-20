import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import * as React from 'react';

import { cn } from '../../../lib/utils';

type AvatarSize = 'md' | 'sm' | 'lg'

type AvatarProps = AvatarPrimitive.Root.Props & {
  size?: AvatarSize
}

function Avatar({
  className,
  size = 'md',
  ...props
}: AvatarProps): React.JSX.Element {
  return (
    <AvatarPrimitive.Root
      {...props}
      data-slot="avatar"
      data-size={size}
      className={cn('avatar', className)}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props): React.JSX.Element {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('avatar-image', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.JSX.Element {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'avatar-fallback',
        className
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'avatar-badge',
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="avatar-group"
      className={cn('avatar-group', className)}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'avatar-group-count',
        className
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
};
export type { AvatarProps, AvatarSize };
