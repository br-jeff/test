import { GetHealthUseCase } from './get-health'

describe('GetHealthUseCase', () => {
    test('Should get health return', async () => {
        const sut = new GetHealthUseCase()

        const result = sut.execute()

        expect(result).toEqual({ status: 'Server is running' })
    })
})
