import { ArrayUtils } from '@queelag/core'
import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { Administration } from '../modules/administration'
import { useDispatch } from './use.dispatch'

export function useObserver(fn: () => ReactNode, stores: object[]): ReactElement {
  const dispatch = useDispatch()

  const onMount = () => {
    stores.forEach((v: object) => {
      let administration: Administration<object> | undefined

      administration = Administration.get(v)
      if (!administration || administration.dispatchers.includes(dispatch)) return

      administration.dispatchers.push(dispatch)
    })
  }

  const onUnmount = () => {
    stores.forEach((v: object) => {
      let administration: Administration<object> | undefined

      administration = Administration.get(v)
      if (!administration) return

      administration.dispatchers = ArrayUtils.remove(administration.dispatchers, (v: Function) => v === dispatch)
    })
  }

  useEffect(() => {
    onMount()
    return onUnmount
  }, [stores])

  return <Fragment>{fn()}</Fragment>
}
