import React from 'react'
import { connect } from 'react-redux'
import { Platform, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { AllDecks, AddDeck, DeckView, AddCardView, QuizView } from './containers'
import { StatBar, Body } from './components'
import { setLocalNotification } from './utils/functions'
import { baseStyles } from './utils/constants'

const View = Body.extend`
  background-color: tomato;
`

const styles = StyleSheet.create({
  tabContainer: {
    height: 56 + (Platform.OS === 'ios' ? 0 : Constants.statusBarHeight),
    backgroundColor: Platform.OS === 'ios' ? 'white' : 'tomato',
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  }
})

const Tabs = TabNavigator(
  {
    Decks: {
      screen: AllDecks,
      navigationOptions: {
        tabBarLabel: 'All Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
            size={30}
            color={tintColor}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
            size={30}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'tomato' : 'white',
      inactiveTintColor: Platform.OS === 'ios' ? 'gray' : 'white',
      labelStyle: {
        fontSize: 14
      },
      style: styles.tabContainer,
      indicatorStyle: {
        backgroundColor: 'white'
      }
    },
    style: {
      backgroundColor: Platform.OS === 'ios' ? 'tomato' : 'white'
    },
    animationEnabled: true,
    swipeEnabled: true
  }
)

const Stack = StackNavigator(
  {
    Tabs: {
      screen: Tabs
    },
    DeckView: {
      screen: DeckView
    },
    QuizView: {
      screen: QuizView
    },
    AddCardView: {
      screen: AddCardView
    }
  },
  {
    navigationOptions: () => ({
      header: null
    })
  }
)

function mapState({ loading }) {
  return { loading }
}

export default connect(mapState)(function({ loading }) {
  setLocalNotification()

  return (
    <View>
      <StatBar backgroundColor="tomato" barStyle="light-content" />
      <Stack />
      <Modal transparent animationType="fade" visible={loading}>
        <View style={baseStyles.centerContent}>
          <ActivityIndicator color="white" size="large" />
        </View>
      </Modal>
    </View>
  )
})
