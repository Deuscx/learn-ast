import parser from '@babel/parser'
import traverse from '@babel/traverse'
// const parser = require('@babel/parser')
// const traverse = require('@babel/traverse').default
const code = ' (4+ 10) * 2'

const ast = parser.parse(code)
traverse(ast, {
  NumericLiteral(path) {
    console.log(path.node.value)
  },
})
