/**
 * Check WCAG 2.x contrast of every bg/fg pair the theme declares, in light and dark.
 *
 * Pairs: for each hue swatch and for the primary role, every `<emphasis>-bg` against its `-fg`, `-fg-subtle` and
 * `-fg-muted`. Colors are resolved by Chromium (color-mix, relative oklch, alpha), then composited over the page
 * background (--base-0 in light, --base-950 in dark).
 * Thresholds: fg and fg-subtle 4.5:1, fg-muted 3:1. Disabled slots are exempt (WCAG 1.4.3).
 *
 * Usage:
 *   node scripts/ui/check-contrast.mjs [--hue=teal] [--all]   --all also lists passing pairs
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { REPO_ROOT } from '../lib/repo.mjs';

const THEME = join(REPO_ROOT, 'packages/ds/src/styles/theme');
const FILES = ['palette', 'swatches', 'base', 'primary'];
const MIN = { fg: 4.5, 'fg-subtle': 4.5, 'fg-muted': 3 };
const EMPHASES = ['strong', 'subtle', 'plain', 'surface'];

const args = process.argv.slice(2);
const onlyHue = args.find((a) => a.startsWith('--hue='))?.slice(6);
const showAll = args.includes('--all');

const css = FILES.map((f) => readFileSync(join(THEME, `${f}.css`), 'utf8')).join('\n');
const hues = [...css.matchAll(/^ {2}--([a-z]+)-950:/gm)].map((m) => m[1]);
const names = [...new Set([...hues, 'primary', 'base'])].filter((n) => !onlyHue || n === onlyHue);

const require = createRequire(join(REPO_ROOT, 'apps/storybook/package.json'));
const { chromium } = require('playwright');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<style>${css}</style><body></body>`);

const results = await page.evaluate(
  ({ names, emphases, min }) => {
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    const toRgba = (value) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: a / 255 };
    };
    const over = (top, bottom) => ({
      r: top.r * top.a + bottom.r * (1 - top.a),
      g: top.g * top.a + bottom.g * (1 - top.a),
      b: top.b * top.a + bottom.b * (1 - top.a),
      a: 1,
    });
    const lum = ({ r, g, b }) => {
      const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };
    const ratio = (a, b) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };

    const out = [];
    for (const mode of ['light', 'dark']) {
      document.documentElement.className = mode === 'dark' ? 'dark' : '';
      const read = (name) => {
        const probe = document.createElement('i');
        probe.style.color = `var(${name})`;
        document.body.append(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      };
      const page = toRgba(read(mode === 'dark' ? '--base-950' : '--base-0'));
      for (const name of names) {
        for (const emphasis of emphases) {
          const bgName = `--${name}-${emphasis}-bg`;
          if (!read(bgName)) continue;
          const bg = over(toRgba(read(bgName)), page);
          for (const kind of Object.keys(min)) {
            const fgName = `--${name}-${emphasis}-${kind}`;
            const raw = read(fgName);
            if (!raw) continue;
            const fg = over(toRgba(raw), bg);
            out.push({ mode, pair: `${bgName} / ${fgName}`, kind, ratio: ratio(fg, bg), min: min[kind] });
          }
        }
      }
    }
    return out;
  },
  { names, emphases: EMPHASES, min: MIN },
);
await browser.close();

const failures = results.filter((r) => r.ratio < r.min);
for (const r of showAll ? results : failures) {
  const mark = r.ratio < r.min ? 'FAIL' : 'ok  ';
  console.log(`${mark} ${r.mode.padEnd(5)} ${r.ratio.toFixed(2).padStart(5)} (min ${r.min})  ${r.pair}`);
}
console.log(`contrast: ${results.length} pairs checked, ${failures.length} below threshold`);
process.exit(failures.length > 0 ? 1 : 0);
