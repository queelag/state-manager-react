import { render } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { useWhen } from '../../src'
import { WatcherWhenEffect, WatcherWhenPredicate } from '../../src/definitions/types'
import { getTestStore, Store } from '../get.test.store'

describe('useWhen', () => {
  it('runs only when predicate is truthy', async () => {
    let store: Store, predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, Component: () => ReactElement

    store = getTestStore()
    predicate = () => store.boolean
    effect = jest.fn()

    Component = () => {
      useWhen(predicate, effect, store)
      return <Fragment />
    }
    render(<Component />)

    expect(effect).not.toBeCalled()

    store.number++
    expect(effect).not.toBeCalled()

    store.boolean = true
    expect(effect).toBeCalled()
    expect(effect).toBeCalledTimes(1)

    store.boolean = false
    expect(effect).toBeCalledTimes(1)
  })
})
