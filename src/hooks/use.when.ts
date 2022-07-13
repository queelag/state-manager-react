import { WatcherWhenEffect, WatcherWhenPredicate, when } from '@queelag/state-manager'
import { useEffect } from 'react'

export function useWhen<T extends object, U>(predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, target: T) {
  useEffect(() => {
    return when(predicate, effect, target)
  }, [])
}
