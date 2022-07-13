import React from 'react'
import { toJS, useAutorun, useObserver, useReaction, useWhen } from '../../src'
import { store } from './store'

export function App() {
  useAutorun(() => {
    console.log('autorun', toJS(store))
  }, store)

  useReaction(
    () => store.map.get(0),
    () => {
      console.log('store.map', store.map)
    },
    store
  )

  useWhen(
    () => store.boolean,
    () => {
      console.log('store.boolean is true', store.boolean)
    },
    store
  )

  return useObserver(
    () => (
      <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
        <h2>Primitives</h2>
        <span>array: {JSON.stringify(store.array)}</span>
        <span>bigint: {store.bigint.toString()}</span>
        <span>boolean: {store.boolean.toString()}</span>
        <span>function: {store.function.toString()}</span>
        <span>null: {store.null}</span>
        <span>number: {store.number}</span>
        <span>object: {JSON.stringify(store.object)}</span>
        <span>symbol: {store.symbol.toString()}</span>
        <span>undefined: {store.undefined}</span>
        <br />
        <h2>Classes</h2>
        <span>date: {store.date.toString()}</span>
        <span>map: {JSON.stringify([...store.map.entries()])}</span>
        <span>set: {JSON.stringify([...store.set.values()])}</span>
        <br />
        <h2>Libraries</h2>
        <span>dayjs: {store.dayjs.toString()}</span>
      </div>
    ),
    [store]
  )
}
