import React, { ReactElement, ReactFragment, ReactNode, ReactPortal } from 'react'
import { createPortal } from 'react-dom'
import { ChildrenUtils } from '../../src/utils/children.utils'

describe('ChildrenUtils', () => {
  it('flattens all nodes', () => {
    let element: ReactElement, fragment: ReactFragment, portal: ReactPortal

    element = <span>0</span>
    fragment = [<span>0</span>, <span>1</span>]
    portal = createPortal(<span>0</span>, document.createElement('div'))

    expect(ChildrenUtils.flatten(element)).toStrictEqual(['0'])
    expect(ChildrenUtils.flatten(fragment)).toStrictEqual(['0', '1'])
    expect(ChildrenUtils.flatten(portal)).toStrictEqual(['0'])
  })

  it('checks whether two flattened nodes are equal or not', () => {
    let c1: ReactNode[], c2: ReactNode[], c3: ReactNode[]

    c1 = ChildrenUtils.flatten(<span>0</span>)
    c2 = ChildrenUtils.flatten(<span>0</span>)
    c3 = ChildrenUtils.flatten(<span>1</span>)

    expect(ChildrenUtils.areFlattenedEqual(c1, c2)).toBeTruthy()
    expect(ChildrenUtils.areFlattenedEqual(c1, c3)).toBeFalsy()
  })
})
