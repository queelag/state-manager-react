import { ObserverProps } from '../definitions/props'
import { useObserver } from '../hooks/use.observer'

export function Observer(props: ObserverProps) {
  return useObserver(props.children, props.stores)
}
