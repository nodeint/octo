/**
 * Local Stylelint plugin for the `@workspace/ui` token tiers.
 *
 * - `octo/token-tier`: a file may read only tokens of its own tier or a lower one.
 * - `octo/no-theme-selector`: component files and `utilities.css` must not select `.dark`.
 *
 * A token's tier is the folder of the file that declares it
 * (`styles/tokens/primitive|semantic|component`), so moving a file re-tiers its tokens.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path, { join } from 'node:path';

import stylelint from 'stylelint';

const { createPlugin, utils } = stylelint;

const TIERS = ['primitive', 'semantic', 'component'];
const TOKEN_DECLARATION = /(^|[\s;{])(--[\w-]+)\s*:/g;
const VAR_READ = /var\(\s*(--[\w-]+)/g;

/** @type {Map<string, Map<string, string>>} */
const tierIndexCache = new Map();

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
 * Maps each token name to the tier of the folder that declares it.
 * @param {string} tokensDir
 * @returns {Map<string, string>}
 */
export function buildTierIndex(tokensDir) {
  const cached = tierIndexCache.get(tokensDir);
  if (cached) return cached;
  /** @type {Map<string, string>} */
  const index = new Map();
  for (const tier of TIERS) {
    for (const file of listCssFiles(join(tokensDir, tier))) {
      const source = readFileSync(file, 'utf8').replaceAll(/\/\*[\s\S]*?\*\//g, '');
      for (const match of source.matchAll(TOKEN_DECLARATION)) {
        if (!index.has(match[2])) index.set(match[2], tier);
      }
    }
  }
  if (index.size === 0) throw new Error(`octo/token-tier: no tokens found under ${tokensDir}`);
  tierIndexCache.set(tokensDir, index);
  return index;
}

/**
 * @param {string} file Absolute path of the linted file.
 * @param {import('node:path').PlatformPath} [pathApi] Path flavor; tests pass `path.win32`.
 * @returns {{ kind: 'token', tier: string, tokensDir: string } | { kind: 'consumer', tokensDir: string } | undefined}
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
      const tokensDir = pathApi.join(current, 'tokens');
      if (trail[0] === 'tokens' && TIERS.includes(trail[1])) {
        return { kind: 'token', tier: trail[1], tokensDir };
      }
      if (trail.length === 1 && (trail[0] === 'base.css' || trail[0] === 'utilities.css')) {
        return { kind: 'consumer', tokensDir };
      }
      if (trail[0] === 'recipes') return { kind: 'consumer', tokensDir };
      return undefined;
    }
    if (name === 'components' && above === 'src') {
      const tokensDir = pathApi.join(pathApi.dirname(current), 'styles', 'tokens');
      return { kind: 'consumer', tokensDir };
    }
  }
}

/**
 * @param {string[]} patterns Prefixes; a trailing `*` is optional and ignored.
 * @param {string} token
 */
function isLegacy(patterns, token) {
  return patterns.some((pattern) => token.startsWith(pattern.replace(/\*$/, '')));
}

const tokenTierName = 'octo/token-tier';
const tokenTierMessages = utils.ruleMessages(tokenTierName, {
  primitive: (token) => `Component reads primitive token "${token}"; read a semantic or component token`,
  legacy: (token) => `Component reads primitive token "${token}" (legacy family, migrate to a semantic role)`,
  upward: (token, from, to) => `A ${from} token file reads ${to} token "${token}"`,
});

const tokenTierRule = (enabled, options = {}) => (root, result) => {
  if (!enabled) return;
  const legacyFamilies = options.legacyFamilies ?? [];
  const file = root.source?.input.file;
  const info = file && classifyFile(file);
  if (!info) return;
  const index = buildTierIndex(info.tokensDir);

  root.walkDecls((decl) => {
    for (const match of decl.value.matchAll(VAR_READ)) {
      const token = match[1];
      const tier = index.get(token);
      if (!tier) continue;
      const readerRank = info.kind === 'token' ? TIERS.indexOf(info.tier) : TIERS.indexOf('semantic');
      const report = (message, severity) =>
        utils.report({
          ruleName: tokenTierName,
          result,
          node: decl,
          message,
          word: token,
          severity,
        });
      if (info.kind === 'consumer') {
        if (tier !== 'primitive') continue;
        report(
          isLegacy(legacyFamilies, token)
            ? tokenTierMessages.legacy(token)
            : tokenTierMessages.primitive(token),
          isLegacy(legacyFamilies, token) ? 'warning' : 'error',
        );
      } else if (TIERS.indexOf(tier) > readerRank && info.tier !== 'component') {
        report(tokenTierMessages.upward(token, info.tier, tier), 'error');
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
  if (!info || info.kind !== 'consumer') return;
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
