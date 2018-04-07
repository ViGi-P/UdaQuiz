import React, { Component } from 'react'
import { Platform, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ViewTransition, BtnPrimary, BtnText, Body } from '../components'
import { screenDimensions } from '../utils/constants'
import { addDeck, selectDeck } from '../actions'

const View = Body.extend`
  background-color: ${Platform.OS === 'ios' ? 'tomato' : 'white'};
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
`

const TextInput = styled.TextInput`
  width: ${screenDimensions.width - 20}px;
  margin: 0 10px 10px 10px;
  height: 48px;
  padding: 8px;
  background-color: white;
  border-width: ${Platform.OS === 'ios' ? 1 : 0}px;
  border-color: #ccc;
  border-radius: 8px;
`

const INIT_STATE = {
  newTitle: ''
}

function mapState({ decks }) {
  return { decks }
}

function mapDispatch(dispatch, { navigation }) {
  return {
    addDeck: (...args) => addDeck(dispatch, ...args),
    selectDeck: (...args) => selectDeck(dispatch, ...args)
  }
}

export const AddDeck = connect(mapState, mapDispatch)(
  class extends Component {
    state = INIT_STATE

    addDeck = async () => {
      const { newTitle } = this.state
      const { decks, addDeck, selectDeck, navigation } = this.props
      const deck = {
        key: Date.now(),
        title: newTitle,
        cards: []
      }
      await addDeck(decks, deck)
      selectDeck(deck.key)
      this.setState(INIT_STATE)
      Keyboard.dismiss()
      navigation.navigate('DeckView')
    }

    render() {
      const { newTitle } = this.state

      return (
        <ViewTransition style={{ flex: 1 }}>
          <View>
            <TextInput
              placeholder="Type a title for the new deck"
              value={newTitle}
              onChangeText={newTitle => this.setState({ newTitle })}
            />
            <BtnPrimary disabled={newTitle === ''} onPress={this.addDeck}>
              <BtnText disabled={newTitle === ''}>Create New Deck</BtnText>
            </BtnPrimary>
          </View>
        </ViewTransition>
      )
    }
  }
)
