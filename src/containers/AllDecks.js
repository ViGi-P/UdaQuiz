import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Platform } from 'react-native'
import { ViewTransition, Body, BtnPrimary, BtnText, PrimaryText } from '../components'
import { getDecks, selectDeck } from '../actions'
import { screenDimensions } from '../utils/constants'

const View = Body.extend`
  background-color: ${Platform.OS === 'ios' ? 'tomato' : 'white'};
  align-items: center;
  justify-content: flex-start;
`

const FlatList = styled.FlatList`
  background-color: ${Platform.OS === 'ios' ? 'tomato' : 'white'};
  padding-top: ${Platform.OS === 'ios' ? 20 : 0}px;
`

const Card = BtnPrimary.extend`
  width: ${screenDimensions.width - 20}px;
  margin: 10px;
  padding: 10px 15px;
`

const Text = BtnText.extend`
  font-size: ${props => props.fontSize || 24}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
`

function mapState({ decks, ...rest }) {
  return { decks }
}

function mapDispatch(dispatch, { navigation }) {
  return {
    getDecks: () => getDecks(dispatch),
    selectDeck: (...args) => {
      selectDeck(dispatch, ...args)
    }
  }
}

export const AllDecks = connect(mapState, mapDispatch)(
  class extends Component {
    state = {
      thing: false
    }

    componentWillMount() {
      this.props.getDecks()
    }

    componentDidMount() {
      this.props.selectDeck(null)
    }

    render() {
      const { decks, navigation, selectDeck } = this.props

      return (
        <ViewTransition style={{ flex: 1 }}>
          <View>
            <FlatList
              data={decks}
              renderItem={({ item }) => (
                <Card
                  onPress={() => {
                    selectDeck(item.key)
                    navigation.navigate('DeckView')
                  }}>
                  <Text marginBottom={5}>{item.title}</Text>
                  <Text fontSize={16}>{item.cards.length} Cards</Text>
                </Card>
              )}
            />
            {decks.length === 0 && (
              <View>
                <PrimaryText style={{ marginBottom: 20 }}>No decks found</PrimaryText>
                <BtnPrimary onPress={() => navigation.navigate('AddDeck')}>
                  <BtnText>Add Deck</BtnText>
                </BtnPrimary>
              </View>
            )}
          </View>
        </ViewTransition>
      )
    }
  }
)
