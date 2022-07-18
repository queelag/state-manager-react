import { Environment } from '@queelag/core'
import { observe } from '@queelag/state-manager'
import dayjs, { Dayjs } from 'dayjs'

interface Library {
  dayjs: Dayjs
}

interface Object {
  date: Date
  map: Map<any, any>
  set: Set<any>
}

interface Primitive {
  array: any[]
  bigint: BigInt
  boolean: boolean
  function: Function
  null: null
  number: number
  object: object
  string: string
  symbol: Symbol
  undefined: undefined
}

class Store {
  library: Library
  object: Object
  primitive: Primitive

  constructor() {
    if (Environment.isWindowNotDefined) {
      return
    }
    this.library = {
      dayjs: dayjs()
    }

    this.object = {
      date: new Date(),
      map: new Map(),
      set: new Set()
    }
    this.primitive = {
      array: [],
      bigint: BigInt(0),
      boolean: false,
      function: () => undefined,
      null: null,
      number: 0,
      object: {},
      string: '',
      symbol: Symbol(),
      undefined: undefined
    }

    // @ts-ignore
    window.store = this
  }
}

export const store = new Store()
observe(store, ['library', 'object', 'primitive'])
