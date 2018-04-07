import React, { Component } from 'react'
import { Platform, Keyboard } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import {
  ViewTransition,
  ScrollBody,
  Header,
  HeaderTitle,
  BackBtn,
  BtnPrimary,
  BtnText,
  Row
} from '../components'
import { addCard } from '../actions'
import { screenDimensions } from '../utils/constants'

const View = ScrollBody.extend`
  background-color: ${Platform.OS === 'ios' ? 'tomato' : 'white'};
`

const TextInput = styled.TextInput`
  width: ${screenDimensions.width - 40}px;
  margin: 10px 20px 10px 20px;
  padding: 8px;
  background-color: white;
  border-width: ${Platform.OS === 'ios' ? 1 : 0}px;
  border-color: #ccc;
  border-radius: 8px;
`

function mapState({ selectedDeck, decks }) {
  return {
    decks,
    selectedDeck
  }
}

function mapDispatch(dispatch, { navigation }) {
  return {
    addCard: async (...args) => {
      await addCard(dispatch, ...args)
      navigation.goBack()
    }
  }
}

export const AddCardView = connect(mapState, mapDispatch)(
  class extends Component {
    state = {
      question: '',
      answer: ''
    }

    submit = () => {
      const card = this.state
      const { decks, selectedDeck, addCard } = this.props
      addCard(decks, selectedDeck, card)
      Keyboard.dismiss()
    }

    render() {
      const { question, answer } = this.state
      const { navigation } = this.props

      return (
        <ViewTransition style={{ flex: 1 }}>
          <View>
            <Header>
              <BackBtn onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={30} color="white" />
              </BackBtn>
              <HeaderTitle>ADD CARD</HeaderTitle>
            </Header>
            <TextInput
              placeholder="Type question here"
              autoGrow
              multiline
              autoCorrect={false}
              autoCapitalize="sentences"
              value={question}
              onChangeText={question => this.setState({ question })}
            />
            <TextInput
              placeholder="Type answer here"
              autoGrow
              multiline
              autoCorrect={false}
              autoCapitalize="sentences"
              value={answer}
              onChangeText={answer => this.setState({ answer })}
            />
            <Row top={5}>
              <BtnPrimary
                style={{ flex: 1, marginBottom: Platform.OS === 'ios' ? 0 : 30 }}
                disabled={!(answer && question)}
                onPress={this.submit}>
                <BtnText disabled={!(answer && question)}>Submit</BtnText>
              </BtnPrimary>
            </Row>
          </View>
        </ViewTransition>
      )
    }
  }
)
