
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LogotypesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LogotypesSDK.test()
    equal(null !== testsdk, true)
  })

})
