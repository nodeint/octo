import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Cursor for a list whose field keeps focus.
 * Arrow keys are read from the document so the field element stays caller-owned.
 */

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';
const KEY_ENTER = 'Enter';
const ACTIVE_ROW = '[aria-selected="true"]';
const KEY_RESULT_MOVE = 'move';
const KEY_RESULT_CONFIRM = 'confirm';
const KEY_RESULT_IGNORE = 'ignore';

export type ListNavigationRow = {
  id: string;
  disabled?: boolean;
};

export type ListNavigationInput<Field extends HTMLElement> = {
  isEnabled: boolean;
  fieldRef: RefObject<Field | null>;
  rows: readonly ListNavigationRow[];
  anchor: number;
  onConfirm?: (index: number) => void;
};

export type ListNavigation = {
  activeIndex: number;
  move: (index: number) => void;
  bindSurface: (node: HTMLElement | null) => void;
};

type ListCursorScan = {
  index: number;
  count: number;
  delta: number;
  isBlocked: (candidate: number) => boolean;
};

type ListNavigationState = {
  isEnabled: boolean;
  fieldRef: RefObject<HTMLElement | null>;
  rows: readonly ListNavigationRow[];
  activeIndex: number;
  onConfirm?: (index: number) => void;
  move: (index: number) => void;
};

type ListKeyResult =
  | { kind: typeof KEY_RESULT_MOVE; index: number }
  | { kind: typeof KEY_RESULT_CONFIRM }
  | { kind: typeof KEY_RESULT_IGNORE };

function listRowKey(rows: readonly ListNavigationRow[]): string {
  return rows.map((row) => `${row.id}:${row.disabled === true}`).join('\n');
}

function wrapIndex(index: number, count: number): number {
  if (index < 0) return count - 1;
  if (index >= count) return 0;
  return index;
}

function stepListCursor(scan: ListCursorScan): number {
  if (scan.count === 0) return 0;
  let cursor = scan.index;
  for (let step = 0; step < scan.count; step += 1) {
    cursor = wrapIndex(cursor + scan.delta, scan.count);
    if (!scan.isBlocked(cursor)) return cursor;
  }
  return scan.index;
}

function firstOpenRow(rows: readonly ListNavigationRow[]): number {
  const index = rows.findIndex((row) => row.disabled !== true);
  if (index < 0) return 0;
  return index;
}

function resolveListCursor(index: number, rows: readonly ListNavigationRow[]): number {
  if (rows.length === 0) return 0;
  const isInRange = index >= 0 && index < rows.length;
  if (!isInRange) return firstOpenRow(rows);
  if (rows[index]?.disabled === true) return firstOpenRow(rows);
  return index;
}

function arrowDelta(key: string): number | null {
  if (key === KEY_ARROW_DOWN) return 1;
  if (key === KEY_ARROW_UP) return -1;
  return null;
}

function isBlockedRow(rows: readonly ListNavigationRow[], index: number): boolean {
  return rows[index]?.disabled === true;
}

function isFieldTarget(target: EventTarget | null, field: HTMLElement | null): boolean {
  if (!field) return false;
  if (!(target instanceof Node)) return false;
  return field.contains(target);
}

function hasKeyModifier(event: KeyboardEvent): boolean {
  return event.metaKey || event.ctrlKey || event.altKey;
}

function isConfirmKey(event: KeyboardEvent): boolean {
  if (event.key !== KEY_ENTER) return false;
  if (event.shiftKey) return false;
  if (hasKeyModifier(event)) return false;
  return !event.isComposing;
}

function readListKey(event: KeyboardEvent, state: ListNavigationState): ListKeyResult {
  if (!state.isEnabled) return { kind: KEY_RESULT_IGNORE };
  if (!isFieldTarget(event.target, state.fieldRef.current)) return { kind: KEY_RESULT_IGNORE };
  const delta = arrowDelta(event.key);
  if (delta !== null) {
    event.preventDefault();
    const index = stepListCursor({
      index: state.activeIndex,
      count: state.rows.length,
      delta,
      isBlocked: (candidate) => isBlockedRow(state.rows, candidate),
    });
    return { kind: KEY_RESULT_MOVE, index };
  }
  if (!state.onConfirm) return { kind: KEY_RESULT_IGNORE };
  if (!isConfirmKey(event)) return { kind: KEY_RESULT_IGNORE };
  if (state.rows.length === 0) return { kind: KEY_RESULT_IGNORE };
  event.preventDefault();
  return { kind: KEY_RESULT_CONFIRM };
}

function movedListState(state: ListNavigationState, event: KeyboardEvent): ListNavigationState | null {
  const result = readListKey(event, state);
  if (result.kind === KEY_RESULT_IGNORE) return null;
  if (result.kind === KEY_RESULT_CONFIRM) {
    state.onConfirm?.(state.activeIndex);
    return null;
  }
  return { ...state, activeIndex: result.index };
}

function isTextEntry(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return target.closest('input, textarea') !== null;
}

function onSurfaceMouseDown(event: MouseEvent): void {
  if (isTextEntry(event.target)) return;
  event.preventDefault();
}

function bindSurfacePointer(surface: HTMLElement): () => void {
  surface.addEventListener('mousedown', onSurfaceMouseDown);
  return () => surface.removeEventListener('mousedown', onSurfaceMouseDown);
}

function scrollActiveRow(surface: HTMLElement | null): void {
  if (!surface) return;
  const selected = surface.querySelector(ACTIVE_ROW);
  if (!(selected instanceof HTMLElement)) return;
  selected.scrollIntoView({ block: 'nearest' });
}

function useTrackedCursor(rowKey: string, anchor: number): { index: number; move: (index: number) => void } {
  const [stored, setStored] = useState({ key: rowKey, index: anchor });
  const isCurrent = stored.key === rowKey;
  const index = isCurrent ? stored.index : anchor;
  function move(next: number): void {
    setStored({ key: rowKey, index: next });
  }
  return { index, move };
}

function useFocusFieldWhenEnabled<Field extends HTMLElement>(
  isEnabled: boolean,
  fieldRef: RefObject<Field | null>,
): void {
  const wasEnabledRef = useRef(false);
  useEffect(() => {
    const shouldFocus = isEnabled && !wasEnabledRef.current;
    wasEnabledRef.current = isEnabled;
    if (!shouldFocus) return;
    fieldRef.current?.focus({ preventScroll: true });
  }, [fieldRef, isEnabled]);
}

export function useListNavigation<Field extends HTMLElement>(
  input: ListNavigationInput<Field>,
): ListNavigation {
  const rowKey = listRowKey(input.rows);
  const tracked = useTrackedCursor(rowKey, input.anchor);
  const activeIndex = resolveListCursor(tracked.index, input.rows);
  const stateRef = useRef<ListNavigationState | null>(null);
  const [surface, setSurface] = useState<HTMLElement | null>(null);
  const bindSurface = useCallback((node: HTMLElement | null) => {
    setSurface(node);
  }, []);

  useEffect(() => {
    stateRef.current = {
      isEnabled: input.isEnabled,
      fieldRef: input.fieldRef,
      rows: input.rows,
      activeIndex,
      onConfirm: input.onConfirm,
      move: tracked.move,
    };
  }, [activeIndex, input.fieldRef, input.isEnabled, input.onConfirm, input.rows, tracked.move]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      const state = stateRef.current;
      if (!state) return;
      const next = movedListState(state, event);
      if (!next) return;
      stateRef.current = next;
      next.move(next.activeIndex);
    }
    if (typeof document === 'undefined') return () => undefined;
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useFocusFieldWhenEnabled(input.isEnabled, input.fieldRef);

  useEffect(() => {
    if (!surface) return undefined;
    return bindSurfacePointer(surface);
  }, [surface]);

  useEffect(() => {
    scrollActiveRow(surface);
  }, [activeIndex, rowKey, surface]);

  return {
    activeIndex,
    move: tracked.move,
    bindSurface,
  };
}

Object.assign(useListNavigation, { resolveListCursor, stepListCursor });
