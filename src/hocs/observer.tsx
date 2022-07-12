import React, { ReactElement } from 'react'
import { useObserver } from '../hooks/use.observer'

export function observer<P = any>(Component: (props: P) => ReactElement, targets: object[]): (props: P) => ReactElement {
  return (props: P) => useObserver(() => <Component {...props} />, targets)
}
