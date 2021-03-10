import test from 'japa'
import {
  Delete,
  Get,
  getMetadata,
  Head,
  Options,
  Param,
  Patch,
  Post,
  Put,
  RequestMethod,
} from '../src'

test.group('@Get', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.GET,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.GET,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Get(requestPath)
      public test(@Param('id') params) {}

      @Get(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Get()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})

test.group('@Post', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.POST,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.POST,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Post(requestPath)
      public test(@Param('id') params) {}

      @Post(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Post()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})

test.group('@Head', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.HEAD,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.HEAD,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Head(requestPath)
      public test(@Param('id') params) {}

      @Head(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Head()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})

test.group('@Options', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.OPTIONS,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.OPTIONS,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Options(requestPath)
      public test(@Param('id') params) {}

      @Options(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Options()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})

test.group('@Put', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.PUT,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.PUT,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Put(requestPath)
      public test(@Param('id') params) {}

      @Put(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Put()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})

test.group('@Patch', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.PATCH,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.PATCH,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Patch(requestPath)
      public test(@Param('id') params) {}

      @Patch(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Patch()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})

test.group('@Delete', () => {
  const requestPath = 'test'
  const requestProps = {
    path: requestPath,
    method: RequestMethod.DELETE,
  }

  const requestPathUsingArray = ['foo', 'bar']
  const requestPropsUsingArray = {
    path: requestPathUsingArray,
    method: RequestMethod.DELETE,
  }

  test('the class should be with expected request metadata', async (assert) => {
    class Test {
      @Delete(requestPath)
      public test(@Param('id') params) {}

      @Delete(requestPathUsingArray)
      public testUsingArray(@Param('id') params) {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')
    const method = getMetadata('ROUTE_METHOD', new Test(), 'test')
    const pathUsingArray = getMetadata('ROUTE_PATH', new Test(), 'testUsingArray')
    const methodUsingArray = getMetadata('ROUTE_METHOD', new Test(), 'testUsingArray')

    assert.equal(path, requestPath)
    assert.equal(method, requestProps.method)
    assert.equal(pathUsingArray, requestPathUsingArray)
    assert.equal(methodUsingArray, requestPropsUsingArray.method)
  })

  test('by default the path should be the method name', async (assert) => {
    class Test {
      @Delete()
      public test() {}
    }

    const path = getMetadata('ROUTE_PATH', new Test(), 'test')

    assert.equal(path, 'test')
  })
})
