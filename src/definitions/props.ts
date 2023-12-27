import { DependencyList, ReactNode } from 'react'

export interface ObserverProps {
  children: () => ReactNode
  deps?: DependencyList
  memo?: boolean
}
