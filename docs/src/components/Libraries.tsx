import React, { Fragment } from 'react'
import { useObserver } from '../../../src'
import { store } from '../store'

export function Libraries() {
  console.log('RENDERING LIBRARIES')

  return useObserver(() => (
    <Fragment>
      <span>dayjs: {store.library.dayjs.toString()}</span>
    </Fragment>
  ))
}
