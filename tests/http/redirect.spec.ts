import test from 'japa'
import { getMetadata, Redirect } from '../../src'

class TestWithMethod {
  @Redirect('/test', 302)
  public test() {}

  @Redirect('/test2', 500)
  public secondTest() {}
}

test('@Redirect', async (assert) => {
  assert.deepEqual(getMetadata('ROUTE_REDIRECT', new TestWithMethod(), 'test'), {
    url: '/test',
    statusCode: 302,
  })

  assert.deepEqual(getMetadata('ROUTE_REDIRECT', new TestWithMethod(), 'secondTest'), {
    url: '/test2',
    statusCode: 500,
  })
})
