import { act, render, waitFor } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { useReaction } from '../../src'
import { WatcherReactionEffect, WatcherReactionExpression } from '../../src/definitions/types'
import { getTestStore, Store } from '../get.test.store'

describe('useReaction', () => {
  it('runs only on expression value change', () => {
    let store: Store, expression: WatcherReactionExpression<number>, effect: WatcherReactionEffect<number>, Component: () => ReactElement

    store = getTestStore()
    expression = () => store.number
    effect = jest.fn()

    Component = () => {
      useReaction(expression, effect, [store])
      return <Fragment />
    }
    render(<Component />)

    expect(effect).not.toBeCalled()
    act(() => {
      store.boolean = true
    })
    waitFor(() => {
      expect(effect).not.toBeCalled()
    })
    act(() => {
      store.number++
    })
    waitFor(() => {
      expect(effect).toBeCalled()
      expect(effect).toBeCalledTimes(1)
    })
  })
})
