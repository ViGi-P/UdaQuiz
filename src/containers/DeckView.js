import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  ViewTransition,
  Header,
  BackBtn,
  HeaderTitle,
  Body,
  Row,
  BtnPrimary,
  BtnText,
  PrimaryText
} from '../components'
import { deleteDeck } from '../actions'
import { TOGGLE_LOAD } from '../actions/types'
import { baseStyles } from '../utils/constants'

const View = Body.extend`
  background-color: ${Platform.OS === 'ios' ? 'tomato' : 'white'};
`

const InnerBody = Body.extend`
  align-items: center;
  justify-content: center;
`

function mapState({ selectedDeck, decks }) {
  return {
    decks,
    deck: decks.find(deck => deck.key === selectedDeck)
  }
}

function mapDispatch(dispatch, props) {
  const { navigation } = props

  return {
    deleteDeck: (...args) => {
      dispatch({ type: TOGGLE_LOAD })
      navigation.goBack()
      setTimeout(() => deleteDeck(dispatch, ...args), 1000)
    }
  }
}

export const DeckView = connect(mapState, mapDispatch)(
  class extends Component {
    render() {
      const { navigation, deck, decks, deleteDeck } = this.props

      return (
        <ViewTransition style={baseStyles.flexOne}>
          <View>
            <Header>
              <BackBtn onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={30} color="white" />
              </BackBtn>
              <HeaderTitle>{deck.title}</HeaderTitle>
            </Header>
            <InnerBody>
              <Row>
                <PrimaryText>{deck.cards.length} Cards</PrimaryText>
                <BtnPrimary onPress={() => navigation.navigate('AddCardView')}>
                  <BtnText>Add Card</BtnText>
                </BtnPrimary>
              </Row>
              <Row top={15}>
                <BtnPrimary
                  disabled={deck.cards.length === 0}
                  style={baseStyles.flexOne}
                  center
                  onPress={() => navigation.navigate('QuizView')}>
                  <BtnText disabled={deck.cards.length === 0}>Start Quiz</BtnText>
                </BtnPrimary>
              </Row>
              <Row top={20}>
                <BtnPrimary
                  danger
                  style={baseStyles.flexOne}
                  center
                  onPress={() => deleteDeck(decks, deck.key)}>
                  <BtnText danger>Delete Deck</BtnText>
                </BtnPrimary>
              </Row>
            </InnerBody>
          </View>
        </ViewTransition>
      )
    }
  }
)
