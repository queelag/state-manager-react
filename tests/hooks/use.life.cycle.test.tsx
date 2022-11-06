import { render, RenderResult } from '@testing-library/react'
import React, { Fragment, MutableRefObject, ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { ComponentLifeCycle, useLifeCycle } from '../../src'

describe('useLifeCycle', () => {
  it('returns the correct life cycle', async () => {
    let life: MutableRefObject<ComponentLifeCycle>, Component: () => ReactElement, result: RenderResult

    life = { current: ComponentLifeCycle.CONSTRUCTED }

    Component = () => {
      life = useLifeCycle()
      return <Fragment />
    }

    result = render(<Component />)
    expect(life.current).toBe(ComponentLifeCycle.MOUNTED)

    result.unmount()
    expect(life.current).toBe(ComponentLifeCycle.UNMOUNTED)
  })
})
