import { MutableRefObject, useEffect, useRef } from 'react'
import { ComponentLifeCycle } from '../definitions/enums'

/**
 * Returns the life cycle of a component.
 *
 * ```tsx
 * import React, { useEffect } from 'react'
 * import { useLifeCycle } from '@aracna/state-manager-react'
 *
 * function App() {
 *   const life = useLifeCycle()
 *
 *   // will be CONSTRUCTED
 *   console.log(life)
 *
 *   useEffect(() => {
 *     // will be MOUNTED
 *     console.log(life)
 *
 *     return () => {
 *       // will be UNMOUNTED
 *       console.log(life)
 *     }
 *   }, [])
 *
 *   return <button onClick={onClick}>{number.current}</button>
 * }
 * ```
 *
 * @category Hook
 */
export function useLifeCycle(): MutableRefObject<ComponentLifeCycle> {
  const value = useRef<ComponentLifeCycle>(ComponentLifeCycle.CONSTRUCTED)

  useEffect(() => {
    value.current = ComponentLifeCycle.MOUNTED
    return () => {
      value.current = ComponentLifeCycle.UNMOUNTED
    }
  })

  return value
}
