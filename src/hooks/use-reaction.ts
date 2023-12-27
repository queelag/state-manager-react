import { reaction, WatcherReactionEffect, WatcherReactionExpression } from '@aracna/state-manager'
import { DependencyList, useEffect } from 'react'

/**
 * Runs an effect whenever any of the values it references from an observable change inside the expression.
 * Optionally the dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hooks/use-reaction)
 */
export function useReaction<T>(expression: WatcherReactionExpression<T>, effect: WatcherReactionEffect<T>, deps: DependencyList = []) {
  useEffect(() => {
    return reaction(expression, effect)
  }, deps)
}
