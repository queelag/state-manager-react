import { toJS } from '@queelag/state-manager'
import React from 'react'
import { useAutorun, useReaction, useWhen } from '../../src'
import { Libraries } from './components/Libraries'
import { Objects } from './components/Objects'
import { Primitives } from './components/Primitives'
import { store } from './store'

export function App() {
  useAutorun(() => {
    console.log('autorun', toJS(store))
  })

  useReaction(
    () => store.object.map.get(0),
    () => {
      console.log('store.object.map', store.object.map)
    }
  )

  useWhen(
    () => store.primitive.boolean,
    () => {
      console.log('store.primitive.boolean is true', store.primitive)
    }
  )

  return (
    <div style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
      <h2>Primitives</h2>
      <Primitives />
      <br />
      <h2>Objects</h2>
      <Objects />
      <br />
      <h2>Libraries</h2>
      <Libraries />
    </div>
  )
}
