export interface Listener<T> {
  effect: ListenerEffect<T>
  expression: ListenerExpression<T>
}

export type ListenerEffect<T> = (value: T) => any
export type ListenerExpression<T> = () => T
