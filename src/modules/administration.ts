import { ADMINISTRATION_SYMBOL } from '../definitions/constants'
import { Listener } from '../definitions/interfaces'
import { ModuleLogger } from '../loggers/module.logger'

export class Administration<T extends object> {
  dispatchers: Function[]
  listeners: Listener<any>[]
  keys: (keyof T)[]
  proxy: T

  constructor(keys: (keyof T)[], proxy: T) {
    this.dispatchers = []
    this.listeners = []
    this.keys = keys
    this.proxy = proxy
  }

  static listen<T extends object, U>(root: T, target: U, p: string, value: any): void {
    // let administration: Administration<T> | undefined, listeners: Listener<U, any>[]
    // administration = Administration.get(root)
    // if (!administration) return
    // listeners = administration.listeners.filter((v: Listener<any, any>) => v.key === p && v.target === target)
    // if (listeners.length <= 0) return
    // listeners.forEach((v: Listener<U, any>) => v.effect(value))
    // ModuleLogger.verbose('Administration', 'dispatch', `The listeners have been executed.`, listeners)
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
