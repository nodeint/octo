/**
 * Check that the paint files declare the same slots per emphasis.
 *
 * Usage:
 *   node scripts/ui/check-paint-slots.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { REPO_ROOT } from '../lib/repo.mjs';
import { findSlotMismatches } from './paint-slots.mjs';

const VARIANTS = join(REPO_ROOT, 'packages/ds/src/styles/variants');

const sources = readdirSync(VARIANTS)
  .filter((file) => file.endsWith('.css'))
  .toSorted()
  .map((file) => ({ file: `variants/${file}`, css: readFileSync(join(VARIANTS, file), 'utf8') }));
const lines = findSlotMismatches(sources);
if (lines.length > 0) {
  console.error(lines.join('\n'));
  process.exit(1);
}
console.log('paint-slots: every emphasis declares the same slots in every color');
