import { ArrayUtils } from '@queelag/core'
import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { Administration } from '../modules/administration'
import { useDispatch } from './use.dispatch'

export function useObserver(fn: () => ReactNode, stores: object[]): ReactElement {
  const dispatch = useDispatch()

  const onMount = () => {
    stores.forEach((v: object) => {
      let administration: Administration<object>

      administration = Administration.get(v)
      if (administration.dispatchers.includes(dispatch)) return

      administration.dispatchers.push(dispatch)

      // console.log(Administration.get(v))
    })
  }

  const onUnmount = () => {
    stores.forEach((v: object) => {
      let administration: Administration<object>

      administration = Administration.get(v)
      administration.dispatchers = ArrayUtils.remove(Administration.get(v).dispatchers, (v: Function) => v === dispatch)

      // console.log(Administration.get(v).dispatchers)
    })
  }

  useEffect(() => {
    onMount()
    return onUnmount
  }, [stores])

  return <Fragment>{fn()}</Fragment>
}
