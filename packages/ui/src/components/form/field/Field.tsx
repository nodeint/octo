'use client';

import type { ReactNode } from 'react';

import { cn } from '../../../lib/utils';
import { Separator } from '../../layout/separator/Separator';
import { Label } from '../../typography/label/Label';

type FieldOrientation = 'vertical' | 'horizontal' | 'responsive'
type FieldLegendVariant = 'legend' | 'label'

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>): React.JSX.Element {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('stack field-set', className)}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: FieldLegendVariant }): React.JSX.Element {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('field-legend', className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="field-group"
      className={cn('stack field-group', className)}
      {...props}
    />
  );
}

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: FieldOrientation
}): React.JSX.Element {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn('field', className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="field-content"
      className={cn('field-content', className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>): React.JSX.Element {
  return (
    <Label
      data-slot="field-label"
      className={cn('field-label', className)}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="field-label"
      className={cn('field-title', className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="field-description"
      className={cn('field-description', className)}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}): React.JSX.Element {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn('field-separator', className)}
      {...props}
    >
      <Separator />
      {children ? <span
          className="field-separator-content"
          data-slot="field-separator-content"
        >
          {children}
        </span> : null}
    </div>
  );
}

type FieldMessage = { message?: string } | undefined

function fieldMessageEntry(error: FieldMessage): [string | undefined, FieldMessage] {
  return [error?.message, error];
}

function FieldErrorList({ errors }: { errors: FieldMessage[] }) {
  return (
    <ul className="field-error-list">
      {errors.map((error, index) =>
        error?.message && <li key={index}>{error.message}</li>
      )}
    </ul>
  );
}

function fieldErrorContent(
  children: ReactNode,
  errors: FieldMessage[] | undefined,
): ReactNode {
  if (children) {
    return children;
  }
  if (!errors) {
    return null;
  }
  if (errors.length === 0) {
    return null;
  }

  const uniqueErrors = [...new Map(errors.map(fieldMessageEntry)).values()];
  if (uniqueErrors.length === 1) {
    return uniqueErrors[0]?.message;
  }
  return <FieldErrorList errors={uniqueErrors} />;
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: FieldMessage[]
}): React.JSX.Element | null {
  const content = fieldErrorContent(children, errors);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('field-error', className)}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
export type { FieldLegendVariant,FieldOrientation };
