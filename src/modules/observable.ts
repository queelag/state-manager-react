import { ArrayUtils, noop } from '@queelag/core'
import { Watcher } from '../classes/watcher'
import { ADMINISTRATION_SYMBOL } from '../definitions/constants'
import { WatcherType } from '../definitions/enums'
import {
  WatcherAutorunEffect,
  WatcherDispatchEffect,
  WatcherDisposer,
  WatcherReactionEffect,
  WatcherReactionExpression,
  WatcherWhenEffect,
  WatcherWhenPredicate
} from '../definitions/types'
import { ModuleLogger } from '../loggers/module.logger'
import { Administration } from './administration'
import { ObservableMap } from './observable.map'
import { ObservableSet } from './observable.set'

export class Observable {
  static watch<T extends object, U>(type: WatcherType.AUTORUN, effect: WatcherAutorunEffect, target: T): WatcherDisposer
  static watch<T extends object, U>(type: WatcherType.DISPATCH, effect: WatcherDispatchEffect, target: T): WatcherDisposer
  static watch<T extends object, U>(
    type: WatcherType.REACTION,
    expression: WatcherReactionExpression<U>,
    effect: WatcherReactionEffect<U>,
    target: T
  ): WatcherDisposer
  static watch<T extends object, U>(type: WatcherType.WHEN, predicate: WatcherWhenPredicate, effect: WatcherWhenEffect, target: T): WatcherDisposer
  static watch<T extends object, U>(type: WatcherType, ...args: any): WatcherDisposer {
    let target: T

    switch (type) {
      case WatcherType.AUTORUN:
      case WatcherType.DISPATCH:
        target = args[1]
        break
      case WatcherType.REACTION:
      case WatcherType.WHEN:
        target = args[2]
        break
    }

    return Administration.with(
      target,
      (administration: Administration<T>) => {
        let disposer: (watcher: Watcher<U>) => WatcherDisposer, watcher: Watcher<U> | undefined

        disposer = (watcher: Watcher<U>) => () => {
          administration.watchers = ArrayUtils.remove(administration.watchers, (v: Watcher) => v === watcher)
          ModuleLogger.verbose('Observable', 'watch', 'disposer', `The watcher has been disposed of.`, watcher)
        }

        switch (type) {
          case WatcherType.AUTORUN:
            watcher = administration.watchers.find((v: Watcher) => v.autorun.effect === args[0] && v.type === type)
            break
          case WatcherType.DISPATCH:
            watcher = administration.watchers.find((v: Watcher) => v.dispatch.effect === args[0] && v.type === type)
            break
          case WatcherType.REACTION:
            watcher = administration.watchers.find((v: Watcher) => v.reaction.effect === args[1] && v.reaction.expression === args[0] && v.type === type)
            break
          case WatcherType.WHEN:
            watcher = administration.watchers.find((v: Watcher) => v.when.effect === args[1] && v.when.predicate === args[0] && v.type === type)
            break
        }

        if (watcher) {
          ModuleLogger.warn('Observable', 'watch', `This watcher already exists.`, watcher)
          return disposer(watcher)
        }

        switch (type) {
          case WatcherType.AUTORUN:
            watcher = new Watcher(type, args[0])
            break
          case WatcherType.DISPATCH:
            watcher = new Watcher(type, args[0])
            break
          case WatcherType.REACTION:
            watcher = new Watcher(type, args[1], args[0])
            break
          case WatcherType.WHEN:
            watcher = new Watcher(type, args[1], args[0])
            break
        }

        administration.watchers.push(watcher)
        ModuleLogger.verbose('Observable', 'watch', `The watcher has been pushed.`, watcher)

        return disposer(watcher)
      },
      noop
    )
  }

  static make<T extends object, K extends keyof T>(target: T, keys: K[]): T {
    let clone: T, proxy: T

    if (Administration.isDefined(target)) {
      ModuleLogger.warn('Observable', 'make', `The target is already an observable.`, target)
      return target
    }

    clone = { ...target }
    Observable.makeProperties(target, clone, keys)

    proxy = new Proxy(clone, Observable.getProxyHandler(target))
    Reflect.set(target, ADMINISTRATION_SYMBOL, new Administration(keys, proxy))

    keys.forEach((k: keyof T) => Object.defineProperty(target, k, Observable.getPropertyDescriptor(target, k)))

    return target
  }

  private static makeProperties<T extends object, U extends object, K extends keyof U>(root: T, target: U, keys: K[]) {
    keys.forEach((k: K) => {
      let property: any, proxy: any

      property = Reflect.get(target, k)
      if (typeof property !== 'object' || property === null) return

      if (Observable.isNotProxiable(property)) {
        return
      }

      Observable.makeProperties(root, property, Object.keys(property))

      if (Observable.isProxy(property)) {
        return
      }

      proxy = new Proxy(property, Observable.getProxyHandler(root))

      switch (true) {
        case proxy instanceof Map:
          ObservableMap.make(root, proxy)
          break
        case proxy instanceof Set:
          ObservableSet.make(root, proxy)
          break
      }

      Reflect.set(target, k, proxy)
    })
  }

  private static getPropertyDescriptor<T extends object>(target: T, key: keyof T): PropertyDescriptor {
    return {
      get: () => {
        let administration: Administration<T> | undefined

        administration = Administration.get(target)
        if (!administration) return undefined

        return Reflect.get(administration.proxy, key)
      },
      set: (value: any) => {
        let administration: Administration<T> | undefined

        administration = Administration.get(target)
        if (!administration) return false

        Reflect.set(administration.proxy, key, value)
      }
    }
  }

  private static getProxyHandler<T extends object, U extends object>(root: T): ProxyHandler<U> {
    return {
      get: (target: U, p: string | symbol, receiver: any) => {
        let property: any

        if (p === 'isProxy') {
          return true
        }

        property = Reflect.get(target, p, receiver)

        switch (true) {
          case target instanceof Map:
          case target instanceof Set:
            if (typeof property === 'function') {
              return property.bind(target)
            }

            break
        }

        return property
      },
      set: (target: U, p: string, value: any, receiver: any) => {
        let property: any, set: boolean

        if (p === 'isProxy') {
          return false
        }

        property = Reflect.get(target, p)
        if (property === value) return true

        switch (typeof value) {
          case 'object':
            if (Observable.isProxy(value) || Observable.isNotProxiable(value)) {
              break
            }

            value = new Proxy(value, Observable.getProxyHandler(root))

            break
        }

        set = Reflect.set(target, p, value, receiver)
        if (!set) return false

        if (Administration.isNotDefined(root)) {
          return true
        }

        ModuleLogger.verbose('ProxyObservable', 'getHandler', 'set', `The value has been set.`, [target, p, value])
        Administration.onChange(root)

        return true
      }
    }
  }

  private static isProxiable(property: any): boolean {
    if (!property.toString) {
      return false
    }

    switch (property.toString()) {
      case '[object Object]':
      case '[object Map]':
      case '[object Set]':
        return true
      default:
        return false
    }
  }

  private static isNotProxiable(property: any): boolean {
    return this.isProxiable(property) === false
  }

  private static isProxy(property: any): boolean {
    return property.isProxy
  }
}
