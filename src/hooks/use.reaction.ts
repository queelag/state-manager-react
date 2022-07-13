import { reaction, WatcherReactionEffect, WatcherReactionExpression } from '@queelag/state-manager'
import { useEffect } from 'react'

export function useReaction<T extends object, U>(expression: WatcherReactionExpression<U>, effect: WatcherReactionEffect<U>, target: T) {
  useEffect(() => {
    return reaction(expression, effect, target)
  }, [])
}
