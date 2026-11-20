const LAYOUT_COMPONENTS = new Set([
  'Box', 'Flex', 'Stack', 'HStack', 'VStack', 'Grid', 'GridItem', 'SimpleGrid',
  'Center', 'AbsoluteCenter', 'Container', 'Wrap', 'WrapItem', 'Bleed', 'Float',
]);
const SPACING_PROPERTIES = new Set([
  'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'ps', 'pe', 'padding',
  'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'paddingInline', 'paddingBlock', 'paddingInlineStart', 'paddingInlineEnd', 'paddingBlockStart', 'paddingBlockEnd',
  'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'ms', 'me', 'margin',
  'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'marginInline', 'marginBlock', 'marginInlineStart', 'marginInlineEnd', 'marginBlockStart', 'marginBlockEnd',
  'gap', 'rowGap', 'columnGap', 'spaceX', 'spaceY',
  'inset', 'insetX', 'insetY', 'insetInline', 'insetBlock',
  'insetInlineStart', 'insetInlineEnd', 'insetBlockStart', 'insetBlockEnd',
  'top', 'right', 'bottom', 'left', 'offset', 'offsetX', 'offsetY',
]);
const NAMED_SPACING = /^-?(?:layout\.(?:space|gap)\.[\w]+|appShell\.[\w.]+)$/;
const KEYWORDS = new Set(['auto', 'inherit', 'initial', 'unset', 'revert']);

function propertyName(node) {
  if (node.computed && node.key?.type !== 'Literal') return undefined;
  return node.key?.name ?? node.key?.value;
}

function isStyleAttribute(name) {
  return typeof name === 'string' && (name === 'css' || name === 'style' || name.startsWith('_'));
}

export default {
  meta: {
    type: 'problem',
    docs: { description: 'Use named layout spacing without overriding Chakra component spacing.' },
    schema: [{
      type: 'object',
      properties: { componentSlots: { type: 'array', items: { type: 'string' }, uniqueItems: true } },
      additionalProperties: false,
    }],
    messages: {
      named: 'Use layout.space.*, layout.gap.*, or an appShell spacing alias for {{property}}.',
      component: 'Keep Chakra component spacing unchanged; use size/variant or a layout wrapper for {{property}}.',
      inline: 'Use Chakra style props or css for {{property}}; the style prop does not resolve design tokens.',
    },
  },
  create(context) {
    const source = context.sourceCode;
    const componentSlots = new Set(context.options[0]?.componentSlots ?? []);

    function variable(node) {
      let scope = source.getScope(node);
      while (scope) {
        const found = scope.set.get(node.name);
        if (found) return found;
        scope = scope.upper;
      }
      return undefined;
    }

    function imported(node) {
      const definition = variable(node)?.defs.find((entry) => entry.type === 'ImportBinding');
      if (!definition) return undefined;
      return {
        name: definition.node.imported?.name,
        namespace: definition.node.type === 'ImportNamespaceSpecifier',
        source: definition.parent.source.value,
      };
    }

    function resolve(node, seen = new Set()) {
      if (!node || seen.has(node)) return node;
      seen.add(node);
      if (['JSXExpressionContainer', 'TSAsExpression', 'TSSatisfiesExpression', 'TSNonNullExpression'].includes(node.type)) {
        return resolve(node.expression, seen);
      }
      if (node.type === 'Identifier') {
        const definition = variable(node)?.defs.find((entry) => entry.type === 'Variable');
        if (definition?.parent?.kind === 'const' && definition.node.init) {
          return resolve(definition.node.init, seen);
        }
      }
      if (node.type === 'MemberExpression' && !node.computed) {
        const object = resolve(node.object, seen);
        const member = object?.properties?.find((entry) => propertyName(entry) === node.property.name);
        if (member) return resolve(member.value, seen);
      }
      return node;
    }

    function owner(name) {
      if (name.type === 'JSXIdentifier') {
        const binding = imported(name);
        if (binding?.source === '@chakra-ui/react') return LAYOUT_COMPONENTS.has(binding.name) ? 'layout' : 'component';
        if (binding?.name === 'AppBlock' && binding.source.endsWith('/app-block')) return 'layout';
        return undefined;
      }
      if (name.type !== 'JSXMemberExpression') return undefined;
      let base = name.object;
      while (base.type === 'JSXMemberExpression') base = base.object;
      const binding = imported(base);
      if (binding?.source !== '@chakra-ui/react') return undefined;
      if (binding.namespace && name.object === base && LAYOUT_COMPONENTS.has(name.property.name)) return 'layout';
      return 'component';
    }

    function report(node, property, kind) {
      context.report({ node, messageId: kind === 'layout' ? 'named' : kind, data: { property } });
    }

    function checkValue(input, property, kind, seen = new Set()) {
      const node = resolve(input);
      if (!node || seen.has(node)) return;
      seen.add(node);
      if ((node.type === 'Literal' && node.value === null) || (node.type === 'Identifier' && node.name === 'undefined')) return;
      if (kind !== 'layout') {
        report(node, property, kind);
        return;
      }
      if (node.type === 'ObjectExpression') {
        for (const entry of node.properties) checkValue(entry.value ?? entry.argument, property, kind, seen);
      } else if (node.type === 'ArrayExpression') {
        for (const entry of node.elements) checkValue(entry, property, kind, seen);
      } else if (node.type === 'ConditionalExpression') {
        checkValue(node.consequent, property, kind, seen);
        checkValue(node.alternate, property, kind, seen);
      } else if (node.type === 'Literal' && typeof node.value === 'string' &&
        (NAMED_SPACING.test(node.value) || KEYWORDS.has(node.value))) {
        return;
      } else {
        report(node, property, kind);
      }
    }

    function checkStyles(input, kind, recipe = false, seen = new Set()) {
      const node = resolve(input);
      if (!node || seen.has(node)) return;
      seen.add(node);
      if (node.type === 'ObjectExpression') {
        for (const entry of node.properties) {
          if (entry.type === 'SpreadElement') {
            checkStyles(entry.argument, kind, recipe, seen);
            continue;
          }
          const name = propertyName(entry);
          if (SPACING_PROPERTIES.has(name)) checkValue(entry.value, name, kind);
          else checkStyles(entry.value, recipe && componentSlots.has(name) ? 'component' : kind, recipe, seen);
        }
      } else if (node.type === 'ConditionalExpression') {
        checkStyles(node.consequent, kind, recipe, seen);
        checkStyles(node.alternate, kind, recipe, seen);
      } else if (node.type === 'ArrayExpression') {
        for (const entry of node.elements) checkStyles(entry, kind, recipe, seen);
      }
    }

    function checkSpread(input, kind, seen = new Set()) {
      const node = resolve(input);
      if (!node || seen.has(node)) return;
      seen.add(node);
      if (node.type !== 'ObjectExpression') return;
      for (const entry of node.properties) {
        if (entry.type === 'SpreadElement') {
          checkSpread(entry.argument, kind, seen);
          continue;
        }
        const name = propertyName(entry);
        if (SPACING_PROPERTIES.has(name)) checkValue(entry.value, name, kind);
        else if (isStyleAttribute(name)) checkStyles(entry.value, name === 'style' ? 'inline' : kind);
      }
    }

    return {
      JSXOpeningElement(node) {
        const kind = owner(node.name);
        if (!kind) return;
        for (const attribute of node.attributes) {
          if (attribute.type === 'JSXSpreadAttribute') {
            checkSpread(attribute.argument, kind);
          } else if (SPACING_PROPERTIES.has(attribute.name.name)) {
            checkValue(attribute.value, attribute.name.name, kind);
          } else if (isStyleAttribute(attribute.name.name) && attribute.value?.type === 'JSXExpressionContainer') {
            checkStyles(attribute.value.expression, attribute.name.name === 'style' ? 'inline' : kind);
          }
        }
      },
      CallExpression(node) {
        const callee = node.callee;
        let binding;
        if (callee.type === 'Identifier') binding = imported(callee);
        else if (callee.type === 'MemberExpression' && !callee.computed && callee.object.type === 'Identifier') {
          binding = imported(callee.object);
        }
        if (binding?.source !== '@chakra-ui/react') return;
        const name = binding.namespace && callee.type === 'MemberExpression' ? callee.property.name : binding.name;
        if (name === 'defineSlotRecipe') checkStyles(node.arguments[0], 'layout', true);
        if (name === 'defineRecipe') checkStyles(node.arguments[0], 'component');
      },
    };
  },
};
