import { waitFor } from '@testing-library/react'
import { when } from '../../src'
import { getTestStore, Store } from '../get.test.store'

describe('when', () => {
  it('works as a promise if no effect is defined', async () => {
    let store: Store, oncatch: jest.Mock, onfinally: jest.Mock, onthen: jest.Mock

    store = getTestStore()
    oncatch = jest.fn()
    onfinally = jest.fn()
    onthen = jest.fn()

    when(() => store.boolean, store)
      .catch(oncatch)
      .finally(onfinally)
      .then(onthen)

    expect(oncatch).not.toBeCalled()
    expect(onfinally).not.toBeCalled()
    expect(onthen).not.toBeCalled()

    store.boolean = true

    await waitFor(() => {
      expect(oncatch).not.toBeCalled()
      expect(onfinally).toBeCalledTimes(1)
      expect(onthen).toBeCalledTimes(1)
    })
  })
})
