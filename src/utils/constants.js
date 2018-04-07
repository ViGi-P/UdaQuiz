import { Dimensions, StyleSheet } from 'react-native'

export const screenDimensions = Dimensions.get('window')

export const baseStyles = StyleSheet.create({
  flexOne: { flex: 1 },
  mb20: { marginBottom: 20 },
  mt10: { marginTop: 10 },
  pl20: { paddingLeft: 20 },
  pb50: { paddingBottom: 50 },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const STORAGE_KEY = 'abcdefghi123456789'

export const NOTIFICATION_KEY = 'UdaQuiz:notifications'
