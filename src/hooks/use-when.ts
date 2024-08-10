import { type WatcherWhenEffect, type WatcherWhenPredicate, when } from '@aracna/state-manager'
import { type DependencyList, useEffect } from 'react'

/**
 * Runs an effect whenever the predicate becomes true.
 * Optionally the dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hooks/use-when)
 */
export function useWhen(predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, deps: DependencyList = []) {
  useEffect(() => {
    return when(predicate, effect)
  }, deps)
}
