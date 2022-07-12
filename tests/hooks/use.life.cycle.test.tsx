import { render, waitFor } from '@testing-library/react'
import React, { Fragment, MutableRefObject, ReactElement } from 'react'
import { useLifeCycle } from '../../src'
import { ComponentLifeCycle } from '../../src/definitions/enums'

describe('useLifeCycle', () => {
  it('returns the correct life cycle', () => {
    let life: MutableRefObject<ComponentLifeCycle>, Component: () => ReactElement

    life = { current: ComponentLifeCycle.CONSTRUCTED }

    Component = () => {
      life = useLifeCycle()
      return <Fragment />
    }

    render(<Component />)
    waitFor(() => {
      expect(life.current).toBe(ComponentLifeCycle.CONSTRUCTED)
      expect(life.current).toBe(ComponentLifeCycle.MOUNTED)
      expect(life.current).toBe(ComponentLifeCycle.UNMOUNTED)
    })
  })
})
