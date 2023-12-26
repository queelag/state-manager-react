import { KeyOf } from '@aracna/core'
import { useDispatch } from '@aracna/react'
import { observe } from '@aracna/state-manager'
import { DependencyList, useRef } from 'react'
import { useReaction } from './use-reaction.js'

export function useObservable<T extends object>(target: T, keys?: KeyOf.Shallow<T>[], deps?: DependencyList): T
export function useObservable<T extends object>(target: T, keys: string[], deps?: DependencyList): T
export function useObservable<T extends object>(target: T, keys: KeyOf.Shallow<T>[] = Object.keys(target) as any, deps: DependencyList = []): T {
  const dispatch = useDispatch()
  const observable = useRef(observe(target, keys))

  useReaction(
    () => {
      keys.forEach((k: KeyOf.Shallow<T>) => observable.current[k])
      return NaN
    },
    dispatch,
    deps
  )

  return observable.current
}
