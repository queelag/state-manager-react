import { reaction, WatcherReactionEffect, WatcherReactionExpression } from '@queelag/state-manager'
import { useEffect } from 'react'

/**
 * Runs an effect when the value returned from the expression changes.
 *
 * ```tsx
 * import React from 'react'
 * import { useReaction } from '@queelag/state-manager-react'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * function App() {
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   useReaction(
 *     () => store.number,
 *     () => {
 *       console.log(store.number)
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
export function useReaction<T extends object, U>(expression: WatcherReactionExpression<U>, effect: WatcherReactionEffect<U>, target?: T) {
  useEffect(() => {
    return reaction(expression, effect, target)
  }, [])
}
