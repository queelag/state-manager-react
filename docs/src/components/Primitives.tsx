import React, { Fragment } from 'react'
import { useMemoObserver } from '../../../src'
import { AppChildrenProps } from '../definitions/props'
import { store } from '../store'

export function Primitives(props: AppChildrenProps) {
  console.log('RENDERING PRIMITIVES')

  return useMemoObserver(() => (
    <Fragment>
      <span>array: {JSON.stringify(store.primitive.array)}</span>
      <span>bigint: {store.primitive.bigint.toString()}</span>
      <span>boolean: {store.primitive.boolean.toString()}</span>
      <span>function: {store.primitive.function.toString()}</span>
      <span>null: {store.primitive.null}</span>
      <span>number: {store.primitive.number}</span>
      <span>object: {JSON.stringify(store.primitive.object)}</span>
      <span>string: {store.primitive.string}</span>
      <span>symbol: {store.primitive.symbol.toString()}</span>
      <span>undefined: {store.primitive.undefined}</span>
    </Fragment>
  ))
}
