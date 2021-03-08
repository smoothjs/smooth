import test from 'japa'
import { getMetadata, SetMetadata } from '../src'

test('@SetMetadata', async (assert) => {
    @SetMetadata('key', 'value')
    class Test {}

    class TestWithMethod {
        @SetMetadata('key', 'value')
        public test() {}
    }

    assert.equal(getMetadata('key', Test), 'value')
    assert.equal(getMetadata('key', new TestWithMethod(), 'test'), 'value')
})