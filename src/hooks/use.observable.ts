import { useRef } from 'react'
import { Observable } from '../modules/observable'

export function useObservable<T extends object, K extends keyof T>(target: T, keys: K[] = Object.keys(target) as K[]): T {
  return useRef(Observable.make(target, keys)).current
}
