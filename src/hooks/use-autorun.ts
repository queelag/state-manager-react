import { autorun, WatcherAutorunEffect } from '@aracna/state-manager'
import { DependencyList, useEffect } from 'react'

export function useAutorun(effect: WatcherAutorunEffect, deps: DependencyList = []) {
  useEffect(() => {
    return autorun(effect)
  }, deps)
}
