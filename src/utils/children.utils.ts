import { Children, ReactNode } from 'react'
import { PrimitiveChildren } from '../definitions/types'

export class ChildrenUtils {
  static flatten(children: ReactNode | ReactNode[], root: PrimitiveChildren[] = []): PrimitiveChildren[] {
    let array: ReactNode[], r: ReactNode[], node: any

    array = Children.toArray(children)
    r = []

    for (let i = 0; i < array.length; i++) {
      node = array[i]

      switch (typeof node) {
        case 'object':
          // if (node === null) {
          //   root.push(null)
          //   break
          // }

          /**
           * ELEMENT
           */
          if (node.props && node.props.children) {
            r.push(ChildrenUtils.flatten(node.props.children, root))
            break
          }

          // if (Array.isArray(node)) {
          //   r.push(ChildrenUtils.flatten(node, root))
          //   break
          // }

          /**
           * PORTAL
           */
          if (node.children) {
            r.push(ChildrenUtils.flatten(node.children, root))
            break
          }

          break
        default:
          root.push(node)
          break
      }
    }

    return root
  }

  static areFlattenedEqual(c1: ReactNode[], c2: ReactNode[]): boolean {
    if (c1.length !== c2.length) {
      return false
    }

    for (let i = 0; i < c1.length; i++) {
      if (c1[i] !== c2[i]) {
        return false
      }
    }

    return true
  }
}
