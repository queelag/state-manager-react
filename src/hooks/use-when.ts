import { WatcherWhenEffect, WatcherWhenPredicate, when } from '@aracna/state-manager'
import { DependencyList, useEffect } from 'react'

export function useWhen(predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, deps: DependencyList = []) {
  useEffect(() => {
    return when(predicate, effect)
  }, deps)
}
