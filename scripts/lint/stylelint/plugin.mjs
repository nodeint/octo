/**
 * Local Stylelint plugin for the `@workspace/ui` token axes.
 *
 * - `octo/token-tier`: a component, recipe, `base.css` or `utilities.css` must not read a raw color scale
 *   (`styles/theme/palette.css`, `styles/theme/swatches.css` and the `--base-<n>` steps in `styles/theme/base.css`); it reads a theme role. A `theme/` file reads only
 *   `theme/` tokens, and a `layout/` file reads only `layout/` tokens.
 * - `octo/no-theme-selector`: component, recipe, and `base.css` files must not select `.dark`.
 *   `utilities.css` may select it.
 *
 * A token's axis is the folder of the file that declares it (`styles/theme`, `styles/layout`) in `packages/ds`; component CSS in `packages/ui` has no sibling `styles/`, so it reads the `packages/ds` one.
 * A custom property declared in `styles/recipes/` is a component token: it may read any token.
 * The other declarations of a recipe are consumer reads.
 * `typography.css`, `components.css`, `variants.css` and `appearance/` are not checked.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path, { join } from 'node:path';

import stylelint from 'stylelint';

const { createPlugin, utils } = stylelint;

const AXES = ['theme', 'layout'];
const RAW_FILES = ['palette.css', 'swatches.css'];
/** A raw step declared outside a raw file: the base scale, which shares base.css with the roles built on it. */
const RAW_TOKEN = /^--base-\d+$/;
const TOKEN_DECLARATION = /(^|[\s;{])(--[\w-]+)\s*:/g;
const VAR_READ = /var\(\s*(--[\w-]+)/g;

/** @type {Map<string, Map<string, { axis: string, raw: boolean }>>} */
const tokenIndexCache = new Map();

/**
 * @param {string} dir
 * @returns {string[]}
 */
function listCssFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? listCssFiles(join(dir, entry.name))
      : entry.name.endsWith('.css')
        ? [join(dir, entry.name)]
        : [],
  );
}

/**
 * Maps each token name to the axis of the folder that declares it, and whether it is a raw color scale step.
 * @param {string} stylesDir
 * @returns {Map<string, { axis: string, raw: boolean }>}
 */
export function buildTokenIndex(stylesDir) {
  const cached = tokenIndexCache.get(stylesDir);
  if (cached) return cached;
  /** @type {Map<string, { axis: string, raw: boolean }>} */
  const index = new Map();
  for (const axis of AXES) {
    for (const file of listCssFiles(join(stylesDir, axis))) {
      const rawFile = axis === 'theme' && RAW_FILES.includes(path.basename(file));
      const source = readFileSync(file, 'utf8').replaceAll(/\/\*[\s\S]*?\*\//g, '');
      for (const match of source.matchAll(TOKEN_DECLARATION)) {
        if (index.has(match[2])) continue;
        index.set(match[2], { axis, raw: rawFile || (axis === 'theme' && RAW_TOKEN.test(match[2])) });
      }
    }
  }
  if (index.size === 0) throw new Error(`octo/token-tier: no tokens found under ${stylesDir}`);
  tokenIndexCache.set(stylesDir, index);
  return index;
}

/**
 * @param {string} file Absolute path of the linted file.
 * @param {import('node:path').PlatformPath} [pathApi] Path flavor; tests pass `path.win32`.
 * @returns {{ kind: 'token', axis: string, stylesDir: string } | { kind: 'consumer', recipe?: true, utilities?: true, stylesDir: string } | undefined}
 */
export function classifyFile(file, pathApi = path) {
  // Walk up from the file so the root (drive letter or `/`) is preserved as given.
  /** @type {string[]} */
  const trail = [];
  let current = file;
  for (;;) {
    const parent = pathApi.dirname(current);
    if (parent === current) return undefined;
    trail.unshift(pathApi.basename(current));
    current = parent;
    const name = pathApi.basename(current);
    const above = pathApi.basename(pathApi.dirname(current));
    if (name === 'styles') {
      if (AXES.includes(trail[0]) && trail.length > 1) {
        return { kind: 'token', axis: trail[0], stylesDir: current };
      }
      if (trail.length === 1 && trail[0] === 'base.css') return { kind: 'consumer', stylesDir: current };
      if (trail.length === 1 && trail[0] === 'utilities.css') {
        return { kind: 'consumer', utilities: true, stylesDir: current };
      }
      if (trail[0] === 'recipes') return { kind: 'consumer', recipe: true, stylesDir: current };
      return undefined;
    }
    if (name === 'components' && above === 'src') {
      return { kind: 'consumer', stylesDir: pathApi.join(pathApi.dirname(current), 'styles') };
    }
  }
}

/** `packages/ui` has no `styles/` of its own: its components read the design system's, in `packages/ds`. */
function resolveStylesDir(stylesDir) {
  if (existsSync(stylesDir)) return stylesDir;
  return join(stylesDir, '..', '..', '..', 'ds', 'src', 'styles');
}

const tokenTierName = 'octo/token-tier';
const tokenTierMessages = utils.ruleMessages(tokenTierName, {
  raw: (token) => `Component reads raw color token "${token}"; read a theme role`,
  crossAxis: (from, to, token) => `A ${from} token file reads ${to} token "${token}"`,
});

const tokenTierRule = (enabled) => (root, result) => {
  if (!enabled) return;
  const file = root.source?.input.file;
  const info = file && classifyFile(file);
  if (!info) return;
  const index = buildTokenIndex(resolveStylesDir(info.stylesDir));

  root.walkDecls((decl) => {
    for (const match of decl.value.matchAll(VAR_READ)) {
      const token = match[1];
      const entry = index.get(token);
      if (!entry) continue;
      const report = (message) =>
        utils.report({
          ruleName: tokenTierName,
          result,
          node: decl,
          message,
          word: token,
          severity: 'error',
        });
      if (info.kind === 'consumer') {
        if (!entry.raw) continue;
        // A token a recipe declares is a component token, which may read any token.
        if (info.recipe && decl.prop.startsWith('--')) continue;
        report(tokenTierMessages.raw(token));
      } else if (entry.axis !== info.axis) {
        report(tokenTierMessages.crossAxis(info.axis, entry.axis, token));
      }
    }
  });
};
tokenTierRule.ruleName = tokenTierName;
tokenTierRule.messages = tokenTierMessages;

const noThemeName = 'octo/no-theme-selector';
const noThemeMessages = utils.ruleMessages(noThemeName, {
  rejected: (selector) => `Unexpected ".dark" in "${selector}"; put theme values in a token file`,
});

const noThemeRule = (enabled) => (root, result) => {
  if (!enabled) return;
  const file = root.source?.input.file;
  const info = file && classifyFile(file);
  if (!info || info.kind !== 'consumer' || info.utilities) return;
  root.walkRules((rule) => {
    if (/\.dark(?![\w-])/.test(rule.selector)) {
      utils.report({
        ruleName: noThemeName,
        result,
        node: rule,
        message: noThemeMessages.rejected(rule.selector),
      });
    }
  });
};
noThemeRule.ruleName = noThemeName;
noThemeRule.messages = noThemeMessages;

export default [createPlugin(tokenTierName, tokenTierRule), createPlugin(noThemeName, noThemeRule)];
