import React, { Fragment } from 'react'
import { useMemoObserver } from '../../../src'
import { AppChildrenProps } from '../definitions/props'
import { store } from '../store'
import { Dialog } from './Dialog'

export function UI(props: AppChildrenProps) {
  const onClickToggleDialog = () => {
    store.ui.dialog = !store.ui.dialog
  }

  return useMemoObserver(() => (
    <Fragment>
      <button onClick={onClickToggleDialog}>{store.ui.dialog ? 'Close' : 'Open'} Dialog</button>
      <Dialog />
    </Fragment>
  ))
}
