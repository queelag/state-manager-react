import { useEffect } from 'react'
import { WatcherReactionEffect, WatcherReactionExpression } from '../definitions/types'
import { reaction } from '../modules/reaction'

export function useReaction<T extends object, U>(expression: WatcherReactionExpression<U>, effect: WatcherReactionEffect<U>, target: T) {
  useEffect(() => {
    return reaction(expression, effect, target)
  }, [])
}
