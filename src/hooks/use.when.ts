import { useEffect } from 'react'
import { WatcherWhenEffect } from '../definitions/types'
import { when } from '../modules/when'

export function useWhen<T extends object, U>(predicate: WatcherWhenEffect, effect: WatcherWhenEffect, target: T) {
  useEffect(() => {
    return when(predicate, effect, target)
  }, [])
}
