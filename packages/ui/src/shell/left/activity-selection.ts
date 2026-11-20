/**
 * The activity to show for a saved or requested value: `undefined` means nothing was chosen yet so the
 * first activity opens, `null` is a collapsed sidebar, and an id that no longer exists falls back to the first.
 */
export function resolveActivityId(candidate: string | null | undefined, ids: readonly string[]): string | null {
  if (candidate === null) {
    return null;
  }
  if (candidate !== undefined && ids.includes(candidate)) {
    return candidate;
  }
  return ids[0] ?? null;
}

/** Reads a saved selection; anything that is not a JSON string or `null` counts as nothing saved. */
export function parseActivityId(raw: string | null): string | null | undefined {
  if (raw === null) {
    return undefined;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === 'string' || parsed === null ? parsed : undefined;
  } catch {
    return undefined;
  }
}

/** Collapsing keeps the last open activity so the shortcut can bring it back. */
export function toggleSidebar(
  activeId: string | null,
  lastActiveId: string | null,
  ids: readonly string[],
): string | null {
  return activeId === null ? resolveActivityId(lastActiveId ?? undefined, ids) : null;
}
