import { observe } from '@queelag/state-manager'
import { useRef } from 'react'

export function useObservable<T extends object, K extends keyof T>(target: T, keys: K[] = Object.keys(target) as K[]): T {
  return useRef(observe(target, keys)).current
}
