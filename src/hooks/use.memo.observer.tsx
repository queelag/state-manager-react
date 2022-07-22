import { ReactElement, ReactNode } from 'react'
import { useObserver } from './use.observer'

/**
 * Automatically re-renders when any of the properties used inside the function change.
 *
 * The difference with useObserver is that it will only re-render on observable changes, any other state changes will be ignored.
 *
 * ```tsx
 * import React, { useState } from 'react'
 * import { useMemoObserver } from '@queelag/state-manager-react'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * function App() {
 *   const [state, setState] = useState(0)
 *
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   const increaseState = () => {
 *     setState(state + 1)
 *   }
 *
 *   return useMemoObserver(
 *     () => (
 *       <Fragment>
 *         <button onClick={onClick}>{store.number}</button>
 *         <button onClick={increaseState}>{state}</button>
 *       </Fragment>
 *     )
 *   )
 * }
 * ```
 *
 * @category Hook
 */
export function useMemoObserver(fn: () => ReactNode, memo: boolean = true): ReactElement {
  return useObserver(fn, true)
}
