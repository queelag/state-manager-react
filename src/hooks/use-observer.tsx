import { useDispatch } from '@aracna/react'
import { type DependencyList, Fragment, type ReactElement, type ReactNode, useMemo } from 'react'
import { useReaction } from './use-reaction.js'

/**
 * Re-renders whenever any of the values it references from an observable inside the render function change.
 *
 * - Optionally the render function can be memoized to prevent unnecessary re-renders.
 * - Optionally the memoization dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/hooks/use-memo-observer)
 */
export function useObserver(fn: () => ReactNode, memo: boolean = false, deps: DependencyList = []): ReactElement {
  const Component = useMemo(() => () => <Fragment>{fn()}</Fragment>, deps)
  const dispatch = useDispatch()

  useReaction(fn, dispatch)

  return memo ? <Component /> : <Fragment>{fn()}</Fragment>
}
