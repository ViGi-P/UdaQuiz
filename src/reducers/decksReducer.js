import { GET_ALL_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions/types'

const INIT_STATE = []

export default function(state = INIT_STATE, { type, payload }) {
  switch (type) {
    case GET_ALL_DECKS:
    case ADD_DECK:
    case DELETE_DECK:
    case ADD_CARD:
      return payload
    default:
      return state
  }
}
