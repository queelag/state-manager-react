import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { Fragment, ReactElement, useState } from 'react'
import { describe, expect, it } from 'vitest'
import { useMemoObserver } from '../../src'
import { Store, getTestStore } from '../get-test-store'

describe('useMemoObserver', () => {
  it('works', () => {
    let store: Store, Component: (props: any) => ReactElement

    store = getTestStore()

    Component = () => {
      const [state, setState] = useState(0)

      return useMemoObserver(() => (
        <Fragment>
          <span data-testid='number'>{store.number}</span>
          <span data-testid='state' onClick={() => setState((v: number) => v + 1)}>
            {state}
          </span>
        </Fragment>
      ))
    }
    render(<Component />)

    expect(screen.getByTestId('number').innerHTML).toBe('0')
    act(() => {
      store.number++
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
    act(() => {
      fireEvent.click(screen.getByTestId('state'))
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
    expect(screen.getByTestId('state').innerHTML).toBe('0')
  })
})
