import test from 'japa'
import { getMetadata, HttpCode } from '../../src'

@HttpCode(200)
class Test {}

class TestWithMethod {
  @HttpCode(200)
  public test() {}
}

test('@HttpCode', async (assert) => {
  assert.equal(getMetadata('STATUS_CODE', Test), 200)
  assert.equal(getMetadata('STATUS_CODE', new TestWithMethod(), 'test'), 200)
})
