import type { Rule } from 'eslint'

export default {
  name: 'if-statement-block',
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
        if (!node.consequent)
          return
        if (node.consequent.type === 'BlockStatement')
          return

        context.report({
          node,
          message: 'IfStatement without blocks',
          fix(fixer) {
            return [
              fixer.insertTextBefore(node.consequent, '{'),
              fixer.insertTextAfter(node.consequent, '}'),
            ]
          },
        })
      },
    }
  },
} as Rule.RuleModule
