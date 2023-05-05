import { WatcherAutorunEffect } from '@aracna/state-manager'
import { render } from '@testing-library/react'
import React, { Fragment, ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useAutorun } from '../../src'
import { Store, getTestStore } from '../get-test-store'

describe('useAutorun', () => {
  it('runs on every change', async () => {
    let store: Store, effect: WatcherAutorunEffect, Component: () => ReactElement

    store = getTestStore()
    effect = vi.fn(() => store.number)

    Component = () => {
      useAutorun(effect)
      return <Fragment />
    }

    render(<Component />)

    expect(effect).toBeCalledTimes(1)
    store.number++
    expect(effect).toBeCalledTimes(2)
  })
})
