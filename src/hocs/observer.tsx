import { ReactElement, ReactNode } from 'react'
import { useObserver } from '../hooks/use-observer.js'

/**
 * Higher order component (HOC) that re-renders when any of the properties used inside the function change.
 *
 * ```tsx
 * import React from 'react'
 * import { observer } from '@aracna/state-manager-react'
 * import { observe } from '@aracna/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * const App = observer(() => {
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   return <button onClick={onClick}>{store.number}</button>
 * }, [store])
 * ```
 *
 * @category HOC
 */
export function observer<P = any>(fn: (props: P) => ReactNode, memo?: boolean): (props: P) => ReactElement {
  return (props: P) => useObserver(() => fn(props), memo)
}
