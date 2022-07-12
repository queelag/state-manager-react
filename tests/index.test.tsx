import { act, render, screen, waitFor } from '@testing-library/react'
import React, { Fragment } from 'react'
import { store } from '../example/src/store'
import { Observer } from '../src'

describe('State Manager', () => {
  beforeEach(() => {
    store.reset()
  })

  it('works', async () => {
    render(
      <Observer targets={[store]}>
        {() => (
          <Fragment>
            <span data-testid='array'>{JSON.stringify(store.array)}</span>
            <span data-testid='bigint'>{store.bigint.toString()}</span>
            <span data-testid='boolean'>{store.boolean.toString()}</span>
            <span data-testid='function'>{store.function.toString()}</span>
            <span data-testid='map'>{JSON.stringify([...store.map.entries()])}</span>
            <span data-testid='null'>{store.null}</span>
            <span data-testid='number'>{store.number}</span>
            <span data-testid='object'>{JSON.stringify(store.object)}</span>
            <span data-testid='set'>{JSON.stringify([...store.set.entries()])}</span>
            <span data-testid='symbol'>{store.symbol.toString()}</span>
            <span data-testid='undefined'>{store.undefined}</span>
            <span data-testid='date'>{store.date.toISOString()}</span>
          </Fragment>
        )}
      </Observer>
    )

    expect(screen.getByTestId('boolean').innerHTML).toBe('false')

    act(() => {
      store.boolean = true
    })

    await waitFor(() => {
      expect(screen.getByTestId('boolean').innerHTML).toBe('true')
    })
  })
})
