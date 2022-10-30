import type { Rule } from 'eslint'

export default {
  meta: {
    docs: {
      description: 'Disallow IfStatement without blocks',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    // rule options
    schema: [],
  },
  create(context: Rule.RuleContext) {
    return {
      // visitor
      IfStatement(node) {
        if (node.consequent.type === 'BlockStatement')
          return

        context.report({
          node,
          message: 'IfStatement without blocks',
        })
      },
    }
  },
} as Rule.RuleModule
