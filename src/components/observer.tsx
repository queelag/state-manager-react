import { ObserverProps } from '../definitions/props.js'
import { useObserver } from '../hooks/use-observer.js'

/**
 * The `Observer` component re-renders whenever any of the values it references from an observable inside its children change.
 *
 * - Optionally the children can be memoized to prevent unnecessary re-renders.
 * - Optionally the memoization dependencies can be specified.
 *
 * [Aracna Reference](https://aracna.dariosechi.it/state-manager/react/components/observer)
 */
export function Observer(props: ObserverProps) {
  return useObserver(props.children, props.memo, props.deps)
}
