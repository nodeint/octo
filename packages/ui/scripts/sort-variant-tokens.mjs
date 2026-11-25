#!/usr/bin/env node
// Reorders `--variant-*` declarations inside every rule block of the given CSS files.
// Usage: node scripts/sort-variant-tokens.mjs [--check] <file.css>...

import { readFileSync, writeFileSync } from 'node:fs';

const ORDER = [
  '--variant-ring',
  '--variant-bg',
  '--variant-bg-hover',
  '--variant-bg-active',
  '--variant-bg-disabled',
  '--variant-fg',
  '--variant-fg-subtle',
  '--variant-fg-muted',
  '--variant-fg-hover',
  '--variant-fg-active',
  '--variant-border',
  '--variant-border-hover',
  '--variant-border-disabled',
];

const rank = (name) => {
  const index = ORDER.indexOf(name);
  return index === -1 ? ORDER.length : index;
};

const DECLARATION = /^\s*(--[\w-]+)\s*:/;

function sortBlock(lines) {
  const indexed = lines.map((line, position) => ({
    line,
    position,
    name: DECLARATION.exec(line)?.[1],
  }));

  // Only reorder blocks made purely of `--variant-*` declarations.
  if (!indexed.every((entry) => entry.name?.startsWith('--variant-'))) {
    return lines;
  }

  return indexed
    .sort((a, b) => rank(a.name) - rank(b.name) || a.position - b.position)
    .map((entry) => entry.line);
}

function sortSource(source) {
  const output = [];
  let block = null;

  for (const line of source.split('\n')) {
    if (block === null) {
      output.push(line);
      if (line.trimEnd().endsWith('{')) block = [];
    } else if (line.trim() === '}') {
      output.push(...sortBlock(block), line);
      block = null;
    } else {
      block.push(line);
    }
  }

  return output.join('\n');
}

const args = process.argv.slice(2);
const check = args.includes('--check');
const files = args.filter((arg) => arg !== '--check');

if (files.length === 0) {
  console.error('Usage: sort-variant-tokens.mjs [--check] <file.css>...');
  process.exit(1);
}

let unsorted = 0;
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const sorted = sortSource(source);
  if (sorted === source) continue;
  unsorted += 1;
  if (check) console.log(`unsorted: ${file}`);
  else writeFileSync(file, sorted);
}

process.exit(check && unsorted > 0 ? 1 : 0);
