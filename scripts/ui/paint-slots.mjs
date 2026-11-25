/**
 * Slot sync of the paint files: every `[data-paint='{color}-{emphasis}']` block of one emphasis must declare the
 * same set of `--variant-*` slots, so a slot added to one color cannot be forgotten in the others.
 */
import postcss from 'postcss';

const PAINT_SELECTOR = /^\[data-paint='([a-z0-9]+)-([a-z]+)'\]$/;

/** Slots a block declares directly or inside a nested rule, sorted and without duplicates. */
function slotsOf(rule) {
  const slots = new Set();
  rule.walkDecls(/^--variant-/, (decl) => slots.add(decl.prop));
  return [...slots].toSorted();
}

/**
 * Report each emphasis whose blocks disagree on their slot set.
 * @param {{ file: string, css: string }[]} sources paint files
 * @returns {string[]} one line per block that differs from the most common slot set of its emphasis
 */
export function findSlotMismatches(sources) {
  /** @type {Map<string, { name: string, file: string, slots: string[] }[]>} */
  const byEmphasis = new Map();
  for (const { file, css } of sources) {
    postcss.parse(css).walkRules((rule) => {
      for (const selector of rule.selector.split(',').map((part) => part.trim())) {
        const match = PAINT_SELECTOR.exec(selector);
        if (match) {
          const blocks = byEmphasis.get(match[2]) ?? [];
          blocks.push({ name: `${match[1]}-${match[2]}`, file, slots: slotsOf(rule) });
          byEmphasis.set(match[2], blocks);
        }
      }
    });
  }
  const lines = [];
  for (const [emphasis, blocks] of byEmphasis) {
    const counts = new Map();
    for (const block of blocks) {
      const key = block.slots.join(' ');
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const [reference] = [...counts].toSorted((a, b) => b[1] - a[1])[0];
    const expected = reference.split(' ');
    for (const block of blocks.filter((entry) => entry.slots.join(' ') !== reference)) {
      const missing = expected.filter((slot) => !block.slots.includes(slot));
      const extra = block.slots.filter((slot) => !expected.includes(slot));
      lines.push(
        `${block.file}: ${block.name} differs from the other ${emphasis} blocks` +
          ` (missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'})`,
      );
    }
  }
  return lines;
}
