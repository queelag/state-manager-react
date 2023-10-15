import { DependencyList, ReactElement, ReactNode } from 'react'
import { useObserver } from './use-observer.js'

export function useMemoObserver(fn: () => ReactNode, deps?: DependencyList): ReactElement {
  return useObserver(fn, true, deps)
}
