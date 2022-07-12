import { Environment } from '@queelag/core'
import dayjs, { Dayjs } from 'dayjs'
import { Observable } from '../src'

export class Store {
  /**
   * PRIMITIVES
   */
  array: any[] = [0, [0], { a: 0, b: { c: 0 } }]
  bigint: BigInt = BigInt(0)
  boolean: boolean = false
  function: Function = () => undefined
  null: null = null
  number: number = 0
  object: object = {
    a: 0,
    b: {
      c: 0
    }
  }
  symbol: Symbol = Symbol('symbol')
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

export function getTestStore(): Store {
  let store: Store

  store = new Store()
  Observable.make(store, Object.keys(store) as any)

  return store
}
