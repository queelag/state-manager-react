import { reaction, WatcherReactionEffect, WatcherReactionExpression } from '@aracna/state-manager'
import { DependencyList, useEffect } from 'react'

export function useReaction<T>(expression: WatcherReactionExpression<T>, effect: WatcherReactionEffect<T>, deps: DependencyList = []) {
  useEffect(() => {
    return reaction(expression, effect)
  }, deps)
}
