import { ObserverProps } from '../definitions/props.js'
import { useObserver } from '../hooks/use-observer.js'

export function Observer(props: ObserverProps) {
  return useObserver(props.children, props.memo)
}
