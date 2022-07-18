import { toJS } from '@queelag/state-manager'
import React, { Fragment } from 'react'
import { Observer, useAutorun, useReaction, useWhen } from '../../src'
import { store } from './store'

export function App() {
  useAutorun(() => {
    console.log('autorun', toJS(store))
  }, store)

  useReaction(
    () => store.object.map.get(0),
    () => {
      console.log('store.object.map', store.object.map)
    },
    store
  )

  useWhen(
    () => store.primitive.boolean,
    () => {
      console.log('store.primitive.boolean is true', store.primitive)
    },
    store
  )

  return (
    <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
      <h2>Primitives</h2>
      <Observer targets={[store.primitive]}>
        {() => (
          <Fragment>
            <span>array: {JSON.stringify(store.primitive.array)}</span>
            <span>bigint: {store.primitive.bigint.toString()}</span>
            <span>boolean: {store.primitive.boolean.toString()}</span>
            <span>function: {store.primitive.function.toString()}</span>
            <span>null: {store.primitive.null}</span>
            <span>number: {store.primitive.number}</span>
            <span>object: {JSON.stringify(store.primitive.object)}</span>
            <span>symbol: {store.primitive.symbol.toString()}</span>
            <span>undefined: {store.primitive.undefined}</span>
          </Fragment>
        )}
      </Observer>
      <br />
      <h2>Objects</h2>
      <Observer targets={[store.object]}>
        {() => (
          <Fragment>
            <span>date: {store.object.date.toString()}</span>
            <span>map: {JSON.stringify([...store.object.map.entries()])}</span>
            <span>set: {JSON.stringify([...store.object.set.values()])}</span>
          </Fragment>
        )}
      </Observer>
      <br />
      <h2>Libraries</h2>
      <Observer targets={[store.library]}>
        {() => (
          <Fragment>
            <span>dayjs: {store.library.dayjs.toString()}</span>
          </Fragment>
        )}
      </Observer>
    </div>
  )
}
