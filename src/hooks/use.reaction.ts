import { ListenerEffect, ListenerExpression } from '../definitions/interfaces'

export function useReaction<T>(expression: ListenerExpression<T>, effect: ListenerEffect<T>) {}
