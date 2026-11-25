/**
 * Resolved paint baseline of packages/ui.
 *
 * Resolves every `--variant-*` slot that each paint combination ends up with, in light and dark, by replaying
 * the cascade of the CSS sources with postcss. A paint combination is one `data-paint` value
 * declared by a block in styles/variants/; the snapshot key is `<tone>/<emphasis>`.
 *
 * Usage:
 *   node scripts/ui/paint-baseline.mjs           Compare the resolved values with the committed snapshot; exit 1 on a diff.
 *   node scripts/ui/paint-baseline.mjs --write   Rewrite the snapshot from the CSS sources.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';

import { REPO_ROOT } from '../lib/repo.mjs';

const STYLES = join(REPO_ROOT, 'packages/ui/src/styles');
const SNAPSHOT = join(dirname(fileURLToPath(import.meta.url)), 'paint-baseline.json');

/** Files whose `:root` and `.dark` blocks declare the tokens every paint reads, in cascade order. */
const TOKEN_FILES = [
  'theme/swatches.css',
  'theme/base.css',
  'theme/primary.css',
  'theme/status.css',
  'theme/state.css',
  'theme/shadow.css',
  'components.css',
];

/** Files whose `[data-paint]` blocks build the paint, in cascade order. */
const PAINT_FILES = ['variants/paint.css', ...readdirSync(join(STYLES, 'variants'))
  .filter((file) => file !== 'paint.css')
  .toSorted()
  .map((file) => `variants/${file}`)];

/** Declarations of a rule, in source order, as `[prop, value]` pairs. */
function declarationsOf(rule) {
  const pairs = [];
  rule.each((node) => {
    if (node.type === 'decl' && node.prop.startsWith('--')) {
      pairs.push([node.prop, node.value.trim()]);
    }
  });
  return pairs;
}

function selectorsOf(rule) {
  return rule.selector.split(',').map((selector) => selector.trim());
}

/** Fold the `:root` and `.dark` declarations of the token files into one map per mode. */
function loadTokens() {
  const modes = { light: new Map(), dark: new Map() };
  for (const file of TOKEN_FILES) {
    postcss.parse(readFileSync(join(STYLES, file), 'utf8')).walkRules((rule) => {
      const selectors = selectorsOf(rule);
      const root = selectors.includes(':root');
      const dark = selectors.includes('.dark');
      for (const [prop, value] of declarationsOf(rule)) {
        if (root) {
          modes.light.set(prop, value);
          modes.dark.set(prop, value);
        }
        if (dark) {
          modes.dark.set(prop, value);
        }
      }
    });
  }
  return modes;
}

/** True when a selector made of one attribute test matches the element. */
function matchesAttribute(selector, element) {
  const match = /^\[(data-paint)(?:='([^']+)')?\]$/.exec(selector);
  if (!match) {
    throw new Error(`Unsupported selector in a paint file: ${selector}`);
  }
  const actual = element.paint;
  if (actual === undefined) {
    return false;
  }
  return match[2] === undefined || match[2] === actual;
}

/** Collect the declarations that apply to an element, ordered by specificity then source order. */
function collectPaintDeclarations(element, dark) {
  const applied = [];
  let order = 0;
  for (const file of PAINT_FILES) {
    postcss.parse(readFileSync(join(STYLES, file), 'utf8')).each((node) => {
      if (node.type !== 'rule') {
        return;
      }
      if (selectorsOf(node).some((selector) => matchesAttribute(selector, element))) {
        for (const pair of declarationsOf(node)) {
          applied.push({ pair, specificity: 1, order: order++ });
        }
        node.walkRules((nested) => {
          if (nested.selector !== '.dark &') {
            throw new Error(`Unsupported nested selector: ${nested.selector}`);
          }
          if (dark) {
            for (const pair of declarationsOf(nested)) {
              applied.push({ pair, specificity: 2, order: order++ });
            }
          }
        });
      }
    });
  }
  applied.sort((a, b) => a.specificity - b.specificity || a.order - b.order);
  return applied.map((entry) => entry.pair);
}

/** Replace every var() in a value with the value of its property; throws on an undeclared property without a fallback. */
function resolveValue(value, declared, trail = []) {
  let result = value;
  const varPattern = /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/;
  let match = varPattern.exec(result);
  while (match) {
    const [whole, name, fallback] = match;
    if (trail.includes(name)) {
      throw new Error(`Cycle through ${name}`);
    }
    let replacement;
    if (declared.has(name)) {
      replacement = resolveValue(declared.get(name), declared, [...trail, name]);
    } else if (fallback === undefined) {
      throw new Error(`Undeclared property ${name} in "${value}"`);
    } else {
      replacement = fallback.trim();
    }
    result = result.replace(whole, replacement);
    match = varPattern.exec(result);
  }
  return result.replaceAll(/\s+/g, ' ').trim();
}

/** Every `--variant-*` slot of one element in one mode, resolved. */
function resolveElement(tokens, element, dark) {
  const declared = new Map(tokens);
  for (const [prop, value] of collectPaintDeclarations(element, dark)) {
    declared.set(prop, value);
  }
  const slots = {};
  for (const prop of [...declared.keys()].filter((name) => name.startsWith('--variant-')).toSorted()) {
    slots[prop] = resolveValue(declared.get(prop), declared, [prop]);
  }
  return slots;
}

/**
 * Every paint combination the sources declare: one per `[data-paint='name']` selector in the paint files, never
 * read from the snapshot, so a combination missing from the snapshot (or a snapshot key with no source block)
 * shows up as a diff. The snapshot key is `<tone>/<emphasis>`; `field` keeps its key `field/field`.
 */
function pairs() {
  const all = new Map();
  for (const file of PAINT_FILES) {
    postcss.parse(readFileSync(join(STYLES, file), 'utf8')).each((node) => {
      if (node.type !== 'rule') {
        return;
      }
      for (const selector of selectorsOf(node)) {
        const name = /^\[data-paint='([^']+)'\]$/.exec(selector)?.[1];
        if (name !== undefined) {
          const key = name === 'field' ? 'field/field' : name.replace('-', '/');
          all.set(key, { paint: name });
        }
      }
    });
  }
  return all;
}

function buildSnapshot() {
  const tokens = loadTokens();
  const snapshot = {};
  for (const mode of ['light', 'dark']) {
    snapshot[mode] = {};
    for (const [key, element] of [...pairs()].toSorted(([a], [b]) => a.localeCompare(b))) {
      snapshot[mode][key] = resolveElement(tokens[mode], element, mode === 'dark');
    }
  }
  return snapshot;
}

/** Keys whose resolved slots differ between two snapshots, as `mode key slot: before -> after` lines. */
function diffSnapshots(before, after) {
  const lines = [];
  for (const mode of new Set([...Object.keys(before), ...Object.keys(after)])) {
    const keys = new Set([...Object.keys(before[mode] ?? {}), ...Object.keys(after[mode] ?? {})]);
    for (const key of [...keys].toSorted()) {
      const left = before[mode]?.[key] ?? {};
      const right = after[mode]?.[key] ?? {};
      for (const slot of new Set([...Object.keys(left), ...Object.keys(right)])) {
        if (left[slot] !== right[slot]) {
          lines.push(`${mode} ${key} ${slot}: ${left[slot] ?? '(missing)'} -> ${right[slot] ?? '(missing)'}`);
        }
      }
    }
  }
  return lines;
}

function main() {
  const current = buildSnapshot();
  const text = `${JSON.stringify(current, null, 2)}\n`;
  if (process.argv.includes('--write')) {
    writeFileSync(SNAPSHOT, text);
    const count = Object.keys(current.light).length;
    console.log(`paint-baseline: wrote ${count} combinations x 2 modes to ${SNAPSHOT}`);
    return;
  }
  const lines = diffSnapshots(JSON.parse(readFileSync(SNAPSHOT, 'utf8')), current);
  if (lines.length > 0) {
    console.error(`paint-baseline: ${lines.length} slot(s) differ from the snapshot`);
    console.error(lines.join('\n'));
    process.exit(1);
  }
  console.log('paint-baseline: resolved paint matches the snapshot');
}

main();
