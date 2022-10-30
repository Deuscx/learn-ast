import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import rule from '../../src/eslint/if-statement-block'
const ruleTester = new RuleTester()

describe('rule', () => {
  it('should pass', () => {
    ruleTester.run('if-statement-block', rule, {
      valid: [
        'if(a){}',
        // 'if(a)console.log(true)',
      ],

      invalid: [
        invalid('if(a)console.log(true)'),
      ],
    })
  })
})

export function invalid(code: string): RuleTester.InvalidTestCase {
  return {
    code,
    errors: [
      {
        message: 'IfStatement without blocks',
      },
    ],
  }
}
