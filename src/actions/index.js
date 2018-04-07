import { AsyncStorage } from 'react-native'
import { STORAGE_KEY } from '../utils/constants'
import { GET_ALL_DECKS, ADD_DECK, SELECT_DECK, DELETE_DECK, ADD_CARD, TOGGLE_LOAD } from './types'

export async function getDecks(dispatch) {
  dispatch({ type: TOGGLE_LOAD })
  try {
    const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
    dispatch({ type: GET_ALL_DECKS, payload: decks || [] })
  } catch (err) {
    console.log('error fetching decks :', err)
  } finally {
    dispatch({ type: TOGGLE_LOAD })
  }
}

export async function addDeck(dispatch, oldDecks, deck) {
  dispatch({ type: TOGGLE_LOAD })
  try {
    deck.key = Date.now()
    const decks = [deck, ...oldDecks]
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    dispatch({ type: ADD_DECK, payload: decks })
  } catch (err) {
    console.log('error adding deck :', err)
  } finally {
    dispatch({ type: TOGGLE_LOAD })
    return 'done'
  }
}

export function selectDeck(dispatch, payload) {
  dispatch({ type: SELECT_DECK, payload })
  return 'done'
}

export async function deleteDeck(dispatch, oldDecks, key) {
  try {
    const decks = oldDecks.filter(deck => deck.key !== key)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    dispatch({ type: DELETE_DECK, payload: decks })
  } catch (err) {
    console.log('error deleting deck :', err)
  } finally {
    dispatch({ type: TOGGLE_LOAD })
  }
}

export async function addCard(dispatch, oldDecks, key, card) {
  dispatch({ type: TOGGLE_LOAD })
  try {
    const decks = oldDecks.map(deck => {
      if (deck.key === key) return { ...deck, cards: [...deck.cards, card] }
      return deck
    })
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    dispatch({ type: ADD_CARD, payload: decks })
  } catch (err) {
    console.log('error adding card :', err)
  } finally {
    dispatch({ type: TOGGLE_LOAD })
    return 'done'
  }
}
