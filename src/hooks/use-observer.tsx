import { useDispatch } from '@aracna/react'
import { DependencyList, Fragment, ReactElement, ReactNode, useMemo } from 'react'
import { useReaction } from './use-reaction.js'

export function useObserver(fn: () => ReactNode, memo: boolean = false, deps: DependencyList = []): ReactElement {
  const Component = useMemo(() => () => <Fragment>{fn()}</Fragment>, deps)
  const dispatch = useDispatch()

  useReaction(fn, dispatch)

  return memo ? <Component /> : <Fragment>{fn()}</Fragment>
}
