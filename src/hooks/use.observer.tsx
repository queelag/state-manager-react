import { watch, WatcherDisposer, WatcherType } from '@queelag/state-manager'
import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { useDispatch } from './use.dispatch'

/**
 * Automatically re-renders when any of the targets properties change.
 *
 * ```tsx
 * import React from 'react'
 * import { useObserver } from '@queelag/react-state-manager'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * function App() {
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   return useObserver(() => <button onClick={onClick}>{store.number}</button>, [store])
 * }
 * ```
 *
 * @category Hook
 */
export function useObserver(fn: () => ReactNode, targets: object[]): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    let disposers: WatcherDisposer[]

    disposers = targets.map((v: object) => {
      return watch(WatcherType.DISPATCH, dispatch, v)
    })

    return () => disposers.forEach((v: WatcherDisposer) => v())
  }, [])

  return <Fragment>{fn()}</Fragment>
}
