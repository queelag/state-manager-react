import { DependencyList, ReactElement, ReactNode } from 'react'
import { useObserver } from '../hooks/use-observer.js'

/**
 * The `observer` HOC re-renders whenever any of the values it references from an observable inside the render function change.
 *
 * - Optionally the render function can be memoized to prevent unnecessary re-renders.
 * - Optionally the memoization dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hocs/observer)
 */
export function observer<P = any>(fn: (props: P) => ReactNode, memo?: boolean, deps?: DependencyList): (props: P) => ReactElement {
  return (props: P) => useObserver(() => fn(props), memo, deps)
}
