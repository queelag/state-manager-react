import { WatcherReactionEffect, WatcherReactionExpression } from '@queelag/state-manager'
import { render } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { useReaction } from '../../src'
import { getTestStore, Store } from '../get.test.store'

describe('useReaction', () => {
  it('runs only on expression value change', async () => {
    let store: Store, expression: WatcherReactionExpression<number>, effect: WatcherReactionEffect<number>, Component: () => ReactElement

    store = getTestStore()
    expression = () => store.number
    effect = jest.fn()

    Component = () => {
      useReaction(expression, effect)
      return <Fragment />
    }
    render(<Component />)

    expect(effect).not.toBeCalled()

    store.boolean = true
    expect(effect).not.toBeCalled()

    store.number++
    expect(effect).toBeCalled()
    expect(effect).toBeCalledTimes(1)
  })
})
