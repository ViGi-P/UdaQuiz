import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './src/reducers'
import Root from './src'

export default function() {
  return (
    <Provider store={createStore(reducers)}>
      <Root />
    </Provider>
  )
}
