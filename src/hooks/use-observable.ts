import { type KeyOf, isArray, isPlainObject } from '@aracna/core'
import { useDispatch } from '@aracna/react'
import { observe } from '@aracna/state-manager'
import { type DependencyList, useRef } from 'react'
import { useAutorun } from './use-autorun.js'

/**
 * Returns an observable object that can be used inside a component, changes to observed properties will trigger a re-render.
 *
 * - Optionally the keys to observe can be specified.
 * - Optionally the dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hooks/use-observable)
 */
export function useObservable<T extends object>(target: T, keys?: KeyOf.Shallow<T>[], deps?: DependencyList): T
export function useObservable<T extends object>(target: T, keys: string[], deps?: DependencyList): T
export function useObservable<T extends object>(target: T, keys: KeyOf.Shallow<T>[] = Object.keys(target) as any, deps: DependencyList = []): T {
  const dispatch = useDispatch()
  const observable = useRef(observe(target, keys))

  const accessProperties = <T extends object>(object: T, keys: KeyOf.Shallow<T>[]): void => {
    for (let key of keys) {
      const value: unknown = object[key]

      if (isArray(value) || isPlainObject(value)) {
        accessProperties(value, Object.keys(value) as KeyOf.Shallow<typeof value>[])
        continue
      }

      if (value instanceof Map) {
        value.entries()

        for (let k of value.keys()) {
          value.get(k)
        }

        value.keys()
        value.values()

        continue
      }

      if (value instanceof Set) {
        value.entries()
        value.keys()
        value.values()
      }
    }
  }

  useAutorun(() => {
    accessProperties(observable.current, keys)
    dispatch()
  }, deps)

  return observable.current
}
