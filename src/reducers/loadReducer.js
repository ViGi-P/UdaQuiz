import { TOGGLE_LOAD } from '../actions/types'

const INIT_STATE = false

export default function(state = INIT_STATE, { type }) {
  if (type === TOGGLE_LOAD) return !state
  return state
}
