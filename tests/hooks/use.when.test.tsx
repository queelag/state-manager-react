import { act, render, waitFor } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { useWhen } from '../../src'
import { WatcherWhenEffect, WatcherWhenPredicate } from '../../src/definitions/types'
import { getTestStore, Store } from '../get.test.store'

describe('useWhen', () => {
  it('runs only when predicate is truthy', () => {
    let store: Store, predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, Component: () => ReactElement

    store = getTestStore()
    predicate = () => store.boolean
    effect = jest.fn()

    Component = () => {
      useWhen(predicate, effect, [store])
      return <Fragment />
    }
    render(<Component />)

    expect(effect).not.toBeCalled()
    act(() => {
      store.number++
    })
    waitFor(() => {
      expect(effect).not.toBeCalled()
    })
    act(() => {
      store.boolean = true
    })
    waitFor(() => {
      expect(effect).toBeCalled()
      expect(effect).toBeCalledTimes(1)
    })
    act(() => {
      store.boolean = false
    })
    waitFor(() => {
      expect(effect).not.toBeCalled()
    })
  })
})
