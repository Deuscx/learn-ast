import { describe, it } from 'vitest'
import { ESLint, Linter, RuleTester } from 'eslint'

import rule from '../../src/eslint/if-statement-block'

const code = `
// invalid
if(a) console.log(true)

// valid
if(!a){
	console.log(false)
}
`

const linter = new Linter()

linter.defineRule('customRule', rule)
const messages = linter.verifyAndFix(code, {
  rules: {
    customRule: 2,
  },

})

describe('auto fix', () => {
  it('should pass', () => {
    console.log(messages.output)
  })
})

