import { reaction, WatcherReactionEffect, WatcherReactionExpression } from '@aracna/state-manager'
import { useEffect } from 'react'

export function useReaction<T>(expression: WatcherReactionExpression<T>, effect: WatcherReactionEffect<T>) {
  useEffect(() => {
    return reaction(expression, effect)
  }, [])
}
