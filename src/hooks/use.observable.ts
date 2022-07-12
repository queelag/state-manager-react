import { useEffect, useRef } from 'react'
import { Observable } from '../modules/observable'

export function useObservable<T extends object, K extends keyof T>(target: T, keys: K[] = Object.keys(target) as K[]) {
  const observable = useRef(target)

  useEffect(() => {
    Observable.make(observable.current, keys)
  }, [])
}
