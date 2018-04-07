import { combineReducers } from 'redux'
import decks from './decksReducer'
import loading from './loadReducer'
import selectedDeck from './selectedDeckReducer'

export default combineReducers({
  decks,
  selectedDeck,
  loading
})
