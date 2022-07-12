import { useEffect } from 'react'
import { WatcherAutorunEffect } from '../definitions/types'
import { autorun } from '../modules/autorun'

export function useAutorun<T extends object, U>(effect: WatcherAutorunEffect, target: T) {
  useEffect(() => {
    return autorun(effect, target)
  }, [])
}
