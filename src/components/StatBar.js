import React from 'react'
import { StatusBar } from 'react-native'

export function StatBar({ backgroundColor, ...props }) {
  return <StatusBar backgroundColor={backgroundColor} {...props} />
}
