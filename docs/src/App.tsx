import { toJS } from '@queelag/state-manager'
import React, { useState } from 'react'
import { useAutorun, useReaction, useWhen } from '../../src'
import { Libraries } from './components/Libraries'
import { List } from './components/List'
import { Objects } from './components/Objects'
import { Primitives } from './components/Primitives'
import { UI } from './components/UI'
import { store } from './store'

export function App() {
  const [state, setState] = useState<any>()

  useAutorun(() => {
    console.log('autorun', toJS(store))
  })

  useReaction(
    () => store.object.map.get(0),
    () => {
      console.log('store.object.map', store.object.map)
    }
  )

  useReaction(
    () => store.primitive.object,
    () => {
      console.log('store.object', store.primitive.object)
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
      <Primitives state={state} setState={setState} />
      <br />
      <h2>Objects</h2>
      <Objects state={state} setState={setState} />
      <br />
      <h2>Libraries</h2>
      <Libraries state={state} setState={setState} />
      <h2>List</h2>
      <List state={state} setState={setState} />
      <h2>UI</h2>
      <UI state={state} setState={setState} />
    </div>
  )
}
