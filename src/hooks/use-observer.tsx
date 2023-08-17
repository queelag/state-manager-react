import { useDispatch } from '@aracna/react'
import React, { Fragment, ReactElement, ReactNode, useMemo } from 'react'
import { useReaction } from './use-reaction.js'

export function useObserver(fn: () => ReactNode, memo: boolean = false): ReactElement {
  const Component = useMemo(() => () => <Fragment>{fn()}</Fragment>, [])
  const dispatch = useDispatch()

  useReaction(fn, dispatch)

  return memo ? <Component /> : <Fragment>{fn()}</Fragment>
}
