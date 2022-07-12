import { Administration } from './administration'

type SetAdd<T> = (value: T) => Set<T>
type SetClear = () => void
type SetDelete<T> = (value: T) => boolean

export class ObservableSet {
  static make<T extends object, U>(root: T, set: Set<U>): Set<U> {
    let _add: SetAdd<U>, _clear: SetClear, _delete: SetDelete<U>

    _add = set.add
    _clear = set.clear
    _delete = set.delete

    set.add = (value: U) => {
      let set: Set<U>

      set = _add(value)
      Administration.onChange(root)

      return set
    }
    set.clear = () => {
      _clear()
      Administration.onChange(root)
    }
    set.delete = (value: U) => {
      let deleted: boolean

      deleted = _delete(value)
      if (!deleted) return false

      Administration.onChange(root)

      return true
    }

    return set
  }
}
