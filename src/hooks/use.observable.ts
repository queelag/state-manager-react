import { observe, watch, WatcherType } from '@queelag/state-manager'
import { useEffect, useRef } from 'react'
import { useDispatch } from './use.dispatch'

/**
 * Observes the target and automatically re-renders on target properties changes.
 *
 * ```tsx
 * import React from 'react'
 * import { useObservable } from '@queelag/state-manager-react'
 *
 * function App() {
 *   const store = useObservable({ number: 0 })
 *
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   return <button onClick={onClick}>{store.number}</button>
 * }
 * ```
 *
 * @category Hook
 */
export function useObservable<T extends object, K extends keyof T>(target: T, keys: K[] = Object.keys(target) as K[]): T {
  const dispatch = useDispatch()
  const observable = useRef(observe(target, keys))

  useEffect(() => {
    return watch(WatcherType.DISPATCH, dispatch, observable.current)
  }, [])

  return observable.current
}
