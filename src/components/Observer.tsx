import { ObserverProps } from '../definitions/props.js'
import { useObserver } from '../hooks/use.observer.js'

/**
 * Component that re-renders when any of the properties used inside the children change.
 *
 * ```tsx
 * import React from 'react'
 * import { Observer } from '@aracna/state-manager-react'
 * import { observe } from '@aracna/state-manager'
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
