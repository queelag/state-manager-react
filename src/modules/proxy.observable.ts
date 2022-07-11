import { ModuleLogger } from '../loggers/module.logger'
import { Administration } from './administration'

export class ProxyObservable {
  static setRecursive<T extends object, U extends object>(root: T, target: U, keys: (keyof U)[]) {
    keys.forEach((k: keyof U) => {
      let property: any, proxy: any

      property = Reflect.get(target, k)
      if (typeof property !== 'object' || property === null) return

      switch (true) {
        case property instanceof Date:
          return
      }

      this.setRecursive(root, property, Object.keys(property))

      if (property.isProxy) {
        return
      }

      proxy = new Proxy(property, this.getHandler(root))

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

  static getHandler<T extends object, U extends object>(root: T): ProxyHandler<U> {
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

            proxy = new Proxy(value, this.getHandler(root))

            break
        }

        set = Reflect.set(target, p, proxy || value, receiver)
        if (!set) return false

        if (Administration.isNotDefined(root)) {
          return true
        }

        ModuleLogger.verbose('ProxyObservable', 'getHandler', 'set', `The value has been set.`, [target, p, value])

        Administration.dispatch(root)

        return true
      }
    }
  }
}
