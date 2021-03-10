import test from 'japa'
import { Controller, getMetadata } from '../../src'

@Controller('users')
class HttpController {
  public static index() {}
}

const httpController = new HttpController()

test('@Controller', async (assert) => {
  assert.equal(getMetadata('CONTROLLER_PATH', httpController.constructor), 'users')
})
