import { Environment } from '@queelag/core'
import dayjs, { Dayjs } from 'dayjs'
import { Observable } from '../../src'

class Store {
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

  reset(): void {
    this.array = [0, [0], { a: 0, b: { c: 0 } }]
    this.bigint = BigInt(0)
    this.boolean = false
    this.function = () => undefined
    this.null = null
    this.number = 0
    this.object = {
      a: 0,
      b: {
        c: 0
      }
    }
    this.symbol = Symbol('symbol')
    this.undefined = undefined

    this.date = new Date()
    this.map = new Map()
    this.set = new Set()

    this.dayjs = dayjs()
  }
}

export const store = new Store()
Observable.make(store, Object.keys(store) as any)
