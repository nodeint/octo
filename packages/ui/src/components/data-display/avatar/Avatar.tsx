import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

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

function AvatarBadge({
  className,
  render,
  ...props
}: useRender.ComponentProps<'span'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({ className: cn('avatar-badge', className) }, props),
    render,
    state: { slot: 'avatar-badge' },
  });
}

function AvatarGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>({ className: cn('avatar-group', className) }, props),
    render,
    state: { slot: 'avatar-group' },
  });
}

function AvatarGroupCount({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>({ className: cn('avatar-group-count', className) }, props),
    render,
    state: { slot: 'avatar-group-count' },
  });
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
