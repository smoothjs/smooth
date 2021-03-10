import test from 'japa'
import { getMetadata, View } from '../../src'

class TestWithMethod {
  @View('index')
  public test() {
    return {
      message: 'HelloWorld',
    }
  }
}

test('@View', async (assert) => {
  assert.equal(getMetadata('ROUTE_VIEW_TEMPLATE', new TestWithMethod(), 'test'), 'index')
})
