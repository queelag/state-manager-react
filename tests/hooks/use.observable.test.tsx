import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { useObservable } from '../../src'

describe('useObservable', () => {
  it('works', () => {
    let Component: () => ReactElement

    Component = () => {
      const store = useObservable({ number: 0 })

      const onClick = () => {
        store.number++
      }

      return (
        <span data-testid='number' onClick={onClick}>
          {store.number}
        </span>
      )
    }

    render(<Component />)

    expect(screen.getByTestId('number').innerHTML).toBe('0')
    act(() => {
      fireEvent.click(screen.getByTestId('number'))
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
  })
})
