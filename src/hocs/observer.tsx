import React, { ReactElement } from 'react'
import { useObserver } from '../hooks/use.observer'

export function observer(Component: (props: any) => ReactElement, stores: object[]) {
  return (props: any) => useObserver(() => <Component {...props} />, stores)
}
