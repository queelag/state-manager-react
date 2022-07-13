import { useReducer } from 'react'
import { ComponentLifeCycle } from '../definitions/enums'
import { useLifeCycle } from './use.life.cycle'

/**
 * Forces a re-render if the component is mounted.
 *
 * @category Hook
 */
export function useDispatch(onDispatch?: () => any): () => void {
  const life = useLifeCycle()
  const reducer = useReducer(() => ({}), {})

  const dispatch = () => {
    switch (life.current) {
      case ComponentLifeCycle.CONSTRUCTED:
      case ComponentLifeCycle.UNMOUNTED:
        break
      case ComponentLifeCycle.MOUNTED:
        reducer[1]()
        onDispatch && onDispatch()

        break
    }
  }

  return dispatch
}
