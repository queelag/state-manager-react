import { WatcherWhenEffect, WatcherWhenPredicate, when } from '@aracna/state-manager'
import { useEffect } from 'react'

export function useWhen(predicate: WatcherWhenPredicate, effect: WatcherWhenEffect) {
  useEffect(() => {
    return when(predicate, effect)
  }, [])
}
