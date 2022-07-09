import { describe, it } from 'vitest'
import { RuleTester } from 'eslint'
import rule from '../src/eslint/no-console'
const ruleTester = new RuleTester()

describe('rule', () => {
  it('should pass', () => {
    ruleTester.run('no-console', rule, {
      valid: [
        'log()',
        { code: 'console.warn()', options: [{ allowedMethods: ['warn'] }] },
      ],

      invalid: [
        invalid('console.log()'),
        invalid('console.debug()'),
        invalid('console.warn()'),
      ],
    })
  })
})

export function invalid(code: string): RuleTester.InvalidTestCase {
  return {
    code,
    errors: [
      {
        message: 'Use of console is not allowed',
      },
    ],
  }
}
