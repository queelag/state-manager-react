import React, { Fragment } from 'react'
import { useMemoObserver } from '../../../src'
import { AppChildrenProps } from '../definitions/props'
import { store } from '../store'

export function Objects(props: AppChildrenProps) {
  console.log('RENDERING OBJECTS')

  return useMemoObserver(() => (
    <Fragment>
      <span>date: {store.object.date.toString()}</span>
      <span>map: {JSON.stringify([...store.object.map.entries()])}</span>
      <span>set: {JSON.stringify([...store.object.set.values()])}</span>
    </Fragment>
  ))
}
