import { ADMINISTRATION_SYMBOL } from './definitions/constants'
import { Administration } from './modules/administration'

export class StateManager {
  static observe<T extends object>(target: T, keys: (keyof T)[]): T {
    Reflect.set(target, ADMINISTRATION_SYMBOL, new Administration(target, keys))

    keys.forEach((k: keyof T) => {
      Object.defineProperty(target, k, StateManager.getPropertyAttributes(target, k))
    })

    return target
  }

  private static getPropertyAttributes<T extends object>(target: T, key: keyof T): PropertyDescriptor {
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

export { Observer } from './components/Observer'
export { useObserver } from './hooks/use.observer'
