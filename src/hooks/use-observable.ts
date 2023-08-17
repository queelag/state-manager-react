import { useDispatch } from '@aracna/react'
import { observe } from '@aracna/state-manager'
import { useRef } from 'react'
import { useReaction } from './use-reaction.js'

export function useObservable<T extends object, K extends keyof T>(target: T, keys: K[] = Object.keys(target) as K[]): T {
  const dispatch = useDispatch()
  const observable = useRef(observe(target, keys))

  useReaction(() => {
    keys.forEach((k: K) => observable.current[k])
    return NaN
  }, dispatch)

  return observable.current
}
