// eslint: lib\rules\no-console.js
import type { Rule } from 'eslint'

export default {
  meta: {
    docs: {
      description: 'Disallow the use of console',
      category: 'Best Practices',
      recommended: true,
    },
    // rule options
    schema: [
      {
        type: 'object',
        properties: {
          allowedMethods: {
            type: 'array',
            items: {
              enum: ['log', 'info', 'warn', 'error', 'dir'],
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
      },
    ],
  },
  create(context: Rule.RuleContext) {
    return {
      Identifier(node) {
        if (node.name !== 'console')
          return

        context.report({
          node,
          message: 'Use of console is not allowed',
        })
      },
    }
  },
} as Rule.RuleModule
