import { ReactNode } from 'react'

export interface ObserverProps {
  children: () => ReactNode
  memo?: boolean
}
