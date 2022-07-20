import { WatcherWhenEffect, WatcherWhenPredicate, when } from '@queelag/state-manager'
import { useEffect } from 'react'

/**
 * Runs an effect when the predicate is truthy.
 *
 * ```tsx
 * import React from 'react'
 * import { useWhen } from '@queelag/state-manager-react'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ boolean: false })
 *
 * function App() {
 *   const onClick = () => {
 *     store.boolean = !store.boolean
 *   }
 *
 *   useWhen(
 *     () => store.boolean,
 *     () => {
 *       console.log(store.boolean)
 *     },
 *     store
 *   )
 *
 *   return <button onClick={onClick} />
 * }
 * ```
 *
 * @category Hook
 */
export function useWhen<T extends object, U>(predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, target?: T) {
  useEffect(() => {
    return when(predicate, effect, target)
  }, [])
}
