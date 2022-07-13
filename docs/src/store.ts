import { Environment } from '@queelag/core'
import { observe } from '@queelag/state-manager'
import dayjs, { Dayjs } from 'dayjs'

class Store {
  /**
   * PRIMITIVES
   */
  array: any[] = []
  bigint: BigInt = BigInt(0)
  boolean: boolean = false
  function: Function = () => undefined
  null: null = null
  number: number = 0
  object: object = {}
  string: string = ''
  symbol: Symbol = Symbol()
  undefined: undefined = undefined
  /**
   * CLASSES
   */
  date: Date = new Date()
  map: Map<any, any> = new Map()
  set: Set<any> = new Set()
  /**
   * LIBRARIES
   */
  dayjs: Dayjs = dayjs()

  constructor() {
    if (Environment.isWindowNotDefined) {
      return
    }

    // @ts-ignore
    window.store = this
  }
}

export const store = new Store()
observe(store, Object.keys(store) as any)
