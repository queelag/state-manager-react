import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { Observer } from '../../src'
import { getTestStore, Store } from '../get.test.store'

describe('Observer', () => {
  it('works', () => {
    let store: Store

    store = getTestStore()
    render(<Observer targets={[store]}>{() => <span data-testid='number'>{store.number}</span>}</Observer>)

    expect(screen.getByTestId('number').innerHTML).toBe('0')
    act(() => {
      store.number++
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
  })
})
