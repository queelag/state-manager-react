import { useDispatch } from '@aracna/react'
import { observe } from '@aracna/state-manager'
import { useRef } from 'react'
import { useReaction } from './use.reaction'

/**
 * Observes the target and automatically re-renders on target properties changes.
 *
 * ```tsx
 * import React from 'react'
 * import { useObservable } from '@aracna/state-manager-react'
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

  useReaction(() => {
    keys.forEach((k: K) => observable.current[k])
    return NaN
  }, dispatch)

  return observable.current
}
