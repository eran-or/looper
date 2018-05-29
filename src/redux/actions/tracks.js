
import { createActions } from 'redux-actions'

export const { setTracks } = createActions({
  'SET_TRACKS': tracks => ({ tracks })
})

