import { autorun, WatcherAutorunEffect } from '@queelag/state-manager'
import { useEffect } from 'react'

export function useAutorun<T extends object, U>(effect: WatcherAutorunEffect, target: T) {
  useEffect(() => {
    return autorun(effect, target)
  }, [])
}
