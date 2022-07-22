import { IDUtils } from '@queelag/core'
import React, { ChangeEvent, Fragment } from 'react'
import { useMemoObserver } from '../../../src'
import { AppChildrenProps } from '../definitions/props'
import { store } from '../store'

export function List(props: AppChildrenProps) {
  console.log('RENDERING LIST')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    store.primitive.string = event.target.value
  }

  const onClickAddItem = () => {
    store.primitive.array.push(IDUtils.unique())
  }

  const onClickRemoveItem = (item: string) => {
    store.primitive.array = store.primitive.array.filter((v: string) => v !== item)
  }

  return useMemoObserver(() => (
    <Fragment>
      <input onChange={onChange} placeholder='Search' type='search' value={store.primitive.string} />
      {store.primitive.array.length <= 0 && <span>Empty</span>}
      {store.primitive.array.length > 0 && (
        <ul>
          {store.primitive.array
            .filter((v) => v.toLowerCase().includes(store.primitive.string.toLowerCase().trim()))
            .map((v: any) => (
              <li key={v} onClick={() => onClickRemoveItem(v)}>
                {v}
              </li>
            ))}
        </ul>
      )}
      <button onClick={onClickAddItem}>add item</button>
    </Fragment>
  ))
}
