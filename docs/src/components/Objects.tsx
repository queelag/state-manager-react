import React, { Fragment } from 'react'
import { useObserver } from '../../../src'
import { store } from '../store'

export function Objects() {
  console.log('RENDERING OBJECTS')

  return useObserver(() => (
    <Fragment>
      <span>date: {store.object.date.toString()}</span>
      <span>map: {JSON.stringify([...store.object.map.entries()])}</span>
      <span>set: {JSON.stringify([...store.object.set.values()])}</span>
    </Fragment>
  ))
}
