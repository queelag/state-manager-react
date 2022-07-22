import React, { Fragment, ReactElement, ReactNode, useMemo } from 'react'
import { useDispatch } from './use.dispatch'
import { useReaction } from './use.reaction'

/**
 * Automatically re-renders when any of the properties used inside the function change.
 *
 * ```tsx
 * import React from 'react'
 * import { useObserver } from '@queelag/state-manager-react'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * function App() {
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   return useObserver(() => <button onClick={onClick}>{store.number}</button>)
 * }
 * ```
 *
 * @category Hook
 */
export function useObserver(fn: () => ReactNode, memo: boolean = false): ReactElement {
  const Component = useMemo(() => () => <Fragment>{fn()}</Fragment>, [])
  const dispatch = useDispatch()

  useReaction(fn, dispatch)

  return memo ? <Component /> : <Fragment>{fn()}</Fragment>
}
