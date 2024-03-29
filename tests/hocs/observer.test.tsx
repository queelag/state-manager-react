import { act, render, screen } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { observer } from '../../src'
import { Store, getTestStore } from '../get-test-store'

describe('observer', () => {
  it('works', () => {
    let store: Store, Component: (props: any) => ReactElement

    store = getTestStore()

    Component = observer(() => <span data-testid='number'>{store.number}</span>)
    render(<Component />)

    expect(screen.getByTestId('number').innerHTML).toBe('0')
    act(() => {
      store.number++
    })
    expect(screen.getByTestId('number').innerHTML).toBe('1')
  })
})
