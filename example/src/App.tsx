import React, { useEffect } from 'react'
import { StateManager, useObserver } from '../../src'

const store: any = {
  /**
   * PRIMITIVES
   */
  array: [0],
  bigint: BigInt(0),
  boolean: false,
  function: () => undefined,
  map: new Map(),
  null: null,
  number: 0,
  object: {
    a: 0,
    b: {
      c: {
        d: 0
      }
    }
  },
  set: new Set(),
  symbol: Symbol('symbol'),
  undefined: undefined,
  /**
   * CLASSES
   */
  date: new Date()
}

StateManager.observe(store, Object.keys(store))

export function App() {
  useEffect(() => {
    console.log(store)

    // @ts-ignore
    window.store = store
  }, [])

  return useObserver(
    () => (
      <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        <span>array: {JSON.stringify(store.array)}</span>
        <span>array[0]: {store.array[0]}</span>
        <span>bigint: {store.bigint.toString()}</span>
        <span>boolean: {store.boolean.toString()}</span>
        <span>function: {store.function.toString()}</span>
        <span>map: {JSON.stringify([...store.map.entries()])}</span>
        <span>null: {store.null}</span>
        <span>number: {store.number}</span>
        <span>object: {JSON.stringify(store.object)}</span>
        <span>object.a: {store.object.a}</span>
        <span>object.b: {JSON.stringify(store.object.b)}</span>
        <span>set: {JSON.stringify([...store.set.entries()])}</span>
        <span>symbol: {store.symbol.toString()}</span>
        <span>undefined: {store.undefined}</span>
        <br />
        <span>date: {store.date.toISOString()}</span>
      </div>
    ),
    [store]
  )
}
