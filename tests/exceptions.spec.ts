import test from 'japa'
import { HttpException, NotFoundException } from '../src'

test.group('HttpException', () => {
    test('return a response as a string when input is a string', async (assert) => {
        const message = 'My error message'
        const exception = new HttpException(message, 404)

        assert.equal(exception.getMessage(), 'My error message')
    })

    test('return an object even when the message is undefined', async (assert) => {
        const exception = new HttpException()

        assert.equal(exception.getMessage(), 'Bad Request')
    })

    test('return a status code', async (assert) => {
        assert.equal(new NotFoundException().getStatus(), 404)
    })

    test('inherit from error', async (assert) => {
        const error = new HttpException()
        assert.isTrue(error instanceof Error)
    })
})