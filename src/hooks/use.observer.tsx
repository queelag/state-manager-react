import { watch, WatcherDisposer, WatcherType } from '@queelag/state-manager'
import React, { Fragment, ReactElement, ReactNode, useEffect, useMemo } from 'react'
import { useDispatch } from './use.dispatch'

/**
 * Automatically re-renders when any of the targets properties change.
 *
 * ```tsx
 * import React from 'react'
 * import { useObserver } from '@queelag/state-manager-react'
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
  const Component = useMemo(() => () => <Fragment>{fn()}</Fragment>, [])
  const dispatch = useDispatch()

  useEffect(() => {
    let disposers: WatcherDisposer[]

    disposers = targets.map((v: object) => {
      return watch(WatcherType.DISPATCH, dispatch, v)
    })

    return () => disposers.forEach((v: WatcherDisposer) => v())
  }, [])

  return <Component />
}
