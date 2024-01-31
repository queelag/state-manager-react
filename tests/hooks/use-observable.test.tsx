import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { useObservable } from '../../src'

describe('useObservable', () => {
  it('works', () => {
    let Component: () => ReactElement

    Component = () => {
      const store = useObservable({ array: [0], number: 0, map: new Map([['a', 0]]), object: { number: 0 }, set: new Set([0]) })

      const onClickArray = () => {
        store.array[0]++
      }

      const onClickMap = () => {
        store.map.set('a', (store.map.get('a') as number) + 1)
      }

      const onClickNumber = () => {
        store.number++
      }

      const onClickObjectNumber = () => {
        store.object.number++
      }

      const onClickSet = () => {
        store.set.add(1)
      }

      return (
        <Fragment>
          <span data-testid='array' onClick={onClickArray}>
            {store.array.join(',')}
          </span>
          <span data-testid='map' onClick={onClickMap}>
            {store.map.get('a')}
          </span>
          <span data-testid='number' onClick={onClickNumber}>
            {store.number}
          </span>
          <span data-testid='object.number' onClick={onClickObjectNumber}>
            {store.object.number}
          </span>
          <span data-testid='set' onClick={onClickSet}>
            {[...store.set.values()].join(',')}
          </span>
        </Fragment>
      )
    }

    render(<Component />)

    expect(screen.getByTestId('array').innerHTML).toBe('0')
    act(() => {
      fireEvent.click(screen.getByTestId('array'))
    })
    expect(screen.getByTestId('array').innerHTML).toBe('1')

    expect(screen.getByTestId('map').innerHTML).toBe('0')
    act(() => {
      fireEvent.click(screen.getByTestId('map'))
    })
    expect(screen.getByTestId('map').innerHTML).toBe('1')

    expect(screen.getByTestId('number').innerHTML).toBe('0')
    act(() => {
      fireEvent.click(screen.getByTestId('number'))
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')

    expect(screen.getByTestId('object.number').innerHTML).toBe('0')
    act(() => {
      fireEvent.click(screen.getByTestId('object.number'))
    })
    expect(screen.getByTestId('object.number').innerHTML).toBe('1')

    expect(screen.getByTestId('set').innerHTML).toBe('0')
    act(() => {
      fireEvent.click(screen.getByTestId('set'))
    })
    expect(screen.getByTestId('set').innerHTML).toBe('0,1')
  })
})
