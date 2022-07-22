import React, { Fragment } from 'react'
import { useMemoObserver } from '../../../src'
import { store } from '../store'

export function Dialog() {
  const onClose = () => {
    store.ui.dialog = false
  }

  return useMemoObserver(() => (
    <Fragment>
      {store.ui.dialog && (
        <dialog style={{ display: 'flex', flexDirection: 'column' }}>
          <span>This is a Dialog</span>
          <button onClick={onClose}>Close Dialog</button>
        </dialog>
      )}
    </Fragment>
  ))
}
