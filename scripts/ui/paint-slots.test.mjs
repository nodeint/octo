import { expect, test } from 'vitest';

import { findSlotMismatches } from './paint-slots.mjs';

const source = (file, css) => ({ file, css });

test('accepts blocks of one emphasis that declare the same slots', () => {
  const lines = findSlotMismatches([
    source('a.css', "[data-paint='a-solid'] { --variant-bg: red; --variant-fg: blue; }"),
    source('b.css', "[data-paint='b-solid'] { --variant-fg: blue; --variant-bg: green; }"),
  ]);
  expect(lines).toEqual([]);
});

test('reports the slot a block is missing against the other blocks of its emphasis', () => {
  const lines = findSlotMismatches([
    source('a.css', "[data-paint='a-solid'] { --variant-bg: red; --variant-fg: blue; }"),
    source('b.css', "[data-paint='b-solid'] { --variant-bg: red; --variant-fg: blue; }"),
    source('c.css', "[data-paint='c-solid'] { --variant-bg: red; }"),
  ]);
  expect(lines).toEqual([
    'c.css: c-solid differs from the other solid blocks (missing: --variant-fg; extra: none)',
  ]);
});

test('does not compare blocks of different emphasis', () => {
  const lines = findSlotMismatches([
    source('a.css', "[data-paint='a-solid'] { --variant-bg: red; }"),
    source('a.css', "[data-paint='a-link'] { --variant-fg: red; }"),
  ]);
  expect(lines).toEqual([]);
});

test('counts a slot declared in a nested dark rule', () => {
  const lines = findSlotMismatches([
    source('a.css', "[data-paint='a-solid'] { --variant-bg: red; .dark & { --variant-fg: blue; } }"),
    source('b.css', "[data-paint='b-solid'] { --variant-bg: red; --variant-fg: blue; }"),
  ]);
  expect(lines).toEqual([]);
});
