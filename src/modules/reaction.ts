import { WatcherType } from '../definitions/enums'
import { WatcherDisposer, WatcherReactionEffect, WatcherReactionExpression } from '../definitions/types'
import { Observable } from './observable'

export function reaction<T extends object, U>(expression: WatcherReactionExpression<U>, effect: WatcherReactionEffect<U>, target: T): WatcherDisposer {
  return Observable.watch(WatcherType.REACTION, expression, effect, target)
}
