import { autorun, WatcherAutorunEffect } from '@queelag/state-manager'
import { useEffect } from 'react'

/**
 * Runs an effect when any of the properties used inside the effect change.
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
 *   })
 *
 *   return <button onClick={onClick} />
 * }
 * ```
 *
 * @category Hook
 */
export function useAutorun(effect: WatcherAutorunEffect) {
  useEffect(() => {
    return autorun(effect)
  }, [])
}
