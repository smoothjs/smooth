import test from 'japa'
import { UseFilters, getMetadata } from '../../src'

class Filter {
  static catch() {}
}

const filters = [new Filter(), new Filter()]

@UseFilters(...(filters as any))
class Test {}

class TestWithMethod {
  @UseFilters(...(filters as any))
  public index() {}
}

const testInstance = new Test()
const testWithMethodInstance = new TestWithMethod()

test('@UseFilters with class', async (assert) => {
  assert.deepEqual(getMetadata('EXCEPTION_FILTERS', testInstance.constructor), filters)
})

test('@UseFilters with method', async (assert) => {
  assert.deepEqual(getMetadata('EXCEPTION_FILTERS', testWithMethodInstance, 'index'), filters)
})
