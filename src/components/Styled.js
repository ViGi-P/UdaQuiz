import { Platform } from 'react-native'
import { Constants } from 'expo'
import styled from 'styled-components'
import { screenDimensions } from '../utils/constants'

export const Header = styled.View`
  height: 56px;
  margin-top: ${Constants.statusBarHeight};
  padding-top: 12px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

export const HeaderTitle = styled.Text`
  width: ${screenDimensions.width - (Platform.OS === 'ios' ? 56 : 0)}px;
  font-size: 24px;
  color: ${Platform.OS === 'ios' ? 'white' : 'black'};
  padding-left: ${Platform.OS === 'ios' ? 6 : 20}px;
`

export const BackBtn = styled.TouchableOpacity`
  width: ${Platform.OS === 'ios' ? 56 : 0}px;
  align-items: center;
  justify-content: center;
`

export const Body = styled.View`
  flex: 1;
`

export const ScrollBody = styled.ScrollView`
  flex: 1;
`

export const Row = styled.View.attrs({
  marginTop: props => props.top
})`
  width: ${screenDimensions.width}px;
  flex-direction: row;
  align-items: baseline;
  align-self: center;
  justify-content: ${props => props.justifyContent || 'space-between'};
  padding: 0 20px;
  margin-top: ${props => props.marginTop || 0}px;
`

export const BtnPrimary = styled.TouchableOpacity.attrs({
  backgroundColor: props =>
    props.disabled
      ? '#ccc'
      : props.danger
        ? 'black'
        : props.warning ? 'orange' : Platform.OS === 'ios' ? 'white' : 'tomato',
  alignItems: props => (props.center ? 'center' : 'flex-start')
})`
  padding: 10px;
  shadow-color: rgba(0, 0, 0, 0.24);
  shadow-offset: 0 3px;
  shadow-radius: 6px;
  shadow-opacity: 1;
  elevation: 3px;
  background-color: ${props => props.backgroundColor};
  border-width: 0;
  border-radius: ${Platform.OS === 'ios' ? 8 : 4}px;
  align-items: ${props => props.alignItems};
`

export const BtnText = styled.Text.attrs({
  color: props =>
    props.disabled
      ? 'grey'
      : props.danger ? 'white' : props.warning ? 'black' : Platform.OS === 'ios' ? 'black' : 'white'
})`
  color: ${props => props.color};
`

export const PrimaryText = styled.Text`
  color: ${props => (props.color || Platform.OS === 'ios' ? 'white' : 'black')};
  font-size: ${props => props.size || 16}px;
`
