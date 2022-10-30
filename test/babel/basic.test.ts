import { describe, expect, it } from 'vitest'
import parser from '@babel/parser'
import traverse from '@babel/traverse'

describe('basic', () => {
  it('should parse basic code', () => {
    const code = '(4+ 10) * 2'
    const ast = parser.parse(code)
    console.log('ast', ast)
    const [statement] = ast.program.body
    if (statement.type === 'ExpressionStatement'
      && statement.expression.type === 'BinaryExpression'
      && statement.expression.right.type === 'BinaryExpression'
      && statement.expression.right.left.type === 'NumericLiteral'
      && statement.expression.right.right.type === 'NumericLiteral'

    ) {
      console.log(statement)
      console.log(statement.expression.right.left.value)
    }
  })

  it.only('should traverse', () => {
    const code = ' (4+ 10) * 2'
    const ast = parser.parse(code)

    traverse(ast, {
      NumericLiteral(path) {
        console.log('🚀NumericLiteral ~ path', path.node)
      },
    })
  })
})
