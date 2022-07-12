import React, { ReactElement } from 'react'
import { useObserver } from '../hooks/use.observer'

export function observer(Component: (props: any) => ReactElement, targets: object[]) {
  return (props: any) => useObserver(() => <Component {...props} />, targets)
}
