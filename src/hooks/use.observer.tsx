import { GLOBAL_OBSERVABLE, watch, WatcherDisposer, WatcherType } from '@queelag/state-manager'
import React, { Fragment, ReactElement, ReactNode, useEffect, useRef } from 'react'
import { PrimitiveChildren } from '../definitions/types'
import { ChildrenUtils } from '../utils/children.utils'
import { useDispatch } from './use.dispatch'

/**
 * Automatically re-renders when any of the targets properties change.
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
 *   return useObserver(() => <button onClick={onClick}>{store.number}</button>, [store])
 * }
 * ```
 *
 * @category Hook
 */
export function useObserver(fn: () => ReactNode, targets: object[] = [GLOBAL_OBSERVABLE]): ReactElement {
  const dispatch = useDispatch()
  const pchildren = useRef(ChildrenUtils.flatten(fn()))

  useEffect(() => {
    let disposers: WatcherDisposer[]

    disposers = targets.map((v: object) => {
      return watch(
        WatcherType.DISPATCH,
        () => {
          let children: PrimitiveChildren[]

          children = ChildrenUtils.flatten(fn())
          if (ChildrenUtils.areFlattenedEqual(pchildren.current, children)) return

          pchildren.current = children
          dispatch()
        },
        v
      )
    })

    return () => disposers.forEach((v: WatcherDisposer) => v())
  }, [])

  return <Fragment>{fn()}</Fragment>
}
