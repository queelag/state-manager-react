import type { DependencyList, ReactElement, ReactNode } from 'react'
import { useObserver } from './use-observer.js'

/**
 * Re-renders whenever any of the values it references from an observable inside the render function change.
 * Optionally the memoization dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hooks/use-memo-observer)
 */
export function useMemoObserver(fn: () => ReactNode, deps?: DependencyList): ReactElement {
  return useObserver(fn, true, deps)
}
