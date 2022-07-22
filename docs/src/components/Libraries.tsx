import React, { Fragment } from 'react'
import { useMemoObserver } from '../../../src'
import { AppChildrenProps } from '../definitions/props'
import { store } from '../store'

export function Libraries(props: AppChildrenProps) {
  console.log('RENDERING LIBRARIES')

  return useMemoObserver(() => (
    <Fragment>
      <span>dayjs: {store.library.dayjs.toString()}</span>
    </Fragment>
  ))
}
