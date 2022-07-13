import { autorun, WatcherAutorunEffect } from '@queelag/state-manager'
import { useEffect } from 'react'

/**
 * Runs an effect on any target properties change.
 *
 * ```tsx
 * import React from 'react'
 * import { useAutorun } from '@queelag/state-manager-react'
 * import { observe } from '@queelag/state-manager'
 *
 * const store = observe({ number: 0 })
 *
 * function App() {
 *   const onClick = () => {
 *     store.number++
 *   }
 *
 *   useAutorun(() => {
 *     console.log(store.number)
 *   }, store)
 *
 *   return <button onClick={onClick} />
 * }
 * ```
 *
 * @category Hook
 */
export function useAutorun<T extends object, U>(effect: WatcherAutorunEffect, target: T) {
  useEffect(() => {
    return autorun(effect, target)
  }, [])
}
