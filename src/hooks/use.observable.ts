import { useRef } from 'react'
import { observe } from '../modules/observe'

export function useObservable<T extends object, K extends keyof T>(target: T, keys: K[] = Object.keys(target) as K[]): T {
  return useRef(observe(target, keys)).current
}
