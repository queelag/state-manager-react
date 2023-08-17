import { autorun, WatcherAutorunEffect } from '@aracna/state-manager'
import { useEffect } from 'react'

export function useAutorun(effect: WatcherAutorunEffect) {
  useEffect(() => {
    return autorun(effect)
  }, [])
}
