import { ADMINISTRATION_SYMBOL } from '../definitions/constants'
import { ModuleLogger } from '../loggers/module.logger'
import { ProxyObservable } from './proxy.observable'

export class Administration<T extends object> {
  dispatchers: Function[]
  keys: (keyof T)[]
  proxy: T

  constructor(target: T, keys: (keyof T)[]) {
    let clone: T

    clone = { ...target }
    ProxyObservable.setRecursive(target, clone, keys)

    this.dispatchers = []
    this.keys = keys
    this.proxy = new Proxy(clone, ProxyObservable.getHandler(target))
  }

  static dispatch<T extends object>(target: T): void {
    let administration: Administration<T> | undefined

    administration = Administration.get(target)
    if (!administration) return

    administration.dispatchers.forEach((v: Function) => v())
    ModuleLogger.verbose('Administration', 'dispatch', `The dispatchers have been executed.`, administration.dispatchers)
  }

  static get<T extends object>(target: T): Administration<T> | undefined {
    return Reflect.get(target, ADMINISTRATION_SYMBOL)
  }

  static isDefined<T extends object>(target: T): boolean {
    return Reflect.has(target, ADMINISTRATION_SYMBOL)
  }

  static isNotDefined<T extends object>(target: T): boolean {
    return !this.isDefined(target)
  }
}
