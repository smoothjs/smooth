import test from 'japa'
import { Hook, getMetadata } from '../src'

@Hook((request, response, next) => {
  next()
})
class Test {}

class TestWithMethod {
  @Hook((request, response, next) => {
    next()
  })
  public test() {}
}

test('@Hook', async (assert) => {
  assert.isArray(getMetadata('HOOKS', Test))
  assert.isArray(getMetadata('HOOKS', new TestWithMethod(), 'test'))
})
