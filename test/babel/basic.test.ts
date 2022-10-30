import { describe, expect, it } from 'vitest'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import types from '@babel/types'
import generator from '@babel/generator'
const code = `
function testRegex(str){
  const reg = /regex/;
  return str.match(reg)
}
`
describe('basic', () => {
  it('should parse basic code', () => {
    const ast = parser.parse(code)

    traverse(ast, {
      RegExpLiteral(path) {
        const program = path.findParent(types.isProgram)

        const name = path.parent.id.name
        const newIdentifier = path.scope.generateUidIdentifier(name)
        path.scope.rename(name, newIdentifier.name)
        const variableDeclaration = types.variableDeclaration('const', [types.variableDeclarator(newIdentifier, path.node)])

        program?.node.body.unshift(variableDeclaration)
        path.parentPath.remove()
      },
    })
    const result = generator(ast)
    expect(result.code).toMatchInlineSnapshot(`
      "const _reg = /regex/;
      function testRegex(str) {
        return str.match(_reg);
      }"
    `)
  })
})
