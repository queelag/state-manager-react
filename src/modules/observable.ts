import { ADMINISTRATION_SYMBOL } from '../definitions/constants'
import { Listener, ListenerEffect, ListenerExpression } from '../definitions/interfaces'
import { ModuleLogger } from '../loggers/module.logger'
import { Administration } from './administration'

export class Observable {
  static make<T extends object>(target: T, keys: (keyof T)[]): T {
    let clone: T, proxy: T

    clone = { ...target }
    Observable.makeProperties(target, clone, keys)

    proxy = new Proxy(clone, Observable.getProxyHandler(target))
    Reflect.set(target, ADMINISTRATION_SYMBOL, new Administration(keys, proxy))

    keys.forEach((k: keyof T) => {
      Object.defineProperty(target, k, Observable.getPropertyDescriptor(target, k))
    })

    return target
  }

  static listen<T extends object, U>(root: T, expression: ListenerExpression<U>, effect: ListenerEffect<U>): Listener<U> | Error {
    let administration: Administration<T> | undefined, listener: Listener<U> | undefined

    administration = Administration.get(root)
    if (!administration) return new Error()

    listener = administration.listeners.find((v: Listener<any>) => v.effect === effect && v.expression === expression)
    if (listener) return listener

    listener = {
      effect,
      expression
    }

    administration.listeners.push(listener)
    ModuleLogger.verbose('Observable', 'listen', `The listener has been pushed.`, listener)

    return listener
  }

  private static makeProperties<T extends object, U extends object>(root: T, target: U, keys: (keyof U)[]) {
    keys.forEach((k: keyof U) => {
      let property: any, proxy: any

      property = Reflect.get(target, k)
      if (typeof property !== 'object' || property === null) return

      switch (true) {
        case property instanceof Date:
          return
      }

      Observable.makeProperties(root, property, Object.keys(property))

      if (property.isProxy) {
        return
      }

      proxy = new Proxy(property, Observable.getProxyHandler(root))

      switch (true) {
        case property instanceof Map:
          let m: Map<any, any>, mc: () => void, md: (k: string) => boolean, ms: (k: string, v: any) => Map<any, any>

          m = proxy
          mc = m.clear
          md = m.delete
          ms = m.set

          m.clear = () => {
            mc()
            Administration.dispatch(root)
          }
          m.delete = (k: any) => {
            let b: boolean

            b = md(k)
            if (!b) return false

            Administration.dispatch(root)

            return true
          }
          m.set = (k: any, v: any) => {
            let m: Map<any, any>

            m = ms(k, v)
            Administration.dispatch(root)

            return m
          }

          break
        case property instanceof Set:
          let s: Set<any>, sa: (v: any) => Set<any>, sc: () => void, sd: (v: any) => boolean

          s = proxy
          sa = s.add
          sc = s.clear
          sd = s.delete

          s.add = (v: any) => {
            let s: Set<any>

            s = sa(v)
            Administration.dispatch(root)

            return s
          }
          s.clear = () => {
            sc()
            Administration.dispatch(root)
          }
          s.delete = (v: any) => {
            let b: boolean

            b = sd(v)
            if (!b) return false

            Administration.dispatch(root)

            return true
          }

          break
      }

      Reflect.set(target, k, proxy)
    })
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
        let set: boolean, proxy: any

        if (p === 'isProxy') {
          return false
        }

        switch (typeof value) {
          case 'object':
            if (value.isProxy) {
              break
            }

            if (value instanceof Date) {
              break
            }

            proxy = new Proxy(value, Observable.getProxyHandler(root))

            break
        }

        set = Reflect.set(target, p, proxy || value, receiver)
        if (!set) return false

        if (Administration.isNotDefined(root)) {
          return true
        }

        ModuleLogger.verbose('ProxyObservable', 'getHandler', 'set', `The value has been set.`, [target, p, value])

        Administration.dispatch(root)
        Administration.listen(root, target, p, value)

        return true
      }
    }
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
}
