import { noop } from '@queelag/core'
import { render, screen, waitFor } from '@testing-library/react'
import React, { ReactElement, useEffect, useRef } from 'react'
import { useDispatch } from '../../src'

describe('useDispatch', () => {
  it('causes a re-render only when the component is mounted', () => {
    let spy: jest.SpyInstance, Component: () => ReactElement

    spy = jest.spyOn({ a: noop }, 'a')

    Component = () => {
      const dispatch = useDispatch()
      const number = useRef(0)

      if (!spy) {
        spy = jest.spyOn({ dispatch }, 'dispatch')
      }

      if (number.current <= 0) {
        number.current++
        dispatch()
      }

      useEffect(() => {
        number.current++
        dispatch()

        return () => {
          number.current++
          dispatch()
        }
      }, [])

      return <span data-testid='number'>{number.current}</span>
    }

    render(<Component />)
    waitFor(() => {
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledTimes(1)
      expect(screen.queryByTestId('number')?.innerHTML).toBe(2)
    })
  })
})
