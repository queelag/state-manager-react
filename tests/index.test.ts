import { StateManager } from '../src/index'

describe('State Manager', () => {
  it('works', () => {
    let store: any

    store = {
      array: [0],
      number: 0,
      object: { a: 0 }
    }

    StateManager.observe(store, ['array', 'number', 'object'])

    store.object = { a: 0 }
    store.object.a = 1

    console.log(store.object, store.object.a)
  })
})
