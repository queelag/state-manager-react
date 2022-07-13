import { ObserverProps } from '../definitions/props'
import { useObserver } from '../hooks/use.observer'

/**
 * Component that re-renders on targets properties changes.
 *
 * ```tsx
 * import React from 'react'
 * import { Observer } from '@queelag/react-state-manager'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * function App() {
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   return (
 *     <Observer targets={[store]}>
 *       {() => <button onClick={onClick}>{store.number}</button>}
 *     </Observer>
 *   )
 * }
 * ```
 *
 * @category Component
 */
export function Observer(props: ObserverProps) {
  return useObserver(props.children, props.targets)
}
