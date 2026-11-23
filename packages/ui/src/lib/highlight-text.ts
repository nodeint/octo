const MIN_HIGHLIGHT_TOKEN_LENGTH = 2;

export interface HighlightSegment {
  text: string;
  highlighted: boolean;
}

interface TextRange {
  start: number;
  end: number;
}

function normalizeHighlightQuery(query: string): string {
  return query.trim().toLowerCase();
}

function tokenizeQuery(query: string): string[] {
  const normalized = normalizeHighlightQuery(query);
  if (!normalized) {
    return [];
  }

  const tokens = normalized.split(/[.\s_\-/\\]+/).filter(Boolean);
  return [...new Set(tokens)];
}

function mergeRanges(ranges: TextRange[]): TextRange[] {
  if (ranges.length === 0) {
    return [];
  }

  const sorted = [...ranges].sort((left, right) => left.start - right.start);
  const merged: TextRange[] = [sorted[0]];

  for (let index = 1; index < sorted.length; index += 1) {
    const current = sorted[index];
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

function collectTokenRanges(lowerText: string, token: string, ranges: TextRange[]): void {
  let from = 0;
  while (from < lowerText.length) {
    const index = lowerText.indexOf(token, from);
    if (index === -1) {
      return;
    }

    ranges.push({ start: index, end: index + token.length });
    from = index + token.length;
  }
}

function findMatchRanges(text: string, query: string): TextRange[] {
  const normalizedQuery = normalizeHighlightQuery(query);
  if (!normalizedQuery) {
    return [];
  }

  const lowerText = text.toLowerCase();
  const ranges: TextRange[] = [];
  collectTokenRanges(lowerText, normalizedQuery, ranges);
  if (ranges.length > 0) {
    return ranges;
  }

  const tokens = tokenizeQuery(query);
  const minTokenLength = tokens.length > 1 ? MIN_HIGHLIGHT_TOKEN_LENGTH : 1;

  for (const token of tokens) {
    if (token.length >= minTokenLength) {
      collectTokenRanges(lowerText, token, ranges);
    }
  }

  return mergeRanges(ranges);
}

function rangesToSegments(text: string, ranges: TextRange[]): HighlightSegment[] {
  if (ranges.length === 0) {
    return [{ text, highlighted: false }];
  }

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start), highlighted: false });
    }

    segments.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), highlighted: false });
  }

  return segments;
}

export function splitHighlightedText(text: string, query: string): HighlightSegment[] {
  return rangesToSegments(text, findMatchRanges(text, query));
}
