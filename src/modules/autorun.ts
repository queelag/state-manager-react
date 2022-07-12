import { WatcherType } from '../definitions/enums'
import { WatcherAutorunEffect, WatcherDisposer } from '../definitions/types'
import { Observable } from './observable'

export function autorun<T extends object>(effect: WatcherAutorunEffect, target: T): WatcherDisposer {
  return Observable.watch(WatcherType.AUTORUN, effect, target)
}
