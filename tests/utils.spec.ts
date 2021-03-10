import test from 'japa'
import 'reflect-metadata'
import {
  addLeadingSlash,
  getMetadata,
  getMethods,
  insertToArray,
  isEmpty,
  isFunction,
  isNumeric,
  isString,
  isUndefined,
  setMetadata,
  stripEndSlash,
} from '../src'

class ReflectorClass {
  testMethod() {}
}

test.group('Utils', (group) => {
  test('getMetadata', async (assert) => {
    const classObj = new ReflectorClass()

    Reflect.defineMetadata('TEST_METADATA_KEY', 'VALUE', classObj)

    assert.equal(getMetadata('TEST_METADATA_KEY', classObj), 'VALUE')
  })

  test('getMetadata (Merged)', async (assert) => {
    const classObj = new ReflectorClass()

    Reflect.defineMetadata('TEST_METADATA_KEY', ['VALUE1'], classObj.constructor)
    Reflect.defineMetadata('TEST_METADATA_KEY', ['VALUE2'], classObj, 'testMethod')

    assert.deepEqual(getMetadata('TEST_METADATA_KEY', classObj, 'testMethod'), ['VALUE1', 'VALUE2'])
  })

  test('setMetadata', async (assert) => {
    const classObj = new ReflectorClass()

    setMetadata('TEST_METADATA_KEY', classObj, 'VALUE1')

    assert.equal(Reflect.getMetadata('TEST_METADATA_KEY', classObj), 'VALUE1')
  })

  test('getMethods', async (assert) => {
    class ClassWithMethods {
      methodOne() {}

      methodTwo() {}

      methodThree() {}
    }

    assert.isArray(getMethods(new ClassWithMethods()))
    assert.deepEqual(getMethods(new ClassWithMethods()), [
      'constructor',
      'methodOne',
      'methodTwo',
      'methodThree',
    ])
  })

  test('isUndefined', async (assert) => {
    assert.isTrue(isUndefined(undefined))
  })

  test('isString', async (assert) => {
    assert.isTrue(isString('string'))
  })

  test('stripEndSlash', async (assert) => {
    assert.equal(stripEndSlash('users/'), 'users')
  })

  test('addLeadingSlash', async (assert) => {
    assert.equal(addLeadingSlash('users'), '/users')
  })

  test('insertToArray', async (assert) => {
    const array = ['a', 'b', 'd']

    assert.deepEqual(insertToArray(array, 2, 'c'), ['a', 'b', 'c', 'd'])
  })

  test('isFunction', async (assert) => {
    assert.isTrue(isFunction(() => {}))
  })

  test('isNumeric', async (assert) => {
    assert.isFalse(isNumeric(112))
    assert.isTrue(isNumeric('112'))
  })

  test('isEmpty', async (assert) => {
    assert.isTrue(isEmpty(''))
    assert.isTrue(isEmpty(false))
    assert.isTrue(isEmpty(0))
    assert.isTrue(isEmpty([]))
    assert.isTrue(isEmpty({}))
  })
})
