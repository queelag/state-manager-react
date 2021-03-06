import { ObserverProps } from '../definitions/props'
import { useObserver } from '../hooks/use.observer'

/**
 * Component that re-renders when any of the properties used inside the children change.
 *
 * ```tsx
 * import React from 'react'
 * import { Observer } from '@queelag/state-manager-react'
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
 *     <Observer>
 *       {() => <button onClick={onClick}>{store.number}</button>}
 *     </Observer>
 *   )
 * }
 * ```
 *
 * @category Component
 */
export function Observer(props: ObserverProps) {
  return useObserver(props.children, props.memo)
}
