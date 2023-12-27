import { autorun, WatcherAutorunEffect } from '@aracna/state-manager'
import { DependencyList, useEffect } from 'react'

/**
 * Runs an effect immediately and re-runs it whenever any of the values it references from an observable change.
 * Optionally the dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hooks/use-autorun)
 */
export function useAutorun(effect: WatcherAutorunEffect, deps: DependencyList = []) {
  useEffect(() => {
    return autorun(effect)
  }, deps)
}
