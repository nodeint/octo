'use client';

import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Input } from '../../form/input/Input';
import { Button } from '../../general/button/Button';
import { Icon } from '../../typography/icon/Icon';
import { Text } from '../../typography/text/Text';

type EditableTextVariant = 'title-md' | 'title-sm' | 'body';

type EditTrigger = 'button' | 'double-click';

type EditableTextProps = Omit<
  React.ComponentProps<'div'>,
  'children' | 'onChange'
> & {
  /** The committed text. */
  value: string;
  /** Called with the trimmed text when an edit ends on a new, non-empty value. */
  onValueCommit: (value: string) => void;
  /** Names the field and the pencil button. */
  label: string;
  /** The type role the text reads in at rest and while editing. */
  variant?: EditableTextVariant;
  /** What starts an edit: the pencil (`button`) or a double click on the text (`double-click`). */
  editTrigger?: EditTrigger;
  /** Shows the pencil beside the text. Hide it with `editTrigger="double-click"` for a bare title. */
  showEditButton?: boolean;
  /** Classes for the field only, which exists just while editing. */
  inputClassName?: string;
  /** Receives the test id of the field. The pencil button takes the same id plus `-edit`. */
  'data-testid'?: string;
};

const KEY_ENTER = 'Enter';
const KEY_ESCAPE = 'Escape';

function useEditableDraft(value: string, onValueCommit: (value: string) => void) {
  const [draft, setDraft] = React.useState<string | null>(null);
  const cancelledRef = React.useRef(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isEditing = draft !== null;

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function startEdit(): void {
    cancelledRef.current = false;
    setDraft(value);
  }

  function commit(): void {
    const next = draft?.trim() ?? '';
    setDraft(null);
    // Escape unmounts the field, which can still fire a blur; the flag keeps that blur from committing.
    if (!cancelledRef.current && next.length > 0 && next !== value) {
      onValueCommit(next);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === KEY_ENTER) {
      // Blur commits, so a rename runs through one path.
      event.currentTarget.blur();
    } else if (event.key === KEY_ESCAPE) {
      // Keep Escape from closing a surrounding pane while it only cancels the edit.
      event.preventDefault();
      cancelledRef.current = true;
      setDraft(null);
    }
  }

  function handleValueKeyDown(event: React.KeyboardEvent<HTMLSpanElement>): void {
    if (event.key === KEY_ENTER) {
      event.preventDefault();
      startEdit();
    }
  }

  return { draft, setDraft, inputRef, startEdit, commit, handleKeyDown, handleValueKeyDown };
}

/**
 * Text that is edited where it is read. At rest it is plain text, hover tints it. An edit starts from the
 * pencil or, with `editTrigger="double-click"`, from a double click on the text. Enter or blur commits,
 * Escape cancels.
 */
function EditableText({
  value,
  onValueCommit,
  label,
  variant = 'title-sm',
  editTrigger = 'button',
  showEditButton = true,
  inputClassName,
  className,
  'data-testid': testId,
  ...props
}: EditableTextProps): React.JSX.Element {
  const { draft, setDraft, inputRef, startEdit, commit, handleKeyDown, handleValueKeyDown } =
    useEditableDraft(value, onValueCommit);
  const isEditing = draft !== null;

  const isDoubleClick = editTrigger === 'double-click';

  return (
    <div
      {...props}
      data-slot="editable-text"
      data-variant={variant}
      data-edit-trigger={editTrigger}
      className={cn('editable-text', className)}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={draft}
          aria-label={label}
          className={cn('editable-text-input', inputClassName)}
          onFocus={(event) => {
            event.currentTarget.select();
          }}
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          data-testid={testId}
        />
      ) : (
        <Text
          as="span"
          variant={variant}
          overflow="truncate"
          className="editable-text-value"
          role={isDoubleClick ? 'button' : undefined}
          aria-label={isDoubleClick ? label : undefined}
          tabIndex={isDoubleClick ? 0 : undefined}
          onDoubleClick={isDoubleClick ? startEdit : undefined}
          onKeyDown={isDoubleClick ? handleValueKeyDown : undefined}
          data-testid={testId}
        >
          {value}
        </Text>
      )}
      {!isEditing && showEditButton ? (
        <Button
          variant="ghost"
          shape="icon"
          size="xs"
          tabIndex={-1}
          aria-label={label}
          title={label}
          className="editable-text-edit"
          onClick={startEdit}
          data-testid={testId ? `${testId}-edit` : undefined}
        >
          <Icon name="pencil" />
        </Button>
      ) : null}
    </div>
  );
}

export { EditableText };
export type { EditableTextProps, EditableTextVariant, EditTrigger };
