import { ReactElement, ReactNode } from 'react'
import { useObserver } from './use-observer.js'

export function useMemoObserver(fn: () => ReactNode): ReactElement {
  return useObserver(fn, true)
}
