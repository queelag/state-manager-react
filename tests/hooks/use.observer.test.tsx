import { act, render, screen } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { useObserver } from '../../src'
import { getTestStore, Store } from '../get.test.store'

describe('useObserver', () => {
  it('works', () => {
    let store: Store, Component: (props: any) => ReactElement

    store = getTestStore()

    Component = () => useObserver(() => <span data-testid='number'>{store.number}</span>)
    render(<Component />)

    expect(screen.getByTestId('number').innerHTML).toBe('0')
    act(() => {
      store.number++
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
    act(() => {
      store.bigint++
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
  })
})
