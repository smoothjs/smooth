import test from 'japa'
import { getMetadata, Header } from '../../src'

class Test {
  @Header('Content-Type', 'Test')
  @Header('Authorization', 'JWT')
  public test() {}
}

test('@Header', async (assert) => {
  assert.deepEqual(getMetadata('HEADERS', new Test(), 'test'), [
    { name: 'Authorization', content: 'JWT' },
    { name: 'Content-Type', content: 'Test' },
  ])
})
