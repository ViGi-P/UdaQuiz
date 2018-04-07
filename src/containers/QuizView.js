import React, { Component } from 'react'
import { Platform, Keyboard } from 'react-native'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import {
  ViewTransition,
  Header,
  HeaderTitle,
  Body,
  ScrollBody as CardList,
  PrimaryText,
  BackBtn,
  BtnPrimary,
  BtnText,
  Row
} from '../components'
import { screenDimensions, baseStyles } from '../utils/constants'
import { clearLocalNotification, setLocalNotification } from '../utils/functions'

const View = Body.extend`
  background-color: ${Platform.OS === 'ios' ? 'tomato' : 'white'};
`

const TextInput = styled.TextInput`
  width: ${screenDimensions.width - 40}px;
  margin: 10px 20px 0 20px;
  padding: 8px;
  background-color: white;
  border-width: ${Platform.OS === 'ios' ? 1 : 0}px;
  border-color: #ccc;
  border-radius: 8px;
`

const INIT_STATE = {
  currentCard: 0,
  showAnswer: false,
  correctCount: 0
}

function mapState({ selectedDeck, decks }) {
  return {
    cards: decks
      .find(deck => deck.key === selectedDeck)
      .cards.map((card, key) => ({ ...card, key }))
  }
}

export const QuizView = connect(mapState)(
  class extends Component {
    state = INIT_STATE

    componentDidMount() {
      clearLocalNotification().then(setLocalNotification)
    }

    render() {
      const { navigation, cards } = this.props
      const { currentCard, showAnswer, correctCount } = this.state

      return (
        <ViewTransition style={baseStyles.flexOne}>
          <View>
            <Header>
              <BackBtn onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={30} color="white" />
              </BackBtn>
              <HeaderTitle>QUIZ</HeaderTitle>
            </Header>
            {currentCard < cards.length ? (
              <CardList>
                {cards.map(
                  item =>
                    currentCard === item.key && (
                      <ViewTransition key={item.key}>
                        <PrimaryText
                          size={24}
                          style={[baseStyles.pl20, { width: screenDimensions.width - 40 }]}>
                          {item.key + 1}. {item.question}
                        </PrimaryText>
                        <TextInput
                          placeholder="Type answer here"
                          autoGrow
                          multiline
                          autoCorrect={false}
                          autoCapitalize="sentences"
                        />
                        {showAnswer && (
                          <ViewTransition>
                            <PrimaryText size={20} style={[baseStyles.mt10, baseStyles.pl20]}>
                              Answer : {item.answer}
                            </PrimaryText>
                          </ViewTransition>
                        )}
                      </ViewTransition>
                    )
                )}
                {showAnswer === false && (
                  <ViewTransition>
                    <Row top={10}>
                      <BtnPrimary
                        style={[
                          baseStyles.flexOne,
                          { marginBottom: Platform.OS === 'ios' ? 0 : 30 }
                        ]}
                        center
                        onPress={() => this.setState({ showAnswer: true }, Keyboard.dismiss)}>
                        <BtnText>Show Answer</BtnText>
                      </BtnPrimary>
                    </Row>
                  </ViewTransition>
                )}
                {showAnswer && (
                  <ViewTransition>
                    <Row top={10}>
                      <HeaderTitle>Is your answer correct?</HeaderTitle>
                    </Row>
                    <Row top={20}>
                      <BtnPrimary
                        style={baseStyles.flexOne}
                        center
                        warning
                        onPress={() =>
                          this.setState({
                            currentCard: currentCard + 1,
                            showAnswer: false,
                            correctCount: correctCount + 1
                          })
                        }>
                        <BtnText warning>Correct</BtnText>
                      </BtnPrimary>
                    </Row>
                    <Row top={20}>
                      <BtnPrimary
                        style={[
                          baseStyles.flexOne,
                          { marginBottom: Platform.OS === 'ios' ? 0 : 30 }
                        ]}
                        center
                        danger
                        onPress={() =>
                          this.setState({
                            currentCard: currentCard + 1,
                            showAnswer: false
                          })
                        }>
                        <BtnText danger>Incorrect</BtnText>
                      </BtnPrimary>
                    </Row>
                  </ViewTransition>
                )}
              </CardList>
            ) : (
              <ViewTransition
                style={[baseStyles.flexOne, baseStyles.pb50, baseStyles.centerContent]}>
                <PrimaryText size={32}>Score</PrimaryText>
                <PrimaryText size={24}>{Math.ceil(correctCount / cards.length * 100)}%</PrimaryText>
                <Row top={20} justifyContent="space-around">
                  <BtnPrimary onPress={() => this.setState(INIT_STATE)}>
                    <BtnText>Start Over</BtnText>
                  </BtnPrimary>
                  <BtnPrimary danger onPress={() => navigation.goBack()}>
                    <BtnText danger>Back to Deck</BtnText>
                  </BtnPrimary>
                </Row>
              </ViewTransition>
            )}
          </View>
        </ViewTransition>
      )
    }
  }
)
