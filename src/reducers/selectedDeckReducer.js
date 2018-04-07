import { SELECT_DECK } from '../actions/types'

const INIT_STATE = null

export default function(state = INIT_STATE, { type, payload }) {
  switch (type) {
    case SELECT_DECK:
      return payload
    default:
      return state
  }
}
