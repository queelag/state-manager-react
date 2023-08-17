import { ReactElement, ReactNode } from 'react'
import { useObserver } from '../hooks/use-observer.js'

export function observer<P = any>(fn: (props: P) => ReactNode, memo?: boolean): (props: P) => ReactElement {
  return (props: P) => useObserver(() => fn(props), memo)
}
