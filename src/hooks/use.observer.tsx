import { noop } from '@queelag/core'
import { watch, WatcherDisposer, WatcherType } from '@queelag/state-manager'
import React, { Fragment, ReactElement, ReactNode, useEffect, useRef } from 'react'
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
 *   useObserver([store])
 *
 *   return <button onClick={onClick}>{store.number}</button>
 * }
 * ```
 *
 * @category Hook
 */
export function useObserver(targets: object[]): void
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
export function useObserver(fn: () => ReactNode, targets: object[]): ReactElement
export function useObserver(...args: any): ReactElement {
  const dispatch = useDispatch()
  const fn = useRef<() => ReactNode>(args.length >= 2 ? args[0] : noop)
  const targets = useRef<object[]>(args.length >= 2 ? args[1] : args[0])

  useEffect(() => {
    let disposers: WatcherDisposer[]

    disposers = targets.current.map((v: object) => {
      return watch(WatcherType.DISPATCH, dispatch, v)
    })

    return () => disposers.forEach((v: WatcherDisposer) => v())
  }, [])

  return <Fragment>{fn.current()}</Fragment>
}
