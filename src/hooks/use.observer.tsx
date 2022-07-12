import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { WatcherType } from '../definitions/enums'
import { WatcherDisposer } from '../definitions/types'
import { Observable } from '../modules/observable'
import { useDispatch } from './use.dispatch'

export function useObserver(fn: () => ReactNode, targets: object[]): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    let disposers: WatcherDisposer[]

    disposers = targets.map((v: object) => Observable.watch(WatcherType.DISPATCH, dispatch, v))
    // if (disposers.length <= 0) return

    return () => disposers.forEach((v: WatcherDisposer) => v())
  }, [targets])

  return <Fragment>{fn()}</Fragment>
}
