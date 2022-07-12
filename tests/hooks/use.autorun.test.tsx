import { act, render, waitFor } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { useAutorun } from '../../src'
import { WatcherAutorunEffect } from '../../src/definitions/types'
import { getTestStore, Store } from '../get.test.store'

describe('useAutorun', () => {
  it('runs on every change', () => {
    let store: Store, effect: WatcherAutorunEffect, Component: () => ReactElement

    store = getTestStore()
    effect = jest.fn()

    Component = () => {
      useAutorun(effect, [store])
      return <Fragment />
    }

    render(<Component />)

    expect(effect).not.toBeCalled()
    act(() => {
      store.number++
    })
    waitFor(() => {
      expect(effect).toBeCalled()
      expect(effect).toBeCalledTimes(1)
    })
  })
})
