import { reaction, WatcherReactionEffect, WatcherReactionExpression } from '@aracna/state-manager'
import { useEffect } from 'react'

/**
 * Runs an effect when any of the properties used inside the expression change.
 *
 * ```tsx
 * import React from 'react'
 * import { useReaction } from '@aracna/state-manager-react'
 * import { observe } from '@aracna/state-manager'
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
 *     }
 *   )
 *
 *   return <button onClick={onClick} />
 * }
 * ```
 *
 * @category Hook
 */
export function useReaction<T>(expression: WatcherReactionExpression<T>, effect: WatcherReactionEffect<T>) {
  useEffect(() => {
    return reaction(expression, effect)
  }, [])
}
